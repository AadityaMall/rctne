"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";

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
  instagramUrl?: string;
  image?: string;
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
  instagramUrl,
  image,
  className,
}: PhotoCardProps) {
  const hasImage = !!image;

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
        {hasImage ? (
          /* Real photo */
          <Image
            src={image}
            alt={name}
            fill
            loading="lazy"
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          /* Placeholder fill */
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
        )}

        {/* Dark gradient scrim so badges are always readable */}
        {hasImage && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 pointer-events-none" />
        )}

        {/* Category sticker badge */}
        {category && (
          <div
            className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-heading font-bold uppercase tracking-wider text-background z-10"
            style={{ backgroundColor: accentColor }}
          >
            {category}
          </div>
        )}

        {/* Instagram reel pill — top right, always visible when available */}
        {instagramUrl && (
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="absolute top-3 right-3 z-20 flex items-center gap-1 px-2.5 py-1 rounded-full backdrop-blur-md text-[10px] font-heading font-bold uppercase tracking-wider text-white transition-transform hover:scale-105 active:scale-95"
            style={{
              background:
                "linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
              boxShadow: "0 2px 8px rgba(220,39,67,0.4)",
            }}
          >
            {/* Instagram glyph (inline SVG — no icon library needed) */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
            </svg>
            Reel
          </a>
        )}

        {/* Hover reveal overlay */}
        {showHoverReveal && detail && (
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center gap-3 p-5 text-center z-10"
          >
            <p className="font-sans text-sm md:text-base text-text font-medium leading-snug">
              {detail}
            </p>
            {instagramUrl ? (
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-heading font-bold uppercase tracking-wider text-background transition-opacity hover:opacity-80"
                style={{ backgroundColor: accentColor }}
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink size={12} />
                View Reel
              </a>
            ) : (
              <span
                className="inline-block px-4 py-1.5 rounded-full text-xs font-heading font-bold uppercase tracking-wider text-background"
                style={{ backgroundColor: accentColor }}
              >
                View
              </span>
            )}
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
