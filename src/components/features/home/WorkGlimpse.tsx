"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import { contentService } from "@/services/content.service";
import type { Project } from "@/types/content.types";

export function WorkGlimpse() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    contentService.getProjects().then((p) =>
      setProjects(p.filter((x) => x.status === "completed").slice(0, 2))
    );
  }, []);

  return (
    <section
      id="work-glimpse"
      data-section="work-glimpse"
      className="py-24 md:py-32 px-6 bg-surface"
    >
      <div className="max-w-5xl mx-auto w-full flex flex-col gap-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
          <BlurFade delay={0.1} inView>
            <div>
              <span className="font-heading text-base text-accent font-bold tracking-wide">(02)</span>
              <h2 className="font-heading font-bold text-4xl md:text-5xl text-text tracking-tight mt-1 leading-[1.05]">
                Work Glimpse
              </h2>
              <p className="font-sans text-sm text-text-muted mt-2">
                A look at what Aagaz &apos;25 has set in motion.
              </p>
            </div>
          </BlurFade>
          <BlurFade delay={0.2} inView>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 font-heading font-semibold text-sm text-text-muted hover:text-accent transition-colors group border border-border/60 hover:border-accent/40 px-4 py-2 rounded-full"
            >
              All projects →
            </Link>
          </BlurFade>
        </div>

        {/* 2 big cards, stacked vertically */}
        <div className="flex flex-col gap-5">
          {projects.map((project, i) => (
            <BlurFade key={project.id} delay={0.15 + i * 0.15} inView>
              <Link href="/projects">
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 280, damping: 24 }}
                  className="group relative rounded-2xl overflow-hidden border border-border/50 hover:border-accent/30 bg-background transition-colors cursor-pointer"
                >
                  {/* Accent top strip */}
                  <div
                    className="absolute top-0 left-0 right-0 h-0.5 opacity-70 group-hover:opacity-100 transition-opacity"
                    style={{ backgroundColor: project.color }}
                  />

                  <div className="grid md:grid-cols-[1fr_280px] min-h-[200px]">
                    {/* Left: Text content */}
                    <div className="flex flex-col justify-between p-8 gap-6">
                      <div className="flex flex-col gap-3">
                        {/* Index + category */}
                        <div className="flex items-center gap-3">
                          <span className="font-heading font-bold text-3xl text-text-muted/20 tabular-nums leading-none">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span
                            className="inline-flex items-center gap-1.5 font-sans text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                            style={{ backgroundColor: `${project.color}18`, color: project.color }}
                          >
                            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: project.color }} />
                            {project.category}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="font-heading font-bold text-2xl md:text-3xl text-text leading-tight group-hover:text-accent transition-colors">
                          {project.title}
                        </h3>

                        {/* Detail */}
                        <p className="font-sans text-sm text-text-muted leading-relaxed max-w-lg">
                          {project.detail}
                        </p>
                      </div>

                      {/* Footer row */}
                      <div className="flex items-center gap-4">
                        <span className="font-sans text-xs text-text-muted">{project.year}</span>
                        <div className="inline-flex items-center gap-1.5 font-heading font-semibold text-xs text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                          View project <ArrowRight size={12} />
                        </div>
                      </div>
                    </div>

                    {/* Right: Visual block */}
                    <div
                      className="hidden md:flex items-center justify-center relative overflow-hidden border-l border-border/40"
                      style={{ backgroundColor: `${project.color}12` }}
                    >
                      {/* Dot grid texture */}
                      <div className="absolute inset-0 dot-grid opacity-60" />

                      {/* Big number watermark */}
                      <span
                        className="font-heading font-bold text-[8rem] leading-none select-none pointer-events-none"
                        style={{ color: `${project.color}18` }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>

                      {/* Project label overlay */}
                      <div className="absolute bottom-5 left-5 right-5">
                        <p
                          className="font-heading font-bold text-xs uppercase tracking-widest"
                          style={{ color: project.color }}
                        >
                          {project.category}
                        </p>
                        <p className="font-sans text-xs text-text-muted mt-0.5">RCTNE × Aagaz &apos;25</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </BlurFade>
          ))}
        </div>

        {/* CTA row */}
        <BlurFade delay={0.45} inView>
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

