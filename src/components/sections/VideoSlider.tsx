"use client";

import Carousel, { SlideData } from "@/components/ui/carousel";
import { projects } from "@/lib/data";

const slides: SlideData[] = projects.slice(0, 3).map((project) => ({
  src: project.video.poster,
  title: project.title,
  button: project.category,
  type: "image",
}));

export default function VideoSlider() {
  return (
    <section className="overflow-hidden bg-black py-16 text-white">
      <Carousel slides={slides} />
    </section>
  );
}
