"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";
import { ArrowLeft, ArrowDown, X, Play } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { contentService } from "@/services/content.service";
import { BlurFade } from "@/components/ui/blur-fade";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { BorderBeam } from "@/components/ui/border-beam";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/content.types";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Color palette — presentation concern only, never in data
const PROJECT_PALETTE = [
  "oklch(62% 0.17 40)",   // coral
  "oklch(55% 0.14 148)",  // sage green
  "oklch(57% 0.14 260)",  // periwinkle
  "oklch(60% 0.15 20)",   // sienna
  "oklch(62% 0.14 150)",  // forest
  "oklch(57% 0.14 280)",  // violet
];

/*
  Each card is positioned with top: 10%.
  Transform-origin: top center — scaling anchors at the card's own top edge
  so when cards scale down they stay pinned at their peek strip position.
*/
function FullProjectCard({
  project,
  index,
  flip,
  color,
}: {
  project: Project;
  index: number;
  flip: boolean;
  color: string;
}) {
  const [reelPlaying, setReelPlaying] = useState(false);
  const hasImage = !!project.image;

  const reelMatch = project.instagramUrl?.match(/\/(reel|p)\/([A-Za-z0-9_-]+)/);
  const shortcode = reelMatch?.[2] ?? "";
  const embedUrl = shortcode
    ? `https://www.instagram.com/reel/${shortcode}/embed/?autoplay=1`
    : null;

  return (
    <div
      className="project-full-card absolute left-[4%] right-[4%] top-[10%] bottom-[4%] overflow-hidden"
      style={{
        transformOrigin: "top center",
        borderRadius: "20px",
        boxShadow: "0 4px 40px oklch(0% 0 0 / 0.14), 0 1px 0 oklch(100% 0 0 / 0.08) inset",
      }}
    >
      <div className="absolute inset-0 bg-background" />

      {/* Colored top accent strip */}
      <div
        className="absolute top-0 left-0 right-0 h-1.5 z-10"
        style={{ backgroundColor: color }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at ${flip ? "75% 50%" : "25% 50%"}, ${color}14, transparent 60%)`,
        }}
      />

      {/* Peek strip label — visible when card is stacked behind */}
      <div
        className="absolute top-0 left-0 right-0 h-[7vh] flex items-center px-6 md:px-10 gap-3 z-10"
        style={{ background: `linear-gradient(to bottom, ${color}10, transparent)` }}
      >
        <span
          className="font-heading font-bold text-xs uppercase tracking-[0.18em]"
          style={{ color }}
        >
          {project.title}
        </span>
        <span
          className="inline-flex items-center gap-1 font-sans text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
          style={{ backgroundColor: `${color}20`, color }}
        >
          {project.category}
        </span>
      </div>

      {/* Main content grid */}
      <div
        className={cn(
          "relative z-10 h-full max-w-5xl mx-auto px-6 md:px-12 grid gap-6 md:gap-12 items-center pt-[7vh] md:grid-cols-2",
          flip && "md:[direction:rtl]"
        )}
      >
        {/* Text side */}
        <div className={cn("flex flex-col gap-4 py-6", flip && "md:[direction:ltr]")}>
          <div className="flex items-start gap-3">
            <span className="font-heading font-bold text-[4rem] leading-[0.85] text-text/[0.5] select-none tabular-nums shrink-0">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="flex flex-col gap-2 pt-1">
              <span
                className="inline-flex items-center gap-1.5 w-fit font-sans text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                style={{ backgroundColor: `${color}20`, color }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
                {project.category}
              </span>
            </div>
          </div>

          <h2 className="font-heading font-bold text-[clamp(1.6rem,3.2vw,2.8rem)] text-text leading-[1.05] tracking-tight">
            {project.title}
          </h2>

          <p className="font-sans text-sm md:text-base text-text-muted leading-relaxed max-w-[38ch]">
            {project.detail}
          </p>

          {/* Month + season tag — replaces the old year + status row */}
          <div className="flex items-center gap-3 pt-2">
            <span
              className="font-heading font-bold text-sm tabular-nums px-2.5 py-1 rounded-full"
              style={{ backgroundColor: `${color}18`, color }}
            >
              {project.month}
            </span>
            <span className="w-1 h-1 rounded-full bg-border/60" />
            <span className="font-sans text-xs text-text-muted/50 tracking-wide">
              RCTNE × Aagaz &apos;26–27
            </span>
          </div>
        </div>

        {/*
          Visual side.

          BorderBeam fix:
          ─ Outer wrapper: relative, rounded, NO overflow-hidden
            → the beam's motion div travels the full perimeter unclipped.
          ─ Inner div: overflow-hidden, rounded 10px (2px inset from outer 12px)
            → keeps the photo / iframe perfectly inside the corners.
        */}
        <div
          className={cn("relative hidden md:block h-[46vh]", flip && "md:[direction:ltr]")}
          style={{ borderRadius: "12px", border: `2px solid ${color}40` }}
        >
          {/* Inner content box — overflow-hidden clips image/iframe to rounded corners */}
          <div
            className={cn(
              "absolute inset-0 rounded-[10px] overflow-hidden",
              !reelPlaying && embedUrl && "cursor-pointer group"
            )}
            style={{ backgroundColor: `${color}12` }}
            onClick={() => !reelPlaying && embedUrl && setReelPlaying(true)}
          >
            {/* Dot-grid texture */}
            <div className="absolute inset-0 dot-grid opacity-40 z-0" />

            {/* Number watermark */}
            <span
              className="absolute inset-0 flex items-center justify-center font-heading font-bold leading-none select-none pointer-events-none z-0"
              style={{ fontSize: "clamp(7rem,18vw,14rem)", color: `${color}0a` }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>

            {reelPlaying && embedUrl ? (
              <>
                <iframe
                  src={embedUrl}
                  className="absolute inset-0 w-full h-full border-0 z-20"
                  allowFullScreen
                  loading="eager"
                  title={`${project.title} Instagram Reel`}
                />
                <button
                  onClick={(e) => { e.stopPropagation(); setReelPlaying(false); }}
                  className="absolute top-3 right-3 z-30 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white text-xs font-heading font-bold backdrop-blur-md transition-opacity hover:opacity-80"
                  style={{ backgroundColor: "rgba(0,0,0,0.60)" }}
                >
                  <X size={11} /> Close
                </button>
              </>
            ) : hasImage ? (
              <>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover z-10 p-[4px] pt-0 rounded-[12px]"
                  sizes="(max-width: 768px) 0vw, 50vw"
                />

                {/* Top color strip */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 z-20"
                  style={{ backgroundColor: color }}
                />

                {/* Bottom scrim */}
                <div
                  className="absolute bottom-0 left-0 right-0 p-5 z-20"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)" }}
                >
                  <p className="font-heading font-bold text-xs uppercase tracking-[0.18em] text-white">
                    {project.category}
                  </p>
                  <p className="font-sans text-xs text-white/70 mt-1">{project.title}</p>
                </div>

                {/* Play overlay — only for projects with an Instagram reel */}
                {embedUrl && (
                  <div
                    className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/25"
                    onClick={() => setReelPlaying(true)}
                  >
                    <div
                      className="flex items-center gap-2 px-5 py-3 rounded-full font-heading font-bold text-sm text-white backdrop-blur-sm shadow-lg"
                      style={{ backgroundColor: `${color}dd` }}
                    >
                      <Play size={16} fill="white" />
                      Watch Reel
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                {/* Top color strip */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 z-10"
                  style={{ backgroundColor: color }}
                />

                {/* Bottom label */}
                <div
                  className="absolute bottom-0 left-0 right-0 p-5 z-10"
                  style={{ background: `linear-gradient(to top, ${color}28, transparent)` }}
                >
                  <p
                    className="font-heading font-bold text-xs uppercase tracking-[0.18em]"
                    style={{ color: color }}
                  >
                    {project.category}
                  </p>
                  <p className="font-sans text-xs text-text-muted mt-1">{project.title}</p>
                </div>
              </>
            )}
          </div>

          {/* BorderBeam lives on the outer wrapper — not clipped by overflow-hidden */}
          <BorderBeam
            size={220}
            duration={4}
            colorFrom={color}
            colorTo={`${color}00`}
            borderWidth={2}
          />
        </div>
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    contentService.getProjects().then(setProjects);
  }, []);

  // Lenis scroll-snap: snap to nearest full card (100vh) on scroll stop
  const snapTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastSnapRef = useRef<number>(-1);

  const snapToCard = useCallback(
    (lenis: ReturnType<typeof useLenis>) => {
      if (!lenis || !wrapperRef.current || !projects.length) return;
      const wrapperTop = wrapperRef.current.getBoundingClientRect().top + window.scrollY;
      const scrollY = window.scrollY;
      const relativeScroll = scrollY - wrapperTop;
      const vh = window.innerHeight;
      const cardIndex = Math.round(relativeScroll / vh);
      const clampedIndex = Math.max(0, Math.min(cardIndex, projects.length - 1));
      const targetY = wrapperTop + clampedIndex * vh;

      if (Math.abs(scrollY - targetY) > 8 && lastSnapRef.current !== clampedIndex) {
        lastSnapRef.current = clampedIndex;
        lenis.scrollTo(targetY, { duration: 0.7, easing: (t: number) => 1 - Math.pow(1 - t, 3) });
      }
    },
    [projects.length]
  );

  const lenis = useLenis(({ scroll: _ }) => {
    if (snapTimeoutRef.current) clearTimeout(snapTimeoutRef.current);
    snapTimeoutRef.current = setTimeout(() => {
      // @ts-expect-error — lenis instance stored globally for timeout callback
      snapToCard(window.__lenis);
    }, 180);
  });

  useEffect(() => {
    if (lenis) {
      // @ts-expect-error
      window.__lenis = lenis;
    }
    return () => {
      if (snapTimeoutRef.current) clearTimeout(snapTimeoutRef.current);
    };
  }, [lenis]);

  useGSAP(
    () => {
      if (!projects.length || !wrapperRef.current || !stickyRef.current) return;

      ScrollTrigger.getAll().forEach((t) => t.kill());

      const N = projects.length;
      if (N <= 1) return;

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const cards = gsap.utils.toArray<HTMLElement>(".project-full-card", stickyRef.current);

      cards.forEach((card, i) => {
        if (i === 0) {
          gsap.set(card, { yPercent: 0, y: 0, scale: 1, opacity: 1, zIndex: N });
        } else {
          gsap.set(card, { yPercent: 100, y: 0, scale: 1, opacity: 1, zIndex: N - i });
        }
      });

      if (prefersReducedMotion) return;

      ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.7,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const fracActive = self.progress * (N - 1);
          setActiveCardIndex(Math.round(fracActive));

          cards.forEach((card, i) => {
            const depth = fracActive - i;

            if (depth <= -1) {
              gsap.set(card, {
                yPercent: 100,
                y: 0,
                scale: 1,
                opacity: 1,
                zIndex: Math.max(1, N - i),
              });
            } else if (depth < 0) {
              const enterP = 1 + depth;
              gsap.set(card, {
                yPercent: (1 - enterP) * 100,
                y: 0,
                scale: 1,
                opacity: 1,
                zIndex: N + 1,
              });
            } else {
              const d = depth;
              const MAX = 6;

              if (d >= MAX) {
                gsap.set(card, {
                  yPercent: 0,
                  y: -(MAX * 14),
                  scale: 1 - MAX * 0.06,
                  opacity: 0,
                  zIndex: 0,
                });
                return;
              }

              gsap.set(card, {
                yPercent: 0,
                y: -(d * 14),
                scale: 1 - d * 0.06,
                opacity: Math.max(0, 1 - d * 0.18),
                zIndex: Math.max(1, N - Math.floor(d)),
              });
            }
          });
        },
      });

      return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    },
    { dependencies: [projects] }
  );

  return (
    <main className="min-h-screen bg-background">

      {/* Page header */}
      <div className="max-w-5xl mx-auto px-6 md:px-16 pt-28 pb-16">
        <BlurFade delay={0.05} inView>
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-sans text-sm text-text-muted hover:text-accent transition-colors mb-8 w-fit"
          >
            <ArrowLeft size={14} /> Home
          </Link>
        </BlurFade>

        <BlurFade delay={0.12} inView>
          <div className="inline-flex items-center rounded-full border border-accent/30 bg-accent/8 px-4 py-1.5 mb-4">
            <AnimatedShinyText className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-accent">
              ✦ Aagaz &apos;26–27 — Our Work
            </AnimatedShinyText>
          </div>
          <h1 className="font-heading font-bold text-[clamp(2.5rem,7vw,5.5rem)] text-text leading-[0.98] tracking-tight">
            Projects that<br />moved the needle.
          </h1>
        </BlurFade>

        <BlurFade delay={0.22} inView>
          <p className="font-sans text-base md:text-lg text-text-muted max-w-lg mt-5 leading-relaxed">
            Every beginning holds endless possibilities — and every project here
            is proof of what youth can do when they choose to act.
          </p>
        </BlurFade>

        {/* Stats — total count + season label, no status breakdown */}
        <BlurFade delay={0.3} inView>
          <div className="flex items-center gap-6 mt-8">
            <div className="flex flex-col">
              <span className="font-heading font-bold text-3xl text-text">{projects.length}</span>
              <span className="font-sans text-xs text-text-muted uppercase tracking-wider">Projects</span>
            </div>
            <div className="w-px h-10 bg-border" />
            <div className="flex flex-col">
              <span className="font-heading font-bold text-3xl text-accent">26–27</span>
              <span className="font-sans text-xs text-text-muted uppercase tracking-wider">Season</span>
            </div>
          </div>
        </BlurFade>
      </div>

      {/* Scroll hint */}
      <BlurFade delay={0.4} inView>
        <div className="max-w-5xl mx-auto px-6 md:px-16 pb-6 flex items-center gap-2 text-text-muted/50">
          <span className="font-sans text-xs uppercase tracking-widest">Scroll to explore</span>
          <ArrowDown size={14} aria-hidden />
        </div>
      </BlurFade>

      {/* Scroll wrapper: each project card occupies 100vh */}
      <div
        ref={wrapperRef}
        style={{ height: `${Math.max(projects.length, 1) * 100}vh` }}
      >
        <div
          ref={stickyRef}
          className="sticky top-0 h-screen overflow-hidden bg-background"
        >
          {projects.map((project, i) => (
            <FullProjectCard
              key={project.id}
              project={project}
              index={i}
              flip={i % 2 === 1}
              color={PROJECT_PALETTE[i % PROJECT_PALETTE.length]}
            />
          ))}

          {/* Progress dots */}
          <div className="absolute right-5 top-1/2 -translate-y-1/2 z-[200] flex flex-col gap-2 pointer-events-none">
            {projects.map((_, i) => (
              <div
                key={i}
                className="w-1.5 rounded-full transition-all duration-300"
                style={{
                  height: i === activeCardIndex ? 28 : 6,
                  backgroundColor: i === activeCardIndex
                    ? PROJECT_PALETTE[i % PROJECT_PALETTE.length]
                    : "oklch(50% 0 0 / 0.15)",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="h-24 flex items-center justify-center border-t border-border/30">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-sans text-sm text-text-muted hover:text-accent transition-colors"
        >
          <ArrowLeft size={14} /> Back to home
        </Link>
      </div>

    </main>
  );
}
