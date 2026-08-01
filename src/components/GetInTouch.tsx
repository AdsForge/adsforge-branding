"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check, Loader2, Mail } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { EASE } from "@/lib/motion";
import Reveal from "./Reveal";
import { btnPrimary } from "./ui";

const MAX_LEN = 600;

const kicker = "font-mono text-[11px] uppercase tracking-[0.25em] text-muted";

function InlineField({
  id,
  label,
  value,
  placeholder,
  minCh,
  type = "text",
  disabled,
  invalid,
  describedBy,
  reduceMotion,
  onChange,
  onFieldBlur,
}: {
  id: string;
  label: string;
  value: string;
  placeholder: string;
  minCh: number;
  type?: string;
  disabled: boolean;
  invalid: boolean;
  describedBy?: string;
  reduceMotion: boolean;
  onChange: (value: string) => void;
  onFieldBlur: () => void;
}) {
  const [focused, setFocused] = useState(false);

  const hairline = invalid
    ? "border-red-600/50 dark:border-red-400/60"
    : reduceMotion && focused
      ? "border-accent"
      : "border-edge-strong";

  return (
    <span className="relative inline-block max-w-full align-baseline">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        aria-invalid={invalid}
        aria-describedby={describedBy}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => {
          setFocused(false);
          onFieldBlur();
        }}
        style={{ width: `${Math.max(minCh, value.length + 1)}ch` }}
        className={`max-w-full border-b bg-transparent font-mono text-base text-foreground caret-accent outline-none transition-colors placeholder:text-faint disabled:opacity-60 md:text-lg ${hairline}`}
      />
      {!reduceMotion && (
        <motion.span
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-accent"
          initial={false}
          animate={{ scaleX: focused ? 1 : 0 }}
          transition={{ duration: 0.25, ease: EASE }}
        />
      )}
    </span>
  );
}

