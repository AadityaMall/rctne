"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { contentService } from "@/services/content.service";
import { BlurFade } from "@/components/ui/blur-fade";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { cn } from "@/lib/utils";
import type { HeroContent } from "@/types/content.types";

const ACTION_WORDS = ["Serve.", "Lead.", "Build.", "Connect.", "Change."];

const STACK_CARDS = [
  { label: "Youth Summit '24", color: "oklch(93% 0.025 65)", border: "oklch(57% 0.16 45)" },
  { label: "Green Canopy '23", color: "oklch(91% 0.025 155)", border: "oklch(55% 0.14 148)" },
  { label: "Beach Cleanup", color: "oklch(92% 0.025 250)", border: "oklch(57% 0.14 260)" },
];

function CyclingWord() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % ACTION_WORDS.length), 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="relative inline-block min-w-[6ch]">
      <AnimatePresence mode="wait">
        <motion.span
          key={ACTION_WORDS[index]}
          initial={{ y: 32, opacity: 0, filter: "blur(6px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: -24, opacity: 0, filter: "blur(4px)" }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block text-accent"
        >
          {ACTION_WORDS[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function StackedImages() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Card 3 — furthest back */}
      <motion.div
        initial={{ rotate: 10, x: 28, y: -20 }}
        animate={{ rotate: 10, x: 28, y: -20 }}
        whileHover={{ rotate: 14, x: 40, y: -28, transition: { duration: 0.3 } }}
        className="absolute w-56 md:w-72 aspect-[3/4] rounded-2xl"
        style={{
          backgroundColor: STACK_CARDS[2].color,
          border: `3px solid ${STACK_CARDS[2].border}`,
          boxShadow: `0 8px 32px ${STACK_CARDS[2].border}30`,
        }}
      >
        <div className="absolute inset-0 dot-grid opacity-40 rounded-2xl" />
        <div className="absolute bottom-4 left-4 right-4">
          <p className="font-heading font-bold text-sm text-text/60">{STACK_CARDS[2].label}</p>
        </div>
      </motion.div>

      {/* Card 2 — middle */}
      <motion.div
        initial={{ rotate: 4, x: 10, y: 10 }}
        animate={{ rotate: 4, x: 10, y: 10 }}
        whileHover={{ rotate: 6, x: 18, y: 14, transition: { duration: 0.3 } }}
        className="absolute w-56 md:w-72 aspect-[3/4] rounded-2xl"
        style={{
          backgroundColor: STACK_CARDS[1].color,
          border: `3px solid ${STACK_CARDS[1].border}`,
          boxShadow: `0 8px 32px ${STACK_CARDS[1].border}30`,
        }}
      >
        <div className="absolute inset-0 dot-grid opacity-40 rounded-2xl" />
        <div className="absolute bottom-4 left-4 right-4">
          <p className="font-heading font-bold text-sm text-text/60">{STACK_CARDS[1].label}</p>
        </div>
      </motion.div>

      {/* Card 1 — front */}
      <motion.div
        initial={{ rotate: -4, x: -10, y: 28 }}
        animate={{ rotate: -4, x: -10, y: 28 }}
        whileHover={{ rotate: -6, x: -16, y: 34, transition: { duration: 0.3 } }}
        className="relative w-56 md:w-72 aspect-[3/4] rounded-2xl overflow-hidden"
        style={{
          backgroundColor: STACK_CARDS[0].color,
          border: `3px solid ${STACK_CARDS[0].border}`,
          boxShadow: `0 16px 48px ${STACK_CARDS[0].border}40`,
        }}
      >
        {/* Placeholder text watermark */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="font-heading font-bold text-[5rem] leading-none select-none opacity-8 text-text"
          >
            RC
          </span>
        </div>
        <div className="absolute inset-0 dot-grid opacity-30 rounded-2xl" />
        {/* Bottom label */}
        <div
          className="absolute bottom-0 left-0 right-0 px-4 pb-4 pt-8"
          style={{ background: `linear-gradient(to top, ${STACK_CARDS[0].color}, transparent)` }}
        >
          <p className="font-heading font-bold text-sm text-text/80">{STACK_CARDS[0].label}</p>
          <p className="font-sans text-xs text-text-muted mt-0.5">RCTNE × 2024</p>
        </div>
        {/* Corner sticker */}
        <div
          className="absolute top-4 right-4 px-2.5 py-1 rounded-full text-[10px] font-heading font-bold uppercase tracking-wider text-background"
          style={{ backgroundColor: STACK_CARDS[0].border }}
        >
          Service
        </div>
      </motion.div>
    </div>
  );
}

export function HomeHero() {
  const [content, setContent] = useState<HeroContent | null>(null);

  useEffect(() => {
    contentService.getHero().then(setContent);
  }, []);

  const scrollToNext = () => {
    const next = document.getElementById("about-brief");
    if (next) {
      next.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      data-section="home"
      className="relative min-h-screen flex items-center px-6 md:px-16 lg:px-24 pt-24 pb-16 overflow-hidden"
    >
      {/* Ambient background glows */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 right-[30%] w-[50vw] h-[60vh] bg-accent/7 rounded-full blur-[130px]" />
        <div className="absolute bottom-0 left-0 w-[40vw] h-[50vh] bg-accent-secondary/5 rounded-full blur-[110px]" />
      </div>

      <div className="max-w-5xl mx-auto w-full grid md:grid-cols-[1fr_auto] gap-12 md:gap-16 items-center">

        {/* LEFT: Text content */}
        <div className="flex flex-col gap-5">

          {/* Eyebrow */}
          <BlurFade delay={0.05} inView>
            <div className={cn(
              "inline-flex items-center rounded-full border border-accent/30 bg-accent/8 px-4 py-1.5 w-fit"
            )}>
              <AnimatedShinyText className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-accent">
                ✦ Rotaract Club of Thane North End
              </AnimatedShinyText>
            </div>
          </BlurFade>

          {/* Headline */}
          <div className="flex flex-col gap-1">
            <BlurFade delay={0.15} inView>
              <h1 className="font-heading font-bold text-[clamp(2.8rem,6.5vw,5.8rem)] text-text leading-[1.0] tracking-tight">
                Every beginning
              </h1>
            </BlurFade>
            <BlurFade delay={0.22} inView>
              <h1 className="font-heading font-bold text-[clamp(2.8rem,6.5vw,5.8rem)] text-text leading-[1.0] tracking-tight">
                holds a chance to
              </h1>
            </BlurFade>
            <BlurFade delay={0.3} inView>
              <h1 className="font-heading font-bold text-[clamp(2.8rem,6.5vw,5.8rem)] leading-[1.0] tracking-tight">
                <CyclingWord />
              </h1>
            </BlurFade>
          </div>

          {/* Subtext */}
          <BlurFade delay={0.42} inView>
            <p className="font-sans text-base md:text-lg text-text-muted max-w-md leading-relaxed">
              {content?.subtext ?? "A community of young leaders turning ideas into action, and action into lasting change."}
            </p>
          </BlurFade>

          {/* CTAs */}
          <BlurFade delay={0.54} inView>
            <div className="flex flex-wrap items-center gap-4">
              <motion.a
                href="/projects"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 bg-accent text-background font-heading font-bold px-7 py-3.5 rounded-full text-sm tracking-wide hover:bg-accent/90 transition-colors"
              >
                Our Projects
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.a>
              <motion.a
                href="/about"
                whileHover={{ x: 3 }}
                className="font-sans text-sm text-text-muted hover:text-accent transition-colors flex items-center gap-1.5"
              >
                Learn about us
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.a>
            </div>
          </BlurFade>
        </div>

        {/* RIGHT: Stacked image cards */}
        <BlurFade delay={0.35} inView>
          <div className="hidden md:block w-[340px] h-[420px] relative">
            <StackedImages />
          </div>
        </BlurFade>
      </div>

      {/* Scroll cue */}
      <button
        onClick={scrollToNext}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer hover:opacity-70 transition-opacity"
        aria-label="Scroll to next section"
      >
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border-2 border-border/60 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-accent/60" />
        </motion.div>
        <span className="font-sans text-[10px] text-text-muted/50 uppercase tracking-[0.2em]">Scroll</span>
      </button>
    </section>
  );
}
