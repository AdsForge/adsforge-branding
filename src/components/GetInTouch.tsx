"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  MessageSquare,
  User,
  Send,
  Loader2,
  Calendar,
  Shield,
  Check,
} from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";

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

  const disabled = loading; // keep neutral UI before interaction; allow submit to surface errors

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
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
        const response = await fetch(`https://api.adsforge.io/contact`, {
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
          description: "Your message has been sent successfully.",
        });

        // Reset form
        setName("");
        setEmail("");
        setMessage("");
        setSubmitted(false);
        setTouched({
          name: false,
          email: false,
          message: false,
        });
      } catch (error) {
        console.error("Contact form error:", error);
        toast.error("Something went wrong. Please try again.", {
          duration: 4000,
          description: "Unable to send your message at this time.",
        });
      } finally {
        setLoading(false);
      }
    },
    [errors, botField, name, email, message]
  );

  return (
    <section id="contact" className="relative overflow-hidden">
      {/* Decorative glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -inset-[8rem] bg-[radial-gradient(ellipse_at_center,rgba(14,165,233,0.18),transparent_40%)]" />
      </div>

      <div className="mx-auto max-w-6xl px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left column: pitch & benefits */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5"
          >
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              Let’s{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-amber-300 bg-clip-text text-transparent">
                craft
              </span>{" "}
              your next winning campaign
            </h2>
            <p className="mt-3 text-sm opacity-80 max-w-md">
              Share your goals and we’ll tailor a plan. We typically reply
              within 24 hours.
            </p>

            {/* Quick contact chips */}
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <a
                href="mailto:hello@adsforge.ai"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs hover:bg-white/10 transition"
              >
                <Mail className="h-3.5 w-3.5 opacity-80" />
                Email us
              </a>
              <a
                href="https://cal.com/adsforge/intro"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs hover:bg-white/10 transition"
              >
                <Calendar className="h-3.5 w-3.5 opacity-80" />
                Book a 15‑min intro
              </a>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[10px] uppercase tracking-wide">
                <Shield className="h-3.5 w-3.5 opacity-80" />
                We’ll never share your data
              </span>
            </div>

            {/* Benefits list */}
            <ul className="mt-6 space-y-2 text-sm opacity-90">
              <li className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 text-cyan-400" />
                Clear recommendations tailored to your objectives
              </li>
              <li className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 text-fuchsia-400" />
                Fast response — usually under 24 hours
              </li>
              <li className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 text-amber-300" />
                No spam, no sharing, ever
              </li>
            </ul>
          </motion.div>

          {/* Right column: form card */}
          <motion.div
            className="lg:col-span-7 rounded-3xl p-[1px] bg-gradient-to-br from-white/20 via-white/5 to-transparent"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5 }}
          >
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8 backdrop-blur-sm">
              <form
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
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
                  <span className="text-xs opacity-80">Your name</span>
                  <div
                    className={`mt-1 flex items-center gap-2 rounded-lg bg-white/10 ring-1 ring-inset px-3 ${
                      showNameError
                        ? "ring-red-400/50 focus-within:ring-red-400"
                        : "ring-white/20 focus-within:ring-white/40"
                    }`}
                  >
                    <User className="h-4 w-4 opacity-70" />
                    <input
                      className="w-full bg-transparent py-2 text-sm outline-none"
                      placeholder="Jane Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                      aria-invalid={showNameError}
                    />
                  </div>
                  <AnimatePresence initial={false}>
                    {showNameError && (
                      <motion.p
                        className="mt-1 text-xs text-red-300"
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                      >
                        {errors.name}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </label>

                <label className="col-span-1">
                  <span className="text-xs opacity-80">Email</span>
                  <div
                    className={`mt-1 flex items-center gap-2 rounded-lg bg-white/10 ring-1 ring-inset px-3 ${
                      showEmailError
                        ? "ring-red-400/50 focus-within:ring-red-400"
                        : "ring-white/20 focus-within:ring-white/40"
                    }`}
                  >
                    <Mail className="h-4 w-4 opacity-70" />
                    <input
                      type="email"
                      className="w-full bg-transparent py-2 text-sm outline-none"
                      placeholder="you@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                      aria-invalid={showEmailError}
                    />
                  </div>
                  <AnimatePresence initial={false}>
                    {showEmailError && (
                      <motion.p
                        className="mt-1 text-xs text-red-300"
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                      >
                        {errors.email}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </label>

                <label className="md:col-span-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs opacity-80">Message</span>
                    <span className="text-[10px] opacity-70">
                      {message.length}/{maxLen}
                    </span>
                  </div>
                  <div
                    className={`mt-1 flex items-start gap-2 rounded-lg bg-white/10 ring-1 ring-inset px-3 ${
                      showMessageError
                        ? "ring-red-400/50 focus-within:ring-red-400"
                        : "ring-white/20 focus-within:ring-white/40"
                    }`}
                  >
                    <MessageSquare className="mt-2 h-4 w-4 opacity-70" />
                    <textarea
                      className="w-full bg-transparent py-2 text-sm outline-none min-h-28 resize-vertical"
                      placeholder="Tell us about your goals, timelines, and any constraints…"
                      value={message}
                      onChange={(e) =>
                        setMessage(e.target.value.slice(0, maxLen))
                      }
                      onKeyDown={(e) => {
                        if ((e.metaKey || e.ctrlKey) && e.key === "Enter")
                          onSubmit();
                      }}
                      onBlur={() =>
                        setTouched((t) => ({ ...t, message: true }))
                      }
                      aria-invalid={showMessageError}
                    />
                  </div>
                  <AnimatePresence initial={false}>
                    {showMessageError && (
                      <motion.p
                        className="mt-1 text-xs text-red-300"
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                      >
                        {errors.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                  <p className="mt-2 text-[10px] opacity-70">
                    Tip: Press <kbd className="rounded bg-white/10 px-1">⌘</kbd>
                    /<kbd className="rounded bg-white/10 px-1">Ctrl</kbd> +{" "}
                    <kbd className="rounded bg-white/10 px-1">Enter</kbd> to
                    send
                  </p>
                </label>

                <motion.button
                  type="submit"
                  disabled={disabled}
                  className={`md:col-span-2 justify-self-center inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm focus:outline-none transition ${
                    disabled
                      ? "bg-white/10 text-white/60 cursor-not-allowed"
                      : "bg-blue-600 text-white shadow-sm shadow-blue-600/30 hover:bg-blue-500"
                  }`}
                  whileHover={!disabled ? { y: -1 } : {}}
                  whileTap={!disabled ? { scale: 0.98 } : {}}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" /> Send message
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
