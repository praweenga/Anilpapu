"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import VideoPlayer from "@/components/ui/VideoPlayer";
import { projects } from "@/lib/data";

export default function VideoScroll() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

    return (
        <section ref={targetRef} className="relative h-[300vh] bg-black" id="works">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-black/10 z-10 pointer-events-none" />

                <motion.div style={{ x }} className="flex gap-12 px-12 md:px-32 items-center">
                    {/* Title Block */}
                    <div className="flex flex-col justify-center min-w-[400px] md:min-w-[500px] shrink-0 pr-12">
                        <h2 className="text-5xl md:text-7xl font-bold leading-tight text-white">
                            Motion <br />
                            <span className="text-neutral-500">Gallery</span>
                        </h2>
                        <p className="mt-8 text-xl text-neutral-400 max-w-md leading-relaxed">
                            A journey through frames and time. Scroll to explore our cinematic universe.
                        </p>
                    </div>

                    {/* Video Cards */}
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="group relative h-[50vh] w-[80vh] flex-shrink-0 overflow-hidden rounded-3xl bg-neutral-900 border border-white/10 shadow-2xl"
                        >
                            <VideoPlayer
                                src={project.videoUrl}
                                poster={project.thumbnail}
                                className="w-full h-full"
                            />
                            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                                <p className="text-sm text-neutral-400 mt-2">{project.category}</p>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
