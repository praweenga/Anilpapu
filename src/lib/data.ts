import siteContent from "@/content/site-content.json";

export type VideoProvider = "mux";

export interface VideoAsset {
  provider: VideoProvider;
  playbackId: string;
  assetId?: string;
  poster: string;
  previewPoster?: string;
  aspect: "16:9" | "9:16";
  duration?: number;
  captions?: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  video: VideoAsset;
  year: string;
  role: string;
  client: string;
  btsImages: string[];
}

export interface SiteContent {
  hero: {
    title: string;
    video: VideoAsset;
  };
  showreel: {
    title: string;
    video: VideoAsset;
  };
  motionGallery: Project[];
}

export const content = siteContent as SiteContent;
export const heroVideo = content.hero.video;
export const showreel = content.showreel.video;
export const projects = content.motionGallery.slice(0, 6);