export default function GetInTouch() {
  const reduceMotion = useReducedMotion() ?? false;

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
  const [sentInfo, setSentInfo] = useState<{
    name: string;
    email: string;
  } | null>(null);
  const [messageFocused, setMessageFocused] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const errors = useMemo(() => {
    const e: { name?: string; email?: string; message?: string } = {};
    if (name.trim().length < 2) e.name = "please enter your full name.";
    if (!/^\S+@\S+\.\S+$/.test(email)) e.email = "enter a valid address.";
    if (message.trim().length < 10)
      e.message = "tell us a bit more (10+ characters).";
    return e;
  }, [name, email, message]);

  const showNameError = (touched.name || submitted) && !!errors.name;
  const showEmailError = (touched.email || submitted) && !!errors.email;
  const showMessageError = (touched.message || submitted) && !!errors.message;

  const isSent = sentInfo !== null;
  const status = isSent ? "sent" : loading ? "sending" : "draft";
  const statusColor = isSent
    ? "text-accent"
    : loading
      ? "text-muted"
      : "text-faint";

  /* Auto-grow the message textarea to fit its content. */
  // biome-ignore lint/correctness/useExhaustiveDependencies: message drives scrollHeight
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = `${ta.scrollHeight}px`;
  }, [message, isSent]);

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

        // Capture values for the receipt before clearing the draft.
        setSentInfo({ name: name.trim(), email: email.trim() });
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

  const receiptRows = sentInfo
    ? [
        { label: "Status", value: "Sent" },
        { label: "From", value: `${sentInfo.name} · ${sentInfo.email}` },
        { label: "Reply", value: "within 24 hours" },
        { label: "Channel", value: "adsforgeio@gmail.com" },
      ]
    : [];

  const messageHairline = showMessageError
    ? "border-red-600/50 dark:border-red-400/60"
    : reduceMotion && messageFocused
      ? "border-accent"
      : "border-edge-strong";

  const ledgerLines = [
    { key: "name", id: "err-name", show: showNameError, text: errors.name },
    {
      key: "email",
      id: "err-email",
      show: showEmailError,
      text: errors.email,
    },
    {
      key: "message",
      id: "err-message",
      show: showMessageError,
      text: errors.message,
    },
  ];

  return (
    <section id="contact">
      <div className="mx-auto max-w-3xl px-4 py-20 md:py-28">
        <Reveal>
          <p className={kicker}>Contact</p>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            Tell us what you're after — in plain English.
          </h2>
          <p className="mt-4 leading-relaxed text-muted">
            Write it like a brief. We reply within 24 hours.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <form
            onSubmit={onSubmit}
            className="relative mt-10 overflow-hidden rounded-xl border border-edge-strong bg-surface shadow-card"
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

            {/* Header row */}
            <div className="flex items-center justify-between border-b border-edge px-5 py-3.5">
              <p className={kicker}>Message brief</p>
              <p className={`font-mono text-[11px] ${statusColor}`}>{status}</p>
            </div>

            {/* Body */}
            <div className="px-5 py-6">
              <AnimatePresence mode="wait" initial={false}>
                {isSent ? (
                  <motion.output
                    key="receipt"
                    className="block"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{
                      opacity: 0,
                      transition: { duration: reduceMotion ? 0 : 0.2 },
                    }}
                    transition={{
                      duration: reduceMotion ? 0 : 0.25,
                      ease: EASE,
                    }}
                  >
                    <dl className="space-y-2">
                      {receiptRows.map((row, i) => (
                        <motion.div
                          key={row.label}
                          initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.3,
                            ease: EASE,
                            delay: reduceMotion ? 0 : i * 0.09,
                          }}
                          className="grid grid-cols-[6.5rem_1fr] items-baseline"
                        >
                          <dt className="text-xs text-faint">{row.label}</dt>
                          <dd className="font-mono text-xs text-foreground">
                            {row.value}
                          </dd>
                        </motion.div>
                      ))}
                    </dl>
                    <motion.p
                      initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.3,
                        ease: EASE,
                        delay: reduceMotion ? 0 : receiptRows.length * 0.09,
                      }}
                      className="mt-3 flex items-center gap-2 text-xs text-muted"
                    >
                      <Check className="h-3.5 w-3.5 text-accent" aria-hidden />
                      Message sent — we'll get back to you within 24 hours.
                    </motion.p>
                    <button
                      type="button"
                      onClick={() => setSentInfo(null)}
                      className="mt-4 font-mono text-xs text-muted transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    >
                      write another →
                    </button>
                  </motion.output>
                ) : (
                  <motion.div
                    key="draft"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{
                      opacity: 0,
                      transition: { duration: reduceMotion ? 0 : 0.25 },
                    }}
                    transition={{
                      duration: reduceMotion ? 0 : 0.25,
                      ease: EASE,
                    }}
                    className="font-mono text-base leading-[2.2] text-foreground md:text-lg"
                  >
                    <p>
                      Hi, my name is{" "}
                      <InlineField
                        id="brief-name"
                        label="Your name"
                        value={name}
                        placeholder="your name"
                        minCh={9}
                        disabled={loading}
                        invalid={showNameError}
                        describedBy={showNameError ? "err-name" : undefined}
                        reduceMotion={reduceMotion}
                        onChange={setName}
                        onFieldBlur={() =>
                          setTouched((t) => ({ ...t, name: true }))
                        }
                      />{" "}
                      and you can reach me at{" "}
                      <InlineField
                        id="brief-email"
                        label="Your email"
                        value={email}
                        placeholder="you@company.com"
                        minCh={16}
                        type="email"
                        disabled={loading}
                        invalid={showEmailError}
                        describedBy={showEmailError ? "err-email" : undefined}
                        reduceMotion={reduceMotion}
                        onChange={setEmail}
                        onFieldBlur={() =>
                          setTouched((t) => ({ ...t, email: true }))
                        }
                      />
                      . I'd like to talk about
                    </p>
                    <div className="relative mt-1">
                      <label htmlFor="brief-message" className="sr-only">
                        Your message
                      </label>
                      <textarea
                        ref={textareaRef}
                        id="brief-message"
                        rows={2}
                        value={message}
                        placeholder="your goals, timeline, budget…"
                        disabled={loading}
                        aria-invalid={showMessageError}
                        aria-describedby={
                          showMessageError ? "err-message" : undefined
                        }
                        onChange={(e) =>
                          setMessage(e.target.value.slice(0, MAX_LEN))
                        }
                        onKeyDown={(e) => {
                          if ((e.metaKey || e.ctrlKey) && e.key === "Enter")
                            onSubmit();
                        }}
                        onFocus={() => setMessageFocused(true)}
                        onBlur={() => {
                          setMessageFocused(false);
                          setTouched((t) => ({ ...t, message: true }));
                        }}
                        className={`block min-h-[4.4em] w-full resize-none overflow-hidden border-b bg-transparent font-mono text-base leading-[2.2] text-foreground caret-accent outline-none transition-colors placeholder:text-faint disabled:opacity-60 md:text-lg ${messageHairline}`}
                      />
                      {!reduceMotion && (
                        <motion.span
                          aria-hidden
                          className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-accent"
                          initial={false}
                          animate={{ scaleX: messageFocused ? 1 : 0 }}
                          transition={{ duration: 0.25, ease: EASE }}
                        />
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer row */}
            <div className="flex items-center justify-between gap-4 border-t border-edge px-5 py-4">
              <div className="flex flex-wrap items-center gap-3">
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
                <p
                  aria-hidden
                  className={`font-mono text-[11px] ${
                    message.length > 500 ? "text-muted" : "text-faint"
                  }`}
                >
                  {message.length}/{MAX_LEN}
                </p>
              </div>
              <button
                type="submit"
                disabled={loading || isSent}
                className={btnPrimary}
              >
                {loading ? (
                  <>
                    <Loader2
                      className={`h-4 w-4 ${reduceMotion ? "" : "animate-spin"}`}
                    />{" "}
                    Compiling…
                  </>
                ) : (
                  "Send message"
                )}
              </button>
            </div>

            {/* Sending progress rail along the card's bottom edge */}
            {loading && !reduceMotion && (
              <motion.span
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-px origin-left bg-accent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: 1.2,
                  ease: "linear",
                  repeat: Number.POSITIVE_INFINITY,
                }}
              />
            )}
          </form>

          {/* Error ledger */}
          <div aria-live="polite" className="mt-3 space-y-1">
            <AnimatePresence initial={false}>
              {ledgerLines
                .filter((line) => line.show)
                .map((line) => (
                  <motion.p
                    key={line.key}
                    id={line.id}
                    initial={
                      reduceMotion ? { opacity: 0 } : { opacity: 0, y: -4 }
                    }
                    animate={
                      reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }
                    }
                    exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
                    transition={{ duration: 0.2, ease: EASE }}
                    className="font-mono text-xs text-red-600 dark:text-red-400"
                  >
                    err: {line.key} — {line.text}
                  </motion.p>
                ))}
            </AnimatePresence>
          </div>

          {/* Meta row */}
          <div className="mt-10 flex flex-col gap-6 border-t border-edge pt-6 md:flex-row md:items-start md:justify-between">
            <div className="flex flex-col gap-3 text-sm">
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
            <ul className="flex flex-col gap-2.5">
              {[
                "Tailored recommendations",
                "Reply under 24h",
                "No spam, ever",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 font-mono text-xs text-muted"
                >
                  <Check className="h-3 w-3 text-accent" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
