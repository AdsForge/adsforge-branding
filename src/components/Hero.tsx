"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { btnPrimary, btnSecondary } from "./ui";

const LOGIN_URL = "https://app.adsforge.io/login";

const PROMPT =
  "I want to sell more sneakers to men in New York with a $50 daily budget.";

export default function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="border-b border-edge">
      <div className="mx-auto max-w-6xl px-4 pt-20 pb-24 md:pt-32 md:pb-28">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            Launch Meta Ads from plain English
            <span className="text-accent">.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted md:text-lg">
            Describe your audience, budget, and goal in one sentence. AdsForge
            AI builds the full campaign — targeting, placements, schedule, and
            ad copy — ready to publish to Meta Ads Manager.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a
              href={LOGIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={btnPrimary}
            >
              Start for free
              <ArrowRight className="h-4 w-4" />
            </a>
            <Link href="#live-demo" className={btnSecondary}>
              Try the live demo
              <ArrowDown className="h-4 w-4" />
            </Link>
          </div>
          <p className="mt-5 text-xs text-faint">
            No credit card required · Facebook &amp; Instagram
          </p>
        </motion.div>

        <TypedBrief />
      </div>
    </section>
  );
}

function TypedBrief() {
  const reduceMotion = useReducedMotion();
  const [count, setCount] = useState(0);
  const done = count >= PROMPT.length;

  useEffect(() => {
    if (reduceMotion) {
      setCount(PROMPT.length);
      return;
    }
    let interval: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => {
      interval = setInterval(() => {
        setCount((n) => {
          if (n + 1 >= PROMPT.length && interval) clearInterval(interval);
          return n + 1;
        });
      }, 26);
    }, 900);
    return () => {
      clearTimeout(start);
      if (interval) clearInterval(interval);
    };
  }, [reduceMotion]);

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto mt-16 max-w-2xl"
    >
      <div className="rounded-xl border border-edge-strong bg-surface p-5 text-left shadow-[0_16px_48px_-24px_rgba(0,0,0,0.8)]">
        <div className="border-b border-edge pb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-faint">
          Campaign brief
        </div>
        <p className="min-h-14 pt-4 font-mono text-sm leading-relaxed md:text-base">
          {PROMPT.slice(0, count)}
          {!done && <span className="caret" aria-hidden />}
        </p>
        <p className="pt-3 text-xs text-faint">
          That one sentence becomes the campaign in the{" "}
          <Link
            href="#live-demo"
            className="text-accent underline-offset-4 hover:underline"
          >
            live demo
          </Link>{" "}
          below.
        </p>
      </div>
    </motion.div>
  );
}
