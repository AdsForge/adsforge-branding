"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { trackEvent } from "@/lib/analytics";
import {
  CURRENCY_SYMBOLS,
  DEMO_EXAMPLES,
  type DemoCreative,
  type DemoExample,
  type FacebookCampaign,
  generateDemoCampaign,
  SAMPLE_CAMPAIGN,
} from "@/lib/campaignsService";
import PhonePreview, { type AdPlatform } from "./PhonePreview";
import Reveal from "./Reveal";

/* --------------------------- formatting ---------------------------- */

const OBJECTIVE_LABELS: Record<string, string> = {
  OUTCOME_ENGAGEMENT: "Engagement",
  OUTCOME_TRAFFIC: "Traffic",
  OUTCOME_CONVERSIONS: "Conversions",
  OUTCOME_LEADS: "Leads",
  OUTCOME_AWARENESS: "Awareness",
  OUTCOME_SALES: "Sales",
};

const GENDER_LABELS: Record<string, string> = {
  ALL: "All genders",
  MALE: "Men",
  FEMALE: "Women",
};

const PLACEMENT_LABELS: Record<string, string> = {
  feed: "Facebook Feed",
  instagram_stream: "Instagram Feed",
  story: "Stories",
  instagram_story: "Stories",
  reels: "Reels",
  instagram_reels: "Reels",
  marketplace: "Marketplace",
  video_feeds: "Video Feeds",
  right_hand_column: "Right column",
  instagram_explore: "Explore",
  messenger_inbox: "Messenger",
};

function prettify(value: string): string {
  const words = value
    .toLowerCase()
    .split(/[_\s]+/)
    .join(" ");
  return words.charAt(0).toUpperCase() + words.slice(1);
}

