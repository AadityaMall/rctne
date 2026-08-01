"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowLeft, X, Play } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { contentService } from "@/services/content.service";
import { BlurFade } from "@/components/ui/blur-fade";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { BorderBeam } from "@/components/ui/border-beam";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/content.types";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const STATUS_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  upcoming: { bg: "oklch(92% 0.025 250)", text: "oklch(57% 0.14 260)", label: "Upcoming" },
  completed: { bg: "oklch(94% 0.01 70)", text: "oklch(48% 0.02 50)", label: "Completed" },
};

/*
  Each card is positioned with an 8% top margin (the "peek zone").
  This means the top 8% of the sticky container is always empty —
  where previous (stacked) cards show their header strip, creating
  the "deck of cards" visual.

  transform-origin: top center — scaling anchors at the card's own top edge,
  so when cards scale down they stay pinned at their peek strip position.
*/
function FullProjectCard({
  project,
  index,
  flip,
}: {
  project: Project;
  index: number;
  flip: boolean;
}) {
  const [reelPlaying, setReelPlaying] = useState(false);
  const status = STATUS_STYLES[project.status ?? "completed"];
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

      {/* Colored top accent strip — visible in the peek zone when stacked */}
      <div
        className="absolute top-0 left-0 right-0 h-1.5 z-10"
        style={{ backgroundColor: project.color }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at ${flip ? "75% 50%" : "25% 50%"}, ${project.color}14, transparent 60%)`,
        }}
      />

      {/* Peek strip label: visible when this card is in the stack behind another */}
      <div
        className="absolute top-0 left-0 right-0 h-[7vh] flex items-center px-6 md:px-10 gap-3 z-10"
        style={{ background: `linear-gradient(to bottom, ${project.color}10, transparent)` }}
      >
        <span
          className="font-heading font-bold text-xs uppercase tracking-[0.18em]"
          style={{ color: project.color }}
        >
          {project.title}
        </span>
        <span
          className="inline-flex items-center gap-1 font-sans text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
          style={{ backgroundColor: `${project.color}20`, color: project.color }}
        >
          {project.category}
        </span>
      </div>

      {/* Main content grid — always 2 cols on desktop */}
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
                style={{ backgroundColor: `${project.color}20`, color: project.color }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: project.color }} />
                {project.category}
              </span>
              <span
                className="inline-flex items-center font-sans text-[10px] font-semibold px-2.5 py-1 rounded-full w-fit"
                style={{ backgroundColor: status.bg, color: status.text }}
              >
                {status.label}
              </span>
            </div>
          </div>

          <h2 className="font-heading font-bold text-[clamp(1.6rem,3.2vw,2.8rem)] text-text leading-[1.05] tracking-tight">
            {project.title}
          </h2>

          <p className="font-sans text-sm md:text-base text-text-muted leading-relaxed max-w-[38ch]">
            {project.detail}
          </p>

          <div className="flex items-center gap-3 pt-2">
            <span className="font-heading font-bold text-sm text-text-muted tabular-nums">{project.year}</span>
            <span className="w-1 h-1 rounded-full bg-border/60" />
            <span className="font-sans text-xs text-text-muted/50 tracking-wide">
              RCTNE × Aagaz &apos;25
            </span>
          </div>
        </div>

        {/*
          Visual side — always rendered.

          BorderBeam fix:
          ─ Outer wrapper: relative, rounded, NO overflow-hidden
            → the beam's motion div travels the full perimeter unclipped.
          ─ Inner div: overflow-hidden, rounded 10px (2px inset from outer 12px)
            → keeps the photo / iframe perfectly inside the corners.
        */}
        <div
            className={cn("relative hidden md:block h-[46vh]", flip && "md:[direction:ltr]")}
            style={{ borderRadius: "12px", border: `2px solid ${project.color}40` }}
          >
            {/* Inner content box — overflow-hidden clips image/iframe to rounded corners */}
            <div
              className={cn(
                "absolute inset-0 rounded-[10px] overflow-hidden",
                !reelPlaying && embedUrl && "cursor-pointer group"
              )}
              style={{ backgroundColor: `${project.color}12` }}
              onClick={() => !reelPlaying && embedUrl && setReelPlaying(true)}
            >
              {/* Dot-grid texture */}
              <div className="absolute inset-0 dot-grid opacity-40 z-0" />

              {/* Number watermark — always sits behind */}
              <span
                className="absolute inset-0 flex items-center justify-center font-heading font-bold leading-none select-none pointer-events-none z-0"
                style={{ fontSize: "clamp(7rem,18vw,14rem)", color: `${project.color}0a` }}
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              {reelPlaying && embedUrl ? (
                /* ── Inline reel: replaces thumbnail/fallback in the same frame ── */
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
                /* ── Thumbnail (projects that have a photo) ── */
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
                    style={{ backgroundColor: project.color }}
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

                  {/* Play overlay — only for Instagram reels */}
                  {embedUrl && (
                    <div
                      className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/25"
                      onClick={() => setReelPlaying(true)}
                    >
                      <div
                        className="flex items-center gap-2 px-5 py-3 rounded-full font-heading font-bold text-sm text-white backdrop-blur-sm shadow-lg"
                        style={{ backgroundColor: `${project.color}dd` }}
                      >
                        <Play size={16} fill="white" />
                        Watch Reel
                      </div>
                    </div>
                  )}
                </>
              ) : (
                /* ── No-image fallback: big number + label (pure CSS, no <Image>) ── */
                <>
                  {/* Top color strip */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1 z-10"
                    style={{ backgroundColor: project.color }}
                  />

                  {/* Bottom label */}
                  <div
                    className="absolute bottom-0 left-0 right-0 p-5 z-10"
                    style={{ background: `linear-gradient(to top, ${project.color}28, transparent)` }}
                  >
                    <p
                      className="font-heading font-bold text-xs uppercase tracking-[0.18em]"
                      style={{ color: project.color }}
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
              colorFrom={project.color}
              colorTo={`${project.color}00`}
              borderWidth={2}
            />
          </div>
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeTab, setActiveTab] = useState<"all" | "upcoming" | "completed">("all");
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    contentService.getProjects().then(setProjects);
  }, []);

  const filtered = projects.filter((p) =>
    activeTab === "all" ? true : p.status === activeTab
  );

  const upcoming = projects.filter((p) => p.status === "upcoming").length;
  const completed = projects.filter((p) => p.status === "completed").length;

  useGSAP(
    () => {
      if (!filtered.length || !wrapperRef.current || !stickyRef.current) return;

      ScrollTrigger.getAll().forEach((t) => t.kill());

      const N = filtered.length;
      if (N <= 1) return;

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const cards = gsap.utils.toArray<HTMLElement>(".project-full-card", stickyRef.current);

      // Initial state: card 0 active, all others start below the fold
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
          /*
            fracActive: floating "which card is active/entering"
              0.0 → card 0 fully active
              0.5 → card 1 is 50% entered (halfway sliding up from below)
              1.0 → card 1 fully active
              1.7 → card 2 is 70% entered
          */
          const fracActive = self.progress * (N - 1);
          setActiveCardIndex(Math.round(fracActive));

          cards.forEach((card, i) => {
            /*
              depth relative to fracActive:
                depth < -1    → upcoming, hidden below fold
                -1 < depth<0  → currently entering from below
                depth = 0     → active
                depth > 0     → in the stack (behind active)
            */
            const depth = fracActive - i;

            if (depth <= -1) {
              // Upcoming — fully hidden below viewport
              gsap.set(card, {
                yPercent: 100,
                y: 0,
                scale: 1,
                opacity: 1,
                zIndex: Math.max(1, N - i),
              });
            } else if (depth < 0) {
              /*
                Entering card: slides up from yPercent:100 → 0.
                enterP: 0 (just starting) → 1 (fully arrived).
                This card gets the HIGHEST z-index so it slides OVER
                the current active card, physically laying on top.
              */
              const enterP = 1 + depth;
              gsap.set(card, {
                yPercent: (1 - enterP) * 100,
                y: 0,
                scale: 1,
                opacity: 1,
                zIndex: N + 1,
              });
            } else {
              /*
                In the stack:
                  d=0 → active card (on top, full size)
                  d=1 → one below: slightly scaled, peek strip visible
                  d=2 → two below: more scaled, narrower strip
                  …

                With transform-origin:top center, y:-d*PEEK moves the
                card UP so its header strip peeks into the 8% zone above
                the active card.
                Scale shrinks the card downward (anchor at top) so the
                bottom compresses, not the peek strip.
              */
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
                y: -(d * 14),       // each stacked card peeks 14px above the one in front
                scale: 1 - d * 0.06, // 6% smaller per depth level (from top anchor)
                opacity: Math.max(0, 1 - d * 0.18),
                zIndex: Math.max(1, N - Math.floor(d)),
              });
            }
          });
        },
      });

      return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    },
    { dependencies: [filtered] }
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
              ✦ Aagaz &apos;25 — Our Work
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

        {/* Stats */}
        <BlurFade delay={0.3} inView>
          <div className="flex items-center gap-6 mt-8">
            <div className="flex flex-col">
              <span className="font-heading font-bold text-3xl text-text">{projects.length}</span>
              <span className="font-sans text-xs text-text-muted uppercase tracking-wider">Total</span>
            </div>
            <div className="w-px h-10 bg-border" />
            <div className="flex flex-col">
              <span className="font-heading font-bold text-3xl text-text">{completed}</span>
              <span className="font-sans text-xs text-text-muted uppercase tracking-wider">Completed</span>
            </div>
            <div className="w-px h-10 bg-border" />
            <div className="flex flex-col">
              <span className="font-heading font-bold text-3xl text-accent">{upcoming}</span>
              <span className="font-sans text-xs text-text-muted uppercase tracking-wider">Upcoming</span>
            </div>
          </div>
        </BlurFade>

        {/* Tabs */}
        <BlurFade delay={0.38} inView>
          <div className="flex items-center gap-2 mt-8">
            {([
              { key: "all", label: `All (${projects.length})` },
              { key: "upcoming", label: `Upcoming (${upcoming})` },
              { key: "completed", label: `Completed (${completed})` },
            ] as const).map((tab) => (
              <button
                key={tab.key}
                onClick={() => { setActiveTab(tab.key); setActiveCardIndex(0); }}
                className={cn(
                  "font-sans text-sm font-semibold px-4 py-2 rounded-full border transition-colors duration-200",
                  activeTab === tab.key
                    ? "bg-accent text-background border-accent"
                    : "border-border/50 text-text-muted hover:border-accent/40 hover:text-text"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </BlurFade>
      </div>

      {/* Scroll hint */}
      <BlurFade delay={0.45} inView>
        <div className="max-w-5xl mx-auto px-6 md:px-16 pb-6 flex items-center gap-2 text-text-muted/50">
          <span className="font-sans text-xs uppercase tracking-widest">Scroll to explore</span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path d="M7 2v10M3 8l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </BlurFade>

      {/*
        Stack architecture:
        ┌─ stickyRef (sticky top-0, h-screen, overflow-hidden) ─────────┐
        │  ░░░░░ 8% peek zone (shows stacked card header strips) ░░░░░  │
        │  ┌── card top (8%) ────────────────────────────────────────┐  │
        │  │   active card content                                   │  │
        │  │                                                         │  │
        │  └─────────────────────────────────────────────────────────┘  │
        └────────────────────────────────────────────────────────────────┘
        Each stacked card (d=1,2,3…) is shifted up by d×14px into the peek
        zone and scaled down by d×6%, anchored at its top edge.
      */}
      <div
        ref={wrapperRef}
        style={{ height: `${Math.max(filtered.length, 1) * 100}vh` }}
      >
        <div
          ref={stickyRef}
          className="sticky top-0 h-screen overflow-hidden bg-background"
        >
          {filtered.map((project, i) => (
            <FullProjectCard
              key={`${project.id}-${activeTab}`}
              project={project}
              index={i}
              flip={i % 2 === 1}
            />
          ))}

          {/* Progress dots */}
          <div className="absolute right-5 top-1/2 -translate-y-1/2 z-[200] flex flex-col gap-2 pointer-events-none">
            {filtered.map((p, i) => (
              <div
                key={i}
                className="w-1.5 rounded-full transition-all duration-300"
                style={{
                  height: i === activeCardIndex ? 28 : 6,
                  backgroundColor: i === activeCardIndex ? p.color : "oklch(50% 0 0 / 0.15)",
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
