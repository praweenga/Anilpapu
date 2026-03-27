"use client";
import Carousel, { SlideData } from "@/components/ui/carousel";
import { useEffect, useRef, useState } from "react";

const slides: SlideData[] = [
  { src: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4", poster: "/posters/sample1.svg", title: "Trailer — Sample", button: "View", type: "player" },
  { src: "https://www.youtube.com/watch?v=aqz-KE-bpKQ", title: "YouTube — Sample", button: "View", type: "player" },
  { src: "https://vimeo.com/76979871", title: "Vimeo — Sample", button: "View", type: "player" },
];

export default function VideoSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      setInView(entries.some((e) => e.isIntersecting));
    }, { threshold: 0.6 });
    if (containerRef.current) io.observe(containerRef.current);
    return () => io.disconnect();
  }, []);

  return (
    <section id="works" className="mx-auto max-w-7xl px-6">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold">Trailers That Sell the Episodes</h2>
        <p className="text-neutral-300">Context‑setting trailers that invite listeners to hit play.</p>
      </div>
      <div ref={containerRef} className="aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-neutral-900">
        <Carousel slides={slides} inView={inView} />
      </div>
    </section>
  );
}

