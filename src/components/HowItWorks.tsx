"use client"

import { motion } from "framer-motion"
import { MessageSquareText, ImageUp, Rocket } from "lucide-react"

const steps = [
  {
    num: "01",
    title: "Describe your campaign goal",
    desc: "Tell AdsForge AI what you want to achieve using everyday language. Whether you're looking to drive online sales, generate leads for your service business, or build brand awareness in a new market — just type it out. For example: \"I want to promote my yoga studio to women aged 25–45 in London with a £20 daily budget.\" The AI understands objectives, audiences, locations, budgets, and languages automatically.",
    Icon: MessageSquareText,
  },
  {
    num: "02",
    title: "Upload your creative assets",
    desc: "Add the images or videos you want to run as ads. AdsForge AI analyzes your creative to suggest optimal placements across Facebook and Instagram — Feed, Stories, Reels, and more. It also evaluates visual composition and ad copy alignment to flag potential issues before you spend a single dollar on impressions.",
    Icon: ImageUp,
  },
  {
    num: "03",
    title: "Review, refine, and launch",
    desc: "AdsForge generates a complete campaign structure: audience targeting, placement selection, bid strategy, budget allocation, and scheduling. Review everything in a clear summary, make adjustments if needed, and publish directly to Meta Ads Manager with one click. No more switching between tabs, guessing at targeting options, or worrying about policy violations.",
    Icon: Rocket,
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            How AdsForge AI works
          </h2>
          <p className="mt-3 opacity-80 max-w-2xl mx-auto">
            Go from marketing idea to live Meta Ads campaign in three simple
            steps. No advertising expertise required — the AI handles the
            technical complexity so you can focus on growing your business.
          </p>
        </motion.div>

        <div className="mt-14 space-y-8">
          {steps.map(({ num, title, desc, Icon }, idx) => (
            <motion.div
              key={num}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="group relative grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 rounded-xl border border-white/10 bg-white/5 p-6 md:p-8 transition-colors hover:border-white/20 hover:bg-white/[0.07]"
            >
              <div className="flex items-start gap-4 md:w-48 shrink-0">
                <span className="text-3xl font-bold bg-gradient-to-br from-cyan-400 to-fuchsia-400 bg-clip-text text-transparent">
                  {num}
                </span>
                <div className="rounded-lg bg-white/10 p-2.5 ring-1 ring-inset ring-white/10 transition-colors group-hover:bg-fuchsia-400/20 group-hover:ring-fuchsia-400/30">
                  <Icon className="h-5 w-5 opacity-80 group-hover:text-fuchsia-200" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium">{title}</h3>
                <p className="mt-2 text-sm opacity-80 leading-relaxed">
                  {desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
