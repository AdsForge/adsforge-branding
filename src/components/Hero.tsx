"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Timer } from "lucide-react";

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
            Upload your creative, describe your intent, and AdsForge AI creates
            a complete campaign setup – audience, budget, placements and more.
          </p>

          {/* Countdown — placed between copy and CTAs for high salience without stealing focus */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
            className="mt-8 flex flex-col items-center gap-3"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-wide">
              <Timer className="h-3.5 w-3.5 opacity-80" />
              Early access closes in
            </span>
            <Countdown />
          </motion.div>

          <div className="mt-8 flex items-center justify-center gap-3">
            <Link
              href="#live-demo"
              className="rounded-full bg-white text-black px-5 py-2.5 text-sm font-medium shadow hover:shadow-md transition"
            >
              Try live demo
            </Link>
            <Link
              href="#features"
              className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium hover:bg-white/5 transition"
            >
              See how it works
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Countdown() {
  const [target, setTarget] = useState<Date | null>(null);
  const [remainingMs, setRemainingMs] = useState<number>(0);

  // Establish a 1-month target on mount
  useEffect(() => {
    const d = new Date();
    d.setMonth(d.getMonth() + 1);
    setTarget(d);
  }, []);

  // Tick every second
  useEffect(() => {
    if (!target) return;
    const update = () => {
      const diff = target.getTime() - Date.now();
      setRemainingMs(Math.max(diff, 0));
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [target]);

  const total = remainingMs;
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((total / (1000 * 60)) % 60);
  const seconds = Math.floor((total / 1000) % 60);

  const ended = total <= 0;

  return (
    <div
      role="timer"
      aria-live="polite"
      className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-md"
    >
      {ended ? (
        <div className="text-sm opacity-80">Offer ended</div>
      ) : (
        <div className="grid grid-cols-4 gap-2">
          <TimeCell value={days} label="Days" />
          <TimeCell value={hours} label="Hours" />
          <TimeCell value={minutes} label="Minutes" />
          <TimeCell value={seconds} label="Seconds" pad />
        </div>
      )}
    </div>
  );
}

function TimeCell({
  value,
  label,
  pad = false,
}: {
  value: number;
  label: string;
  pad?: boolean;
}) {
  const text = pad ? String(value).padStart(2, "0") : String(value);
  return (
    <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
      <div className="text-2xl md:text-3xl font-semibold tabular-nums tracking-tight">
        {text}
      </div>
      <div className="mt-0.5 text-[10px] uppercase opacity-70">{label}</div>
    </div>
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
