"use client";

import {
  Check,
  Film,
  FileVideo,
  GalleryHorizontalEnd,
  Loader2,
  MonitorPlay,
  UploadCloud,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Project, SiteContent, VideoAsset } from "@/lib/data";

const destinations = [
  { id: "hero", label: "Hero loop", description: "One background film", icon: Film },
  { id: "showreel", label: "Showreel", description: "One featured reel", icon: MonitorPlay },
  { id: "motion-gallery", label: "Motion gallery", description: "Up to six projects", icon: GalleryHorizontalEnd },
] as const;

type DestinationId = (typeof destinations)[number]["id"];

interface UploadStatus {
  upload?: { id: string; status: string; url?: string; asset_id?: string };
  asset?: { id: string; status: string; duration?: number; playback_ids?: { id: string; policy: string }[] } | null;
  snippet?: VideoAsset | null;
  error?: string;
}

const defaultMeta = {
  title: "",
  category: "Motion Film",
  description: "",
  client: "Portfolio",
  role: "Video Editor",
  year: String(new Date().getFullYear()),
};

export default function StudioUploadsPage() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [content, setContent] = useState<SiteContent | null>(null);
  const [destination, setDestination] = useState<DestinationId>("motion-gallery");
  const [file, setFile] = useState<File | null>(null);
  const [meta, setMeta] = useState(defaultMeta);
  const [uploadId, setUploadId] = useState("");
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<UploadStatus | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    fetch("/api/content")
      .then((response) => response.json())
      .then((data) => setContent(data.content))
      .catch(() => setStatus({ error: "Could not load content library." }));
  }, []);

  const currentItems = useMemo(() => {
    if (!content) return [];
    if (destination === "hero") return [{ id: "hero", title: content.hero.title, video: content.hero.video }];
    if (destination === "showreel") return [{ id: "showreel", title: content.showreel.title, video: content.showreel.video }];
    return content.motionGallery;
  }, [content, destination]);

  const handleFile = (nextFile?: File | null) => {
    if (!nextFile) return;
    setFile(nextFile);
    setMeta((current) => ({
      ...current,
      title: current.title || nextFile.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
    }));
  };

  const pollUpload = async (id: string) => {
    const response = await fetch(`/api/mux/direct-upload?uploadId=${id}`);
    const data = (await response.json()) as UploadStatus;
    setStatus(data);

    if (data.error) throw new Error(data.error);
    if (data.asset?.status === "ready" && data.snippet) return data;
    if (data.asset?.status === "errored") throw new Error("Mux could not process this video.");

    await new Promise((resolve) => setTimeout(resolve, 3500));
    return pollUpload(id);
  };

  const startUpload = async () => {
    if (!file || !meta.title.trim()) return;

    setIsUploading(true);
    setProgress(0);
    setStatus(null);

    try {
      const createResponse = await fetch("/api/mux/direct-upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: meta.title, destination }),
      });
      const created = (await createResponse.json()) as UploadStatus;
      if (created.error || !created.upload?.url) throw new Error(created.error ?? "Mux did not return an upload URL.");

      setUploadId(created.upload.id);
      setStatus(created);
      await uploadWithProgress(created.upload.url, file, setProgress);

      const ready = await pollUpload(created.upload.id);
      if (!ready.snippet) throw new Error("Mux finished processing, but no playback snippet was returned.");

      const saveResponse = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          destination,
          payload: {
            id: slugify(meta.title),
            title: meta.title,
            category: meta.category,
            description: meta.description,
            client: meta.client,
            role: meta.role,
            year: meta.year,
            video: ready.snippet,
          },
        }),
      });
      const saved = await saveResponse.json();
      if (!saveResponse.ok) throw new Error(saved.error ?? "Could not save content.");

      setContent(saved.content);
      setFile(null);
      setMeta(defaultMeta);
    } catch (error) {
      setStatus({ error: error instanceof Error ? error.message : "Upload failed." });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white">
      <section className="mx-auto max-w-7xl px-5 py-10 pb-28">
        <div className="mb-8 flex flex-col gap-5 border-b border-white/10 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-white/38">Studio</p>
            <h1 className="mt-3 text-4xl font-semibold leading-none md:text-6xl">Content Manager</h1>
          </div>
          <div className="max-w-xl">
            <p className="text-sm leading-6 text-white/55">
              Upload videos directly to Mux and publish them into the live site content. Hero and showreel replace the current video; motion gallery keeps the newest six projects.
            </p>
            <form action="/api/admin/logout" method="post" className="mt-4">
              <button type="submit" className="rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.18em] text-white/55 transition hover:border-white/30 hover:text-white">
                Sign out
              </button>
            </form>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-[320px_minmax(0,1fr)_380px]">
          <aside className="rounded-lg border border-white/10 bg-white/[0.035] p-4">
            <p className="mb-3 text-xs uppercase tracking-[0.22em] text-white/38">Destination</p>
            <div className="space-y-2">
              {destinations.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setDestination(item.id)}
                  className={`flex w-full items-center gap-3 rounded-md border p-4 text-left transition ${
                    destination === item.id ? "border-white bg-white text-black" : "border-white/10 bg-black/35 text-white hover:border-white/30"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>
                    <span className="block text-sm font-medium">{item.label}</span>
                    <span className={`mt-1 block text-xs ${destination === item.id ? "text-black/55" : "text-white/40"}`}>{item.description}</span>
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-6 border-t border-white/10 pt-5">
              <p className="text-xs uppercase tracking-[0.22em] text-white/38">Current content</p>
              <div className="mt-3 space-y-3">
                {currentItems.map((item) => (
                  <ContentRow key={item.id} item={item} />
                ))}
              </div>
            </div>
          </aside>

          <section className="rounded-lg border border-white/10 bg-white/[0.035] p-4">
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => {
                event.preventDefault();
                handleFile(event.dataTransfer.files?.[0]);
              }}
              className="flex min-h-[290px] w-full flex-col items-center justify-center rounded-md border border-dashed border-white/20 bg-black/30 px-6 text-center transition hover:border-white/45"
            >
              <input
                ref={fileRef}
                type="file"
                accept="video/mp4,video/quicktime,video/*"
                className="hidden"
                onChange={(event) => handleFile(event.target.files?.[0])}
              />
              <FileVideo className="h-12 w-12 text-white/55" />
              <span className="mt-5 text-xl font-medium">{file ? file.name : "Drop or choose a video"}</span>
              <span className="mt-2 text-sm text-white/45">
                {file ? `${(file.size / 1024 / 1024).toFixed(1)} MB` : "Mux will generate HLS playback and thumbnail images."}
              </span>
            </button>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <Field label="Title" value={meta.title} onChange={(title) => setMeta((current) => ({ ...current, title }))} />
              <Field label="Category" value={meta.category} onChange={(category) => setMeta((current) => ({ ...current, category }))} disabled={destination !== "motion-gallery"} />
              <Field label="Client" value={meta.client} onChange={(client) => setMeta((current) => ({ ...current, client }))} disabled={destination !== "motion-gallery"} />
              <Field label="Role" value={meta.role} onChange={(role) => setMeta((current) => ({ ...current, role }))} disabled={destination !== "motion-gallery"} />
              <Field label="Year" value={meta.year} onChange={(year) => setMeta((current) => ({ ...current, year }))} disabled={destination !== "motion-gallery"} />
              <label className="md:col-span-2">
                <span className="text-xs uppercase tracking-[0.22em] text-white/38">Description</span>
                <textarea
                  value={meta.description}
                  onChange={(event) => setMeta((current) => ({ ...current, description: event.target.value }))}
                  disabled={destination !== "motion-gallery"}
                  rows={4}
                  className="mt-2 w-full resize-none rounded-md border border-white/10 bg-black px-4 py-3 text-white outline-none transition placeholder:text-white/25 focus:border-white/40 disabled:opacity-40"
                />
              </label>
            </div>

            <button
              type="button"
              disabled={!file || !meta.title.trim() || isUploading}
              onClick={startUpload}
              className="mt-5 inline-flex h-12 items-center justify-center gap-2 rounded-md bg-white px-5 text-sm font-medium text-black transition hover:bg-white/85 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <UploadCloud className="h-4 w-4" />}
              {isUploading ? "Publishing" : "Upload and publish"}
            </button>
          </section>

          <aside className="rounded-lg border border-white/10 bg-white/[0.035] p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Publish status</p>
              {status?.asset?.status === "ready" && <Check className="h-5 w-5 text-emerald-400" />}
            </div>
            <div className="mt-6 space-y-4 text-sm text-white/65">
              <StatusRow label="Upload ID" value={uploadId || "Waiting"} />
              <StatusRow label="Upload" value={status?.upload?.status ?? "Not started"} />
              <StatusRow label="Asset" value={status?.asset?.status ?? "Waiting"} />
              <StatusRow label="Progress" value={`${progress}%`} />
            </div>
            <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div className="h-full bg-white transition-all" style={{ width: `${progress}%` }} />
            </div>
            {status?.error && (
              <p className="mt-5 rounded-md border border-red-400/20 bg-red-500/10 p-3 text-sm text-red-200">{status.error}</p>
            )}
            {status?.snippet && (
              <div className="mt-6 overflow-hidden rounded-md border border-white/10">
                <Image src={status.snippet.poster} alt="Generated Mux thumbnail" width={640} height={360} className="aspect-video w-full object-cover" />
                <p className="p-3 text-xs leading-5 text-white/50">Mux generated this thumbnail from the uploaded video and the public site will use it automatically.</p>
              </div>
            )}
          </aside>
        </div>
      </section>
    </main>
  );
}

function ContentRow({ item }: { item: { id: string; title: string; video: VideoAsset } | Project }) {
  return (
    <div className="flex gap-3 rounded-md border border-white/10 bg-black/35 p-2">
      <Image src={item.video.poster} alt={item.title} width={96} height={54} className="aspect-video rounded object-cover" />
      <div className="min-w-0">
        <p className="truncate text-sm font-medium">{item.title}</p>
        <p className="mt-1 truncate text-xs text-white/38">{item.video.assetId ?? item.video.playbackId}</p>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  disabled,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}) {
  return (
    <label>
      <span className="text-xs uppercase tracking-[0.22em] text-white/38">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        disabled={disabled}
        className="mt-2 w-full rounded-md border border-white/10 bg-black px-4 py-3 text-white outline-none transition placeholder:text-white/25 focus:border-white/40 disabled:opacity-40"
      />
    </label>
  );
}

function uploadWithProgress(url: string, file: File, onProgress: (progress: number) => void) {
  return new Promise<void>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", url);
    xhr.setRequestHeader("Content-Type", file.type || "video/mp4");
    xhr.upload.onprogress = (event) => {
      if (!event.lengthComputable) return;
      onProgress(Math.round((event.loaded / event.total) * 100));
    };
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        onProgress(100);
        resolve();
      } else {
        reject(new Error(`Mux upload failed with status ${xhr.status}.`));
      }
    };
    xhr.onerror = () => reject(new Error("Mux upload failed before the file finished transferring."));
    xhr.send(file);
  });
}

function StatusRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3">
      <span className="text-white/40">{label}</span>
      <span className="truncate text-right text-white">{value}</span>
    </div>
  );
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
