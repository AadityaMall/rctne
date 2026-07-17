"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BlurFade } from "@/components/ui/blur-fade";
import { contentService } from "@/services/content.service";
import type { Project } from "@/types/content.types";

export function WorkGlimpse() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    contentService.getProjects().then((p) =>
      setProjects(p.filter((x) => x.status === "completed").slice(0, 3))
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

        {/* Editorial row — 3 project items, text-first design, no loud colors */}
        <div className="flex flex-col divide-y divide-border/40">
          {projects.map((project, i) => (
            <BlurFade key={project.id} delay={0.1 + i * 0.1} inView>
              <Link href="/projects">
                <motion.div
                  whileHover={{ x: 6 }}
                  transition={{ type: "spring", stiffness: 280, damping: 24 }}
                  className="group flex flex-col md:flex-row md:items-center justify-between py-7 gap-4 cursor-pointer"
                >
                  <div className="flex items-start gap-5">
                    {/* Index number */}
                    <span className="font-heading font-bold text-3xl text-text-muted/25 shrink-0 mt-0.5 tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex flex-col gap-1.5">
                      <h3 className="font-heading font-bold text-xl md:text-2xl text-text group-hover:text-accent transition-colors leading-tight">
                        {project.title}
                      </h3>
                      <p className="font-sans text-sm text-text-muted max-w-md leading-relaxed">
                        {project.detail}
                      </p>
                    </div>
                  </div>
                  <div className="ml-14 md:ml-0 flex items-center gap-3 shrink-0">
                    <span className="font-sans text-xs text-text-muted">{project.year}</span>
                    <span className="inline-block font-sans text-xs font-semibold uppercase tracking-wider text-text-muted border border-border/60 group-hover:border-accent/40 group-hover:text-accent px-2.5 py-1 rounded-full transition-colors">
                      {project.category}
                    </span>
                  </div>
                </motion.div>
              </Link>
            </BlurFade>
          ))}
        </div>

      </div>
    </section>
  );
}
