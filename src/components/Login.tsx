"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Zap,
  Rocket,
  ShieldCheck,
  LogIn,
} from "lucide-react";

const LOGIN_URL = "https://app.adsforge.io/login";

export default function Login() {
  return (
    <section id="login" className="relative overflow-hidden">
      {/* Decorative glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -inset-[8rem] bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.18),transparent_40%)]" />
      </div>

      <div className="mx-auto max-w-6xl px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left column: pitch & benefits */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs uppercase tracking-wide">
              <Sparkles className="h-3.5 w-3.5 opacity-80" />
              Now available
            </div>

            <h2 className="mt-6 text-3xl md:text-4xl font-semibold tracking-tight">
              Launch your first AI-powered{" "}
              <span className="bg-gradient-to-r from-fuchsia-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Meta Ads campaign
              </span>
            </h2>

            <p className="mt-3 text-sm md:text-base opacity-80 max-w-md">
              Sign in to AdsForge AI and turn natural language descriptions
              into fully configured Meta Ads campaigns in minutes — no Ads
              Manager expertise required.
            </p>

            <ul className="mt-6 space-y-3 text-sm opacity-90">
              <li className="flex items-start gap-3">
                <div className="rounded-lg bg-fuchsia-500/10 p-1.5">
                  <Zap className="h-4 w-4 text-fuchsia-400" />
                </div>
                <div>
                  <div className="font-medium">Instant campaign drafts</div>
                  <div className="text-xs opacity-70 mt-0.5">
                    Describe your goal, get a publish-ready setup
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="rounded-lg bg-purple-500/10 p-1.5">
                  <Rocket className="h-4 w-4 text-purple-400" />
                </div>
                <div>
                  <div className="font-medium">Publish in one click</div>
                  <div className="text-xs opacity-70 mt-0.5">
                    Push directly to Meta Ads Manager when you're ready
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="rounded-lg bg-pink-500/10 p-1.5">
                  <ShieldCheck className="h-4 w-4 text-pink-400" />
                </div>
                <div>
                  <div className="font-medium">Built-in guardrails</div>
                  <div className="text-xs opacity-70 mt-0.5">
                    Policy and compliance checks before you spend a dollar
                  </div>
                </div>
              </li>
            </ul>
          </motion.div>

          {/* Right column: login card */}
          <motion.div
            className="lg:col-span-6 rounded-3xl p-[1px] bg-gradient-to-br from-white/20 via-white/5 to-transparent"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5 }}
          >
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-10 backdrop-blur-sm text-center">
              <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-fuchsia-400 to-purple-500 flex items-center justify-center mb-6 shadow-lg shadow-fuchsia-500/30">
                <LogIn className="h-8 w-8 text-white" />
              </div>

              <h3 className="text-2xl font-semibold mb-3">
                Sign in to AdsForge AI
              </h3>
              <p className="text-sm opacity-70 mb-8 max-w-sm mx-auto">
                Access your dashboard and start building campaigns from plain
                English.
              </p>

              <a
                href={LOGIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative isolate inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-lg bg-gradient-to-r from-fuchsia-500 to-purple-500 px-4 py-3 text-sm font-medium text-white shadow-lg shadow-fuchsia-500/30 transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="absolute inset-0 -z-10 bg-gradient-to-r from-fuchsia-400 to-purple-400 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100" />
                <span className="relative z-10 flex items-center gap-2">
                  Login to AdsForge AI
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
              </a>

              <p className="mt-6 text-xs opacity-60">
                New to AdsForge AI? You can create an account from the login
                page.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
