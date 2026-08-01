import {
  Globe,
  MessageSquare,
  Rocket,
  ShieldCheck,
  Target,
  Wand2,
} from "lucide-react";
import Reveal from "./Reveal";

const features = [
  {
    title: "Describe intent",
    desc: "Write your goal in plain English — audience, budget, objective, location. AdsForge AI maps it to the correct Meta Ads parameters.",
    Icon: MessageSquare,
  },
  {
    title: "AI builds the setup",
    desc: "A complete configuration is generated for you: audience segmentation, placements, bid strategy, and budget allocation.",
    Icon: Wand2,
  },
  {
    title: "Hit the right audience",
    desc: "Interest, demographic, and lookalike signals are tuned to your objective — no more guessing which categories work.",
    Icon: Target,
  },
  {
    title: "Global ready",
    desc: "Run campaigns across languages and regions with sensible defaults. Geographic and language targeting is configured automatically.",
    Icon: Globe,
  },
  {
    title: "Fast launch",
    desc: "Go from a description to an editable campaign draft in minutes, then publish directly to Meta Ads Manager with one click.",
    Icon: Rocket,
  },
  {
    title: "Safe by default",
    desc: "Built-in policy checks analyze your setup and creative before launch, reducing rejected ads and wasted budget.",
    Icon: ShieldCheck,
  },
];

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
            {features.map(({ title, desc, Icon }) => (
              <div
                key={title}
                className="group border-r border-b border-edge p-6 transition-colors hover:bg-white/2 md:p-8"
              >
                <Icon
                  className="h-5 w-5 text-faint transition-colors duration-300 group-hover:text-accent"
                  strokeWidth={1.75}
                />
                <h3 className="mt-5 font-medium">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
