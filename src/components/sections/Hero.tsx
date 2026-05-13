"use client";

import { ArrowDownRight } from "lucide-react";
import Link from "next/link";
import VideoPlayer from "@/components/ui/VideoPlayer";
import { heroVideo } from "@/lib/data";

export default function Hero() {
  return (
    <section id="home" className="relative min-h-[92vh] overflow-hidden bg-black text-white">
      <div className="absolute inset-0">
        <VideoPlayer
          video={heroVideo}
          title="Anil Pappu showreel"
          autoPlay
          muted
          loop
          controls={false}
          preload="auto"
          variant="hero"
          className="h-full w-full"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.34),rgba(0,0,0,0.64)_58%,#000_100%)]" />
      </div>

      <div className="relative z-10 flex min-h-[92vh] flex-col justify-end px-5 pb-20 pt-28 md:px-10 lg:px-16">
        <div className="max-w-6xl">
          <p className="mb-5 text-sm uppercase tracking-[0.32em] text-white/55">Video production / motion / visual direction</p>
          <h1 className="max-w-5xl text-6xl font-semibold leading-[0.95] md:text-8xl lg:text-[8.5rem]">
            Anil Pappu
          </h1>
          <div className="mt-8 flex max-w-3xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <p className="text-lg leading-7 text-white/70 md:text-xl">
              Cinematic edits, motion-led stories, and polished visual systems for films, brands, products, and public events.
            </p>
            <Link
              href="#works"
              className="inline-flex w-fit items-center gap-3 rounded-full border border-white/25 px-5 py-3 text-sm uppercase tracking-[0.18em] text-white transition hover:border-white hover:bg-white hover:text-black"
            >
              View work
              <ArrowDownRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
