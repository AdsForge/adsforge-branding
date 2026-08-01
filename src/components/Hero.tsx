"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { analytics } from "@/lib/analytics";
import { EASE } from "@/lib/motion";
import BriefLoop from "./BriefLoop";
import { btnPrimary, btnSecondary } from "./ui";

const LOGIN_URL = "https://app.adsforge.io/login";

export default function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="border-b border-edge">
      <div className="mx-auto max-w-6xl px-4 pt-20 pb-20 md:pt-28 md:pb-28">
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_minmax(0,30rem)]">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl xl:text-6xl">
              Launch Meta Ads from plain English
              <span className="text-accent">.</span>
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted md:text-lg">
              Describe your audience, budget, and goal in one sentence. AdsForge
              AI builds the full campaign — targeting, placements, schedule, and
              ad copy — ready to publish to Meta Ads Manager.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href={LOGIN_URL}
                className={btnPrimary}
                onClick={() =>
                  analytics.trackButtonClick("start_for_free", "hero")
                }
              >
                Start for free
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="#live-demo"
                className={btnSecondary}
                onClick={() =>
                  analytics.trackButtonClick("try_live_demo", "hero")
                }
              >
                Try the live demo
              </Link>
            </div>
            <p className="mt-5 text-xs text-faint">
              No credit card required · Facebook &amp; Instagram
            </p>
          </motion.div>

          <BriefLoop />
        </div>
      </div>
    </section>
  );
}
