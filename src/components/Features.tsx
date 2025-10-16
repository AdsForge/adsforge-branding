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
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05, duration: 0.4 }}
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.995 }}
              className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-5 cursor-pointer  hover:bg-white/10 transition group transform-gpu"
            >
              {/* Glow */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-xl bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.25),transparent_45%)] opacity-0 group-hover:opacity-10 transition duration-300"
              />
              {/* Sheen sweep */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-y-0 left-[-60%] w-[60%] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:translate-x-[260%] transition duration-700 ease-out skew-x-[-12deg]"
              />

              <div className="relative z-10">
                <div className="flex items-center gap-3">
                  <span className="rounded-lg bg-white/10 p-2 ring-1 ring-inset ring-white/20 transition-transform duration-300 group-hover:-translate-y-0.5">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-medium">{title}</h3>
                </div>
                <p className="mt-3 text-sm opacity-80">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
