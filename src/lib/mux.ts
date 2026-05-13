import type { VideoAsset } from "@/lib/data";

const MUX_VIDEO_BASE = "https://stream.mux.com";
const MUX_IMAGE_BASE = "https://image.mux.com";

export function getMuxPlaybackUrl(video: VideoAsset) {
  if (!video.playbackId) return "";
  return `${MUX_VIDEO_BASE}/${video.playbackId}.m3u8`;
}

export function getMuxPosterUrl(video: VideoAsset, options?: { time?: number; width?: number }) {
  if (!video.playbackId) return video.poster;

  const params = new URLSearchParams();
  if (options?.time !== undefined) params.set("time", String(options.time));
  if (options?.width !== undefined) params.set("width", String(options.width));

  const query = params.toString();
  return `${MUX_IMAGE_BASE}/${video.playbackId}/thumbnail.jpg${query ? `?${query}` : ""}`;
}

export function getMuxThumbnailUrl(playbackId: string, options?: { time?: number; width?: number }) {
  const params = new URLSearchParams();
  params.set("time", String(options?.time ?? 2));
  params.set("width", String(options?.width ?? 1600));
  return `${MUX_IMAGE_BASE}/${playbackId}/thumbnail.jpg?${params.toString()}`;
}

export function getMuxStoryboardUrl(video: VideoAsset) {
  if (!video.playbackId) return "";
  return `${MUX_IMAGE_BASE}/${video.playbackId}/storyboard.vtt`;
}

export function buildVideoSnippet(video: {
  playbackId: string;
  assetId?: string;
  poster?: string;
  aspect?: "16:9" | "9:16";
  duration?: number;
}) {
  return {
    provider: "mux" as const,
    playbackId: video.playbackId,
    assetId: video.assetId,
    poster: video.poster ?? getMuxThumbnailUrl(video.playbackId, { time: 2, width: 1600 }),
    previewPoster: getMuxThumbnailUrl(video.playbackId, { time: 8, width: 900 }),
    aspect: video.aspect ?? "16:9",
    duration: video.duration,
  };
}
