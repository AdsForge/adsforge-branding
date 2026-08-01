"use client";

/*
  Six tiny feature vignettes. Each is monochrome with exactly one gold
  moment, receives `active`, replays on every rising edge of `active`,
  and settles into (or, under reduced motion, renders immediately) its
  final static state.
*/

import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { EASE, SPRING } from "@/lib/motion";

type VignetteProps = { active: boolean };

/*
  Counts rising edges of `active`. run === 0 means "never played"
  (also forced under reduced motion), which every vignette renders
  as its final static state. Each increment remounts the animated
  subtree via `key` so the sequence replays deterministically.
*/
function useRun(active: boolean): number {
  const reduced = useReducedMotion();
  const [run, setRun] = useState(0);
  const prev = useRef(false);

  useEffect(() => {
    if (active && !prev.current && !reduced) {
      setRun((n) => n + 1);
    }
    prev.current = active;
  }, [active, reduced]);

  return run;
}

/* 1. Describe intent — prompt segments type themselves in. */

const SEGMENTS = ["sneakers", " · men", " · NYC", " · $50/day"];

export function DescribeIntentVignette({ active }: VignetteProps) {
  const reduced = useReducedMotion();
  const run = useRun(active);

  return (
    <motion.p
      key={run}
      initial={run === 0 ? false : "hidden"}
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
      className="flex items-center whitespace-pre font-mono text-xs text-muted"
    >
      {SEGMENTS.map((segment, i) => (
        <motion.span
          key={segment}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { duration: 0.2, ease: EASE } },
          }}
          className={i === SEGMENTS.length - 1 ? "text-accent" : undefined}
        >
          {segment}
        </motion.span>
      ))}
      <motion.span
        aria-hidden="true"
        className="ml-1 h-3.5 w-0.5 bg-accent"
        animate={reduced ? { opacity: 1 } : { opacity: [1, 1, 0, 0] }}
        transition={
          reduced
            ? undefined
            : {
                duration: 1,
                times: [0, 0.5, 0.5, 1],
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }
        }
      />
    </motion.p>
  );
}

/* 2. AI builds the setup — skeleton rows assemble, last row gets a gold edge. */

const ROWS = ["80%", "60%", "70%"];

export function BuildSetupVignette({ active }: VignetteProps) {
  const run = useRun(active);

  return (
    <motion.div
      key={run}
      initial={run === 0 ? false : "hidden"}
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      className="flex w-full max-w-40 flex-col gap-2"
    >
      {ROWS.map((width, i) => (
        <motion.div
          key={width}
          variants={{
            hidden: { opacity: 0, x: -8 },
            visible: {
              opacity: 1,
              x: 0,
              transition: { duration: 0.4, ease: EASE },
            },
          }}
          className="relative h-2.5 rounded-sm border border-edge bg-surface"
          style={{ width }}
        >
          {i === ROWS.length - 1 && (
            <motion.span
              variants={{
                hidden: { scaleY: 0 },
                visible: {
                  scaleY: 1,
                  transition: { duration: 0.3, ease: EASE, delay: 0.45 },
                },
              }}
              className="absolute inset-y-0 left-0 w-0.5 origin-bottom bg-accent"
            />
          )}
        </motion.div>
      ))}
    </motion.div>
  );
}

/* 3. Hit the right audience — a gold dot homes in on the target center. */

export function AudienceVignette({ active }: VignetteProps) {
  const run = useRun(active);

  return (
    <svg viewBox="0 0 96 64" className="h-14 w-auto" aria-hidden="true">
      {[10, 18, 26].map((r) => (
        <circle
          key={r}
          cx="48"
          cy="32"
          r={r}
          fill="none"
          stroke="#2d2a24"
          strokeWidth="1"
        />
      ))}
      <motion.circle
        key={run}
        cx="48"
        cy="32"
        r="2.5"
        fill="#ffcf48"
        initial={run === 0 ? false : { y: -26 }}
        animate={{ y: 0 }}
        transition={SPRING}
      />
    </svg>
  );
}

/* 4. Global ready — the highlight sweeps across region codes, twice. */

const REGIONS = ["EN", "FR", "DE", "ES", "JP", "BR"];

export function GlobalVignette({ active }: VignetteProps) {
  const run = useRun(active);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (run === 0) return;
    setCurrent(0);
    let step = 0;
    const id = setInterval(() => {
      step += 1;
      if (step >= REGIONS.length * 2) {
        setCurrent(0);
        clearInterval(id);
        return;
      }
      setCurrent(step % REGIONS.length);
    }, 500);
    return () => clearInterval(id);
  }, [run]);

  return (
    <p className="flex gap-3 font-mono text-xs">
      {REGIONS.map((code, i) => (
        <span
          key={code}
          className={
            i === current
              ? "border-b border-accent text-foreground"
              : "border-b border-transparent text-faint"
          }
        >
          {code}
        </span>
      ))}
    </p>
  );
}

/* 5. Fast launch — the progress hairline fills, then checks off. */

export function FastLaunchVignette({ active }: VignetteProps) {
  const run = useRun(active);

  return (
    <div className="flex w-full items-center gap-2">
      <div className="relative h-px w-full max-w-40 bg-edge">
        <motion.div
          key={run}
          initial={run === 0 ? false : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="absolute inset-0 origin-left bg-accent"
        />
      </div>
      <motion.span
        key={`check-${run}`}
        initial={run === 0 ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, ease: EASE, delay: 0.8 }}
        className="flex shrink-0"
      >
        <Check className="h-3.5 w-3.5 text-accent" strokeWidth={2} />
      </motion.span>
    </div>
  );
}

/* 6. Safe by default — the shield traces itself in gold, then checks. */

const SHIELD_PATH = "M12 3l7 3v5c0 4.6-3 7.6-7 9-4-1.4-7-4.4-7-9V6l7-3z";
const SHIELD_CHECK_PATH = "M9 12l2 2 4-4";

export function SafeVignette({ active }: VignetteProps) {
  const run = useRun(active);

  return (
    <svg
      viewBox="0 0 24 24"
      className="h-12 w-12"
      fill="none"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={SHIELD_PATH} stroke="#2d2a24" />
      <motion.path
        key={`shield-${run}`}
        d={SHIELD_PATH}
        stroke="#ffcf48"
        strokeOpacity="0.7"
        initial={run === 0 ? false : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.7, ease: EASE }}
      />
      <motion.path
        key={`check-${run}`}
        d={SHIELD_CHECK_PATH}
        stroke="#ffcf48"
        strokeOpacity="0.7"
        initial={run === 0 ? false : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.3, ease: EASE, delay: 0.7 }}
      />
    </svg>
  );
}
