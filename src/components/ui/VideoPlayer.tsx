"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize } from "lucide-react";
import { cn } from "@/lib/utils";

interface VideoPlayerProps {
    src: string;
    poster?: string;
    className?: string;
    autoPlay?: boolean;
    muted?: boolean;
    loop?: boolean;
}

export default function VideoPlayer({
    src,
    poster,
    className,
    autoPlay = false,
    muted = false,
    loop = false,
}: VideoPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(autoPlay);
    const [isMuted, setIsMuted] = useState(muted);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [showControls, setShowControls] = useState(true);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        let progressAnimationFrame: number;

        const updateProgress = () => {
            if (video && !isNaN(video.duration)) {
                setProgress((video.currentTime / video.duration) * 100);
                progressAnimationFrame = requestAnimationFrame(updateProgress);
            }
        };

        const updateDuration = () => {
            if (video && !isNaN(video.duration)) {
                setDuration(video.duration);
                // Start progress updates only when duration is available
                progressAnimationFrame = requestAnimationFrame(updateProgress);
            }
        };

        video.addEventListener("loadedmetadata", updateDuration);

        return () => {
            video.removeEventListener("loadedmetadata", updateDuration);
            if (progressAnimationFrame) {
                cancelAnimationFrame(progressAnimationFrame);
            }
        };
    }, []);

    useEffect(() => {
        if (autoPlay && videoRef.current) {
            videoRef.current.play().catch(() => {
                // Autoplay was prevented
                setIsPlaying(false);
            });
        }
    }, [autoPlay]);

    useEffect(() => {
        return () => {
            if (controlsTimeoutRef.current) {
                clearTimeout(controlsTimeoutRef.current);
            }
        };
    }, []);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            videoRef.current?.parentElement?.requestFullscreen();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
        if (videoRef.current) {
            const progressBar = e.currentTarget;
            const rect = progressBar.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const percentage = (x / rect.width) * 100;
            const newTime = (percentage / 100) * videoRef.current.duration;
            videoRef.current.currentTime = newTime;
            setProgress(percentage);
        }
    };

    const handleMouseMove = () => {
        setShowControls(true);
        if (controlsTimeoutRef.current) {
            clearTimeout(controlsTimeoutRef.current);
        }
        if (isPlaying) {
            controlsTimeoutRef.current = setTimeout(() => {
                setShowControls(false);
            }, 2000);
        }
    };

    const handleMouseLeave = () => {
        if (isPlaying) {
            setShowControls(false);
        }
        setIsHovered(false);
        if (controlsTimeoutRef.current) {
            clearTimeout(controlsTimeoutRef.current);
        }
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    return (
        <div
            className={cn(
                "relative group overflow-hidden rounded-2xl bg-black aspect-video",
                className
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <video
                ref={videoRef}
                src={src}
                poster={poster}
                className="w-full h-full object-cover"
                loop={loop}
                muted={muted} // Initial muted state
                playsInline
                onClick={togglePlay}
            />

            {/* Center Play Button (Initial or Paused) */}
            <AnimatePresence>
                {(!isPlaying || (isHovered && !isPlaying)) && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    >
                        <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-2xl">
                            <Play className="w-8 h-8 text-white fill-white ml-1" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Bottom Controls */}
            <AnimatePresence>
                {showControls && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.3 }}
                        className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent"
                    >
                        <div className="flex flex-col gap-4">
                            {/* Progress Bar */}
                            <div
                                className="relative h-1 bg-white/20 rounded-full cursor-pointer group/progress"
                                onClick={handleSeek}
                            >
                                <div
                                    className="absolute top-0 left-0 h-full bg-white rounded-full"
                                    style={{ width: `${progress}%` }}
                                />
                                <div
                                    className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover/progress:opacity-100 transition-opacity"
                                    style={{ left: `${progress}%` }}
                                />
                            </div>

                            {/* Control Buttons */}
                            <div className="flex items-center justify-between text-white">
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={togglePlay}
                                        className="hover:text-white/80 transition-colors"
                                    >
                                        {isPlaying ? (
                                            <Pause className="w-5 h-5 fill-current" />
                                        ) : (
                                            <Play className="w-5 h-5 fill-current" />
                                        )}
                                    </button>
                                    <div className="text-xs font-medium font-mono text-white/80">
                                        {formatTime(videoRef.current?.currentTime || 0)} /{" "}
                                        {formatTime(duration)}
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={toggleMute}
                                        className="hover:text-white/80 transition-colors"
                                    >
                                        {isMuted ? (
                                            <VolumeX className="w-5 h-5" />
                                        ) : (
                                            <Volume2 className="w-5 h-5" />
                                        )}
                                    </button>
                                    <button
                                        onClick={toggleFullscreen}
                                        className="hover:text-white/80 transition-colors"
                                    >
                                        {isFullscreen ? (
                                            <Minimize className="w-5 h-5" />
                                        ) : (
                                            <Maximize className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
