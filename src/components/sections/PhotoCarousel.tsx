"use client";
import Carousel, { SlideData } from "@/components/ui/carousel";

const slides: SlideData[] = [
  { src: "https://images.pexels.com/photos/274939/pexels-photo-274939.jpeg?auto=compress&cs=tinysrgb&w=1200", title: "Portrait", button: "View", type: "image" },
  { src: "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&w=1200", title: "Product", button: "View", type: "image" },
  { src: "https://images.pexels.com/photos/247599/pexels-photo-247599.jpeg?auto=compress&cs=tinysrgb&w=1200", title: "Lifestyle", button: "View", type: "image" },
];

export default function PhotoCarousel() {
  return (
    <section className="mx-auto max-w-7xl px-6">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold">Photography Showcase</h2>
        <p className="text-neutral-300">A selection of high‑quality sets optimized for the web.</p>
      </div>
      <div className="aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-neutral-900">
        <Carousel slides={slides} />
      </div>
    </section>
  );
}

