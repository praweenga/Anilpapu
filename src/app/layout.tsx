import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "@/components/site/footer";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconHome,
  IconDeviceTv,
  IconUser,
  IconPhone,
} from "@tabler/icons-react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Anil Pappu — Videographer & Photographer",
  description: "Professional freelance portfolio showcasing videography, photography, and post‑production.",
  openGraph: {
    title: "Anil Pappu — Videographer & Photographer",
    description: "End‑to‑end content, trailers, shorts, and photography across platforms.",
    url: "https://localhost:3000/",
    type: "website",
    images: [
      { url: "/posters/sample1.svg", width: 1200, height: 630, alt: "Portfolio Preview" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anil Pappu — Videographer & Photographer",
    description: "Portfolio and services.",
    images: ["/posters/sample1.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
        <Cursor />
        {children}
        <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2">
          <FloatingDock
            items={[
              { title: "Home", icon: <IconHome className="h-6 w-6" />, href: "#home" },
              { title: "Works", icon: <IconDeviceTv className="h-6 w-6" />, href: "#works" },
              { title: "About", icon: <IconUser className="h-6 w-6" />, href: "#about" },
              { title: "Contact", icon: <IconPhone className="h-6 w-6" />, href: "#contact" },
            ]}
            desktopClassName="bg-neutral-900/80 text-white border border-white/10 backdrop-blur shadow-xl"
            mobileClassName=""
          />
        </div>
        <Footer />
      </body>
    </html>
  );
}
import Cursor from "@/components/site/cursor";
