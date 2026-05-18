"use client";

import { Aperture, Clapperboard, Home, Mail, MonitorPlay, UserRound } from "lucide-react";
import Link from "next/link";

const items = [
  { label: "Home", href: "/#home", icon: Home },
  { label: "Showreel", href: "/#showreel", icon: MonitorPlay },
  { label: "Work", href: "/#works", icon: Clapperboard },
  { label: "About", href: "/#about", icon: UserRound },
  { label: "Contact", href: "/#contact", icon: Mail },
];

export default function BottomNav() {
  return (
    <nav className="fixed bottom-4 left-1/2 z-50 w-[calc(100%-1.5rem)] max-w-xl -translate-x-1/2 text-white md:bottom-6">
      <div className="mx-auto flex items-center justify-between rounded-full border border-white/12 bg-black/62 px-2 py-2 shadow-[0_18px_70px_rgba(0,0,0,0.5)] backdrop-blur-xl">
        <Link
          href="/#home"
          className="hidden items-center gap-2 rounded-full px-4 py-2 text-sm font-medium tracking-wide text-white/85 transition hover:bg-white/10 hover:text-white sm:flex"
        >
          <Aperture className="h-4 w-4" />
          Anil Bonds
        </Link>
        <div className="flex flex-1 items-center justify-between sm:flex-none sm:gap-1">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-label={item.label}
              title={item.label}
              className="group relative grid h-11 w-11 place-items-center rounded-full text-white/55 transition hover:bg-white hover:text-black sm:h-10 sm:w-10"
            >
              <item.icon className="h-4 w-4" />
              <span className="pointer-events-none absolute -top-9 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-full border border-white/10 bg-black/80 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-white opacity-0 backdrop-blur transition group-hover:opacity-100 md:block">
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
