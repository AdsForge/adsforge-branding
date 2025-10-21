"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  User,
  Sparkles,
  Loader2,
  Check,
  Users,
  Zap,
  Gift,
  Bell,
} from "lucide-react";
import { useCallback, useMemo, useState, useEffect } from "react";
import { toast } from "sonner";

export default function JoinWaitlist() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [botField, setBotField] = useState(""); // honeypot
  const [touched, setTouched] = useState({
    name: false,
    email: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);
  const [waitlistCount, setWaitlistCount] = useState<number | null>(null);

  // Fetch waitlist count
  useEffect(() => {
    async function loadCount() {
      try {
        const res = await fetch("/api/waitlist", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          setWaitlistCount(data.count);
        }
      } catch (err) {
        // Silent fail
      }
    }
    loadCount();
  }, [success]);

  const errors = useMemo(() => {
    const e: Record<string, string> = {};
    if (name.trim().length > 0 && name.trim().length < 2) {
      e.name = "Name must be at least 2 characters.";
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) e.email = "Enter a valid email.";
    return e;
  }, [name, email]);

  const showNameError = (touched.name || submitted) && !!errors.name;
  const showEmailError = (touched.email || submitted) && !!errors.email;

  const disabled = loading || success;

  const onSubmit = useCallback(
    async (e?: React.FormEvent) => {
      e?.preventDefault();
      setSubmitted(true);
      if (botField) return; // ignore bots

      // Only email is required
      if (errors.email) {
        toast.error("Please enter a valid email address.");
        return;
      }

      setLoading(true);
      try {
        // Call local API
        const response = await fetch("/api/waitlist", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim(),
            name: name.trim() || undefined,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to join waitlist");
        }

        // Call external API
        try {
          await fetch("https://api.adsforge.io/waitlist/join", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email.trim(),
              fullName: name.trim() || undefined,
            }),
          });
          // Note: We're not blocking on this call's success
        } catch (externalError) {
          console.error("External API error:", externalError);
          // Continue even if external API fails
        }

        toast.success("🎉 Welcome to the waitlist!", {
          duration: 5000,
          description: "We'll notify you when we launch.",
        });

        setSuccess(true);
      } catch (error: any) {
        console.error("Waitlist error:", error);
        toast.error(
          error.message || "Something went wrong. Please try again.",
          {
            duration: 4000,
          }
        );
      } finally {
        setLoading(false);
      }
    },
    [errors, botField, name, email]
  );

  return (
    <section id="waitlist" className="relative overflow-hidden">
      {/* Decorative glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -inset-[8rem] bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.18),transparent_40%)]" />
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
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs uppercase tracking-wide">
              <Sparkles className="h-3.5 w-3.5 opacity-80" />
              Be the first to know
            </div>

            <h2 className="mt-6 text-3xl md:text-4xl font-semibold tracking-tight">
              Join the{" "}
              <span className="bg-gradient-to-r from-fuchsia-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                waitlist
              </span>
            </h2>

            <p className="mt-3 text-sm opacity-80 max-w-md">
              Get early access to AdsForge AI and be among the first to
              transform your Meta advertising with AI-powered campaign creation.
            </p>

            {/* Social proof counter */}
            {waitlistCount !== null && waitlistCount > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-5 inline-flex items-center gap-2 rounded-full border border-fuchsia-400/20 bg-fuchsia-400/10 px-4 py-2 text-sm"
              >
                <Users className="h-4 w-4 text-fuchsia-400" />
                <span>
                  <strong className="font-semibold">{waitlistCount}</strong>{" "}
                  {waitlistCount === 1 ? "person has" : "people have"} already
                  joined
                </span>
              </motion.div>
            )}

            {/* Benefits list */}
            <ul className="mt-6 space-y-3 text-sm opacity-90">
              <li className="flex items-start gap-3">
                <div className="rounded-lg bg-fuchsia-500/10 p-1.5">
                  <Zap className="h-4 w-4 text-fuchsia-400" />
                </div>
                <div>
                  <div className="font-medium">Early Access</div>
                  <div className="text-xs opacity-70 mt-0.5">
                    Be first to try our AI-powered campaign creator
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="rounded-lg bg-purple-500/10 p-1.5">
                  <Bell className="h-4 w-4 text-purple-400" />
                </div>
                <div>
                  <div className="font-medium">Exclusive Updates</div>
                  <div className="text-xs opacity-70 mt-0.5">
                    Get behind-the-scenes insights and feature previews
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="rounded-lg bg-pink-500/10 p-1.5">
                  <Gift className="h-4 w-4 text-pink-400" />
                </div>
                <div>
                  <div className="font-medium">Special Pricing</div>
                  <div className="text-xs opacity-70 mt-0.5">
                    Lock in founder pricing when we launch
                  </div>
                </div>
              </li>
            </ul>

            <p className="mt-6 text-xs opacity-60">
              Join hundreds of marketers preparing to revolutionize their Meta
              advertising workflow. No spam, ever.
            </p>
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
              {success ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-fuchsia-400 to-purple-400 flex items-center justify-center mb-6">
                    <Check className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-2">
                    You're on the list!
                  </h3>
                  <p className="text-sm opacity-80 mb-6">
                    We'll send you an email when we're ready to launch.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="text-xs text-fuchsia-400 hover:text-fuchsia-300 transition"
                  >
                    Add another email
                  </button>
                </motion.div>
              ) : (
                <form
                  onSubmit={onSubmit}
                  className="space-y-5 flex flex-col gap-2"
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

                  <div className="text-center mb-6">
                    <h3 className="text-xl font-semibold mb-2">
                      Secure your spot
                    </h3>
                    <p className="text-sm opacity-70">
                      Enter your details to join the waitlist
                    </p>
                  </div>

                  <label>
                    <span className="text-xs opacity-80">
                      Your name (optional)
                    </span>
                    <div
                      className={`mt-1 flex items-center gap-2 rounded-lg bg-white/10 ring-1 ring-inset px-3 ${
                        showNameError
                          ? "ring-red-400/50 focus-within:ring-red-400"
                          : "ring-white/20 focus-within:ring-white/40"
                      }`}
                    >
                      <User className="h-4 w-4 opacity-70" />
                      <input
                        className="w-full bg-transparent py-2.5 text-sm outline-none"
                        placeholder="Jane Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                        aria-invalid={showNameError}
                        disabled={disabled}
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

                  <label>
                    <span className="text-xs opacity-80">
                      Email <span className="text-red-400">*</span>
                    </span>
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
                        className="w-full bg-transparent py-2.5 text-sm outline-none"
                        placeholder="you@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={() =>
                          setTouched((t) => ({ ...t, email: true }))
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter") onSubmit();
                        }}
                        aria-invalid={showEmailError}
                        disabled={disabled}
                        required
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

                  <motion.button
                    type="submit"
                    disabled={disabled}
                    className={`w-full inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium focus:outline-none transition ${
                      disabled
                        ? "bg-white/10 text-white/60 cursor-not-allowed"
                        : "bg-gradient-to-r from-fuchsia-500 to-purple-500 text-white shadow-lg shadow-fuchsia-500/30 hover:shadow-fuchsia-500/40 hover:from-fuchsia-600 hover:to-purple-600"
                    }`}
                    whileHover={!disabled ? { y: -1 } : {}}
                    whileTap={!disabled ? { scale: 0.98 } : {}}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> Joining…
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4" /> Join the waitlist
                      </>
                    )}
                  </motion.button>

                  <p className="text-center text-xs opacity-70">
                    We respect your privacy. Unsubscribe at any time.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
