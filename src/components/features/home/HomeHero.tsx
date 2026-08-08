"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { contentService } from "@/services/content.service";
import { BlurFade } from "@/components/ui/blur-fade";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { cn } from "@/lib/utils";
import type { HeroContent } from "@/types/content.types";

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

function AagazScrollReveal() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Spring-smooth the raw scroll progress for buttery feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
    restDelta: 0.001,
  });

  // Transform scroll -> 3D transforms
  const scale       = useTransform(smoothProgress, [0, 0.6], [1, 1.85]);
  const opacity     = useTransform(smoothProgress, [0, 0.45, 0.7], [1, 0.9, 0]);
  const rotateX     = useTransform(smoothProgress, [0, 0.6], [0, 12]);
  const glowOpacity = useTransform(smoothProgress, [0, 0.5], [0.5, 0]);

  return (
    // Sticky scroll container — 180vh gives the animation room to breathe
    <div ref={containerRef} className="hidden md:block absolute right-0 top-0 h-full w-[50%] pointer-events-none">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Atmospheric glow */}
        <motion.div
          style={{ opacity: glowOpacity }}
          className="absolute inset-0 pointer-events-none"
        >
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full"
            style={{
              background: "radial-gradient(circle, oklch(62% 0.17 40 / 0.3) 0%, transparent 70%)",
              filter: "blur(80px)",
            }}
          />
        </motion.div>

        {/* The logo — scroll-driven 3D reveal */}
        <motion.div
          style={{
            scale,
            opacity,
            rotateX,
            transformPerspective: 1200,
            willChange: "transform, opacity",
          }}
        >
          <BlurFade delay={0.35} inView>
            <div className="relative w-[340px] xl:w-[420px]">
              {/* Aagaz emblem — transparent bg, no card frame */}
              <Image
                src="/images/theme/aagaz-emblem.png"
                alt="Aagaz '25 — Rotaract Club of Thane North End"
                width={680}
                height={680}
                className="w-full h-auto object-contain drop-shadow-2xl"
                priority
              />

              {/* Floating badges — CSS keyframes, no JS animation loop */}
              <span className="absolute -top-3 -right-3 px-3 py-1.5 rounded-full text-[10px] font-heading font-bold uppercase tracking-widest text-background bg-accent shadow-lg [animation:float-slow_4s_ease-in-out_infinite]">
                Aagaz &#x2019;25
              </span>
              <span className="absolute -bottom-3 -left-3 px-3 py-1.5 rounded-full text-[10px] font-heading font-bold uppercase tracking-widest text-accent border border-accent/30 bg-background shadow-lg [animation:float-slow_4s_ease-in-out_infinite_1s]">
                RCTNE
              </span>
            </div>
          </BlurFade>
        </motion.div>
      </div>
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
    // Hero is 180vh tall — extra height is the scroll canvas for the 3D reveal
    <section
      id="home"
      data-section="home"
      className="relative min-h-[180vh] overflow-hidden"
    >
      {/* Ambient background glows — smaller radii for performance */}
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
                    Aagaz &apos;25 — Every Beginning Holds Endless Possibilities
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

          {/* RIGHT: spacer column to keep grid balanced */}
          <div className="hidden md:block w-[340px] xl:w-[420px]" />
        </div>
      </div>

      {/* Scroll-driven 3D Aagaz logo — absolute, layers above */}
      <AagazScrollReveal />

      {/* Scroll cue */}
      <button
        onClick={scrollToNext}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer hover:opacity-70 transition-opacity z-10"
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
