"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PhotoCardProps {
  initials: string;
  name: string;
  role: string;
  detail?: string;
  category?: string;
  accentColor?: string;
  rotate?: -2 | 0 | 2;
  size?: "sm" | "md" | "lg";
  showHoverReveal?: boolean;
  className?: string;
}

const sizeMap = {
  sm: "w-full aspect-[3/4]",
  md: "w-full aspect-[4/5]",
  lg: "w-full aspect-[3/4]",
};

const textSizeMap = {
  sm: "text-3xl",
  md: "text-4xl",
  lg: "text-5xl",
};

export function PhotoCard({
  initials,
  name,
  role,
  detail,
  category,
  accentColor = "oklch(62% 0.17 40)",
  rotate = 0,
  size = "md",
  showHoverReveal = true,
  className,
}: PhotoCardProps) {
  return (
    <motion.div
      initial={{ rotate }}
      whileHover={{ rotate: 0, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200, damping: 22 }}
      className={cn(
        "group relative flex flex-col gap-3",
        rotate !== 0 && "md:origin-bottom",
        className
      )}
    >
      {/* Frame */}
      <div
        className={cn(
          "relative overflow-hidden rounded-xl border-[3px]",
          sizeMap[size]
        )}
        style={{ borderColor: "var(--accent-secondary)" }}
      >
        {/* Placeholder fill — replace with next/image when real photos arrive */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, oklch(93% 0.02 70) 0%, oklch(88% 0.04 60) 100%)`,
          }}
        >
          <span
            className={cn("font-heading font-bold text-text-muted/60", textSizeMap[size])}
          >
            {initials}
          </span>
        </div>

        {/* Category sticker badge */}
        {category && (
          <div
            className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-heading font-bold uppercase tracking-wider text-background z-10"
            style={{ backgroundColor: accentColor }}
          >
            {category}
          </div>
        )}

        {/* Hover reveal overlay */}
        {showHoverReveal && detail && (
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 bg-background/75 backdrop-blur-sm flex flex-col items-center justify-center gap-3 p-5 text-center"
          >
            <p className="font-sans text-sm md:text-base text-text font-medium leading-snug">
              {detail}
            </p>
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-heading font-bold uppercase tracking-wider text-background"
              style={{ backgroundColor: accentColor }}
            >
              View
            </span>
          </motion.div>
        )}
      </div>

      {/* Caption */}
      <div className="px-0.5">
        <h3 className="font-heading font-bold text-lg text-text leading-tight">{name}</h3>
        <p
          className="font-sans text-sm font-medium uppercase tracking-wide mt-0.5"
          style={{ color: "var(--accent)" }}
        >
          {role}
        </p>
      </div>
    </motion.div>
  );
}
