"use client";

import { usePathname } from "next/navigation";
import BottomNav from "@/components/site/bottom-nav";
import Footer from "@/components/site/footer";

const HIDDEN_CHROME_PATHS = ["/site-access", "/studio"];

export default function SiteChrome() {
  const pathname = usePathname();

  if (HIDDEN_CHROME_PATHS.some((path) => pathname.startsWith(path))) {
    return null;
  }

  return (
    <>
      <BottomNav />
      <Footer />
    </>
  );
}
