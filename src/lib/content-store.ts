import { promises as fs } from "fs";
import path from "path";
import type { Project, SiteContent, VideoAsset } from "@/lib/data";

const CONTENT_PATH = path.join(process.cwd(), "src/content/site-content.json");
const MAX_MOTION_ITEMS = 6;

export async function readSiteContent() {
  const raw = await fs.readFile(CONTENT_PATH, "utf8");
  return JSON.parse(raw) as SiteContent;
}

export async function writeSiteContent(content: SiteContent) {
  await fs.writeFile(CONTENT_PATH, `${JSON.stringify(content, null, 2)}\n`, "utf8");
}

export async function upsertVideo(destination: string, payload: ContentPayload) {
  const content = await readSiteContent();

  if (destination === "hero") {
    content.hero = {
      title: payload.title,
      video: payload.video,
    };
  }

  if (destination === "showreel") {
    content.showreel = {
      title: payload.title,
      video: payload.video,
    };
  }

  if (destination === "motion-gallery") {
    const project = buildProject(payload);
    const existingIndex = content.motionGallery.findIndex((item) => item.id === project.id);

    if (existingIndex >= 0) {
      content.motionGallery[existingIndex] = project;
    } else {
      content.motionGallery = [project, ...content.motionGallery].slice(0, MAX_MOTION_ITEMS);
    }
  }

  await writeSiteContent(content);
  return content;
}

function buildProject(payload: ContentPayload): Project {
  return {
    id: payload.id,
    title: payload.title,
    category: payload.category || "Motion Film",
    description: payload.description || "A finished motion piece uploaded through the studio content manager.",
    year: payload.year || String(new Date().getFullYear()),
    role: payload.role || "Video Editor",
    client: payload.client || "Portfolio",
    btsImages: payload.btsImages?.length ? payload.btsImages : [payload.video.poster, payload.video.previewPoster ?? payload.video.poster],
    video: payload.video,
  };
}

export interface ContentPayload {
  id: string;
  title: string;
  category?: string;
  description?: string;
  year?: string;
  role?: string;
  client?: string;
  btsImages?: string[];
  video: VideoAsset;
}
