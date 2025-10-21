// Interest type for the campaign
export interface CampaignInterest {
  name: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

// Budget type for the campaign
export interface CampaignBudget {
  value: number;
  budgetType: "DAILY" | "LIFETIME";
  _id: string;
  createdAt: string;
  updatedAt: string;
}

// Main campaign type based on your JSON structure
export interface FacebookCampaign {
  _id: string;
  optimizationGoal:
    | "OFFSITE_CONVERSIONS"
    | "LINK_CLICKS"
    | "IMPRESSIONS"
    | "REACH"
    | string;
  billingEvent: "IMPRESSIONS" | "CLICKS" | "CONVERSIONS" | string;
  facebookAdPositions: string[];
  objective:
    | "OUTCOME_ENGAGEMENT"
    | "OUTCOME_TRAFFIC"
    | "OUTCOME_CONVERSIONS"
    | string;
  type: "SPOTIFY_CAMPAIGN" | "FACEBOOK_CAMPAIGN" | string;
  status: "PAUSED" | "ACTIVE" | "DRAFT" | "COMPLETED" | string;
  genders: "ALL" | "MALE" | "FEMALE" | string;
  countries: string[];
  userMusicGenre: string[];
  user: string;
  interests: CampaignInterest[];
  createdAt: string;
  updatedAt: string;
  __v: number;

  // Campaign content fields
  adName: string;
  adSetName: string;
  ageMax: number;
  ageMin: number;
  budget: CampaignBudget;
  callToAction: string;
  description: string;
  endTime: string;
  headline: string;
  language: string;
  name: string;
  primaryText: string;
  secondDescription: string;
  secondHeadline: string;
  secondPrimaryText: string;
  startTime: string;
  targetLocationType: "LOCAL" | "GLOBAL" | string;
}

export const analyzeCampaignPrompt = async (
  aiPrompt: string
): Promise<FacebookCampaign> => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
  const res = await fetch(`https://api.adsforge.io/ai/analyze-campaign`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ aiPrompt }),
  });

  if (!res.ok) {
    throw new Error("Failed to analyze campaign prompt");
  }

  const data = await res.json();
  return data;
};
