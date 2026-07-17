"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { contentService } from "@/services/content.service";
import { BlurFade } from "@/components/ui/blur-fade";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { BorderBeam } from "@/components/ui/border-beam";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/content.types";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const STATUS_COLORS: Record<string, { bg: string; text: string; label: string }> = {
  upcoming: { bg: "oklch(92% 0.025 250)", text: "oklch(57% 0.14 260)", label: "Upcoming" },
  completed: { bg: "oklch(94% 0.01 70)", text: "oklch(48% 0.02 50)", label: "Completed" },
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false);
  const status = STATUS_COLORS[project.status ?? "completed"];

  return (
    <div
      className="project-card shrink-0 w-[calc(100vw-3rem)] md:w-[480px] h-[420px] md:h-[520px] relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="w-full h-full rounded-2xl md:rounded-3xl border border-border/40 flex flex-col justify-between p-7 md:p-10 relative overflow-hidden"
        style={{ backgroundColor: project.color + "18" }}
      >
        {/* Watermark number */}
        <div
          className="absolute right-4 bottom-4 font-heading font-bold text-[10rem] md:text-[12rem] leading-none select-none pointer-events-none"
          style={{ color: project.color + "15" }}
        >
          {String(index + 1).padStart(2, "0")}
        </div>

        {/* Top: tags */}
        <div className="flex items-center justify-between relative z-10">
          <span
            className="inline-flex items-center gap-1.5 font-sans text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full"
            style={{ backgroundColor: project.color + "20", color: project.color }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: project.color }} />
            {project.category}
          </span>
          <span
            className="font-sans text-xs font-semibold px-3 py-1.5 rounded-full"
            style={{ backgroundColor: status.bg, color: status.text }}
          >
            {status.label}
          </span>
        </div>

        {/* Bottom: content */}
        <div className="flex flex-col gap-3 relative z-10">
          <h2 className="font-heading font-bold text-[clamp(1.6rem,4vw,2.2rem)] text-text leading-tight tracking-tight">
            {project.title}
          </h2>
          <p className="font-sans text-sm text-text-muted leading-relaxed max-w-[32ch]">
            {project.detail}
          </p>
          <div className="flex items-center gap-3 pt-2">
            <span className="font-heading font-bold text-sm text-text-muted">{project.year}</span>
            <motion.div
              animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -4 }}
              transition={{ duration: 0.2 }}
              className="inline-flex items-center gap-1.5 font-heading font-bold text-xs px-4 py-2 rounded-full text-background"
              style={{ backgroundColor: project.color }}
            >
              Read more <ArrowRight size={12} />
            </motion.div>
          </div>
        </div>

        {hovered && (
          <BorderBeam size={300} duration={4} colorFrom={project.color} colorTo={project.color + "00"} />
        )}
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeTab, setActiveTab] = useState<"all" | "upcoming" | "completed">("all");
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    contentService.getProjects().then(setProjects);
  }, []);

  const filtered = projects.filter((p) =>
    activeTab === "all" ? true : p.status === activeTab
  );

  useGSAP(
    () => {
      if (!filtered.length || !pinRef.current || !trackRef.current) return;
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;

      // Kill previous triggers before creating new ones
      ScrollTrigger.getAll().forEach((t) => t.kill());

      const totalWidth = trackRef.current.scrollWidth;
      const viewportWidth = window.innerWidth;
      const scrollDistance = totalWidth - viewportWidth + 96; // 96px padding

      const ctx = gsap.context(() => {
        gsap.to(trackRef.current, {
          x: -scrollDistance,
          ease: "none",
          scrollTrigger: {
            trigger: pinRef.current,
            start: "top top",
            end: `+=${scrollDistance}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      });

      return () => ctx.revert();
    },
    { dependencies: [filtered] }
  );

  const upcoming = projects.filter((p) => p.status === "upcoming").length;
  const completed = projects.filter((p) => p.status === "completed").length;

  return (
    <main className="min-h-screen bg-background">

      {/* Page header */}
      <div className="max-w-5xl mx-auto px-6 md:px-16 pt-28 pb-12">
        <BlurFade delay={0.05} inView>
          <Link href="/" className="inline-flex items-center gap-2 font-sans text-sm text-text-muted hover:text-accent transition-colors mb-8 w-fit">
            <ArrowLeft size={14} /> Home
          </Link>
        </BlurFade>

        <BlurFade delay={0.12} inView>
          <div className="inline-flex items-center rounded-full border border-accent/30 bg-accent/8 px-4 py-1.5 mb-5">
            <AnimatedShinyText className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-accent">
              ✦ Our Work
            </AnimatedShinyText>
          </div>
          <h1 className="font-heading font-bold text-[clamp(2.5rem,7vw,5.5rem)] text-text leading-[0.98] tracking-tight">
            Projects that<br />moved the needle.
          </h1>
        </BlurFade>

        <BlurFade delay={0.22} inView>
          <p className="font-sans text-base md:text-lg text-text-muted max-w-md mt-4 leading-relaxed">
            From tree plantation to leadership summits — every project is born from the belief that youth can rewrite the future.
          </p>
        </BlurFade>

        {/* Tabs */}
        <BlurFade delay={0.3} inView>
          <div className="flex items-center gap-2 mt-8">
            {([
              { key: "all", label: `All (${projects.length})` },
              { key: "upcoming", label: `Upcoming (${upcoming})` },
              { key: "completed", label: `Completed (${completed})` },
            ] as const).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
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

      {/* Horizontal scroll section */}
      <div ref={pinRef} className="overflow-hidden">
        <div className="py-4 pl-6 md:pl-16">
          {/* Scroll hint */}
          <div className="flex items-center gap-2 mb-6 text-text-muted/60">
            <ArrowRight size={14} className="text-accent animate-pulse" />
            <span className="font-sans text-xs uppercase tracking-widest">Scroll to explore</span>
          </div>
          <div
            ref={trackRef}
            className="flex gap-5 pb-6 will-change-transform"
            style={{ width: "max-content" }}
          >
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        </div>
      </div>

      {/* Post-scroll spacer so page content continues */}
      <div className="h-24" />

    </main>
  );
}
