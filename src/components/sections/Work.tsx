"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/data";

export default function Work() {
  return (
    <section className="bg-black px-5 py-24 text-white md:px-10 lg:px-16" id="work">
      <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <Link key={project.id} href={`/work/${project.id}`} className="group block">
            <motion.article
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.04 }}
              className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.03]"
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={project.video.poster}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                  priority={index < 3}
                />
              </div>
              <div className="flex items-start justify-between gap-4 p-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-white/40">{project.category}</p>
                  <h3 className="mt-3 text-2xl font-semibold">{project.title}</h3>
                </div>
                <ArrowUpRight className="mt-1 h-5 w-5 text-white/50 transition group-hover:text-white" />
              </div>
            </motion.article>
          </Link>
        ))}
      </div>
    </section>
  );
}
