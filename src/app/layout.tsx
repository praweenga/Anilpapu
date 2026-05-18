import type { Metadata } from "next";
import localFont from "next/font/local";
import { Bricolage_Grotesque, Manrope } from "next/font/google";
import BottomNav from "@/components/site/bottom-nav";
import Footer from "@/components/site/footer";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://anilpappu.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Anil Bonds | Brand Communication, Visual Storytelling, Creative Production",
  description:
    "Cinematic portfolio of brand communication, motion-led design, corporate films, AI-assisted visual production, and creative storytelling by Anil Bonds.",
  openGraph: {
    title: "Anil Bonds | Cinematic Visual Communication Portfolio",
    description: "Selected brand communication, motion design, corporate film, and visual storytelling work by Anil Bonds.",
    url: siteUrl,
    type: "website",
    images: [{ url: "/images/banners/promotional-banner.jpg", width: 1200, height: 630, alt: "Anil Bonds portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anil Bonds | Cinematic Visual Communication Portfolio",
    description: "Selected brand communication, motion design, corporate film, and visual storytelling work by Anil Bonds.",
    images: ["/images/banners/promotional-banner.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${display.variable} ${sans.variable} ${geistMono.variable} bg-black antialiased`} suppressHydrationWarning>
        {children}
        <BottomNav />
        <Footer />
      </body>
    </html>
  );
}
