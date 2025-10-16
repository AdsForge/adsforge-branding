"use client";

import { ReactNode, useState } from "react";
import { motion } from "framer-motion";
import { Settings2, Users, DollarSign, Target, FileText } from "lucide-react";

export default function LiveDemo() {
  const [prompt, setPrompt] = useState("");

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
                className="mt-1 w-full min-h-40 rounded-lg bg-white/10 px-3 py-2 text-sm outline-none ring-1 ring-inset ring-white/20 transition-colors focus:bg-white/15 focus:ring-white/40"
                placeholder="Example: Create a Meta ad for my MMA gym targeting men aged 18–35 in Europe, budget $15/day for 2 weeks, objective is lead generation"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <motion.button
                className="inline-flex items-center cursor-pointer gap-2 rounded-lg bg-blue-600 text-white px-4 py-2 text-sm shadow-sm shadow-blue-600/30 hover:bg-blue-500 focus:outline-none"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Settings2 className="h-4 w-4" /> Generate Campaign
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

            <motion.div
              className="mt-4 space-y-3"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 1 },
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
                Men, 18–35, Europe
              </PreviewCard>
              <PreviewCard
                title="Budget & Duration"
                icon={<DollarSign className="h-4 w-4" />}
              >
                $15/day for 14 days
              </PreviewCard>
              <PreviewCard
                title="Campaign Objective"
                icon={<Target className="h-4 w-4" />}
              >
                Lead Generation
              </PreviewCard>
              <PreviewCard
                title="Ad Copy"
                icon={<FileText className="h-4 w-4" />}
              >
                {prompt.trim() ||
                  '"Transform your life with MMA training. Join our elite gym today!"'}
              </PreviewCard>
            </motion.div>
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