function formatDate(value?: string): string | null {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

function buildSpec(c: FacebookCampaign) {
  const rows: { label: string; value: string }[] = [];

  rows.push({
    label: "Objective",
    value: OBJECTIVE_LABELS[c.objective] ?? prettify(c.objective ?? "—"),
  });

  const gender = GENDER_LABELS[c.genders] ?? prettify(c.genders ?? "All");
  const age = c.ageMin && c.ageMax ? `${c.ageMin}–${c.ageMax}` : null;
  rows.push({
    label: "Audience",
    value: age ? `${gender}, ${age}` : gender,
  });

  if (c.countries?.length) {
    rows.push({ label: "Locations", value: c.countries.join(", ") });
  }

  if (c.budget?.value) {
    const symbol = CURRENCY_SYMBOLS[c.currency] ?? "$";
    rows.push({
      label: "Budget",
      value:
        c.budget.budgetType === "DAILY"
          ? `${symbol}${c.budget.value} / day`
          : `${symbol}${c.budget.value} lifetime`,
    });
  }

  const start = formatDate(c.startTime);
  const end = formatDate(c.endTime);
  if (start && end) {
    const days = Math.max(
      1,
      Math.round(
        (new Date(c.endTime).getTime() - new Date(c.startTime).getTime()) /
          86_400_000,
      ),
    );
    rows.push({ label: "Schedule", value: `${start} → ${end} · ${days} days` });
  }

  if (c.facebookAdPositions?.length) {
    const placements = [
      ...new Set(
        c.facebookAdPositions.map((p) => PLACEMENT_LABELS[p] ?? prettify(p)),
      ),
    ];
    rows.push({ label: "Placements", value: placements.join(", ") });
  }

  return rows;
}

/* ----------------------------- section ----------------------------- */

export default function LiveDemo() {
  const reduceMotion = useReducedMotion();
  const [selectedId, setSelectedId] = useState<DemoCreative>(
    DEMO_EXAMPLES[0].id,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [campaign, setCampaign] = useState<FacebookCampaign>(SAMPLE_CAMPAIGN);
  const [isSample, setIsSample] = useState(true);
  const [platform, setPlatform] = useState<AdPlatform>("facebook");

  const selected =
    DEMO_EXAMPLES.find((e) => e.id === selectedId) ?? DEMO_EXAMPLES[0];

  const handleSelect = async (example: DemoExample) => {
    if (isLoading) return;
    setSelectedId(example.id);
    setIsLoading(true);
    trackEvent("demo_generate", { example: example.id });
    const result = await generateDemoCampaign(example.id);
    setCampaign(result);
    setIsSample(false);
    setIsLoading(false);
  };

  const spec = buildSpec(campaign);
  const interests =
    campaign.interests?.map((i) => i.name).filter(Boolean) ?? [];

  return (
    <section id="live-demo" className="border-b border-edge">
      <div className="mx-auto max-w-6xl px-4 py-20 md:py-28">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
            Live demo
          </p>
          <h2 className="mt-3 max-w-xl text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            Pick a brief. Watch it become an ad.
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted">
            An interactive preview of how AdsForge works — no account needed.
            Choose one of the sample briefs and watch a complete campaign setup
            take shape, previewed exactly as it would appear in the Facebook and
            Instagram feed.
          </p>
        </Reveal>

        <div className="mt-12 grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_auto]">
          {/* left: composer + spec sheet */}
          <Reveal delay={0.1}>
            <div className="rounded-xl border border-edge-strong bg-surface">
              <div className="flex items-baseline justify-between border-b border-edge px-5 pt-4 pb-3">
                <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-faint">
                  Campaign brief
                </p>
                <p className="font-mono text-[11px] text-faint">
                  {isLoading ? "analyzing…" : "ready"}
                </p>
              </div>
              {isLoading && (
                <div className="relative h-px w-full overflow-hidden bg-edge">
                  {reduceMotion ? (
                    <div className="absolute inset-0 bg-accent" />
                  ) : (
                    <motion.div
                      className="absolute inset-y-0 left-0 h-px w-1/3 bg-accent"
                      animate={{ x: ["-100%", "400%"] }}
                      transition={{
                        duration: 1.1,
                        ease: "linear",
                        repeat: Infinity,
                      }}
                    />
                  )}
                </div>
              )}
              {/* the selected brief, rendered like a typed prompt */}
              <div className="min-h-20 px-5 py-4">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.p
                    key={selected.id}
                    className="font-mono text-sm leading-relaxed text-foreground"
                    initial={reduceMotion ? false : { opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {selected.prompt}
                    <span className="caret" aria-hidden />
                  </motion.p>
                </AnimatePresence>
              </div>
              <div className="border-t border-edge px-5 py-4">
                <p className="text-xs text-faint">
                  Pick a brief — the campaign generates instantly:
                </p>
                <div className="mt-3 flex flex-col gap-2">
                  {DEMO_EXAMPLES.map((example, i) => {
                    const active = example.id === selectedId && !isSample;
                    return (
                      <button
                        key={example.id}
                        type="button"
                        aria-pressed={active}
                        className={`flex items-baseline gap-3 rounded-md border px-3 py-2 text-left text-xs transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
                          active
                            ? "border-accent/60 text-foreground"
                            : "border-edge text-muted hover:border-edge-strong hover:text-foreground"
                        }`}
                        onClick={() => handleSelect(example)}
                        disabled={isLoading}
                      >
                        <span
                          className={`font-mono text-[10px] ${
                            active ? "text-accent" : "text-faint"
                          }`}
                        >
                          0{i + 1}
                        </span>
                        {example.prompt}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* spec sheet */}
            <div className="mt-8">
              <div className="flex items-baseline justify-between">
                <h3 className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
                  Generated setup
                </h3>
                {isSample ? (
                  <span className="text-xs text-faint">
                    Example campaign — pick a brief above
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2">
                    <span
                      className="relative flex h-1.5 w-1.5"
                      aria-hidden="true"
                    >
                      {!reduceMotion && (
                        <motion.span
                          key={`${campaign.name}-${campaign.headline}`}
                          className="absolute inset-0 rounded-full bg-accent"
                          initial={{ scale: 1, opacity: 0.7 }}
                          animate={{ scale: 2.6, opacity: 0 }}
                          transition={{ duration: 1.2, ease: "easeOut" }}
                        />
                      )}
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    </span>
                    <span className="font-mono text-[11px] text-muted">
                      Generated just now
                    </span>
                  </span>
                )}
              </div>
              <AnimatePresence mode="wait" initial={false}>
                <motion.dl
                  key={`${campaign.name}-${campaign.headline}`}
                  className="mt-4 border-t border-edge"
                  initial={reduceMotion ? false : "hidden"}
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: { staggerChildren: 0.09 },
                    },
                  }}
                >
                  {spec.map(({ label, value }) => (
                    <motion.div
                      key={label}
                      className="grid grid-cols-[7rem_1fr] gap-4 border-b border-edge py-3 sm:grid-cols-[9rem_1fr]"
                      variants={{
                        hidden: { opacity: 0, y: 8 },
                        visible: { opacity: 1, y: 0 },
                      }}
                    >
                      <dt className="text-sm text-faint">{label}</dt>
                      <dd className="font-mono text-sm">{value}</dd>
                    </motion.div>
                  ))}
                  {interests.length > 0 && (
                    <motion.div
                      className="grid grid-cols-[7rem_1fr] gap-4 border-b border-edge py-3 sm:grid-cols-[9rem_1fr]"
                      variants={{
                        hidden: { opacity: 0, y: 8 },
                        visible: { opacity: 1, y: 0 },
                      }}
                    >
                      <dt className="text-sm text-faint">Interests</dt>
                      <dd className="flex flex-wrap gap-1.5">
                        {interests.map((name) => (
                          <span
                            key={name}
                            className="rounded-md border border-edge px-2 py-0.5 font-mono text-xs text-muted"
                          >
                            {name}
                          </span>
                        ))}
                      </dd>
                    </motion.div>
                  )}
                </motion.dl>
              </AnimatePresence>
              <p className="mt-4 text-xs text-faint">
                Sample output for illustration — in the app, the AI engine
                builds your real campaign and publishes it to Meta Ads Manager
                in one click.{" "}
                <a
                  href="https://app.adsforge.io/login"
                  className="inline-flex items-center gap-0.5 text-accent underline-offset-4 hover:underline"
                  onClick={() =>
                    trackEvent("cta_click", {
                      cta: "try_with_account",
                      location: "live_demo",
                    })
                  }
                >
                  Try it with your account
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </p>
            </div>
          </Reveal>

          {/* right: platform toggle + phone */}
          <Reveal
            delay={0.18}
            className="justify-self-center lg:sticky lg:top-24"
          >
            <div
              className="mx-auto mb-5 flex w-fit rounded-lg border border-edge-strong p-1"
              role="tablist"
              aria-label="Ad preview platform"
            >
              {(["facebook", "instagram"] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  role="tab"
                  aria-selected={platform === p}
                  className={`relative rounded-md px-4 py-1.5 text-sm transition-colors ${
                    platform === p
                      ? "text-foreground"
                      : "text-faint hover:text-muted"
                  }`}
                  onClick={() => setPlatform(p)}
                >
                  {platform === p && (
                    <motion.span
                      layoutId="platform-pill"
                      className="absolute inset-0 rounded-md bg-foreground/8"
                      transition={
                        reduceMotion
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 400, damping: 32 }
                      }
                    />
                  )}
                  <span className="relative capitalize">{p}</span>
                </button>
              ))}
            </div>
            <PhonePreview
              campaign={campaign}
              platform={platform}
              dimmed={isLoading}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
