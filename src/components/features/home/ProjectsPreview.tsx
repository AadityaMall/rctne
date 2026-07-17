"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import { contentService } from "@/services/content.service";
import type { Project } from "@/types/content.types";

const CARD_COLORS = [
  { bg: "oklch(93% 0.025 65)", accent: "oklch(62% 0.17 40)" },
  { bg: "oklch(91% 0.025 155)", accent: "oklch(55% 0.14 148)" },
  { bg: "oklch(92% 0.025 250)", accent: "oklch(57% 0.14 260)" },
];

export function ProjectsPreview() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    contentService.getProjects().then((p) => setProjects(p.slice(0, 3)));
  }, []);

  return (
    <section
      id="projects"
      data-section="projects"
      className="py-28 md:py-36 px-6 bg-surface dot-grid"
    >
      <div className="max-w-5xl mx-auto w-full flex flex-col gap-12">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <BlurFade delay={0.1} inView>
            <div>
              <span className="font-heading font-bold text-lg text-accent tracking-wide">(02)</span>
              <h2 className="font-heading font-bold text-5xl md:text-6xl text-text tracking-tight mt-1 leading-[1.05]">
                Selected<br />Work
              </h2>
            </div>
          </BlurFade>
          <BlurFade delay={0.25} inView>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 font-heading font-bold text-sm text-accent hover:text-accent/80 transition-colors group mb-1"
            >
              View all projects
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowRight size={16} />
              </motion.span>
            </Link>
          </BlurFade>
        </div>

        {/* 3-card row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {projects.map((project, i) => {
            const colors = CARD_COLORS[i % CARD_COLORS.length];
            return (
              <BlurFade key={project.id} delay={0.15 + i * 0.12} inView>
                <Link href="/projects">
                  <motion.div
                    whileHover={{ y: -6, scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 280, damping: 24 }}
                    className="group relative rounded-2xl overflow-hidden border border-border/40 aspect-[4/5] flex flex-col justify-end p-6 cursor-pointer"
                    style={{ backgroundColor: colors.bg }}
                  >
                    {/* Number watermark */}
                    <div
                      className="absolute top-4 right-5 font-heading font-bold text-7xl leading-none select-none pointer-events-none opacity-10"
                      style={{ color: colors.accent }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </div>

                    {/* Tag */}
                    <span
                      className="inline-flex items-center gap-1.5 self-start font-sans text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-4"
                      style={{ backgroundColor: `${colors.accent}22`, color: colors.accent }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colors.accent }} />
                      {project.category}
                    </span>

                    <h3 className="font-heading font-bold text-xl text-text leading-tight mb-1.5">
                      {project.title}
                    </h3>
                    <p className="font-sans text-xs text-text-muted leading-relaxed">
                      {project.detail}
                    </p>

                    {/* Arrow on hover */}
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      className="absolute top-4 left-5 p-2 rounded-full"
                      style={{ backgroundColor: colors.accent }}
                    >
                      <ArrowRight size={12} className="text-background" />
                    </motion.div>
                  </motion.div>
                </Link>
              </BlurFade>
            );
          })}
        </div>

      </div>
    </section>
  );
}
