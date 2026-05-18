"use client";

import Hls from "hls.js";
import { AnimatePresence, motion } from "framer-motion";
import { Maximize, Minimize, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { VideoAsset } from "@/lib/data";
import { getMuxPlaybackUrl } from "@/lib/mux";
import { cn } from "@/lib/utils";

interface VideoPlayerProps {
  video?: VideoAsset;
  src?: string;
  poster?: string;
  title?: string;
  className?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
  preload?: "none" | "metadata" | "auto";
  variant?: "hero" | "inline" | "preview";
}

export default function VideoPlayer({
  video,
  src,
  poster,
  title = "Portfolio video",
  className,
  autoPlay = false,
  muted = false,
  loop = false,
  controls = true,
  preload = "metadata",
  variant = "inline",
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const muxMonitoredRef = useRef(false);

  const playbackSrc = useMemo(() => {
    if (src) return src;
    if (video?.provider === "mux") return getMuxPlaybackUrl(video);
    return "";
  }, [src, video]);

  const resolvedPoster = poster ?? video?.poster;
  const hasPlayableSource = Boolean(playbackSrc);
  const [isPlaying, setIsPlaying] = useState(autoPlay && hasPlayableSource);
  const [isMuted, setIsMuted] = useState(muted);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(video?.duration ?? 0);
  const [currentTime, setCurrentTime] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(hasPlayableSource);
  const [error, setError] = useState("");

  useEffect(() => {
    const element = videoRef.current;
    if (!element || !playbackSrc) return;

    let hls: Hls | null = null;
    setError("");
    setIsLoading(true);

    if (playbackSrc.endsWith(".m3u8") && Hls.isSupported()) {
      hls = new Hls({ enableWorker: true });
      hls.loadSource(playbackSrc);
      hls.attachMedia(element);
      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (data.fatal) {
          setError("This video could not be loaded.");
          setIsLoading(false);
        }
      });
    } else {
      element.src = playbackSrc;
    }

    return () => {
      hls?.destroy();
      element.removeAttribute("src");
      element.load();
    };
  }, [playbackSrc]);

  useEffect(() => {
    const element = videoRef.current;
    const envKey = process.env.NEXT_PUBLIC_MUX_ENV_KEY;

    if (!element || !video?.playbackId || !envKey || muxMonitoredRef.current) return;
    muxMonitoredRef.current = true;

    import("mux-embed")
      .then((mux) => {
        mux.default.monitor(element, {
          debug: false,
          data: {
            env_key: envKey,
            player_name: "Anil Bonds Portfolio Player",
            player_init_time: Date.now(),
            video_id: video.playbackId,
            video_title: title,
            video_stream_type: "on-demand",
          },
        });
      })
      .catch(() => {
        muxMonitoredRef.current = false;
      });
  }, [title, video?.playbackId]);

  useEffect(() => {
    const element = videoRef.current;
    if (!element || !hasPlayableSource) return;

    const updateProgress = () => {
      const nextDuration = Number.isFinite(element.duration) ? element.duration : duration;
      setCurrentTime(element.currentTime);
      setDuration(nextDuration);
      setProgress(nextDuration ? (element.currentTime / nextDuration) * 100 : 0);
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleLoaded = () => {
      setIsLoading(false);
      updateProgress();
    };
    const handleWaiting = () => setIsLoading(true);
    const handlePlaying = () => setIsLoading(false);
    const handleError = () => {
      setError("This video could not be loaded.");
      setIsLoading(false);
    };

    element.addEventListener("timeupdate", updateProgress);
    element.addEventListener("loadedmetadata", handleLoaded);
    element.addEventListener("play", handlePlay);
    element.addEventListener("pause", handlePause);
    element.addEventListener("waiting", handleWaiting);
    element.addEventListener("playing", handlePlaying);
    element.addEventListener("error", handleError);

    return () => {
      element.removeEventListener("timeupdate", updateProgress);
      element.removeEventListener("loadedmetadata", handleLoaded);
      element.removeEventListener("play", handlePlay);
      element.removeEventListener("pause", handlePause);
      element.removeEventListener("waiting", handleWaiting);
      element.removeEventListener("playing", handlePlaying);
      element.removeEventListener("error", handleError);
    };
  }, [duration, hasPlayableSource]);

  useEffect(() => {
    const element = videoRef.current;
    if (!element || !autoPlay || !hasPlayableSource) return;

    element.play().catch(() => setIsPlaying(false));
  }, [autoPlay, hasPlayableSource]);

  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };
  }, []);

  const togglePlay = () => {
    const element = videoRef.current;
    if (!element || !hasPlayableSource) return;

    if (element.paused) {
      element.play().catch(() => setIsPlaying(false));
    } else {
      element.pause();
    }
  };

  const toggleMute = () => {
    const element = videoRef.current;
    if (!element) return;

    element.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const handleSeek = (event: React.MouseEvent<HTMLDivElement>) => {
    const element = videoRef.current;
    if (!element || !duration) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const percentage = Math.min(Math.max((event.clientX - rect.left) / rect.width, 0), 1);
    element.currentTime = percentage * duration;
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const element = videoRef.current;
    if (!element || !hasPlayableSource) return;

    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      togglePlay();
    }
    if (event.key === "ArrowLeft") element.currentTime = Math.max(element.currentTime - 5, 0);
    if (event.key === "ArrowRight") element.currentTime = Math.min(element.currentTime + 5, duration);
    if (event.key.toLowerCase() === "m") toggleMute();
  };

  const handlePointerMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => setShowControls(false), 2200);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const isPending = !hasPlayableSource;
  const shouldShowControls = controls && !isPending && (showControls || !isPlaying);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative isolate overflow-hidden bg-black text-white",
        video?.aspect === "9:16" ? "aspect-[9/16]" : "aspect-video",
        variant === "hero" ? "rounded-none" : "rounded-2xl",
        className
      )}
      onMouseMove={handlePointerMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label={title}
    >
      {resolvedPoster && (
        <div
          className={cn(
            "absolute inset-0 bg-cover bg-center transition-opacity duration-500",
            hasPlayableSource && isPlaying ? "opacity-0" : "opacity-100"
          )}
          style={{ backgroundImage: `url(${resolvedPoster})` }}
        />
      )}

      {hasPlayableSource && (
        <video
          ref={videoRef}
          className="relative z-10 h-full w-full object-cover"
          poster={resolvedPoster}
          muted={muted}
          loop={loop}
          playsInline
          preload={preload}
          onClick={controls ? togglePlay : undefined}
        >
          {video?.captions && <track kind="captions" src={video.captions} label="English" default />}
        </video>
      )}

      <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/70 via-black/5 to-black/20 pointer-events-none" />

      <AnimatePresence>
        {(isPending || error) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-30 flex items-center justify-center p-6 text-center"
          >
            <div className="max-w-xs rounded-lg border border-white/15 bg-black/70 px-5 py-4 backdrop-blur">
              <p className="text-sm uppercase tracking-[0.28em] text-white/50">
                {error ? "Playback error" : "Mux upload pending"}
              </p>
              <p className="mt-2 text-sm text-white/80">
                {error || "Add a Mux playback ID to activate this film."}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!isPending && !error && (!isPlaying || isLoading) && controls && (
          <motion.button
            type="button"
            aria-label={isPlaying ? "Pause video" : "Play video"}
            onClick={togglePlay}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute left-1/2 top-1/2 z-30 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md"
          >
            {isLoading ? (
              <span className="h-7 w-7 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            ) : (
              <Play className="ml-1 h-8 w-8 fill-white" />
            )}
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {shouldShowControls && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            className="absolute bottom-0 left-0 right-0 z-40 p-4 md:p-6"
          >
            <div className="space-y-4">
              <div
                className="relative h-1.5 cursor-pointer rounded-full bg-white/20"
                onClick={handleSeek}
                role="slider"
                aria-label="Seek video"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(progress)}
              >
                <div className="absolute inset-y-0 left-0 rounded-full bg-white" style={{ width: `${progress}%` }} />
              </div>
              <div className="flex items-center justify-between gap-4 text-white">
                <div className="flex items-center gap-4">
                  <button type="button" onClick={togglePlay} aria-label={isPlaying ? "Pause" : "Play"}>
                    {isPlaying ? <Pause className="h-5 w-5 fill-current" /> : <Play className="h-5 w-5 fill-current" />}
                  </button>
                  <span className="font-mono text-xs text-white/75">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <button type="button" onClick={toggleMute} aria-label={isMuted ? "Unmute" : "Mute"}>
                    {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                  </button>
                  <button type="button" onClick={toggleFullscreen} aria-label={isFullscreen ? "Exit fullscreen" : "Fullscreen"}>
                    {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
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
