"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, Loader2, Mail } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";
import Reveal from "./Reveal";
import { btnPrimary } from "./ui";

const fieldWrap = (hasError: boolean) =>
  `mt-1.5 rounded-lg border bg-surface transition-colors ${
    hasError
      ? "border-red-400/60 focus-within:border-red-400"
      : "border-edge-strong focus-within:border-accent/70"
  }`;

function FieldError({ show, message }: { show: boolean; message?: string }) {
  return (
    <AnimatePresence initial={false}>
      {show && (
        <motion.p
          className="mt-1.5 text-xs text-red-400"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
        >
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

export default function GetInTouch() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [botField, setBotField] = useState(""); // honeypot
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    message: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const maxLen = 600;

  const errors = useMemo(() => {
    const e: Record<string, string> = {};
    if (name.trim().length < 2) e.name = "Please enter your full name.";
    if (!/^\S+@\S+\.\S+$/.test(email)) e.email = "Enter a valid email.";
    if (message.trim().length < 10)
      e.message = "Tell us a bit more (10+ chars).";
    return e;
  }, [name, email, message]);

  const showNameError = (touched.name || submitted) && !!errors.name;
  const showEmailError = (touched.email || submitted) && !!errors.email;
  const showMessageError = (touched.message || submitted) && !!errors.message;

  const onSubmit = useCallback(
    async (e?: React.FormEvent) => {
      e?.preventDefault();
      setSubmitted(true);
      if (botField) return; // ignore bots
      if (Object.keys(errors).length > 0) {
        toast.error("Please fix the highlighted fields.");
        return;
      }
      setLoading(true);
      try {
        const response = await fetch("https://api.adsforge.io/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            message: message.trim(),
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to send message");
        }

        toast.success("Thanks! We'll get back to you within 24 hours.", {
          duration: 5000,
        });

        setName("");
        setEmail("");
        setMessage("");
        setSubmitted(false);
        setTouched({ name: false, email: false, message: false });
      } catch (error) {
        console.error("Contact form error:", error);
        toast.error("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [errors, botField, name, email, message],
  );

  return (
    <section id="contact">
      <div className="mx-auto max-w-6xl px-4 py-20 md:py-28">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
          {/* Left column */}
          <Reveal className="lg:col-span-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
              Contact
            </p>
            <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
              Talk to us about your next campaign
            </h2>
            <p className="mt-4 max-w-md leading-relaxed text-muted">
              Share your goals and we'll tailor a plan. We typically reply
              within 24 hours.
            </p>

            <div className="mt-8 flex flex-col gap-3 text-sm">
              <a
                href="mailto:adsforgeio@gmail.com"
                className="inline-flex w-fit items-center gap-2 text-muted transition-colors hover:text-foreground"
              >
                <Mail className="h-4 w-4" />
                adsforgeio@gmail.com
              </a>
              <a
                href="https://calendly.com/adsforgeio/30min"
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-fit items-center gap-2 text-muted transition-colors hover:text-foreground"
              >
                <ArrowUpRight className="h-4 w-4" />
                Book a 30-minute intro call
              </a>
            </div>

            <ul className="mt-8 space-y-2.5 text-sm text-muted">
              <li className="flex items-start gap-2.5">
                <Check className="mt-0.5 h-4 w-4 text-accent" />
                Clear recommendations tailored to your objectives
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="mt-0.5 h-4 w-4 text-accent" />
                Fast response — usually under 24 hours
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="mt-0.5 h-4 w-4 text-accent" />
                No spam, no sharing your data, ever
              </li>
            </ul>
          </Reveal>

          {/* Right column: form */}
          <Reveal delay={0.1} className="lg:col-span-7">
            <form
              className="grid grid-cols-1 gap-5 md:grid-cols-2"
              onSubmit={onSubmit}
            >
              {/* Honeypot */}
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={botField}
                onChange={(e) => setBotField(e.target.value)}
                className="hidden"
                aria-hidden
              />

              <label className="col-span-1">
                <span className="text-xs text-muted">Your name</span>
                <div className={fieldWrap(showNameError)}>
                  <input
                    className="w-full bg-transparent px-3.5 py-2.5 text-sm outline-none placeholder:text-faint"
                    placeholder="Jane Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                    aria-invalid={showNameError}
                  />
                </div>
                <FieldError show={showNameError} message={errors.name} />
              </label>

              <label className="col-span-1">
                <span className="text-xs text-muted">Email</span>
                <div className={fieldWrap(showEmailError)}>
                  <input
                    type="email"
                    className="w-full bg-transparent px-3.5 py-2.5 text-sm outline-none placeholder:text-faint"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                    aria-invalid={showEmailError}
                  />
                </div>
                <FieldError show={showEmailError} message={errors.email} />
              </label>

              <label className="md:col-span-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted">Message</span>
                  <span className="text-[11px] text-faint">
                    {message.length}/{maxLen}
                  </span>
                </div>
                <div className={fieldWrap(showMessageError)}>
                  <textarea
                    className="min-h-32 w-full resize-y bg-transparent px-3.5 py-2.5 text-sm outline-none placeholder:text-faint"
                    placeholder="Tell us about your goals, timelines, and any constraints…"
                    value={message}
                    onChange={(e) =>
                      setMessage(e.target.value.slice(0, maxLen))
                    }
                    onKeyDown={(e) => {
                      if ((e.metaKey || e.ctrlKey) && e.key === "Enter")
                        onSubmit();
                    }}
                    onBlur={() => setTouched((t) => ({ ...t, message: true }))}
                    aria-invalid={showMessageError}
                  />
                </div>
                <FieldError show={showMessageError} message={errors.message} />
              </label>

              <div className="flex items-center justify-between gap-4 md:col-span-2">
                <p className="text-[11px] text-faint">
                  Press{" "}
                  <kbd className="rounded border border-edge px-1 font-mono">
                    ⌘
                  </kbd>
                  <span className="mx-0.5">+</span>
                  <kbd className="rounded border border-edge px-1 font-mono">
                    Enter
                  </kbd>{" "}
                  to send
                </p>
                <button type="submit" disabled={loading} className={btnPrimary}>
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                    </>
                  ) : (
                    "Send message"
                  )}
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
