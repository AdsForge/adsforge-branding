"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import Reveal from "./Reveal";

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
    a: "AdsForge AI is available now and you can sign in to start building campaigns right away. New accounts can be created directly from the login page — no credit card required to get started. Paid plans unlock higher usage limits and advanced automation features as your campaigns scale.",
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
];

export default function Faq() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();

  return (
    <section id="faq" className="border-b border-edge">
      <div className="mx-auto max-w-3xl px-4 py-20 md:py-28">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
            FAQ
          </p>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            Frequently asked questions
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12 border-t border-edge">
            {faqs.map(({ q, a }, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div key={q} className="border-b border-edge">
                  <button
                    type="button"
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${idx}`}
                  >
                    <span className="text-[15px] font-medium">{q}</span>
                    <Plus
                      className={`h-4 w-4 shrink-0 text-faint transition-transform duration-200 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.section
                        id={`faq-panel-${idx}`}
                        initial={
                          reduceMotion ? false : { height: 0, opacity: 0 }
                        }
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="pr-10 pb-5 text-sm leading-relaxed text-muted">
                          {a}
                        </p>
                      </motion.section>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
