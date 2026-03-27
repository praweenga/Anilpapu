import { motion } from "framer-motion";
import VideoPlayer from "@/components/ui/VideoPlayer";

export default function Showreel() {
    return (
        <section className="py-32 px-4 md:px-6 bg-black relative overflow-hidden">
            <div className="container mx-auto max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="relative z-10"
                >
                    <div className="flex flex-col items-center text-center mb-16 space-y-4">
                        <h2 className="text-sm font-medium tracking-[0.2em] text-blue-500 uppercase">
                            Showreel 2025
                        </h2>
                        <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
                            Built with AI. Driven by Creativity.
                        </h3>
                    </div>

                    <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/20 border border-white/10">
                        <VideoPlayer
                            src="/videos/showreel/anil-pappu-showreel.mp4"
                            poster="https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2525&auto=format&fit=crop"
                            className="w-full h-full"
                        />
                    </div>
                </motion.div>
            </div>

            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl max-h-[600px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
        </section>
    );
}
