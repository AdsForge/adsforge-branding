"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    q: "What is AdsForge AI?",
    a: "AdsForge AI is an intelligent automation platform that lets you create and launch Meta Ads — covering both Facebook and Instagram — by describing your goals in plain English. Instead of manually configuring campaigns in Ads Manager, you tell the AI what you want to achieve and it generates the full campaign setup: audience targeting, budget allocation, placements, bid strategy, and optimization rules.",
  },
  {
    q: "How does AdsForge AI create ad campaigns from text?",
    a: "You describe your marketing intent in natural language — for example, your target audience, daily budget, campaign objective, and preferred locations. AdsForge AI uses large language models to parse that intent and translate it into a complete Meta Ads campaign configuration. This includes audience segmentation with interests and demographics, placement selection across Feed, Stories, and Reels, and an appropriate bid strategy aligned with your objective.",
  },
  {
    q: "Do I need Meta Ads experience to use AdsForge AI?",
    a: "Not at all. AdsForge AI is designed for everyone — from small business owners running their first ad to experienced marketing professionals looking to save time. The AI handles the technical complexity of campaign setup, including audience research, placement optimization, and policy compliance checks, so you can focus on your business goals rather than learning the intricacies of Ads Manager.",
  },
  {
    q: "Is AdsForge AI free to use?",
    a: "AdsForge AI is currently in early access. You can join the waitlist for free to get notified as soon as the platform launches and secure priority access with special founder pricing. There is no credit card required to sign up for the waitlist.",
  },
  {
    q: "What platforms does AdsForge AI support?",
    a: "AdsForge AI currently supports Meta Ads, which includes both Facebook and Instagram advertising. You can run campaigns across multiple placements including Feed, Stories, Reels, Audience Network, and Messenger. Multi-language and multi-region campaigns are supported with sensible defaults, making it easy to reach audiences worldwide.",
  },
  {
    q: "How is AdsForge AI different from Meta's built-in AI features?",
    a: "While Meta offers tools like Advantage+ for automated campaign optimization, AdsForge AI focuses on the entire campaign creation workflow — from intent to launch. You don't need to understand campaign structures, ad set configurations, or targeting options. AdsForge translates your business goals directly into a ready-to-publish campaign, whereas Meta's native tools still require you to navigate Ads Manager and make configuration decisions.",
  },
  {
    q: "Is my data secure with AdsForge AI?",
    a: "Yes. AdsForge AI follows strict data handling practices and never shares your information with third parties. Your campaign data and creative assets are processed securely and are only used to generate your campaigns. You can review our full privacy policy for detailed information on how we protect your data.",
  },
]

export default function Faq() {
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  return (
    <section id="faq" className="relative">
      <div className="mx-auto max-w-3xl px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Frequently asked questions
          </h2>
          <p className="mt-3 opacity-80 max-w-xl mx-auto">
            Everything you need to know about AdsForge AI and how it can help
            you launch better Meta Ads campaigns faster.
          </p>
        </motion.div>

        <div className="mt-12 space-y-3">
          {faqs.map(({ q, a }, idx) => {
            const isOpen = openIdx === idx

            return (
              <motion.div
                key={q}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.04, duration: 0.4 }}
                className="rounded-xl border border-white/10 bg-white/5 transition-colors hover:border-white/20"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-medium">{q}</span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 opacity-60 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-4 text-sm opacity-70 leading-relaxed">
                        {a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
