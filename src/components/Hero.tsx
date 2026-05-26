"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <BackgroundDecor />
      <div className="mx-auto max-w-6xl px-4 pt-16 pb-24 md:pt-24 md:pb-40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center"
        >
          <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs tracking-wide uppercase">
            AI for Meta Ads
          </span>
          <h1 className="mt-6 text-4xl md:text-6xl font-semibold tracking-tight">
            Launch Meta Ads from{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-amber-300 bg-clip-text text-transparent">
              plain English
            </span>
          </h1>
          <p className="mt-6 text-base md:text-lg max-w-2xl mx-auto opacity-80">
            AdsForge AI is an AI-powered automation platform that configures
            Meta Ads campaigns from natural language descriptions. Describe your
            audience, budget, and goal — the AI builds the full campaign setup
            including targeting, placements, and bid strategy.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {/* Primary Button: Login -> Gradient */}
            <a
              href="https://app.adsforge.io/login"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative isolate inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black shadow transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-cyan-500/25"
            >
              {/* Gradient Overlay */}
              <span className="absolute inset-0 -z-10 bg-gradient-to-br from-cyan-400 via-fuchsia-400 to-amber-300 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100" />
              <span className="relative z-10 flex items-center gap-2 transition-colors duration-300 group-hover:text-white">
                Login to AdsForge AI
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </span>
            </a>

            {/* Secondary Button: Try live demo */}
            <Link
              href="#live-demo"
              className="group relative isolate inline-flex items-center justify-center overflow-hidden rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-medium transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-fuchsia-500/20"
            >
              {/* Gradient Background */}
              <span className="absolute inset-0 -z-10 bg-gradient-to-br from-cyan-500/20 via-fuchsia-500/20 to-amber-500/20 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100" />

              {/* Border Glow */}
              <span className="absolute inset-0 -z-10 rounded-full ring-1 ring-inset ring-transparent transition-all duration-300 group-hover:ring-fuchsia-400/40" />

              <span className="relative z-10 text-white">Try live demo</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function BackgroundDecor() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div className="absolute -inset-[10rem] bg-[radial-gradient(ellipse_at_center,rgba(79,70,229,0.18),transparent_40%)]" />
      <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]">
        <GridLines />
      </div>
    </div>
  );
}

function GridLines() {
  return (
    <div className="absolute inset-0 opacity-[0.07]">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0,transparent_23%,rgba(255,255,255,0.6)_24%,transparent_25%),linear-gradient(to_bottom,transparent_0,transparent_23%,rgba(255,255,255,0.6)_24%,transparent_25%)] bg-[size:48px_48px]" />
    </div>
  );
}
