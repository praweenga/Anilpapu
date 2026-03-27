"use client";
import { motion, useAnimation } from "motion/react";
import { useEffect, useState } from "react";

const testimonials = [
  { quote: "Anil elevated our content with crisp edits and clean motion graphics.", author: "Founder, Tech VC" },
  { quote: "Professional, fast, and a pleasure to work with—our reels finally perform.", author: "Head of Content" },
  { quote: "From shoot to delivery, the process was seamless and the output stellar.", author: "CMO, SaaS" },
  { quote: "Attention to detail and timely delivery—highly recommended.", author: "Producer" },
];

export default function Testimonials() {
  const controls = useAnimation();
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!paused) {
      controls.start({ x: ["0%", "-50%"], transition: { repeat: Infinity, duration: 30, ease: "linear" } });
    } else {
      controls.stop();
    }
  }, [paused, controls]);

  const items = [...testimonials, ...testimonials];

  return (
    <section className="mx-auto max-w-7xl px-6">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-semibold">Client Testimonials</h2>
        <p className="text-neutral-300">What partners say about working together.</p>
      </div>
      <div className="relative overflow-hidden">
        <motion.div
          className="flex gap-4"
          animate={controls}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {items.map((t, i) => (
            <div key={i} className="min-w-[280px] rounded-2xl border border-white/10 bg-neutral-900 p-6">
              <p className="text-neutral-200">“{t.quote}”</p>
              <div className="mt-3 text-sm text-neutral-400">{t.author}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
