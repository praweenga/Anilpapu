"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail, Instagram, Twitter, Linkedin } from "lucide-react";
import Link from "next/link";

export default function ContactCTA() {
  return (
    <section className="py-32 px-4 md:px-6 bg-neutral-950 text-white" id="contact">
      <div className="container mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <h2 className="text-5xl md:text-8xl font-bold tracking-tighter mb-8">
            Let&apos;s create something <br />
            <span className="text-neutral-600">extraordinary.</span>
          </h2>

          <p className="text-xl text-neutral-400 max-w-2xl mx-auto font-light">
            Available for freelance projects and collaborations worldwide.
          </p>

          <div className="pt-12">
            <Link
              href="mailto:hello@anilpappu.com"
              className="group inline-flex items-center gap-4 text-2xl md:text-3xl font-medium hover:text-blue-500 transition-colors"
            >
              <span>hello@anilpappu.com</span>
              <ArrowRight className="w-6 h-6 transform group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

          {/* Socials */}
          <div className="flex justify-center gap-8 pt-16">
            {[
              { icon: Instagram, href: "#" },
              { icon: Twitter, href: "#" },
              { icon: Linkedin, href: "#" },
              { icon: Mail, href: "mailto:hello@anilpappu.com" },
            ].map((social, index) => (
              <Link
                key={index}
                href={social.href}
                className="p-4 rounded-full bg-white/5 hover:bg-white/10 hover:scale-110 transition-all duration-300"
              >
                <social.icon className="w-6 h-6" />
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
