"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { EASE } from "@/lib/motion";

type SegmentKind = "plain" | "audience" | "budget" | "location";

type Segment = { text: string; kind: SegmentKind };

type SpecRow = { label: string; value: string };

type Example = {
  segments: Segment[];
  compiled: SpecRow[];
};

const EXAMPLES: Example[] = [
  {
    segments: [
      { text: "I want to sell more sneakers to ", kind: "plain" },
      { text: "men", kind: "audience" },
      { text: " in ", kind: "plain" },
      { text: "New York", kind: "location" },
      { text: " with a ", kind: "plain" },
      { text: "$50 daily budget", kind: "budget" },
      { text: ".", kind: "plain" },
    ],
    compiled: [
      { label: "Objective", value: "Conversions" },
      { label: "Audience", value: "Men, 21–40 · New York" },
      { label: "Budget", value: "$50 / day" },
      { label: "Schedule", value: "4 weeks" },
    ],
  },
  {
    segments: [
      { text: "Promote my yoga studio to ", kind: "plain" },
      { text: "women 25–45", kind: "audience" },
      { text: " in ", kind: "plain" },
      { text: "London", kind: "location" },
      { text: ", ", kind: "plain" },
      { text: "£20 a day", kind: "budget" },
      { text: " for a month.", kind: "plain" },
    ],
    compiled: [
      { label: "Objective", value: "Traffic" },
      { label: "Audience", value: "Women, 25–45 · London" },
      { label: "Budget", value: "£20 / day" },
      { label: "Schedule", value: "1 month" },
    ],
  },
  {
    segments: [
      { text: "Get leads for my MMA gym from ", kind: "plain" },
      { text: "men 18–35", kind: "audience" },
      { text: " in ", kind: "plain" },
      { text: "Europe", kind: "location" },
      { text: ", ", kind: "plain" },
      { text: "$15/day", kind: "budget" },
      { text: " for 2 weeks.", kind: "plain" },
    ],
    compiled: [
      { label: "Objective", value: "Leads" },
      { label: "Audience", value: "Men, 18–35 · Europe" },
      { label: "Budget", value: "$15 / day" },
      { label: "Schedule", value: "2 weeks" },
    ],
  },
];

/* Timing (ms). Everything is scheduled up front, so the loop is deterministic. */
const START_DELAY_MS = 300; // beat after the crossfade before typing begins
const TYPE_MS = 24; // per character
const PARSE_DELAY_MS = 350; // beat between typing done and first highlight
const PARSE_STEP_MS = 380; // between segment highlights
const COMPILE_INTRO_MS = 900; // spec rows staggering in
const HOLD_MS = 2800; // rest on the compiled state
const CROSSFADE_S = 0.3;

type Phase = "typing" | "parsing" | "compiled";

function totalChars(example: Example): number {
  return example.segments.reduce((sum, seg) => sum + seg.text.length, 0);
}

function annotatedCount(example: Example): number {
  return example.segments.filter((seg) => seg.kind !== "plain").length;
}

function cycleMs(example: Example): number {
  return (
    START_DELAY_MS +
    totalChars(example) * TYPE_MS +
    PARSE_DELAY_MS +
    annotatedCount(example) * PARSE_STEP_MS +
    COMPILE_INTRO_MS +
    HOLD_MS
  );
}

