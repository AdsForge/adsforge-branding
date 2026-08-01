"use client";

import { motion, useInView } from "framer-motion";
import { type ComponentType, useEffect, useRef, useState } from "react";
import {
  AudienceVignette,
  BuildSetupVignette,
  DescribeIntentVignette,
  FastLaunchVignette,
  GlobalVignette,
  SafeVignette,
} from "./FeatureVignettes";
import Reveal from "./Reveal";

const features = [
  {
    title: "Describe intent",
    desc: "Write your goal in plain English — audience, budget, objective, location. AdsForge AI maps it to the correct Meta Ads parameters.",
    Vignette: DescribeIntentVignette,
  },
  {
    title: "AI builds the setup",
    desc: "A complete configuration is generated for you: audience segmentation, placements, bid strategy, and budget allocation.",
    Vignette: BuildSetupVignette,
  },
  {
    title: "Hit the right audience",
    desc: "Interest, demographic, and lookalike signals are tuned to your objective — no more guessing which categories work.",
    Vignette: AudienceVignette,
  },
  {
    title: "Global ready",
    desc: "Run campaigns across languages and regions with sensible defaults. Geographic and language targeting is configured automatically.",
    Vignette: GlobalVignette,
  },
  {
    title: "Fast launch",
    desc: "Go from a description to an editable campaign draft in minutes, then publish directly to Meta Ads Manager with one click.",
    Vignette: FastLaunchVignette,
  },
  {
    title: "Safe by default",
    desc: "Built-in policy checks analyze your setup and creative before launch, reducing rejected ads and wasted budget.",
    Vignette: SafeVignette,
  },
];

/*
  A cell plays its vignette once when it first scrolls into view
  (a short pulse gives the vignette a rising edge), and replays it
  whenever the pointer enters.
*/
function FeatureCell({
  title,
  desc,
  Vignette,
}: {
  title: string;
  desc: string;
  Vignette: ComponentType<{ active: boolean }>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-64px" });
  const [hovered, setHovered] = useState(false);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    if (!inView) return;
    setPulse(true);
    const id = setTimeout(() => setPulse(false), 200);
    return () => clearTimeout(id);
  }, [inView]);

  return (
    <motion.div
      ref={ref}
      className="border-r border-b border-edge p-6 transition-colors hover:bg-white/2 md:p-8"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <div className="mb-5 flex h-16 items-end">
        <Vignette active={hovered || pulse} />
      </div>
      <h3 className="font-medium">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{desc}</p>
    </motion.div>
  );
}

export default function Features() {
  return (
    <section id="features" className="border-b border-edge">
      <div className="mx-auto max-w-6xl px-4 py-20 md:py-28">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
            Features
          </p>
          <h2 className="mt-3 max-w-xl text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            Why marketers choose AdsForge AI
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted">
            Setting up Meta Ads manually takes hours of configuring audiences,
            budgets, and placements. AdsForge AI removes that complexity without
            taking away control.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-14 grid border-t border-l border-edge sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ title, desc, Vignette }) => (
              <FeatureCell
                key={title}
                title={title}
                desc={desc}
                Vignette={Vignette}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
