/*
  Demo campaign engine — fully client-side.

  The landing-page demo intentionally does NOT call the production AI
  endpoint: visitors pick one of the predefined briefs below, and the
  matching predefined campaign "generates" after a simulated delay.
  Deterministic, offline-safe, free.
*/

export type CurrencyCode = "USD" | "GBP" | "EUR";

/* Identifies which illustrated ad creative the phone preview renders. */
export type DemoCreative = "sneakers" | "yoga" | "mma";

export interface CampaignInterest {
  name: string;
}

export interface CampaignBudget {
  value: number;
  budgetType: "DAILY" | "LIFETIME";
}

export interface FacebookCampaign {
  name: string;
  adName: string;
  headline: string;
  primaryText: string;
  description?: string;
  callToAction: string;
  objective: string;
  genders: "ALL" | "MALE" | "FEMALE";
  ageMin: number;
  ageMax: number;
  countries: string[];
  interests: CampaignInterest[];
  budget: CampaignBudget;
  currency: CurrencyCode;
  startTime: string;
  endTime: string;
  facebookAdPositions: string[];
  creative?: DemoCreative;
}

export const CURRENCY_SYMBOLS: Record<CurrencyCode, string> = {
  USD: "$",
  GBP: "£",
  EUR: "€",
};

const ALL_PLACEMENTS = ["feed", "instagram_stream", "story", "reels"];

/* --------------------------- date helpers --------------------------- */

function isoDate(date: Date): string {
  // Local date parts — toISOString() converts to UTC and can shift the
  // calendar day for visitors east of Greenwich.
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function schedule(durationDays: number): {
  startTime: string;
  endTime: string;
} {
  const start = new Date();
  start.setDate(start.getDate() + 1); // campaigns start tomorrow
  const end = new Date(start);
  end.setDate(end.getDate() + durationDays);
  return { startTime: isoDate(start), endTime: isoDate(end) };
}

/* ----------------------------- examples ----------------------------- */

export interface DemoExample {
  id: DemoCreative;
  prompt: string;
  durationDays: number;
  campaign: Omit<FacebookCampaign, "startTime" | "endTime">;
}

export const DEMO_EXAMPLES: DemoExample[] = [
  {
    id: "sneakers",
    prompt: "Sell more sneakers to men in New York, $50 daily budget",
    durationDays: 28,
    campaign: {
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
      countries: ["New York"],
      interests: [
        { name: "Sneakers" },
        { name: "Streetwear" },
        { name: "Online shopping" },
      ],
      budget: { value: 50, budgetType: "DAILY" },
      currency: "USD",
      facebookAdPositions: ALL_PLACEMENTS,
      creative: "sneakers",
    },
  },
  {
    id: "yoga",
    prompt:
      "Promote my yoga studio to women 25–45 in London, £20 a day for a month",
    durationDays: 30,
    campaign: {
      name: "New Member Intro Offer",
      adName: "Studio Flow",
      headline: "Your first week of classes, free.",
      primaryText:
        "Small classes, experienced teachers, and a calm space in the heart of the city. Book your intro week and find your practice.",
      description: "Intro week — book online",
      callToAction: "BOOK_NOW",
      objective: "OUTCOME_TRAFFIC",
      genders: "FEMALE",
      ageMin: 25,
      ageMax: 45,
      countries: ["London"],
      interests: [{ name: "Yoga" }, { name: "Wellness" }, { name: "Fitness" }],
      budget: { value: 20, budgetType: "DAILY" },
      currency: "GBP",
      facebookAdPositions: ALL_PLACEMENTS,
      creative: "yoga",
    },
  },
  {
    id: "mma",
    prompt:
      "Get leads for my MMA gym from men 18–35 in Europe, $15/day for 2 weeks",
    durationDays: 14,
    campaign: {
      name: "Free Trial Class Leads",
      adName: "Iron Cage MMA",
      headline: "First session free. No experience needed.",
      primaryText:
        "Learn striking and grappling from certified coaches. Claim a free trial class and see if you last the round.",
      description: "Free trial — limited spots",
      callToAction: "SIGN_UP",
      objective: "OUTCOME_LEADS",
      genders: "MALE",
      ageMin: 18,
      ageMax: 35,
      countries: ["Europe"],
      interests: [
        { name: "MMA" },
        { name: "Fitness" },
        { name: "Combat sports" },
      ],
      budget: { value: 15, budgetType: "DAILY" },
      currency: "USD",
      facebookAdPositions: ALL_PLACEMENTS,
      creative: "mma",
    },
  },
];

function materialize(example: DemoExample): FacebookCampaign {
  return {
    ...example.campaign,
    interests: [...example.campaign.interests],
    countries: [...example.campaign.countries],
    budget: { ...example.campaign.budget },
    facebookAdPositions: [...example.campaign.facebookAdPositions],
    ...schedule(example.durationDays),
  };
}

/* The campaign shown before the visitor generates their own. */
export const SAMPLE_CAMPAIGN: FacebookCampaign = materialize(DEMO_EXAMPLES[0]);

/* --------------------------- generation ----------------------------- */

/*
  Staged latency so the demo reads as "thinking" — long enough to feel
  real, short enough not to bore anyone.
*/
const MIN_DELAY_MS = 1400;
const DELAY_JITTER_MS = 900;

export const generateDemoCampaign = (
  id: DemoCreative,
): Promise<FacebookCampaign> => {
  const example = DEMO_EXAMPLES.find((e) => e.id === id) ?? DEMO_EXAMPLES[0];
  const campaign = materialize(example);
  const delay = MIN_DELAY_MS + Math.random() * DELAY_JITTER_MS;
  return new Promise((resolve) => {
    setTimeout(() => resolve(campaign), delay);
  });
};
