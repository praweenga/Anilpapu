"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import SmoothScroll from "@/components/SmoothScroll";
import VideoPlayer from "@/components/ui/VideoPlayer";
import { projects } from "@/lib/data";

export default function ProjectDetail() {
  const params = useParams();
  const project = projects.find((item) => item.id === params.id);

  if (!project) {
    return <div className="grid min-h-screen place-items-center bg-black text-white">Project not found</div>;
  }

  const currentIndex = projects.findIndex((item) => item.id === project.id);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <SmoothScroll>
      <main className="min-h-screen bg-black text-white">
        <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-5 py-5 text-sm md:px-10 lg:px-16">
          <Link href="/#works" className="inline-flex items-center gap-2 text-white/75 transition hover:text-white">
            <ArrowLeft className="h-4 w-4" />
            Work
          </Link>
          <Link href="/#contact" className="text-white/75 transition hover:text-white">
            Contact
          </Link>
        </nav>

        <section className="px-5 pb-16 pt-28 md:px-10 lg:px-16">
          <div className="mx-auto max-w-7xl">
            <p className="text-sm uppercase tracking-[0.28em] text-white/40">{project.category}</p>
            <h1 className="mt-5 max-w-5xl text-5xl font-semibold leading-none md:text-8xl">{project.title}</h1>
            <div className="mt-10 overflow-hidden rounded-2xl border border-white/10 bg-neutral-950">
              <VideoPlayer video={project.video} title={project.title} poster={project.video.poster} autoPlay muted preload="auto" />
            </div>
          </div>
        </section>

        <section className="px-5 py-16 md:px-10 lg:px-16">
          <div className="mx-auto max-w-7xl">
            <p className="max-w-4xl text-2xl leading-10 text-white/72 md:text-4xl md:leading-tight">
              {project.description}
            </p>
          </div>
        </section>

        <section className="border-t border-white/10 px-5 py-24 text-center md:px-10 lg:px-16">
          <p className="text-sm uppercase tracking-[0.28em] text-white/35">Next project</p>
          <Link href={`/work/${nextProject.id}`} className="group mt-6 inline-flex items-center gap-4 text-4xl font-semibold md:text-7xl">
            {nextProject.title}
            <ArrowRight className="h-8 w-8 transition group-hover:translate-x-2 md:h-12 md:w-12" />
          </Link>
        </section>
      </main>
    </SmoothScroll>
  );
}
