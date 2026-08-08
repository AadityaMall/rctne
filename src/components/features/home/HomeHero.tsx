"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { contentService } from "@/services/content.service";
import { BlurFade } from "@/components/ui/blur-fade";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { cn } from "@/lib/utils";
import type { HeroContent } from "@/types/content.types";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ACTION_WORDS = ["Serve.", "Lead.", "Build.", "Connect.", "Change."];

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

/*
  AagazLogoReveal — GSAP-only, Lenis-synced.

  On mount: logo assembles from scattered fragments (CSS clip-path grid tiles
  that fly in from random directions → converge to form the logo).
  On scroll: GSAP ScrollTrigger handles parallax exit (scale up + fade out),
  fully in sync with Lenis because SmoothScroller drives GSAP ticker.

  No Framer Motion useScroll — eliminates the scroll-system conflict.
*/
function AagazLogoReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const tilesRef = useRef<HTMLDivElement[]>([]);

  // Grid dimensions for the scatter effect
  const COLS = 5;
  const ROWS = 5;
  const TILE_COUNT = COLS * ROWS;

  // Register tiles ref
  const setTileRef = (el: HTMLDivElement | null, i: number) => {
    if (el) tilesRef.current[i] = el;
  };

  useGSAP(
    () => {
      if (!logoRef.current || !containerRef.current) return;

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const tiles = tilesRef.current;

      if (prefersReducedMotion) {
        // Skip scatter: show logo immediately
        gsap.set(logoRef.current, { opacity: 1, scale: 1 });
        tiles.forEach((t) => t && gsap.set(t, { opacity: 0 }));
      } else {
        // ── Phase 1: Scatter-assemble on mount ──
        // Start: tiles are scattered, logo is invisible
        gsap.set(logoRef.current, { opacity: 0, scale: 0.85 });
        gsap.set(glowRef.current, { opacity: 0 });

        // Each tile starts at a random offset from its true position
        tiles.forEach((tile) => {
          if (!tile) return;
          const angle = Math.random() * Math.PI * 2;
          const dist = 80 + Math.random() * 140;
          gsap.set(tile, {
            x: Math.cos(angle) * dist,
            y: Math.sin(angle) * dist,
            rotation: (Math.random() - 0.5) * 60,
            opacity: 0,
            scale: 0.4 + Math.random() * 0.6,
          });
        });

        // Stagger tiles converging to origin
        const tl = gsap.timeline({ delay: 0.25 });

        tl.to(tiles, {
          x: 0,
          y: 0,
          rotation: 0,
          opacity: 1,
          scale: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: {
            amount: 0.45,
            from: "random",
          },
        });

        // As tiles converge, fade in the real logo underneath
        tl.to(
          logoRef.current,
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.35"
        );

        // Fade out tiles revealing clean logo
        tl.to(
          tiles,
          {
            opacity: 0,
            duration: 0.35,
            ease: "power2.in",
            stagger: { amount: 0.2, from: "random" },
          },
          "-=0.25"
        );

        // Glow fade in
        tl.to(
          glowRef.current,
          { opacity: 1, duration: 0.6, ease: "power2.out" },
          "-=0.5"
        );
      }

      // ── Phase 2: GSAP ScrollTrigger scroll-exit (Lenis-synced via bridge) ──
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "80% top",
        scrub: 1.2,
        onUpdate: (self) => {
          const p = self.progress;
          if (!logoRef.current) return;
          // Scale up gently as page scrolls, then fade
          const scale = 1 + p * 0.35;
          const opacity = p < 0.5 ? 1 : 1 - (p - 0.5) * 2;
          const y = p * -40;
          gsap.set(logoRef.current, {
            scale,
            opacity: Math.max(0, opacity),
            y,
            willChange: "transform, opacity",
          });
          if (glowRef.current) {
            gsap.set(glowRef.current, { opacity: Math.max(0, (1 - p) * 0.7) });
          }
        },
      });

      return () => {
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="hidden md:block absolute right-0 top-0 h-full w-[50%] pointer-events-none"
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-visible">

        {/* Atmospheric glow — GSAP-controlled opacity */}
        <div ref={glowRef} className="absolute inset-0 pointer-events-none" style={{ opacity: 0 }}>
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full"
            style={{
              background: "radial-gradient(circle, oklch(62% 0.17 40 / 0.25) 0%, transparent 68%)",
              filter: "blur(70px)",
            }}
          />
        </div>

        {/* Scatter tiles overlay — same size as logo, grid of clips */}
        <div className="absolute w-[340px] xl:w-[420px] aspect-square" style={{ opacity: 1 }}>
          {Array.from({ length: TILE_COUNT }).map((_, i) => {
            const col = i % COLS;
            const row = Math.floor(i / COLS);
            const pctW = 100 / COLS;
            const pctH = 100 / ROWS;
            return (
              <div
                key={i}
                ref={(el) => setTileRef(el, i)}
                className="absolute"
                style={{
                  width: `${pctW}%`,
                  height: `${pctH}%`,
                  left: `${col * pctW}%`,
                  top: `${row * pctH}%`,
                  overflow: "hidden",
                  opacity: 0,
                  willChange: "transform, opacity",
                }}
              >
                {/* Each tile shows the logo cropped to its cell */}
                <div
                  style={{
                    position: "absolute",
                    width: `${COLS * 100}%`,
                    height: `${ROWS * 100}%`,
                    left: `-${col * 100}%`,
                    top: `-${row * 100}%`,
                  }}
                >
                  <Image
                    src="/images/theme/aagaz-emblem.png"
                    alt=""
                    fill
                    className="object-contain"
                    priority
                    aria-hidden
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* The real logo — fades in as tiles converge */}
        <div
          ref={logoRef}
          className="relative w-[340px] xl:w-[420px]"
          style={{ opacity: 0, willChange: "transform, opacity" }}
        >
          <Image
            src="/images/theme/aagaz-emblem.png"
            alt="Aagaz '26–27 — Rotaract Club of Thane North End"
            width={680}
            height={680}
            className="w-full h-auto object-contain drop-shadow-2xl"
            priority
          />

          {/* Floating badges — CSS keyframes, zero JS cost */}
          <span className="float-slow absolute -top-3 -right-3 px-3 py-1.5 rounded-full text-[10px] font-heading font-bold uppercase tracking-widest text-background bg-accent shadow-lg">
            Aagaz &#x2019;26–27
          </span>
          <span className="float-slow-offset absolute -bottom-3 -left-3 px-3 py-1.5 rounded-full text-[10px] font-heading font-bold uppercase tracking-widest text-accent border border-accent/30 bg-background shadow-lg">
            RCTNE
          </span>
        </div>
      </div>
    </div>
  );
}

export function HomeHero() {
  const [content, setContent] = useState<HeroContent | null>(null);

  useEffect(() => {
    contentService.getHero().then(setContent);
  }, []);

  return (
    // Hero is 180vh tall — extra height is the scroll canvas for the exit animation
    <section
      id="home"
      data-section="home"
      className="relative min-h-[180vh] overflow-hidden"
    >
      {/* Ambient background glows */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 right-[20%] w-[40vw] h-[50vh] bg-accent/6 rounded-full blur-[80px]" />
        <div className="absolute bottom-[30%] left-0 w-[30vw] h-[40vh] bg-accent-secondary/4 rounded-full blur-[70px]" />
      </div>

      {/* Sticky text panel */}
      <div className="sticky top-0 min-h-screen flex items-center px-6 md:px-16 lg:px-24 pt-24 pb-16">
        <div className="max-w-5xl mx-auto w-full grid md:grid-cols-[1fr_auto] gap-12 md:gap-16 items-center">

          {/* LEFT: Text content */}
          <div className="flex flex-col gap-5">

            <BlurFade delay={0.05} inView>
              <div className="flex flex-col gap-2">
                <div className={cn(
                  "inline-flex items-center rounded-full border border-accent/30 bg-accent/8 px-4 py-1.5 w-fit"
                )}>
                  <AnimatedShinyText className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-accent">
                    ✦ Rotaract Club of Thane North End
                  </AnimatedShinyText>
                </div>
                <div className="inline-flex items-center gap-2 w-fit">
                  <span className="w-1 h-1 rounded-full bg-accent/50" />
                  <span className="font-sans text-xs text-text-muted tracking-wide">
                    Aagaz &apos;26–27 — Every Beginning Holds Endless Possibilities
                  </span>
                </div>
              </div>
            </BlurFade>

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

            <BlurFade delay={0.42} inView>
              <p className="font-sans text-base md:text-lg text-text-muted max-w-md leading-relaxed">
                {content?.subtext ?? "A community of young leaders turning ideas into action, and action into lasting change."}
              </p>
            </BlurFade>

            <BlurFade delay={0.54} inView>
              <div className="flex flex-wrap items-center gap-4">
                <motion.a
                  href="/projects"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 bg-accent text-background font-heading font-bold px-7 py-3.5 rounded-full text-sm tracking-wide hover:bg-accent/90 transition-colors"
                >
                  Our Projects
                  <ArrowRight size={14} aria-hidden />
                </motion.a>
                <motion.a
                  href="/about"
                  whileHover={{ x: 3 }}
                  className="font-sans text-sm text-text-muted hover:text-accent transition-colors flex items-center gap-1.5"
                >
                  Learn about us
                  <ArrowRight size={13} aria-hidden />
                </motion.a>
              </div>
            </BlurFade>
          </div>

          {/* RIGHT: spacer to keep grid balanced — logo is absolutely positioned */}
          <div className="hidden md:block w-[340px] xl:w-[420px]" />
        </div>
      </div>

      {/* Scroll-driven GSAP logo (Lenis-synced, no Framer Motion scroll hooks) */}
      <AagazLogoReveal />

      {/* Scroll cue — inside sticky panel via absolute positioning */}
      <div className="sticky bottom-10 left-0 right-0 flex justify-center z-10 pointer-events-none">
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 pointer-events-auto"
        >
          <div className="w-5 h-8 rounded-full border-2 border-border/60 flex items-start justify-center pt-1.5">
            <div className="w-1 h-2 rounded-full bg-accent/60" />
          </div>
          <span className="font-sans text-[10px] text-text-muted/50 uppercase tracking-[0.2em]">Scroll</span>
        </motion.div>
      </div>
    </section>
  );
}
