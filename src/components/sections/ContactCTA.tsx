"use client";

import { ArrowRight, Instagram, Linkedin, Mail, MessageCircle, Youtube } from "lucide-react";
import Link from "next/link";

const contactLinks = [
  { label: "YouTube", href: "https://youtube.com/playlist?list=PLd4vQ1NiNgesPSSqDpc7-hf4rRayMVr8F&si=6Q10aAjQRnpvSH7i", icon: Youtube },
  { label: "Instagram", href: "https://www.instagram.com/anil_bonds/", icon: Instagram },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/anilpappu/", icon: Linkedin },
  { label: "WhatsApp", href: "https://wa.me/917674074148", icon: MessageCircle },
];

export default function ContactCTA() {
  return (
    <section className="bg-black px-5 py-28 text-white md:px-10 lg:px-16" id="contact">
      <div className="mx-auto grid max-w-7xl gap-12 border-t border-white/10 pt-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-white/40">Let&apos;s connect</p>
          <h2 className="mt-5 max-w-4xl font-display text-4xl leading-[0.95] md:text-6xl lg:text-7xl">
            Let&apos;s build visual stories that matter.
          </h2>
        </div>

        <div>
          <p className="text-base leading-7 text-white/58 md:text-lg md:leading-8">
            Open to collaborations across corporate communication, brand storytelling, cinematic content production, and modern visual campaigns.
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
