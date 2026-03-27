"use client";
import { motion } from "motion/react";

const services = [
  {
    title: "End‑to‑End Videography",
    copy: "Concept → pre‑production → filming → editing → color → sound → delivery. Polished, cinematic storytelling tailored to brand goals.",
  },
  {
    title: "Photography",
    copy: "Portraits, product, events and lifestyle sets—lighting, composition and post to elevate your visual identity.",
  },
  {
    title: "Distribution & Social",
    copy: "Shorts and carousels crafted for discovery across YouTube, Instagram, LinkedIn and X—optimized titles and thumbnails.",
  },
];

export default function ServicesCards() {
  return (
    <section id="services" className="mx-auto max-w-7xl px-6">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-semibold">What I Offer</h2>
        <p className="text-neutral-300">Professional videography and photography services designed for impact.</p>
      </div>
      <div className="space-y-4">
        {services.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="rounded-2xl border border-white/10 bg-neutral-900 p-6"
          >
            <h3 className="text-lg font-semibold">{s.title}</h3>
            <p className="mt-2 text-neutral-300">{s.copy}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

