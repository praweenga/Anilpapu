import type { Metadata } from "next";
import localFont from "next/font/local";
import BottomNav from "@/components/site/bottom-nav";
import Footer from "@/components/site/footer";
import "./globals.css";

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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://anilpappu.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Anil Pappu | Video Editor, Motion Designer, Cinematographer",
  description:
    "Cinematic portfolio of video editing, motion design, product films, public event coverage, and AI-assisted visual storytelling by Anil Pappu.",
  openGraph: {
    title: "Anil Pappu | Cinematic Video Portfolio",
    description: "Selected film, brand, product, and event work by Anil Pappu.",
    url: siteUrl,
    type: "website",
    images: [{ url: "/images/banners/promotional-banner.jpg", width: 1200, height: 630, alt: "Anil Pappu portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anil Pappu | Cinematic Video Portfolio",
    description: "Selected film, brand, product, and event work by Anil Pappu.",
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
      <body className={`${geistSans.variable} ${geistMono.variable} bg-black antialiased`} suppressHydrationWarning>
        {children}
        <BottomNav />
        <Footer />
      </body>
    </html>
  );
}
