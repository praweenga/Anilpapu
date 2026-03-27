"use client";

import SmoothScroll from "@/components/SmoothScroll";
import Hero from "@/components/sections/Hero";
import Showreel from "@/components/sections/Showreel";
import VideoScroll from "@/components/sections/VideoScroll";
import PosterGallery from "@/components/sections/PosterGallery";
import About from "@/components/sections/About";
import ContactCTA from "@/components/sections/ContactCTA";

export default function Home() {
  return (
    <SmoothScroll>
      <main className="flex min-h-screen flex-col bg-background text-foreground">
        <Hero />
        <Showreel />
        <VideoScroll />
        <PosterGallery />
        <About />
        <ContactCTA />
      </main>
    </SmoothScroll>
  );
}
