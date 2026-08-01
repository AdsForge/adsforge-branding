"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  analyzeCampaignPrompt,
  type FacebookCampaign,
} from "@/lib/campaignsService";
import PhonePreview, { type AdPlatform } from "./PhonePreview";
import Reveal from "./Reveal";
import { btnPrimary } from "./ui";

/* --------------------------- sample data --------------------------- */

const SAMPLE_CAMPAIGN = {
  name: "Weekend Sneaker Drop",
  adName: "Atelier Sole",
  headline: "Limited pairs. New drops every Friday.",
  primaryText:
    "Hand-finished sneakers released in small batches. Sizes run out fast — see this week's drop before it's gone.",
  description: "Free shipping over $80",
  callToAction: "SHOP_NOW",
  objective: "OUTCOME_CONVERSIONS",
  genders: "MALE",
  ageMin: 21,
  ageMax: 40,
  countries: ["United States"],
  interests: [
    { name: "Sneakers" },
    { name: "Streetwear" },
    { name: "Online shopping" },
  ],
  budget: { value: 50, budgetType: "DAILY" },
  startTime: "2026-08-03",
  endTime: "2026-08-31",
  facebookAdPositions: ["feed", "instagram_stream", "story", "reels"],
} as unknown as FacebookCampaign;

const EXAMPLE_PROMPTS = [
  "Sell more sneakers to men in New York, $50 daily budget",
  "Promote my yoga studio to women 25–45 in London, £20 a day for a month",
  "Get leads for my MMA gym from men 18–35 in Europe, $15/day for 2 weeks",
];

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
    rows.push({
      label: "Budget",
      value:
        c.budget.budgetType === "DAILY"
          ? `$${c.budget.value} / day`
          : `$${c.budget.value} lifetime`,
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
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [campaign, setCampaign] = useState<FacebookCampaign>(SAMPLE_CAMPAIGN);
  const [isSample, setIsSample] = useState(true);
  const [platform, setPlatform] = useState<AdPlatform>("facebook");

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Describe your campaign first");
      return;
    }
    setIsLoading(true);
    try {
      const result = await analyzeCampaignPrompt(prompt);
      setCampaign(result);
      setIsSample(false);
    } catch (error) {
      console.error("Campaign generation error:", error);
      toast.error("Couldn't generate the campaign. Please try again.");
    } finally {
      setIsLoading(false);
    }
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
            Type a brief. Watch it become an ad.
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted">
            This demo calls the real AdsForge engine — no account needed.
            Describe a campaign and see the generated setup, previewed exactly
            as it would appear in the Facebook and Instagram feed.
          </p>
        </Reveal>

        <div className="mt-12 grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_auto]">
          {/* left: composer + spec sheet */}
          <Reveal delay={0.1}>
            <div className="rounded-xl border border-edge-strong bg-surface">
              <label
                htmlFor="demo-prompt"
                className="block border-b border-edge px-5 pt-4 pb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-faint"
              >
                Campaign brief
              </label>
              <textarea
                id="demo-prompt"
                className="block min-h-28 w-full resize-none bg-transparent px-5 py-4 text-sm leading-relaxed outline-none placeholder:text-faint disabled:opacity-50"
                placeholder="Describe your audience, budget, and goal in plain English…"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => {
                  if ((e.metaKey || e.ctrlKey) && e.key === "Enter")
                    handleGenerate();
                }}
                disabled={isLoading}
              />
              <div className="flex flex-wrap items-center gap-2 border-t border-edge px-5 py-4">
                <button
                  type="button"
                  className={btnPrimary}
                  onClick={handleGenerate}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Generating…
                    </>
                  ) : (
                    "Generate campaign"
                  )}
                </button>
                <span className="text-xs text-faint">or try an example:</span>
              </div>
              <div className="flex flex-wrap gap-2 px-5 pb-5">
                {EXAMPLE_PROMPTS.map((example) => (
                  <button
                    key={example}
                    type="button"
                    className="rounded-md border border-edge px-3 py-1.5 text-left text-xs text-muted transition-colors hover:border-edge-strong hover:text-foreground"
                    onClick={() => setPrompt(example)}
                    disabled={isLoading}
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>

            {/* spec sheet */}
            <div className="mt-8">
              <div className="flex items-baseline justify-between">
                <h3 className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
                  Generated setup
                </h3>
                {isSample && (
                  <span className="text-xs text-faint">
                    Example campaign — generate your own above
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
                      transition: { staggerChildren: 0.05 },
                    },
                  }}
                >
                  {spec.map(({ label, value }) => (
                    <motion.div
                      key={label}
                      className="grid grid-cols-[7rem_1fr] gap-4 border-b border-edge py-3 sm:grid-cols-[9rem_1fr]"
                      variants={{
                        hidden: { opacity: 0, y: 6 },
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
                        hidden: { opacity: 0, y: 6 },
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
                In the app, this setup publishes to Meta Ads Manager in one
                click.{" "}
                <a
                  href="https://app.adsforge.io/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-0.5 text-accent underline-offset-4 hover:underline"
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
                      className="absolute inset-0 rounded-md bg-white/7"
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
