"use client";

import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/data";

export default function ShortsSlider() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 text-white">
      <div className="mb-6">
        <h2 className="text-3xl font-semibold">Short-form cuts</h2>
        <p className="mt-2 text-white/55">Vertical edits and campaign-ready social extracts from the main portfolio.</p>
      </div>
      <div className="flex snap-x gap-4 overflow-x-auto pb-2">
        {projects.slice(0, 4).map((project) => (
          <Link
            key={project.id}
            href={`/work/${project.id}`}
            className="relative aspect-[9/16] w-[280px] shrink-0 snap-start overflow-hidden rounded-lg border border-white/10 bg-neutral-900"
          >
            <Image src={project.video.previewPoster ?? project.video.poster} alt={project.title} fill sizes="280px" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-white/45">{project.category}</p>
              <h3 className="mt-2 text-xl font-semibold">{project.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
