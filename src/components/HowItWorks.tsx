"use client";

import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import { Check, ImageIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { EASE } from "@/lib/motion";
import Reveal from "./Reveal";

const steps = [
  {
    num: "01",
    title: "Describe your campaign goal",
    desc: 'Tell AdsForge AI what you want to achieve in everyday language — "Promote my yoga studio to women aged 25–45 in London with a £20 daily budget." The AI understands objectives, audiences, locations, budgets, and languages.',
  },
  {
    num: "02",
    title: "Upload your creative",
    desc: "Add the images or videos you want to run. AdsForge AI analyzes them, suggests the best placements across Facebook and Instagram, and flags potential policy issues before you spend anything.",
  },
  {
    num: "03",
    title: "Review and launch",
    desc: "You get a complete campaign: targeting, placements, bid strategy, budget, and schedule. Review the summary, adjust anything you like, and publish to Meta Ads Manager in one click.",
  },
] as const;

/*
  How each vignette behaves:
  - "loop":   desktop, step is active, motion allowed — idle loops run.
  - "once":   mobile — entrance animations play once in view, no loops.
  - "static": reduced motion — everything renders in its final state.
*/
type VignetteMode = "loop" | "once" | "static";

/* ---------------------------------------------------------------- */
/* Vignette 1 — the brief                                            */
/* ---------------------------------------------------------------- */

const BRIEF_LINES = [
  "goal: promote yoga studio",
  "audience: women 25–45 · london",
  "budget: £20 / day",
];

const BRIEF_CYCLE_MS = 6400;

function BriefVignette({ mode }: { mode: VignetteMode }) {
  // Re-keying the lines container restarts the staggered fade-in.
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (mode !== "loop") return;
    const id = setInterval(() => setCycle((c) => c + 1), BRIEF_CYCLE_MS);
    return () => clearInterval(id);
  }, [mode]);

  return (
    <div className="w-72 rounded-lg border border-edge bg-background p-5">
      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
        brief.txt
      </p>
      <motion.div
        key={cycle}
        className="mt-4 space-y-2"
        initial={mode === "static" ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
        {BRIEF_LINES.map((line, i) => (
          <motion.p
            key={line}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  duration: 0.35,
                  ease: EASE,
                  delay: 0.3 + i * 0.5,
                },
              },
            }}
            className="font-mono text-xs leading-relaxed text-foreground/80"
          >
            {line}
            {i === BRIEF_LINES.length - 1 && (
              <motion.span
                className="ml-1 inline-block h-3 w-0.5 align-middle bg-accent"
                animate={
                  mode === "loop" ? { opacity: [1, 1, 0, 0] } : undefined
                }
                transition={
                  mode === "loop"
                    ? {
                        duration: 1,
                        times: [0, 0.5, 0.5, 1],
                        repeat: Number.POSITIVE_INFINITY,
                      }
                    : undefined
                }
                aria-hidden
              />
            )}
          </motion.p>
        ))}
      </motion.div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Vignette 2 — the creative                                         */
/* ---------------------------------------------------------------- */

const PLACEMENTS = ["Feed", "Stories", "Reels"];

/* w-72 → 288px wide; aspect-video → 162px tall. The scan line sweeps
   that fixed height so we can stay on transform-only animation. */
const SCAN_TRAVEL_PX = 160;

