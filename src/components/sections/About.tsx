"use client";

import { Aperture, ArrowUpRight, Clapperboard, MonitorPlay, Sparkles, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const services = [
  {
    title: "Editorial direction",
    copy: "Transforming raw footage into structured visual narratives with rhythm, clarity, emotional pacing, and brand-focused storytelling.",
    icon: MonitorPlay,
  },
  {
    title: "Motion Communication",
    copy: "Motion graphics, explainer visuals, title systems, branded animations, and digital-first visual communication assets.",
    icon: Zap,
  },
  {
    title: "Cinematography",
    copy: "Visual framing, lighting, movement, and cinematic coverage for corporate films, events, campaigns, and branded storytelling.",
    icon: Aperture,
  },
  {
    title: "AI-assisted visuals",
    copy: "Leveraging AI-powered workflows to accelerate ideation, visual development, cinematic concepts, and next-generation content production.",
    icon: Sparkles,
  },
];

const process = ["Brief", "Shoot", "Edit", "Grade", "Sound", "Deliver"];

export default function About() {
  return (
    <section className="relative overflow-hidden bg-[#050505] px-5 py-20 text-white md:px-10 md:py-24 lg:px-16" id="about">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.34em] text-white/38">Creative Communication System</p>
            <h2 className="mt-5 max-w-5xl font-display text-4xl leading-[0.98] md:text-5xl lg:text-[4.6rem] lg:leading-[0.92] xl:text-[5.4rem]">
              <span className="lg:block">Crafting visual</span>{" "}
              <span className="lg:block">stories for brands</span>
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-7 text-white/62 md:text-lg md:leading-8 lg:justify-self-end">
            Specialized in cinematic editing, motion-led storytelling, corporate films, AI-assisted visual production, and modern brand communication workflows.
          </p>
        </div>

        <div className="mt-6 flex justify-start lg:justify-end">
          <Link
            href="/works"
            className="inline-flex items-center gap-3 rounded-full border border-white/14 bg-white/[0.035] px-4 py-3 text-xs uppercase tracking-[0.2em] text-white/78 transition hover:border-white/32 hover:bg-white hover:text-black"
          >
            View works
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-[0.78fr_1.22fr]">
          <div className="relative min-h-[430px] overflow-hidden rounded-[1.25rem] border border-white/10 bg-neutral-950 md:min-h-[500px]">
            <Image
              src="/images/editorial/editing-closeup.jpg"
              alt="Close-up of a video editor working on promotional video footage"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover opacity-72"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/10" />
            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
              <div className="max-w-xl rounded-2xl border border-white/12 bg-black/58 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.55)] backdrop-blur-md md:p-6">
                <Clapperboard className="h-7 w-7 text-white/78" />
                <p className="mt-5 font-display text-2xl leading-tight text-white md:text-3xl">
                  From concept and strategy to cinematic execution and final delivery.
                </p>
                <p className="mt-4 max-w-md text-sm leading-6 text-white/72">
                  Built for organizations, brands, leadership teams, and public-facing communication that demand clarity, quality, and visual impact.
                </p>
              </div>
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
