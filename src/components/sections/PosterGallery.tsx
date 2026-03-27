"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";

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
    const [selectedPoster, setSelectedPoster] = useState<typeof posters[0] | null>(null);

    return (
        <section className="py-32 bg-black text-white" id="posters">
            <div className="container mx-auto px-4 md:px-6">
                <div className="mb-16 flex flex-col md:flex-row justify-between items-end">
                    <div>
                        <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">Visual Arts</h2>
                        <p className="text-neutral-400">A curation of posters and visual explorations.</p>
                    </div>
                </div>

                {/* Small Grid Layout */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {posters.map((poster, index) => (
                        <motion.div
                            key={poster.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className="group relative aspect-[2/3] cursor-pointer overflow-hidden rounded-lg bg-neutral-900"
                            onClick={() => setSelectedPoster(poster)}
                        >
                            <Image
                                src={poster.src}
                                alt={poster.title}
                                fill
                                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                <ZoomIn className="w-8 h-8 text-white" />
                            </div>
                        </motion.div>
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
                        onClick={() => setSelectedPoster(null)}
                    >
                        <button
                            className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
                            onClick={() => setSelectedPoster(null)}
                        >
                            <X className="w-8 h-8" />
                        </button>

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative w-full max-w-4xl h-[80vh] rounded-lg overflow-hidden shadow-2xl flex flex-col md:flex-row bg-neutral-900"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative w-full md:w-2/3 h-2/3 md:h-full">
                                <Image
                                    src={selectedPoster.src}
                                    alt={selectedPoster.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="w-full md:w-1/3 p-8 flex flex-col justify-center bg-neutral-900">
                                <p className="text-sm text-blue-400 uppercase tracking-wider mb-2">{selectedPoster.category}</p>
                                <h3 className="text-3xl font-bold text-white mb-4">{selectedPoster.title}</h3>
                                <p className="text-neutral-400 leading-relaxed">
                                    A visual exploration of {selectedPoster.title.toLowerCase()}, capturing the essence of the subject through a unique lens.
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