export default function BriefLoop() {
  const reduceMotion = useReducedMotion();

  const [exampleIndex, setExampleIndex] = useState(0);
  // Bumped on every example switch (including re-selecting the active tab)
  // so the cycle restarts from scratch.
  const [cycle, setCycle] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");
  const [charCount, setCharCount] = useState(0);
  const [highlightCount, setHighlightCount] = useState(0);

  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pausedRef = useRef(false);
  const pendingAdvanceRef = useRef(false);

  const clearTimers = useCallback(() => {
    for (const t of timersRef.current) clearTimeout(t);
    timersRef.current = [];
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const goTo = useCallback(
    (index: number) => {
      // Reset synchronously so the incoming keyed element never flashes
      // a stale frame of the previous example.
      clearTimers();
      setExampleIndex(index);
      setPhase("typing");
      setCharCount(0);
      setHighlightCount(0);
      setCycle((c) => c + 1);
    },
    [clearTimers],
  );

  // `cycle` is intentionally an extra dependency: re-selecting the active
  // tab bumps it so the timers restart from scratch.
  // biome-ignore lint/correctness/useExhaustiveDependencies: cycle restarts the loop
  useEffect(() => {
    const example = EXAMPLES[exampleIndex];
    const total = totalChars(example);
    const annotated = annotatedCount(example);

    if (reduceMotion) {
      setCharCount(total);
      setHighlightCount(annotated);
      setPhase("compiled");
      return;
    }

    const later = (fn: () => void, ms: number) => {
      timersRef.current.push(setTimeout(fn, ms));
    };

    const typingEndAt = START_DELAY_MS + total * TYPE_MS;

    later(() => {
      intervalRef.current = setInterval(() => {
        setCharCount((n) => {
          if (n + 1 >= total && intervalRef.current !== null) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          return Math.min(n + 1, total);
        });
      }, TYPE_MS);
    }, START_DELAY_MS);

    later(() => setPhase("parsing"), typingEndAt + PARSE_DELAY_MS);
    for (let k = 1; k <= annotated; k += 1) {
      later(
        () => setHighlightCount(k),
        typingEndAt + PARSE_DELAY_MS + (k - 1) * PARSE_STEP_MS,
      );
    }

    const compiledAt = typingEndAt + PARSE_DELAY_MS + annotated * PARSE_STEP_MS;
    later(() => setPhase("compiled"), compiledAt);

    later(
      () => {
        if (pausedRef.current) {
          pendingAdvanceRef.current = true;
          return;
        }
        goTo((exampleIndex + 1) % EXAMPLES.length);
      },
      compiledAt + COMPILE_INTRO_MS + HOLD_MS,
    );

    return clearTimers;
  }, [exampleIndex, cycle, reduceMotion, goTo, clearTimers]);

  const pause = useCallback(() => {
    pausedRef.current = true;
  }, []);

  const resume = useCallback(() => {
    pausedRef.current = false;
    if (pendingAdvanceRef.current) {
      pendingAdvanceRef.current = false;
      goTo((exampleIndex + 1) % EXAMPLES.length);
    }
  }, [exampleIndex, goTo]);

  const example = EXAMPLES[exampleIndex];
  const contentKey = `${exampleIndex}-${cycle}`;

  // Map each annotated segment to its order of appearance for highlighting.
  let annotatedIndex = -1;
  let charOffset = 0;

  return (
    // Hover/focus only pauses the auto-advance — a non-essential
    // enhancement, so the wrapper stays a plain container.
    // biome-ignore lint/a11y/noStaticElementInteractions: pause-on-hover is decorative
    <div
      className="overflow-hidden rounded-xl border border-edge-strong bg-surface shadow-card"
      onPointerEnter={pause}
      onPointerLeave={resume}
      onFocus={pause}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) resume();
      }}
    >
      <div className="flex items-center justify-between border-b border-edge px-5 py-3.5">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
          Campaign brief
        </p>
        <div className="flex items-center gap-3">
          {EXAMPLES.map((_example, i) => {
            const label = `0${i + 1}`;
            return (
              <button
                key={label}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Show example ${label}`}
                aria-pressed={i === exampleIndex}
                className={`font-mono text-[11px] transition-colors ${
                  i === exampleIndex
                    ? "text-accent"
                    : "text-faint hover:text-muted"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={contentKey}
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : CROSSFADE_S, ease: EASE }}
          className="px-5 py-5"
        >
          <p className="min-h-24 font-mono text-sm leading-relaxed text-foreground md:text-[15px]">
            {example.segments.map((seg, i) => {
              const start = charOffset;
              charOffset += seg.text.length;
              if (seg.kind !== "plain") annotatedIndex += 1;
              const highlighted =
                seg.kind !== "plain" && annotatedIndex < highlightCount;
              const visibleChars = Math.max(
                0,
                Math.min(charCount - start, seg.text.length),
              );
              const highlightClass =
                seg.kind === "budget"
                  ? "text-accent"
                  : "text-foreground underline decoration-accent/60 underline-offset-4";
              return (
                <span
                  // Segments are static per example; index is a stable key.
                  // biome-ignore lint/suspicious/noArrayIndexKey: fixed list
                  key={i}
                  className={`transition-colors duration-300 ${
                    highlighted ? highlightClass : ""
                  }`}
                >
                  {seg.text.slice(0, visibleChars)}
                </span>
              );
            })}
            {phase === "typing" && !reduceMotion && (
              <span className="caret" aria-hidden />
            )}
          </p>

          {phase === "compiled" && (
            <div className="mt-4 border-t border-edge pt-4">
              <dl className="space-y-2">
                {example.compiled.map((row, i) => (
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
                  delay: reduceMotion ? 0 : example.compiled.length * 0.09,
                }}
                className="mt-3 flex items-center gap-2 text-xs text-muted"
              >
                <Check className="h-3.5 w-3.5 text-accent" aria-hidden />
                Ready to publish
              </motion.p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="h-px bg-edge">
        {!reduceMotion && (
          <motion.div
            key={contentKey}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: cycleMs(example) / 1000, ease: "linear" }}
            className="h-full origin-left bg-accent"
          />
        )}
      </div>
    </div>
  );
}
