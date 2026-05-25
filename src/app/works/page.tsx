"use client";

import type { ReactNode } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  BriefcaseBusiness,
  Clapperboard,
  Compass,
  MessageSquareText,
  MonitorPlay,
  Scissors,
  Sparkles,
  SwatchBook,
} from "lucide-react";
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

            <div className="mt-10 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
              <div>
                <p className="text-sm uppercase tracking-[0.34em] text-white/38">Works</p>
                <h1 className="mt-5 max-w-4xl font-display text-4xl leading-[0.94] md:text-6xl lg:text-[4.35rem]">
                  Work across film, motion, and brand communication.
                </h1>
              </div>
              <div className="space-y-5 lg:pl-10">
                <p className="max-w-2xl text-base leading-7 text-white/64 md:text-[1.05rem] md:leading-8">
                  A practical timeline of roles across corporate teams, digital publishers, and live-event production, with a consistent focus on editing, motion, and clear visual communication.
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
          <div className="mx-auto grid max-w-7xl gap-8 xl:grid-cols-[1.16fr_0.84fr]">
            <div className="rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] p-6 md:p-8 lg:p-9">
              <div className="flex items-center justify-between gap-6 border-b border-white/10 pb-6">
                <div>
                  <p className="text-sm uppercase tracking-[0.28em] text-white/38">Timeline</p>
                  <h2 className="mt-3 font-display text-[2rem] md:text-[2.35rem]">Work Experience</h2>
                </div>
                <div className="hidden h-12 w-12 rounded-full border border-white/12 bg-white/[0.04] md:grid md:place-items-center">
                  <BriefcaseBusiness className="h-5 w-5 text-white/72" />
                </div>
              </div>

              <div className="mt-10 space-y-7">
                <div className="grid gap-6 md:grid-cols-[8.5rem_2.5rem_minmax(0,1fr)] lg:grid-cols-[10rem_2.75rem_minmax(0,1fr)]">
                  <div />
                  <div className="hidden md:block" />
                  <p className="max-w-2xl text-sm leading-6 text-white/54 md:text-[0.95rem]">
                    A steady progression from hands-on editing roles into production leadership and motion-focused brand communication.
                  </p>
                </div>
                <div className="space-y-10">
                  {careerTimeline.map((entry, index) => (
                    <article
                      key={`${entry.company}-${entry.period}`}
                      className="grid gap-5 md:grid-cols-[8.5rem_2.5rem_minmax(0,1fr)] lg:grid-cols-[10rem_2.75rem_minmax(0,1fr)]"
                    >
                      <div className="space-y-2 pt-1">
                        <p className="text-xs uppercase tracking-[0.2em] text-white/40 md:text-[11px]">{entry.period}</p>
                        <div>
                          <p className="font-display text-lg leading-tight md:text-[1.35rem]">{entry.role}</p>
                          <p className="mt-2 text-sm text-white/42">{entry.location}</p>
                        </div>
                      </div>

                      <div className="relative hidden md:block">
                        <span
                          className={[
                            "absolute left-1/2 w-px -translate-x-1/2 bg-white/14",
                            index === 0 ? "top-5 bottom-0" : index === careerTimeline.length - 1 ? "top-0 bottom-8" : "inset-y-0",
                          ].join(" ")}
                        />
                        <span className="absolute left-1/2 top-5 h-4 w-4 -translate-x-1/2 rounded-full bg-[#d97a32]/22 animate-ping" />
                        <span className="absolute left-1/2 top-5 h-4 w-4 -translate-x-1/2 rounded-full border border-white/12 bg-[#d97a32] shadow-[0_0_0_8px_rgba(217,122,50,0.09)]" />
                      </div>

                      <div className="rounded-[1.25rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.028),rgba(255,255,255,0.012))] p-5 md:p-6">
                        <h3 className="font-display text-[1.6rem] leading-tight md:text-[1.9rem]">{entry.company}</h3>
                        <p className="mt-4 text-[0.97rem] leading-7 text-white/66">{entry.summary}</p>
                        {entry.bullets?.length ? (
                          <ul className="mt-5 space-y-3 text-sm leading-6 text-white/58 md:text-[0.96rem] md:leading-7">
                            {entry.bullets.map((bullet) => (
                              <li key={bullet} className="flex gap-3">
                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#d97a32] animate-pulse" />
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
                  <div className="grid gap-3">
                    {coreSkills.map((skill) => (
                      <div
                        key={skill}
                        className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/66"
                      >
                        <SkillIcon label={skill} />
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>
                </Panel>

                <Panel title="Tools In Use">
                  <div className="grid gap-3">
                    {aiTools.map((tool) => (
                      <div key={tool} className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/66">
                        {tool}
                      </div>
                    ))}
                  </div>
                </Panel>
              </div>

              <div className="rounded-[1.5rem] border border-[#d97a32]/18 bg-[linear-gradient(135deg,rgba(217,122,50,0.15),rgba(255,255,255,0.03))] p-6">
                <p className="text-xs uppercase tracking-[0.28em] text-white/44">Portfolio link</p>
                <h3 className="mt-3 font-display text-[1.8rem] leading-tight">See how that experience shows up in the work.</h3>
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
      <p className="mt-3 font-display text-[2rem]">{value}</p>
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

function SkillIcon({ label }: { label: string }) {
  const iconClass = "h-4 w-4 text-white/52";

  switch (label) {
    case "Video Production":
      return <Clapperboard className={iconClass} />;
    case "Motion Graphics":
      return <MonitorPlay className={iconClass} />;
    case "Brand Storytelling":
      return <MessageSquareText className={iconClass} />;
    case "Cinematic Editing":
      return <Scissors className={iconClass} />;
    case "Visual Communication":
      return <SwatchBook className={iconClass} />;
    case "Creative Direction":
      return <Compass className={iconClass} />;
    case "AI-Assisted Visuals":
      return <Sparkles className={iconClass} />;
    default:
      return null;
  }
}
