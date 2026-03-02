"use client";

import { motion } from "framer-motion";
import {
  Globe,
  Target,
  MessageSquare,
  Wand2,
  Rocket,
  ShieldCheck,
} from "lucide-react";

const features = [
  {
    title: "Describe intent",
    desc: "Write your campaign goal in plain English — target audience, budget, objective, and location. AdsForge AI parses your natural language description and maps it to the correct Meta Ads parameters.",
    Icon: MessageSquare,
  },
  {
    title: "AI translates to setup",
    desc: "The AI automation engine generates a complete campaign configuration: audience segmentation, placement selection, bid strategy, and budget allocation — no Ads Manager knowledge required.",
    Icon: Wand2,
  },
  {
    title: "Hit the right audience",
    desc: "AI-powered audience targeting uses interests, demographics, and lookalike signals tuned to your specific objective. Stop guessing which interest categories work — the platform selects them based on your intent.",
    Icon: Target,
  },
  {
    title: "Global ready",
    desc: "Run Meta Ads campaigns across multiple languages and regions with sensible defaults. Describe your target market in plain English and the platform configures the geographic and language targeting automatically.",
    Icon: Globe,
  },
  {
    title: "Fast launch",
    desc: "From natural language description to a fully configured campaign draft in minutes — not hours. Review the AI-generated setup, make any adjustments, and publish directly to Meta Ads Manager with one click.",
    Icon: Rocket,
  },
  {
    title: "Safe by default",
    desc: "Built-in policy compliance guardrails analyze your campaign configuration and creative assets before launch, reducing rejected ads and policy violations that waste time and budget.",
    Icon: ShieldCheck,
  },
];

export default function Features() {
  return (
    <section id="features" className="relative">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Why marketers choose AdsForge AI
          </h2>
          <p className="mt-3 opacity-80 max-w-2xl mx-auto">
            Setting up Meta Ads campaigns manually takes hours of configuring
            audiences, budgets, and placements. AdsForge AI is an AI-powered
            automation platform that eliminates that complexity — describe your
            marketing intent in natural language and get a fully configured,
            editable campaign draft in minutes.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ title, desc, Icon }, idx) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: { delay: idx * 0.05, duration: 0.4 },
              }}
              viewport={{ once: true }}
              whileHover="hover"
              variants={{
                hover: {
                  y: -6,
                  scale: 1.02,
                  transition: { duration: 0.25, ease: "easeInOut" },
                },
              }}
              whileTap={{ scale: 0.995 }}
              className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-5 cursor-pointer transition-colors group transform-gpu hover:shadow-lg hover:shadow-fuchsia-500/10"
            >
              {/* Gradient BG on hover - Synced via Motion */}
              <motion.div
                variants={{
                  hover: { opacity: 1 },
                }}
                initial={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-fuchsia-500/10 to-amber-500/10"
              />

              {/* Border Gradient - Synced via Motion */}
              <motion.div
                variants={{
                  hover: { opacity: 1 },
                }}
                initial={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                aria-hidden
                className="absolute inset-0 rounded-xl ring-1 ring-inset ring-fuchsia-400/20"
              />

              <div className="relative z-10">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-white/10 p-2 text-white/80 ring-1 ring-inset ring-white/10 transition-colors duration-300 group-hover:bg-fuchsia-400/20 group-hover:text-fuchsia-200 group-hover:ring-fuchsia-400/30">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-medium text-white group-hover:text-white transition-colors">
                    {title}
                  </h3>
                </div>
                <p className="mt-3 text-sm opacity-80 group-hover:opacity-90 transition-opacity">
                  {desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
