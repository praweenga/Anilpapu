"use client";

import { ArrowUpRight, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/data";

export default function VideoScroll() {
  return (
    <section id="works" className="bg-black px-5 py-28 text-white md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.34em] text-white/38">Selected work</p>
            <h2 className="mt-5 max-w-4xl font-display text-4xl leading-[0.95] md:text-6xl lg:text-7xl">Brand & Motion Showcase</h2>
          </div>
        </div>

        <div className="space-y-4">
          {projects.map((project, index) => (
            <Link key={project.id} href={`/work/${project.id}`} className="group block">
              <article className="relative min-h-[440px] overflow-hidden rounded-[1.25rem] border border-white/10 bg-neutral-950 transition-colors duration-300 hover:border-white/28 md:min-h-[520px]">
                <Image
                  src={project.video.poster}
                  alt={project.title}
                  fill
                  sizes="100vw"
                  className="object-cover opacity-48 transition duration-500 group-hover:scale-[1.02] group-hover:opacity-62"
                  priority={index < 2}
                />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.92)_0%,rgba(0,0,0,0.62)_42%,rgba(0,0,0,0.2)_100%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(255,255,255,0.12),transparent_28%)]" />

                <div className="relative z-10 flex min-h-[440px] flex-col justify-between p-6 md:min-h-[520px] md:p-10 lg:p-12">
                  <div className="flex items-start justify-between gap-8">
                    <span className="font-mono text-6xl text-white/18 md:text-8xl">{String(index + 1).padStart(2, "0")}</span>
                    <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-white text-black transition group-hover:scale-110">
                      <ArrowUpRight className="h-6 w-6" />
                    </span>
                  </div>

                  <div className="grid gap-10 lg:grid-cols-[0.9fr_0.7fr] lg:items-end">
                    <div>
                      <p className="text-sm uppercase tracking-[0.28em] text-white/45">{project.category}</p>
                      <h3 className="mt-4 max-w-3xl font-display text-4xl leading-none md:text-6xl">{project.title}</h3>
                    </div>
                    <div>
                      <p className="max-w-xl text-base leading-7 text-white/68">{project.description}</p>
                      <div className="mt-8 flex flex-wrap gap-3 text-xs uppercase tracking-[0.18em] text-white/42">
                        <span>{project.client}</span>
                        <span>/</span>
                        <span>{project.role}</span>
                        <span>/</span>
                    <span>{project.year}</span>
                  </div>
                  <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-white/16 bg-black/35 px-4 py-2 text-xs uppercase tracking-[0.18em] text-white/75 backdrop-blur">
                        <Play className="h-3.5 w-3.5 fill-white" />
                        Watch film
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
