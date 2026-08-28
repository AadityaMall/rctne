"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import { contentService } from "@/services/content.service";
import type { Project } from "@/types/content.types";

// Presentation palette — not stored in data
const CARD_PALETTE = [
  { accent: "oklch(62% 0.17 40)", bg: "oklch(93% 0.025 65)" },
  { accent: "oklch(55% 0.14 148)", bg: "oklch(91% 0.025 155)" },
  { accent: "oklch(57% 0.14 260)", bg: "oklch(92% 0.025 250)" },
];

interface ProjectImageCardProps {
  project: Project;
  index: number;
  delay: number;
}

function ProjectImageCard({ project, index, delay }: ProjectImageCardProps) {
  const palette = CARD_PALETTE[index % CARD_PALETTE.length];
  const hasImage = Boolean(project.image);

  return (
    <BlurFade delay={delay} inView>
      <Link href="/projects">
        <motion.div
          whileHover={{ y: -8, scale: 1.015 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          className="group relative rounded-2xl overflow-hidden border border-border/40 hover:border-accent/30 cursor-pointer flex flex-col"
          style={{ boxShadow: "0 2px 20px oklch(0% 0 0 / 0.06)" }}
        >
          {/* Image area */}
          <div
            className="relative w-full overflow-hidden"
            style={{ height: "220px", backgroundColor: palette.bg }}
          >
            {hasImage ? (
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              /* Styled placeholder when no image */
              <div
                className="absolute inset-0 flex items-end p-5"
                style={{
                  background: `linear-gradient(135deg, ${palette.bg} 0%, ${palette.accent}22 100%)`,
                }}
              >
                <div className="absolute inset-0 dot-grid opacity-40" />
                <span
                  className="font-heading font-bold leading-none select-none opacity-[0.08] absolute right-4 bottom-0"
                  style={{ fontSize: "7rem", color: palette.accent }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
            )}

            {/* Gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />

            {/* Category badge */}
            <div className="absolute top-4 left-4">
              <span
                className="inline-flex items-center gap-1.5 font-sans text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                style={{ backgroundColor: `${palette.accent}22`, color: palette.accent }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: palette.accent }} />
                {project.category}
              </span>
            </div>

            {/* Arrow button — appears on hover */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileHover={{ opacity: 1, scale: 1 }}
              className="absolute top-4 right-4 p-2 rounded-full group-hover:opacity-100 opacity-0 transition-opacity duration-200"
              style={{ backgroundColor: palette.accent }}
            >
              <ArrowRight size={12} className="text-background" />
            </motion.div>
          </div>

          {/* Text content */}
          <div className="bg-background p-5 flex flex-col gap-2 border-t border-border/30">
            <div className="flex items-center justify-between gap-2">
              <h3
                className="font-heading font-bold text-xl text-text leading-tight group-hover:text-accent transition-colors"
              >
                {project.title}
              </h3>
              <span className="font-sans text-xs text-text-muted tabular-nums shrink-0">
                {project.month}
              </span>
            </div>
            <p className="font-sans text-sm text-text-muted leading-relaxed line-clamp-2">
              {project.detail}
            </p>
          </div>
        </motion.div>
      </Link>
    </BlurFade>
  );
}

export function WorkGlimpse() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    contentService.getProjects().then((p) =>
      setProjects(p.slice(0, 3))
    );
  }, []);

  return (
    <section
      id="work-glimpse"
      data-section="work-glimpse"
      className="py-24 md:py-32 px-6 bg-surface dot-grid"
    >
      <div className="max-w-5xl mx-auto w-full flex flex-col gap-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
          <BlurFade delay={0.1} inView>
            <div>
              <span className="font-heading font-bold text-5xl text-accent/20 block leading-none">04</span>
              <h2 className="font-heading font-bold text-4xl md:text-5xl text-text tracking-tight mt-1 leading-[1.05]">
                Selected Work
              </h2>
              <p className="font-sans text-sm text-text-muted mt-2">
                A look at what Aagaz &apos;26–27 has set in motion.
              </p>
            </div>
          </BlurFade>
          <BlurFade delay={0.2} inView>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 font-heading font-semibold text-sm text-text-muted hover:text-accent transition-colors group border border-border/60 hover:border-accent/40 px-4 py-2 rounded-full"
            >
              All projects
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowRight size={14} />
              </motion.span>
            </Link>
          </BlurFade>
        </div>

        {/* 3 image cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <ProjectImageCard
              key={project.id}
              project={project}
              index={i}
              delay={0.15 + i * 0.12}
            />
          ))}
        </div>

        {/* CTA */}
        <BlurFade delay={0.5} inView>
          <div className="flex justify-center">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2.5 font-heading font-bold text-sm bg-accent text-background px-8 py-3.5 rounded-full hover:bg-accent/90 transition-colors"
            >
              View all projects
              <ArrowRight size={14} />
            </Link>
          </div>
        </BlurFade>

      </div>
    </section>
  );
}
