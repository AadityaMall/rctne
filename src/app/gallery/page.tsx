"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import { Marquee } from "@/components/ui/marquee";

// ─── Data ────────────────────────────────────────────────────────────────────
const TOTAL = 39;
const images = Array.from({ length: TOTAL }, (_, i) => ({
  id: i + 1,
  src: `/images/gallery/gallery-${String(i + 1).padStart(2, "0")}.jpg`,
  alt: `RCTNE Aagaz '26–27 — Moment ${i + 1}`,
}));

// Grid shows first 7 photos + 1 "More" tile
const GRID_DISPLAY_COUNT = 7;
const gridImages = images.slice(0, GRID_DISPLAY_COUNT);
const remainingCount = TOTAL - GRID_DISPLAY_COUNT;

// ─── Lightbox ────────────────────────────────────────────────────────────────
function Lightbox({
  index,
  onClose,
  onPrev,
  onNext,
}: {
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const img = images[index];

  // Keyboard nav
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div
      className="fixed inset-0 z-[999] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" />

      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-colors"
        aria-label="Close"
      >
        <X size={18} />
      </button>

      {/* Counter */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 z-10 font-sans text-xs text-white/50 tabular-nums tracking-widest uppercase">
        {index + 1} / {TOTAL}
      </div>

      {/* Prev */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 md:left-8 z-10 flex items-center justify-center w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-colors"
        aria-label="Previous"
      >
        <ChevronLeft size={22} />
      </button>

      {/* Image */}
      <motion.div
        key={index}
        className="relative z-10 max-w-[92vw] max-h-[88vh] w-full h-full flex items-center justify-center"
        initial={{ scale: 0.93, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.96, opacity: 0 }}
        transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          <Image
            src={img.src}
            alt={img.alt}
            width={1400}
            height={900}
            className="object-contain max-h-[85vh] rounded-xl shadow-2xl"
            priority
          />
        </div>
        {/* Caption */}
        <div className="absolute bottom-0 left-0 right-0 text-center pb-3">
          <span className="font-sans text-[11px] text-white/30 tracking-widest uppercase">
            RCTNE · Aagaz &#x2019;26–27
          </span>
        </div>
      </motion.div>

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 md:right-8 z-10 flex items-center justify-center w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-colors"
        aria-label="Next"
      >
        <ChevronRight size={22} />
      </button>

      {/* Strip of thumbnails at bottom */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex gap-1.5 overflow-hidden max-w-xs md:max-w-lg">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); }}
            onClickCapture={(e) => { e.stopPropagation(); }}
            className={`w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-200 ${
              i === index ? "bg-white scale-125" : "bg-white/25"
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
}

// ─── Grid tile ────────────────────────────────────────────────────────────────
function GridTile({
  img,
  onOpen,
  index,
}: {
  img: (typeof images)[number];
  onOpen: () => void;
  index: number;
}) {
  return (
    <motion.button
      onClick={onOpen}
      className="group relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-border/30 hover:border-accent/40 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10 block"
      aria-label={img.alt}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
        delay: (index % 4) * 0.06,
      }}
    >
      <Image
        src={img.src}
        alt={img.alt}
        fill
        loading="lazy"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
      />
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
        <div className="flex items-center gap-2">
          <ZoomIn size={14} className="text-white" />
          <span className="font-sans text-xs text-white/80 uppercase tracking-wider">View</span>
        </div>
      </div>

      {/* Top-right index */}
      <div className="absolute top-3 right-3 font-heading font-bold text-[10px] text-white/0 group-hover:text-white/60 tabular-nums transition-colors duration-200">
        {String(img.id).padStart(2, "0")}
      </div>
    </motion.button>
  );
}

// ─── 8th Card: Plus Sign + Quadrant Icon for Remaining Photos ─────────────────
function MorePhotosTile({
  remainingCount,
  onClick,
  index,
}: {
  remainingCount: number;
  onClick: () => void;
  index: number;
}) {
  return (
    <motion.button
      onClick={onClick}
      className="group relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-accent/40 bg-surface/80 hover:bg-surface hover:border-accent transition-all duration-300 hover:shadow-xl hover:shadow-accent/15 flex flex-col items-center justify-center p-6 text-center"
      aria-label={`View ${remainingCount} more photos`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
        delay: (index % 4) * 0.06,
      }}
    >
      {/* Subtle background texture */}
      <div className="absolute inset-0 bg-radial from-accent/10 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />

      {/* Plus Sign + Quadrant Icon */}
      <div className="relative mb-3 flex items-center justify-center w-14 h-14 rounded-2xl bg-accent/10 border border-accent/30 text-accent group-hover:scale-110 group-hover:bg-accent group-hover:text-background transition-all duration-300 shadow-md">
        <svg
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.8" />
          <path d="M12 3v18" stroke="currentColor" strokeWidth="1.8" />
          <path d="M3 12h18" stroke="currentColor" strokeWidth="1.8" />
          <rect x="13" y="3.5" width="7" height="7" rx="2" fill="currentColor" opacity="0.35" />
          <rect x="3.5" y="13" width="7" height="7" rx="2" fill="currentColor" opacity="0.5" />
          <circle cx="12" cy="12" r="3.5" fill="var(--background)" stroke="currentColor" strokeWidth="1.5" />
          <path d="M12 10v4M10 12h4" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>

      <div className="flex flex-col items-center gap-1 relative z-10">
        <span className="font-heading font-bold text-2xl md:text-3xl text-text tracking-tight group-hover:text-accent transition-colors">
          +{remainingCount}
        </span>
        <span className="font-sans text-xs font-semibold uppercase tracking-wider text-accent">
          More Photos
        </span>
        <span className="font-sans text-[11px] text-text-muted mt-0.5 opacity-80 group-hover:opacity-100">
          Click to view full gallery
        </span>
      </div>
    </motion.button>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function GalleryPage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = useCallback((index: number) => setLightboxIndex(index), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const goPrev = useCallback(() =>
    setLightboxIndex((i) => (i === null ? null : (i - 1 + TOTAL) % TOTAL)), []);
  const goNext = useCallback(() =>
    setLightboxIndex((i) => (i === null ? null : (i + 1) % TOTAL)), []);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [lightboxIndex]);

  return (
    <main className="min-h-screen bg-background">

      {/* ── Header ── */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 pt-28 pb-12">
        <BlurFade delay={0.05} inView>
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-sans text-sm text-text-muted hover:text-accent transition-colors mb-8 w-fit"
          >
            <ArrowLeft size={14} /> Home
          </Link>
        </BlurFade>

        <BlurFade delay={0.1} inView>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-px bg-accent" />
            <span className="font-sans text-xs text-accent uppercase tracking-[0.22em] font-medium">
              Moments
            </span>
          </div>
          <h1 className="font-heading font-bold text-[clamp(2.6rem,7vw,5rem)] text-text leading-[1.02] tracking-tight">
            Our Gallery
          </h1>
        </BlurFade>

        <BlurFade delay={0.18} inView>
          <p className="font-sans text-base text-text-muted max-w-md mt-4 leading-relaxed">
            Every frame a memory — snapshots from RCTNE Aagaz &#x2019;26–27. Click any photo to explore.
          </p>
        </BlurFade>

        {/* Count badge */}
        <BlurFade delay={0.24} inView>
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/25 bg-accent/6">
            <span className="font-heading font-bold text-accent text-sm">{TOTAL}</span>
            <span className="font-sans text-xs text-text-muted uppercase tracking-wider">Photos</span>
          </div>
        </BlurFade>
      </div>

      {/* ── Continuous Magic UI Marquee ── */}
      <div className="mb-16">
        <Marquee pauseOnHover className="[--duration:80s] [--gap:1.25rem] py-2">
          {images.map((img, i) => (
            <button
              key={img.id}
              onClick={() => openLightbox(i)}
              className="group relative flex-shrink-0 w-60 md:w-80 h-40 md:h-52 rounded-xl overflow-hidden border border-border/30 hover:border-accent/40 transition-colors"
              aria-label={img.alt}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                loading="lazy"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 240px, 320px"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <ZoomIn
                  size={20}
                  className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 drop-shadow-lg"
                />
              </div>
            </button>
          ))}
        </Marquee>
      </div>

      {/* ── Section Divider ── */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 mb-10">
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-border/50" />
          <span className="font-sans text-xs text-text-muted/50 uppercase tracking-widest">
            Featured Highlights
          </span>
          <div className="h-px flex-1 bg-border/50" />
        </div>
      </div>

      {/* ── 8-Tile Photo Grid (7 photos + 1 Quadrant Plus tile) ── */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 pb-28">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {gridImages.map((img, i) => (
            <GridTile
              key={img.id}
              img={img}
              onOpen={() => openLightbox(i)}
              index={i}
            />
          ))}

          {/* 8th tile: Plus sign + quadrant indicating remaining photos */}
          <MorePhotosTile
            remainingCount={remainingCount}
            onClick={() => openLightbox(GRID_DISPLAY_COUNT)}
            index={GRID_DISPLAY_COUNT}
          />
        </div>
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            index={lightboxIndex}
            onClose={closeLightbox}
            onPrev={goPrev}
            onNext={goNext}
          />
        )}
      </AnimatePresence>

    </main>
  );
}
