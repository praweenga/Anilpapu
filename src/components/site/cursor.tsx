"use client";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

export default function Cursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[9999] h-3 w-3 rounded-full bg-white/90 mix-blend-difference"
      style={{ translateX: pos.x - 6, translateY: pos.y - 6 }}
    />
  );
}

