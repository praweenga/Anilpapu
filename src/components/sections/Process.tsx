"use client";
import { motion } from "motion/react";

const steps = [
  { title: "Research / Audit", copy: "We study what works and what to improve—across your podcast, socials and competitors." },
  { title: "Strategy", copy: "Plan the next 90 days with clear outcomes and custom execution systems." },
  { title: "Optimisation & Improve", copy: "Rework social branding—writing, design, voice; optimise titles and copy." },
  { title: "Production", copy: "From ideation to scripts, editing, animation, motion graphics, audio mastering and subtitles." },
  { title: "Feedback & Adjustments", copy: "Review performance, iterate 2–4× per month, unlimited revisions in first month." },
  { title: "Distribution & Engagement", copy: "Intentional multi‑channel posting with active community engagement." },
];


export default function Process() {
  return (
    <section id="process" className="mx-auto max-w-7xl px-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">How We Work</h2>
        <p className="text-neutral-300">Clear steps, predictable outcomes.</p>
      </div>
      <div className="space-y-24">
        {steps.map((s, i) => (
          <div key={i} className="h-[70vh]">
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ amount: 0.6, once: false }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="sticky top-24 rounded-2xl border border-white/10 bg-neutral-900 p-6 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]"
            >
              <div className="text-xs text-neutral-400">Step {String(i + 1).padStart(2, "0")}</div>
              <div className="mt-2 text-lg font-semibold">{s.title}</div>
              <p className="mt-2 text-neutral-300">{s.copy}</p>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}
