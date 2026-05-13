"use client";

import { Play } from "lucide-react";
import VideoPlayer from "@/components/ui/VideoPlayer";
import { showreel } from "@/lib/data";

export default function Showreel() {
  return (
    <section id="showreel" className="relative overflow-hidden bg-black px-5 py-20 text-white md:px-10 md:py-24 lg:px-16">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 max-w-5xl">
          <div>
            <p className="text-sm uppercase tracking-[0.34em] text-white/40">Showreel 2025</p>
            <h2 className="mt-4 max-w-4xl text-5xl font-semibold leading-[0.96] md:text-6xl lg:text-7xl">
              One reel. The full range.
            </h2>
          </div>
          <div className="mt-6 flex max-w-2xl items-center gap-4 text-white/58">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/20 bg-white/5">
              <Play className="ml-1 h-4 w-4 fill-white text-white" />
            </span>
            <p className="text-sm leading-6">
              A single high-signal cut across editing, motion design, product films, event coverage, and AI-assisted visuals.
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 rounded-[2rem] border border-white/5" />
          <div className="overflow-hidden rounded-[1.5rem] border border-white/15 bg-neutral-950 shadow-[0_40px_160px_rgba(0,0,0,0.7)]">
            <VideoPlayer video={showreel} title="Showreel 2025" poster={showreel.poster} preload="metadata" />
          </div>
          <div className="mt-5 grid gap-3 text-xs uppercase tracking-[0.22em] text-white/45 md:grid-cols-4">
            <span className="border-t border-white/10 pt-4">Editing</span>
            <span className="border-t border-white/10 pt-4">Motion</span>
            <span className="border-t border-white/10 pt-4">Cinematography</span>
            <span className="border-t border-white/10 pt-4">AI visuals</span>
          </div>
        </div>
      </div>
    </section>
  );
}
