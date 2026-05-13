"use client";

import { Aperture, Clapperboard, MonitorPlay, Sparkles, Zap } from "lucide-react";
import Image from "next/image";

const services = [
  {
    title: "Editorial direction",
    copy: "Turning raw footage into a paced story with clean structure, emotional timing, and purposeful sound.",
    icon: MonitorPlay,
  },
  {
    title: "Motion identity",
    copy: "Title design, logo stories, explainer motion, product visuals, and graphic systems for campaigns.",
    icon: Zap,
  },
  {
    title: "Cinematography",
    copy: "Frame, light, movement, and coverage for events, portraits, products, and cultural work.",
    icon: Aperture,
  },
  {
    title: "AI-assisted visuals",
    copy: "Using AI to explore treatments, accelerate options, and extend visual imagination with human direction.",
    icon: Sparkles,
  },
];

const process = ["Brief", "Shoot", "Edit", "Grade", "Sound", "Deliver"];

export default function About() {
  return (
    <section className="relative overflow-hidden bg-[#050505] px-5 py-20 text-white md:px-10 md:py-24 lg:px-16" id="about">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.34em] text-white/38">Visual storytelling refined</p>
            <h2 className="mt-5 max-w-4xl font-display text-4xl leading-[1] md:text-5xl lg:text-6xl">
              Film craft for stories that need polish and pulse.
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-7 text-white/62 md:text-lg md:leading-8">
            Anil works across editing, motion design, cinematography, and AI-assisted visual creation. The focus is simple:
            make every film clear, cinematic, emotionally readable, and ready to publish.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-[0.78fr_1.22fr]">
          <div className="relative min-h-[430px] overflow-hidden rounded-[1.25rem] border border-white/10 bg-neutral-950 md:min-h-[500px]">
            <Image src="/images/portfolio/varnam-1.jpg" alt="Portfolio work frame" fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover opacity-72" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <Clapperboard className="h-7 w-7 text-white/70" />
              <p className="mt-5 font-display text-2xl leading-tight md:text-3xl">From first brief to final export.</p>
              <p className="mt-4 max-w-md text-sm leading-6 text-white/58">
                Built for brands, founders, artists, and institutions that need video work with a finished editorial point of view.
              </p>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {services.map((service) => (
              <div
                key={service.title}
                className="rounded-lg border border-white/10 bg-white/[0.035] p-6 transition hover:border-white/28 hover:bg-white/[0.07]"
              >
                <service.icon className="h-6 w-6 text-white/55" />
                <h3 className="mt-6 font-display text-xl md:text-2xl">{service.title}</h3>
                <p className="mt-4 text-sm leading-6 text-white/52">{service.copy}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-2 md:grid-cols-6">
          {process.map((step, index) => (
            <div key={step} className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-3 text-center text-xs uppercase tracking-[0.2em] text-white/48">
              {String(index + 1).padStart(2, "0")} {step}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
