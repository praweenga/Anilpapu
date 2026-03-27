"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { projects, Project } from "@/lib/data";

export default function Work() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = window.innerWidth * 0.8; // Scroll by 80% of viewport width
            const newScrollLeft = direction === 'left'
                ? scrollContainerRef.current.scrollLeft - scrollAmount
                : scrollContainerRef.current.scrollLeft + scrollAmount;

            scrollContainerRef.current.scrollTo({
                left: newScrollLeft,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className="py-32 bg-black overflow-hidden" id="work">
            <div className="container mx-auto px-4 md:px-6 mb-12 flex flex-col md:flex-row justify-between items-end">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-white">
                        Selected Work
                    </h2>
                </motion.div>

                <div className="flex items-center gap-4 mt-8 md:mt-0">
                    <button
                        onClick={() => scroll('left')}
                        className="p-3 rounded-full border border-white/10 hover:bg-white hover:text-black transition-colors text-white"
                        aria-label="Scroll left"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        className="p-3 rounded-full border border-white/10 hover:bg-white hover:text-black transition-colors text-white"
                        aria-label="Scroll right"
                    >
                        <ArrowRight className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {/* Horizontal Scroll Container for Reels */}
            <div
                ref={scrollContainerRef}
                className="flex overflow-x-auto gap-6 px-12 md:px-32 pb-12 snap-x snap-mandatory scrollbar-hide scroll-smooth"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {projects.map((project, index) => (
                    <ProjectCard key={project.id} project={project} index={index} />
                ))}
                {/* Spacer */}
                <div className="w-4 md:w-12 flex-shrink-0" />
            </div>
        </section>
    );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
    const [isHovered, setIsHovered] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const handleMouseEnter = () => {
        setIsHovered(true);
        videoRef.current?.play().catch(() => { });
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    };

    return (
        <Link href={`/work/${project.id}`} className="flex-shrink-0 snap-center">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative w-[80vw] md:w-[25vw] aspect-[9/16] overflow-hidden rounded-2xl bg-neutral-900 cursor-none"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {/* Thumbnail Image */}
                <Image
                    src={project.thumbnail}
                    alt={project.title}
                    fill
                    className={`object-cover transition-opacity duration-500 ${isHovered ? "opacity-0" : "opacity-100"}`}
                />

                {/* Hover Video Preview */}
                <video
                    ref={videoRef}
                    src={project.videoUrl}
                    muted
                    loop
                    playsInline
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isHovered ? "opacity-100" : "opacity-0"}`}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <div className="absolute top-6 right-6">
                        <div className="h-10 w-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-y-4 group-hover:translate-y-0">
                            <ArrowUpRight className="h-5 w-5" />
                        </div>
                    </div>

                    <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                        <p className="text-xs font-medium text-blue-400 mb-2 uppercase tracking-wider">{project.category}</p>
                        <h3 className="text-2xl font-bold text-white leading-tight">{project.title}</h3>
                        <p className="text-sm text-neutral-400 mt-2 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                            {project.description}
                        </p>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}
