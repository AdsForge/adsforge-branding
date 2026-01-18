"use client";

import { ReactNode, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Settings2,
  Users,
  DollarSign,
  Target,
  FileText,
  Loader2,
} from "lucide-react";

import { toast } from "sonner";
import {
  analyzeCampaignPrompt,
  FacebookCampaign,
} from "@/lib/campaignsService";

export default function LiveDemo() {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [campaign, setCampaign] = useState<FacebookCampaign | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a campaign description");
      return;
    }

    setIsLoading(true);

    try {
      const result = await analyzeCampaignPrompt(prompt);
      setCampaign(result);
      toast.success("Campaign generated successfully!");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to generate campaign";
      toast.error(errorMessage);
      console.error("Campaign generation error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatAudienceTargeting = () => {
    if (!campaign) return "Not generated yet";

    const genderText =
      campaign.genders === "ALL" ? "All genders" : campaign.genders;
    const ageText = `${campaign.ageMin}–${campaign.ageMax}`;
    const locationText = campaign.countries.join(", ") || "All countries";

    return `${genderText}, ${ageText}, ${locationText}`;
  };

  const formatBudgetDuration = () => {
    if (!campaign) return "Not generated yet";

    const budgetType =
      campaign.budget.budgetType === "DAILY" ? "day" : "lifetime";
    const startDate = new Date(campaign.startTime).toLocaleDateString();
    const endDate = new Date(campaign.endTime).toLocaleDateString();
    const days = Math.ceil(
      (new Date(campaign.endTime).getTime() -
        new Date(campaign.startTime).getTime()) /
        (1000 * 60 * 60 * 24),
    );

    return `$${campaign.budget.value}/${budgetType} for ${days} days (${startDate} - ${endDate})`;
  };

  const formatObjective = () => {
    if (!campaign) return "Not generated yet";

    const objectiveMap: Record<string, string> = {
      OUTCOME_ENGAGEMENT: "Engagement",
      OUTCOME_TRAFFIC: "Traffic",
      OUTCOME_CONVERSIONS: "Conversions",
    };

    return objectiveMap[campaign.objective] || campaign.objective;
  };

  const formatAdCopy = () => {
    if (!campaign)
      return (
        prompt.trim() ||
        '"Transform your life with MMA training. Join our elite gym today!"'
      );

    return (
      campaign.primaryText ||
      campaign.headline ||
      campaign.description ||
      "No ad copy generated"
    );
  };

  return (
    <section id="live-demo" className="relative">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-indigo-500/10 blur-3xl" />
      </div>
      <div className="mx-auto max-w-6xl px-4 py-20">
        <motion.div
          className="grid gap-6 lg:grid-cols-2 items-start"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <Settings2 className="h-5 w-5" /> Describe Your Campaign
            </h3>
            <div className="mt-4 space-y-4">
              <textarea
                className="mt-1 w-full min-h-40 rounded-lg bg-white/10 px-3 py-2 text-sm outline-none ring-1 ring-inset ring-white/20 transition-colors focus:bg-white/15 focus:ring-white/40 disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Example: Create a Meta ad for my MMA gym targeting men aged 18–35 in Europe, budget $15/day for 2 weeks, objective is lead generation"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                disabled={isLoading}
              />
              <motion.button
                className={`group relative isolate inline-flex items-center justify-center gap-2 overflow-hidden rounded-lg px-4 py-2 text-sm font-medium transition-transform focus:outline-none ${
                  isLoading
                    ? "bg-white/10 text-white/60 cursor-not-allowed"
                    : "bg-white text-black shadow-lg hover:scale-[1.02] active:scale-[0.98] hover:shadow-cyan-500/25"
                }`}
                onClick={handleGenerate}
                disabled={isLoading}
              >
                {!isLoading && (
                  <span className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-br from-cyan-400 via-fuchsia-400 to-amber-300 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100" />
                )}
                <span
                  className={`relative z-10 flex items-center gap-2 transition-colors duration-300 ${!isLoading ? "group-hover:text-white" : ""}`}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Settings2 className="h-4 w-4" /> Generate Campaign
                    </>
                  )}
                </span>
              </motion.button>
            </div>
          </div>

          <motion.div
            className="rounded-2xl border border-white/10 bg-white/5 p-5 relative overflow-hidden"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            <h3 className="text-lg font-medium">Generated Campaign</h3>
            <p className="text-xs opacity-70 mt-1">
              AI-optimized settings ready to launch
            </p>

            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 flex flex-col items-center justify-center py-12"
                >
                  <Loader2 className="h-12 w-12 animate-spin text-blue-400" />
                  <p className="mt-4 text-sm opacity-70">
                    Analyzing your campaign...
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="content"
                  className="mt-4 space-y-3"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: { staggerChildren: 0.08 },
                    },
                  }}
                >
                  <PreviewCard
                    title="Audience Targeting"
                    icon={<Users className="h-4 w-4" />}
                  >
                    {formatAudienceTargeting()}
                  </PreviewCard>
                  <PreviewCard
                    title="Budget & Duration"
                    icon={<DollarSign className="h-4 w-4" />}
                  >
                    {formatBudgetDuration()}
                  </PreviewCard>
                  <PreviewCard
                    title="Campaign Objective"
                    icon={<Target className="h-4 w-4" />}
                  >
                    {formatObjective()}
                  </PreviewCard>
                  <PreviewCard
                    title="Ad Copy"
                    icon={<FileText className="h-4 w-4" />}
                  >
                    {formatAdCopy()}
                  </PreviewCard>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function PreviewCard({
  title,
  icon,
  children,
}: {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <motion.div
      className="group rounded-xl border border-white/10 bg-white/5 p-4"
      variants={{ hidden: { opacity: 0, y: 6 }, visible: { opacity: 1, y: 0 } }}
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
    >
      <div className="flex items-center gap-2 text-blue-400 font-medium">
        {icon} {title}
      </div>
      <div className="mt-2 text-sm opacity-90 transition-colors group-hover:opacity-100">
        {children}
      </div>
    </motion.div>
  );
}
