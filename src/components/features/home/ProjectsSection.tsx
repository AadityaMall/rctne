"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { contentService } from "@/services/content.service";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { PhotoCard } from "@/components/shared/PhotoCard";
import type { Project } from "@/types/content.types";

const rotations: (-2 | 0 | 2)[] = [-2, 2, -2, 2];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.94 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

export function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    contentService.getProjects().then(setProjects);
  }, []);

  return (
    <section
      id="projects"
      data-section="projects"
      className="py-28 md:py-36 px-6 bg-surface dot-grid"
    >
      <div className="max-w-5xl mx-auto w-full flex flex-col gap-16">
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <SectionHeader
            number="02"
            title="Selected Projects"
          />
          <p className="font-sans text-sm text-text-muted max-w-xs md:pb-2">
            A cross-section of our most impactful initiatives — every project a new beginning.
          </p>
        </motion.div>

        {/* Card grid — 2-col desktop, 1-col mobile */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-14 md:gap-y-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {projects.map((project, i) => (
            <motion.div key={project.id} variants={cardVariants}>
              <PhotoCard
                initials={project.title.slice(0, 2).toUpperCase()}
                name={project.title}
                role={`${project.category} · ${project.month}`}
                detail={project.detail}
                category={project.category}
                rotate={rotations[i % rotations.length]}
                size="md"
                showHoverReveal
                instagramUrl={project.instagramUrl}
                image={project.image || undefined}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
