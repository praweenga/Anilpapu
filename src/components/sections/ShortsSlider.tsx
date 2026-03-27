"use client";
import ReactPlayer from "react-player";

const shorts = [
  { url: "https://www.youtube.com/watch?v=aqz-KE-bpKQ" },
  { url: "https://vimeo.com/76979871" },
  { url: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4" },
];

export default function ShortsSlider() {
  return (
    <section className="mx-auto max-w-7xl px-6">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold">Shorts to Widen Your Distribution</h2>
        <p className="text-neutral-300">Concise clips crafted for discovery, distributed across platforms.</p>
      </div>
      <div className="flex snap-x gap-4 overflow-x-auto pb-2">
        {shorts.map((s, i) => (
          <div key={i} className="snap-start shrink-0 w-[280px] md:w-[340px] aspect-[9/16] rounded-2xl border border-white/10 bg-neutral-900">
            {(() => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const ReactPlayerAny = ReactPlayer as any;
              return (
                <ReactPlayerAny url={s.url} width="100%" height="100%" controls muted playing={false} light
                  style={{ borderRadius: 16, overflow: "hidden" }}
                />
              );
            })()}
          </div>
        ))}
      </div>
    </section>
  );
}