function CreativeVignette({ mode }: { mode: VignetteMode }) {
  return (
    <div className="w-72">
      <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-lg border border-edge">
        <ImageIcon
          className="h-8 w-8 text-faint"
          strokeWidth={1.5}
          aria-hidden
        />
        {mode === "loop" && (
          <motion.div
            className="absolute inset-x-0 top-0 h-px bg-accent/70"
            animate={{ y: [0, SCAN_TRAVEL_PX] }}
            transition={{
              duration: 2.4,
              ease: "linear",
              repeat: Number.POSITIVE_INFINITY,
            }}
            aria-hidden
          />
        )}
      </div>
      <motion.ul
        className="mt-4 space-y-1.5"
        initial={mode === "static" ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={{
          hidden: {},
          visible: {
            transition: { delayChildren: 0.25, staggerChildren: 0.3 },
          },
        }}
      >
        {PLACEMENTS.map((placement) => (
          <motion.li
            key={placement}
            variants={{
              hidden: { opacity: 0, y: 6 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.3, ease: EASE },
              },
            }}
            className="flex items-center gap-2 font-mono text-xs text-muted"
          >
            <Check className="h-3 w-3 text-accent" aria-hidden />
            {placement}
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Vignette 3 — launch                                               */
/* ---------------------------------------------------------------- */

const SPEC_ROWS = [
  { label: "Objective", value: "Traffic" },
  { label: "Audience", value: "Women 25–45 · London" },
  { label: "Budget", value: "£20 / day" },
];

const PUBLISH_AFTER_MS = 1800;
const LAUNCH_CYCLE_MS = 6400;

function PublishedCheck({ draw }: { draw: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="var(--accent)"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <motion.circle
        cx="12"
        cy="12"
        r="10"
        initial={draw ? { pathLength: 0 } : false}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, ease: EASE }}
      />
      <motion.path
        d="M8 12.5l2.6 2.6L16 9.5"
        initial={draw ? { pathLength: 0 } : false}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, ease: EASE, delay: 0.3 }}
      />
    </svg>
  );
}

function LaunchVignette({ mode }: { mode: VignetteMode }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [published, setPublished] = useState(mode === "static");

  // Timers start client-side only, after the vignette is in view.
  useEffect(() => {
    if (mode === "static" || !inView) return;

    let inner: ReturnType<typeof setTimeout>;
    const run = () => {
      setPublished(false);
      inner = setTimeout(() => setPublished(true), PUBLISH_AFTER_MS);
    };
    run();

    if (mode === "once") return () => clearTimeout(inner);

    const outer = setInterval(run, LAUNCH_CYCLE_MS);
    return () => {
      clearInterval(outer);
      clearTimeout(inner);
    };
  }, [mode, inView]);

  return (
    <div ref={ref} className="w-72 rounded-lg border border-edge p-5">
      <motion.dl
        className="space-y-2"
        initial={mode === "static" ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.12 } },
        }}
      >
        {SPEC_ROWS.map((row) => (
          <motion.div
            key={row.label}
            variants={{
              hidden: { opacity: 0, x: -8 },
              visible: {
                opacity: 1,
                x: 0,
                transition: { duration: 0.3, ease: EASE },
              },
            }}
            className="grid grid-cols-[5.5rem_1fr] items-baseline"
          >
            <dt className="text-xs text-faint">{row.label}</dt>
            <dd className="font-mono text-xs text-foreground">{row.value}</dd>
          </motion.div>
        ))}
      </motion.dl>

      <div className="mt-5 h-9">
        <AnimatePresence mode="wait" initial={false}>
          {published ? (
            <motion.div
              key="published"
              initial={mode === "static" ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: mode === "static" ? 0 : 0.25,
                ease: EASE,
              }}
              className="flex h-9 items-center justify-center gap-2"
            >
              <PublishedCheck draw={mode !== "static"} />
              <span className="font-mono text-xs text-foreground">
                Published to Meta
              </span>
            </motion.div>
          ) : (
            <motion.div
              key="publish"
              initial={false}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="flex h-9 items-center justify-center rounded-md border border-edge-strong bg-background font-mono text-xs text-foreground"
            >
              Publish
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Shared pieces                                                     */
/* ---------------------------------------------------------------- */

function Vignette({ index, mode }: { index: number; mode: VignetteMode }) {
  if (index === 0) return <BriefVignette mode={mode} />;
  if (index === 1) return <CreativeVignette mode={mode} />;
  return <LaunchVignette mode={mode} />;
}

function DesktopStep({
  step,
  index,
  active,
  reduceMotion,
  onActivate,
}: {
  step: (typeof steps)[number];
  index: number;
  active: boolean;
  reduceMotion: boolean;
  onActivate: (index: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });

  useEffect(() => {
    if (inView) onActivate(index);
  }, [inView, index, onActivate]);

  return (
    <div
      ref={ref}
      className="flex flex-col justify-center py-16 pl-8 lg:min-h-96"
    >
      <span
        className={`font-mono text-sm transition-colors duration-300 ${
          active ? "text-accent" : "text-faint"
        }`}
      >
        {step.num}
      </span>
      <motion.div
        animate={{ opacity: active ? 1 : 0.4 }}
        transition={{ duration: reduceMotion ? 0 : 0.3, ease: EASE }}
      >
        <h3 className="mt-4 text-lg font-medium md:text-xl">{step.title}</h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
          {step.desc}
        </p>
      </motion.div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Section                                                           */
/* ---------------------------------------------------------------- */

export default function HowItWorks() {
  const reduceMotion = useReducedMotion() ?? false;
  const [active, setActive] = useState(0);

  const stepsRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: stepsRef,
    offset: ["start 0.6", "end 0.6"],
  });
  const springProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });
  const railScale = reduceMotion ? scrollYProgress : springProgress;

  const vignetteMode: VignetteMode = reduceMotion ? "static" : "loop";
  const mobileMode: VignetteMode = reduceMotion ? "static" : "once";

  return (
    <section id="how-it-works" className="border-b border-edge">
      <div className="mx-auto max-w-6xl px-4 py-20 md:py-28">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
            How it works
          </p>
          <h2 className="mt-3 max-w-xl text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            From idea to live campaign in three steps
          </h2>
        </Reveal>

        {/* Desktop: scrollytelling with a sticky vignette panel. */}
        <div className="mt-6 hidden lg:grid lg:grid-cols-2 lg:gap-16">
          <div ref={stepsRef} className="relative">
            <div
              className="absolute top-0 left-0 h-full w-px bg-edge"
              aria-hidden
            />
            <motion.div
              className="absolute top-0 left-0 h-full w-px origin-top bg-accent"
              style={{ scaleY: railScale }}
              aria-hidden
            />
            {steps.map((step, index) => (
              <DesktopStep
                key={step.num}
                step={step}
                index={index}
                active={active === index}
                reduceMotion={reduceMotion}
                onActivate={setActive}
              />
            ))}
          </div>

          <div>
            <div className="lg:sticky lg:top-28">
              <div className="mt-16 h-104 overflow-hidden rounded-xl border border-edge-strong bg-surface">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={active}
                    initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
                    transition={{
                      duration: reduceMotion ? 0 : 0.3,
                      ease: EASE,
                    }}
                    className="flex h-full items-center justify-center"
                  >
                    <Vignette index={active} mode={vignetteMode} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: simple stacked list, entrance animations only. */}
        <div className="mt-14 space-y-14 lg:hidden">
          {steps.map((step, index) => (
            <div key={step.num}>
              <Reveal>
                <span className="font-mono text-sm text-accent">
                  {step.num}
                </span>
                <h3 className="mt-4 text-lg font-medium">{step.title}</h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
                  {step.desc}
                </p>
              </Reveal>
              <Reveal delay={0.08} className="mt-6">
                <div className="flex h-64 items-center justify-center overflow-hidden rounded-xl border border-edge-strong bg-surface">
                  <Vignette index={index} mode={mobileMode} />
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
