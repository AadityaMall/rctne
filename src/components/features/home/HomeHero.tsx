"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
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

function EmblemPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex items-center justify-center"
    >
      {/* Atmospheric glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 55%, oklch(62% 0.17 40 / 0.18) 0%, transparent 65%)",
          filter: "blur(48px)",
        }}
      />

      {/* Emblem */}
      <div className="relative w-[260px] md:w-[300px] xl:w-[360px]">
        <Image
          src="/images/theme/aagaz-emblem.png"
          alt="Aagaz '26–27 — Rotaract Club of Thane North End"
          width={680}
          height={680}
          className="w-full h-auto object-contain drop-shadow-2xl"
          priority
        />

        {/* Floating badges */}
        <span className="float-slow absolute -top-3 right-0 px-3 py-1.5 rounded-full text-[10px] font-heading font-bold uppercase tracking-widest text-background bg-accent shadow-lg">
          Aagaz &#x2019;26–27
        </span>
        <span className="float-slow-offset absolute -bottom-3 left-0 px-3 py-1.5 rounded-full text-[10px] font-heading font-bold uppercase tracking-widest text-accent border border-accent/30 bg-background shadow-lg">
          RCTNE
        </span>
      </div>
    </motion.div>
  );
}

export function HomeHero() {
  const [content, setContent] = useState<HeroContent | null>(null);

  useEffect(() => {
    contentService.getHero().then(setContent);
  }, []);

  return (
    <section
      id="home"
      data-section="home"
      className="relative min-h-screen flex flex-col overflow-hidden"
    >
      {/* Ambient background glows */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-[-5%] right-[15%] w-[45vw] h-[55vh] bg-accent/7 rounded-full blur-[90px]" />
        <div className="absolute bottom-[20%] left-[-5%] w-[35vw] h-[45vh] bg-accent-secondary/5 rounded-full blur-[80px]" />
      </div>

      {/* Main content — vertically centered */}
      <div className="flex-1 flex items-center px-6 md:px-16 lg:px-24 pt-28 pb-24">
        <div className="max-w-6xl mx-auto w-full grid md:grid-cols-[5fr_4fr] gap-10 md:gap-12 items-center">

          {/* LEFT: Text content */}
          <div className="flex flex-col gap-6">

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

            <div className="flex flex-col gap-0.5">
              <BlurFade delay={0.15} inView>
                <h1 className="font-heading font-bold text-[clamp(2.4rem,4.8vw,4.5rem)] text-text leading-[1.05] tracking-tight">
                  Every beginning
                </h1>
              </BlurFade>
              <BlurFade delay={0.22} inView>
                <h1 className="font-heading font-bold text-[clamp(2.4rem,4.8vw,4.5rem)] text-text leading-[1.05] tracking-tight">
                  holds a chance to
                </h1>
              </BlurFade>
              <BlurFade delay={0.3} inView>
                <h1 className="font-heading font-bold text-[clamp(2.4rem,4.8vw,4.5rem)] leading-[1.05] tracking-tight">
                  <CyclingWord />
                </h1>
              </BlurFade>
            </div>

            <BlurFade delay={0.42} inView>
              <p className="font-sans text-base md:text-lg text-text-muted max-w-sm leading-relaxed">
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

          {/* RIGHT: Emblem */}
          <div className="hidden md:flex items-center justify-center">
            <EmblemPanel />
          </div>
        </div>
      </div>

      {/* Scroll cue — pinned to bottom of viewport */}
      <div className="pb-10 flex justify-center">
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <ChevronDown size={18} className="text-text-muted/50" aria-hidden />
          <span className="font-sans text-[10px] text-text-muted/40 uppercase tracking-[0.2em]">Scroll</span>
        </motion.div>
      </div>
    </section>
  );
}
