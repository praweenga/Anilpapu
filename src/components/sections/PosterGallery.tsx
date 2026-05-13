"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowLeft, ArrowRight, X, ZoomIn } from "lucide-react";

const posters = [
    {
        id: 1,
        src: "/images/portfolio/varnam-1.jpg",
        title: "Varnam",
        category: "Art Direction",
    },
    {
        id: 2,
        src: "/images/portfolio/varnam-2.jpg",
        title: "Varnam II",
        category: "Visual Design",
    },
    {
        id: 3,
        src: "/images/portfolio/margam.jpg",
        title: "Margam",
        category: "Photography",
    },
    {
        id: 4,
        src: "/images/portfolio/chinna-mushirvada.jpg",
        title: "Chinna Mushirvada",
        category: "Portrait",
    },
    {
        id: 5,
        src: "/images/portfolio/version-3.jpg",
        title: "Version III",
        category: "Digital Art",
    },
    {
        id: 6,
        src: "/images/portfolio/social-media-post.jpg",
        title: "Social Media",
        category: "Digital Design",
    },
    {
        id: 7,
        src: "/images/banners/promotional-banner.jpg",
        title: "Promotional Banner",
        category: "Marketing",
    },
];

export default function PosterGallery() {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const selectedPoster = selectedIndex === null ? null : posters[selectedIndex];

    const showNext = () => setSelectedIndex((current) => (current === null ? 0 : (current + 1) % posters.length));
    const showPrevious = () => setSelectedIndex((current) => (current === null ? posters.length - 1 : (current - 1 + posters.length) % posters.length));

    return (
        <section className="bg-black px-5 py-16 text-white md:px-10 md:py-20 lg:px-16" id="posters">
            <div className="mx-auto max-w-7xl">
                <div className="mb-10 grid gap-5 md:grid-cols-[0.8fr_1.2fr] md:items-end">
                    <div>
                        <p className="text-xs uppercase tracking-[0.34em] text-white/38 md:text-sm">Design archive</p>
                        <h2 className="mt-4 font-display text-4xl leading-none md:text-5xl lg:text-6xl">Visual Arts</h2>
                    </div>
                    <p className="max-w-2xl text-sm leading-6 text-white/58 md:text-base md:leading-7">
                        A compact archive of posters, campaign visuals, and polished design explorations.
                    </p>
                </div>

                <div className="no-scrollbar -mx-5 flex snap-x gap-4 overflow-x-auto px-5 pb-8 md:-mx-10 md:px-10 lg:-mx-16 lg:px-16">
                    {posters.map((poster, index) => (
                        <button
                            type="button"
                            key={poster.id}
                            className={`group relative h-[280px] shrink-0 snap-center overflow-hidden rounded-[1rem] border border-white/10 bg-neutral-900 text-left transition-colors duration-300 hover:border-white/30 md:h-[320px] ${
                                index === 0 ? "w-[min(82vw,520px)]" : "w-[min(72vw,360px)]"
                            }`}
                            onClick={() => setSelectedIndex(index)}
                        >
                            <Image
                                src={poster.src}
                                alt={poster.title}
                                fill
                                sizes="(max-width: 768px) 82vw, 420px"
                                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/18 to-transparent opacity-75" />
                            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4">
                                <div>
                                    <p className="text-[0.65rem] uppercase tracking-[0.22em] text-white/50">{poster.category}</p>
                                    <h3 className="mt-1 font-display text-lg leading-tight text-white md:text-xl">{poster.title}</h3>
                                </div>
                                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/15 bg-black/35 text-white/70 opacity-0 backdrop-blur transition group-hover:opacity-100">
                                    <ZoomIn className="h-4 w-4" />
                                </span>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedPoster && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-12"
                        onClick={() => setSelectedIndex(null)}
                    >
                        <button
                            className="absolute right-5 top-5 z-20 grid h-12 w-12 place-items-center rounded-full border border-white/10 bg-black/45 text-white/60 backdrop-blur transition hover:bg-white hover:text-black md:right-8 md:top-8"
                            onClick={() => setSelectedIndex(null)}
                            aria-label="Close visual arts preview"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative grid h-[86vh] w-full max-w-6xl overflow-hidden rounded-[1.25rem] border border-white/10 bg-[#111] shadow-2xl md:grid-cols-[minmax(0,1fr)_340px]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative min-h-0 bg-black">
                                <Image
                                    src={selectedPoster.src}
                                    alt={selectedPoster.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 70vw"
                                    className="object-contain"
                                />
                            </div>
                            <div className="flex flex-col justify-between border-t border-white/10 bg-white/[0.035] p-6 md:border-l md:border-t-0 md:p-8">
                                <div>
                                    <p className="text-sm uppercase tracking-[0.26em] text-white/40">{selectedPoster.category}</p>
                                    <h3 className="mt-4 text-4xl font-semibold leading-tight text-white">{selectedPoster.title}</h3>
                                    <p className="mt-6 text-base leading-7 text-white/55">
                                        A finished visual asset from the portfolio archive, presented at full attention instead of as a small grid thumbnail.
                                    </p>
                                </div>
                                <div className="mt-8 flex items-center justify-between">
                                    <span className="font-mono text-sm text-white/35">
                                        {String((selectedIndex ?? 0) + 1).padStart(2, "0")} / {String(posters.length).padStart(2, "0")}
                                    </span>
                                    <div className="flex gap-2">
                                        <button
                                            type="button"
                                            onClick={showPrevious}
                                            className="grid h-11 w-11 place-items-center rounded-full border border-white/10 text-white/65 transition hover:bg-white hover:text-black"
                                            aria-label="Previous visual"
                                        >
                                            <ArrowLeft className="h-4 w-4" />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={showNext}
                                            className="grid h-11 w-11 place-items-center rounded-full border border-white/10 text-white/65 transition hover:bg-white hover:text-black"
                                            aria-label="Next visual"
                                        >
                                            <ArrowRight className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
