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
    desc: "Use natural language to express audience, budget, goals and languages.",
    Icon: MessageSquare,
  },
  {
    title: "AI translates to setup",
    desc: "We generate audience targeting, placements, and optimization rules.",
    Icon: Wand2,
  },
  {
    title: "Hit the right audience",
    desc: "Smart segmentation and lookalikes tuned to your objective.",
    Icon: Target,
  },
  {
    title: "Global ready",
    desc: "Multi-language, multi-region support with sensible defaults.",
    Icon: Globe,
  },
  {
    title: "Fast launch",
    desc: "From idea to campaign draft in minutes – not hours.",
    Icon: Rocket,
  },
  {
    title: "Safe by default",
    desc: "Guardrails reduce policy violations and rejected ads.",
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
            How AdsForge AI helps
          </h2>
          <p className="mt-3 opacity-80 max-w-2xl mx-auto">
            Skip the manual configuration. Describe your intent; get a full,
            editable campaign draft.
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
