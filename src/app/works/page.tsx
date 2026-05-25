"use client";

import type { ReactNode } from "react";
import { ArrowLeft, ArrowUpRight, BriefcaseBusiness } from "lucide-react";
import Link from "next/link";
import SmoothScroll from "@/components/SmoothScroll";
import { aiTools, careerTimeline, coreSkills, expertiseMeters } from "@/lib/career";

export default function WorksPage() {
  return (
    <SmoothScroll>
      <main className="min-h-screen bg-black text-white">
        <section className="relative overflow-hidden px-5 pb-16 pt-28 md:px-10 lg:px-16">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/18 to-transparent" />
          <div className="absolute left-1/2 top-24 h-40 w-40 -translate-x-1/2 rounded-full bg-[#d97a32]/12 blur-3xl" />
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center justify-between gap-6">
              <Link
                href="/#about"
                className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.18em] text-white/52 transition hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to portfolio
              </Link>
              <div className="hidden h-px flex-1 bg-gradient-to-r from-white/0 via-white/12 to-white/0 md:block" />
            </div>

            <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <div>
                <p className="text-sm uppercase tracking-[0.34em] text-white/38">Works</p>
                <h1 className="mt-5 max-w-5xl font-display text-5xl leading-[0.92] md:text-7xl lg:text-[5.6rem]">
                  Career chapters that shaped the editorial point of view.
                </h1>
              </div>
              <div className="space-y-6">
                <p className="max-w-2xl text-base leading-7 text-white/64 md:text-lg md:leading-8">
                  A timeline of production, motion, and brand communication roles across corporate teams, digital publishers, and live-event storytelling.
                </p>
                <div className="grid gap-3 sm:grid-cols-3">
                  <Metric label="Years in production" value="12+" />
                  <Metric label="Career chapters" value="04" />
                  <Metric label="Base" value="Hyderabad" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 pb-24 md:px-10 lg:px-16">
          <div className="mx-auto grid max-w-7xl gap-8 xl:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] p-6 md:p-8 lg:p-10">
              <div className="flex items-center justify-between gap-6 border-b border-white/10 pb-6">
                <div>
                  <p className="text-sm uppercase tracking-[0.28em] text-white/38">Timeline</p>
                  <h2 className="mt-3 font-display text-3xl md:text-4xl">Work Experience</h2>
                </div>
                <div className="hidden h-12 w-12 rounded-full border border-white/12 bg-white/[0.04] md:grid md:place-items-center">
                  <BriefcaseBusiness className="h-5 w-5 text-white/72" />
                </div>
              </div>

              <div className="relative mt-10">
                <div className="absolute bottom-4 left-[7.2rem] top-4 hidden w-px bg-gradient-to-b from-white/0 via-white/18 to-white/0 md:block lg:left-[10.25rem]" />
                <div className="space-y-10">
                  {careerTimeline.map((entry) => (
                    <article key={`${entry.company}-${entry.period}`} className="grid gap-5 md:grid-cols-[6.25rem_1.5rem_minmax(0,1fr)] lg:grid-cols-[9rem_2rem_minmax(0,1fr)]">
                      <div className="space-y-2 pt-1">
                        <p className="text-xs uppercase tracking-[0.22em] text-white/42 md:text-[11px]">{entry.period}</p>
                        <div>
                          <p className="font-display text-xl leading-tight">{entry.role}</p>
                          <p className="mt-2 text-sm text-white/46">{entry.location}</p>
                        </div>
                      </div>

                      <div className="relative hidden md:flex md:justify-center">
                        <span className="relative top-2 h-4 w-4 rounded-full border border-white/12 bg-[#d97a32] shadow-[0_0_0_8px_rgba(217,122,50,0.12)]" />
                      </div>

                      <div className="rounded-[1.25rem] border border-white/8 bg-white/[0.025] p-5 md:p-6">
                        <h3 className="font-display text-2xl leading-tight md:text-[2rem]">{entry.company}</h3>
                        <p className="mt-4 text-base leading-7 text-white/66">{entry.summary}</p>
                        {entry.bullets?.length ? (
                          <ul className="mt-5 space-y-3 text-sm leading-6 text-white/58 md:text-base md:leading-7">
                            {entry.bullets.map((bullet) => (
                              <li key={bullet} className="flex gap-3">
                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#d97a32]" />
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <Panel title="Expertise">
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
                  {expertiseMeters.map((item) => (
                    <div key={item.label}>
                      <div className="mb-2 flex items-center justify-between gap-3 text-sm text-white/68">
                        <span>{item.label}</span>
                        <span className="text-white/34">{item.level}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-white/8">
                        <div className="h-2 rounded-full bg-gradient-to-r from-[#d97a32] via-[#f3d7bd] to-white" style={{ width: `${item.level}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </Panel>

              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-1">
                <Panel title="Core Skills">
                  <div className="flex flex-wrap gap-3">
                    {coreSkills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/66"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </Panel>

                <Panel title="AI Tools">
                  <div className="grid gap-3">
                    {aiTools.map((tool) => (
                      <div key={tool} className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/66">
                        {tool}
                      </div>
                    ))}
                  </div>
                </Panel>
              </div>

              <div className="rounded-[1.5rem] border border-[#d97a32]/18 bg-[linear-gradient(135deg,rgba(217,122,50,0.16),rgba(255,255,255,0.03))] p-6">
                <p className="text-xs uppercase tracking-[0.28em] text-white/44">Portfolio link</p>
                <h3 className="mt-3 font-display text-2xl">See how that experience shows up in the work.</h3>
                <p className="mt-3 text-sm leading-6 text-white/62">
                  Jump back into the motion showcase and case studies to connect the timeline with the finished visual output.
                </p>
                <Link
                  href="/#works"
                  className="mt-5 inline-flex items-center gap-3 rounded-full border border-white/14 bg-black/28 px-4 py-3 text-xs uppercase tracking-[0.2em] text-white transition hover:border-white/36 hover:bg-white hover:text-black"
                >
                  View portfolio work
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </SmoothScroll>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <p className="text-[11px] uppercase tracking-[0.24em] text-white/38">{label}</p>
      <p className="mt-3 font-display text-3xl">{value}</p>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6">
      <p className="text-xs uppercase tracking-[0.28em] text-white/38">{title}</p>
      <div className="mt-5">{children}</div>
    </section>
  );
}
