"use client";

import { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Clapperboard, Aperture, MonitorPlay, Zap } from "lucide-react";

const services = [
    {
        id: "audio-video-editing",
        title: "Audio/Video Editing",
        definition: "The Craft",
        description: "Precision editing that transforms raw footage into compelling narratives. Every cut, transition, and sound choice serves the story's emotional arc.",
        icon: MonitorPlay,
    },
    {
        id: "graphics-motion-design",
        title: "Graphics & Motion Design",
        definition: "The Visuals",
        description: "Creating dynamic graphics and animations that bring stories to life. From title sequences to visual effects, every element is designed to engage and inspire.",
        icon: Zap,
    },
    {
        id: "ai-video-creation",
        title: "AI-Based Video Creation",
        definition: "The Future",
        description: "Leveraging artificial intelligence as a creative partner to generate innovative visual experiences faster and smarter, pushing creative boundaries without limits.",
        icon: Clapperboard,
    },
    {
        id: "cinematography",
        title: "Cinematography",
        definition: "The Lens",
        description: "Capturing compelling visuals through expert camera work and lighting. Every frame is composed to create mood, atmosphere, and visual impact.",
        icon: Aperture,
    },
];

export default function About() {
    const [activeService, setActiveService] = useState<typeof services[0] | null>(null);

    // 3D Tilt Logic
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;

        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        setActiveService(null);
    };

    return (
        <section className="py-32 bg-neutral-950 text-white overflow-hidden" id="about">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left Side: Interactive Perspective Card */}
                    <div
                        className="relative h-[500px] w-full flex items-center justify-center perspective-1000"
                        style={{ perspective: "1000px" }}
                    >
                        <motion.div
                            ref={ref}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                            style={{
                                rotateX,
                                rotateY,
                                transformStyle: "preserve-3d",
                            }}
                            className="relative w-full max-w-md aspect-[3/4] bg-neutral-900 rounded-3xl border border-white/10 shadow-2xl overflow-hidden cursor-none"
                        >
                            {/* Default State: Manifesto */}
                            <motion.div
                                animate={{ opacity: activeService ? 0 : 1, z: activeService ? -50 : 0 }}
                                transition={{ duration: 0.4 }}
                                className="absolute inset-0 p-12 flex flex-col justify-center items-center text-center bg-gradient-to-br from-neutral-900 to-black"
                                style={{ transform: "translateZ(20px)" }}
                            >
                                <div className="w-20 h-20 mb-8 rounded-full border border-white/20 flex items-center justify-center">
                                    <span className="text-3xl font-bold">AP</span>
                                </div>
                                <h3 className="text-2xl font-bold mb-4">Built with AI. Driven by Creativity.</h3>
                                <p className="text-neutral-400 leading-relaxed">
                                    &quot;I use AI as a creative partner to transform ideas into engaging visual experiences - Faster, Smarter, and without limits.&quot;
                                </p>
                            </motion.div>

                            {/* Active State: Service Details */}
                            {services.map((service) => (
                                <motion.div
                                    key={service.id}
                                    initial={{ opacity: 0 }}
                                    animate={{
                                        opacity: activeService?.id === service.id ? 1 : 0,
                                        z: activeService?.id === service.id ? 20 : -50
                                    }}
                                    transition={{ duration: 0.4 }}
                                    className="absolute inset-0 p-12 flex flex-col justify-center bg-neutral-800 text-white pointer-events-none"
                                    style={{ transform: "translateZ(50px)" }}
                                >
                                    <service.icon className="w-12 h-12 mb-6 text-white/80" />
                                    <p className="text-sm uppercase tracking-widest opacity-50 mb-2">{service.definition}</p>
                                    <h3 className="text-3xl font-bold mb-6">{service.title}</h3>
                                    <p className="text-lg leading-relaxed opacity-80 text-neutral-300">
                                        {service.description}
                                    </p>
                                </motion.div>
                            ))}

                            {/* Shine Effect */}
                            <div
                                className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 pointer-events-none"
                                style={{ transform: "translateZ(1px)" }}
                            />
                        </motion.div>
                    </div>

                    {/* Right Side: Content & Grid */}
                    <div className="space-y-12">
                        <div>
                            <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
                                Visual Storytelling. <br />
                                <span className="text-neutral-500">Refined.</span>
                            </h2>
                            <p className="text-xl text-neutral-400 leading-relaxed max-w-lg">
                                For me, it's never just about editing a video—it's about bringing a story to life. I focus on creating visuals that carry emotion, meaning, and a lasting impact.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <p className="text-sm text-neutral-500 uppercase tracking-wider mb-2">Skills</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {services.map((service) => (
                                    <motion.div
                                        key={service.id}
                                        className="group relative flex flex-col p-6 rounded-xl bg-neutral-900/50 border border-white/5 hover:bg-neutral-800 hover:border-white/10 transition-all cursor-pointer h-full"
                                        onMouseEnter={() => setActiveService(service)}
                                    // onMouseLeave is handled by the container
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <service.icon className="w-6 h-6 text-neutral-500 group-hover:text-white transition-colors" />
                                            <ArrowRight className="w-4 h-4 text-neutral-600 group-hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-300" />
                                        </div>
                                        <span className="text-lg font-medium text-neutral-300 group-hover:text-white transition-colors">
                                            {service.title}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
