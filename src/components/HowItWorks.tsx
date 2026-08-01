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
];

export default function HowItWorks() {
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

        <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {steps.map(({ num, title, desc }, idx) => (
            <Reveal key={num} delay={idx * 0.08}>
              <div className="border-t border-edge-strong pt-6">
                <span className="font-mono text-sm text-accent">{num}</span>
                <h3 className="mt-4 text-lg font-medium">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
