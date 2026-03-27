"use client";

import { useParams } from "next/navigation";
import { projects } from "@/lib/data";
import VideoPlayer from "@/components/ui/VideoPlayer";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import Image from "next/image";
import SmoothScroll from "@/components/SmoothScroll";

export default function ProjectDetail() {
    const params = useParams();
    const project = projects.find((p) => p.id === params.id);

    if (!project) {
        return <div className="min-h-screen flex items-center justify-center text-white">Project not found</div>;
    }

    const currentIndex = projects.findIndex((p) => p.id === project.id);
    const nextProject = projects[(currentIndex + 1) % projects.length];

    return (
        <SmoothScroll>
            <main className="min-h-screen bg-black text-white">
                {/* Navigation */}
                <nav className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center mix-blend-difference">
                    <Link href="/#work" className="flex items-center gap-2 text-sm font-medium hover:opacity-70 transition-opacity">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Work
                    </Link>
                </nav>

                {/* Hero Video */}
                <section className="relative h-[80vh] w-full mt-20 px-4 md:px-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full h-full rounded-3xl overflow-hidden"
                    >
                        <VideoPlayer
                            src={project.videoUrl}
                            poster={project.thumbnail}
                            className="w-full h-full"
                            autoPlay
                        />
                    </motion.div>
                </section>

                {/* Project Info */}
                <section className="py-24 px-4 md:px-6 container mx-auto max-w-5xl">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="md:col-span-2 space-y-8"
                        >
                            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">{project.title}</h1>
                            <p className="text-xl md:text-2xl text-neutral-400 leading-relaxed font-light">
                                {project.description}
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="space-y-8 pt-4 border-t border-white/10 md:border-t-0"
                        >
                            <div>
                                <h3 className="text-sm text-neutral-500 uppercase tracking-wider mb-2">Client</h3>
                                <p className="text-lg">{project.client}</p>
                            </div>
                            <div>
                                <h3 className="text-sm text-neutral-500 uppercase tracking-wider mb-2">Role</h3>
                                <p className="text-lg">{project.role}</p>
                            </div>
                            <div>
                                <h3 className="text-sm text-neutral-500 uppercase tracking-wider mb-2">Year</h3>
                                <p className="text-lg">{project.year}</p>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* BTS Images */}
                <section className="py-12 px-4 md:px-6 container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                        {project.btsImages.map((img, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className="relative aspect-video rounded-2xl overflow-hidden"
                            >
                                <Image
                                    src={img}
                                    alt="Behind the scenes"
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-700"
                                />
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Next Project */}
                <section className="py-32 px-4 md:px-6 border-t border-white/10 mt-24">
                    <div className="container mx-auto max-w-4xl text-center">
                        <p className="text-sm text-neutral-500 uppercase tracking-wider mb-8">Next Project</p>
                        <Link href={`/work/${nextProject.id}`} className="group inline-block">
                            <h2 className="text-6xl md:text-9xl font-bold tracking-tighter group-hover:text-neutral-400 transition-colors duration-500">
                                {nextProject.title}
                            </h2>
                            <div className="mt-8 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                                <span className="text-xl">View Case Study</span>
                                <ArrowRight className="w-6 h-6" />
                            </div>
                        </Link>
                    </div>
                </section>
            </main>
        </SmoothScroll>
    );
}
