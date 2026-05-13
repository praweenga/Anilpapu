"use client";

import { ArrowRight, Instagram, Linkedin, Mail, MessageCircle } from "lucide-react";
import Link from "next/link";

const contactLinks = [
  { label: "Instagram", href: "https://www.instagram.com/anil_bonds/", icon: Instagram },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/anilpappu/", icon: Linkedin },
  { label: "WhatsApp", href: "https://wa.me/917674074148", icon: MessageCircle },
];

export default function ContactCTA() {
  return (
    <section className="bg-black px-5 py-28 text-white md:px-10 lg:px-16" id="contact">
      <div className="mx-auto grid max-w-7xl gap-12 border-t border-white/10 pt-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-white/40">Contact</p>
          <h2 className="mt-5 max-w-4xl text-5xl font-semibold leading-none md:text-8xl">
            Let&apos;s build the next film.
          </h2>
        </div>

        <div>
          <p className="text-lg leading-8 text-white/58">
            Available for film edits, brand stories, product demos, motion packages, and event coverage.
          </p>
          <Link
            href="mailto:anilbonds2016@gmail.com"
            className="mt-8 inline-flex items-center gap-3 text-2xl font-medium text-white transition hover:text-white/65"
          >
            <Mail className="h-6 w-6" />
            anilbonds2016@gmail.com
            <ArrowRight className="h-5 w-5" />
          </Link>
          <div className="mt-10 flex flex-wrap gap-3">
            {contactLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-white/65 transition hover:border-white/30 hover:text-white"
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
