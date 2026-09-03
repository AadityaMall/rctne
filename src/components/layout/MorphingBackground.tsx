"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function MorphingBackground() {
  const [mounted, setMounted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPrefersReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  if (!mounted) return null;

  if (prefersReducedMotion) {
    return (
      <div className="fixed inset-0 -z-50 bg-background overflow-hidden">
        <div className="absolute top-0 right-0 w-[60vw] h-[60vw] rounded-full bg-accent/8 blur-[160px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] rounded-full bg-accent-secondary/6 blur-[130px] pointer-events-none" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 -z-50 bg-background overflow-hidden">
      {/* Warm coral glow — top right */}
      <motion.div
        animate={{
          x: ["0%", "8%", "-4%", "0%"],
          y: ["0%", "-12%", "6%", "0%"],
          scale: [1, 1.12, 0.94, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-[10%] -right-[10%] w-[65vw] h-[65vw] rounded-full bg-accent/10 dark:bg-accent/8 blur-[160px] pointer-events-none"
      />

      {/* Terracotta glow — bottom left */}
      <motion.div
        animate={{
          x: ["0%", "-10%", "6%", "0%"],
          y: ["0%", "14%", "-8%", "0%"],
          scale: [1, 0.88, 1.08, 1],
        }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute -bottom-[15%] -left-[10%] w-[55vw] h-[55vw] rounded-full bg-accent-secondary/8 dark:bg-accent-secondary/6 blur-[140px] pointer-events-none"
      />

      {/* Warm cream center pulse */}
      <motion.div
        animate={{
          scale: [1, 1.06, 0.97, 1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 6 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] rounded-full bg-accent/5 dark:bg-accent/4 blur-[120px] pointer-events-none"
      />

      {/* Grain texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
