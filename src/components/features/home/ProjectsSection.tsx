"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { contentService } from "@/services/content.service";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { PhotoCard } from "@/components/shared/PhotoCard";
import type { Project } from "@/types/content.types";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const rotations: (-2 | 0 | 2)[] = [-2, 2, -2, 2];

export function ProjectsSection() {
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    contentService.getProjects().then(setProjects);
  }, []);

  useGSAP(
    () => {
      if (!projects.length) return;
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const cards = cardsRef.current.filter(Boolean);
      if (!cards.length) return;

      if (prefersReducedMotion) {
        gsap.set(cards, { opacity: 1, y: 0, scale: 1 });
        return;
      }

      gsap.set(cards, { opacity: 0, y: 40, scale: 0.94 });

      ScrollTrigger.batch(cards, {
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.12,
            duration: 0.75,
            ease: "power3.out",
          });
        },
        once: true,
        start: "top 85%",
      });
    },
    { scope: containerRef, dependencies: [projects] }
  );

  const headerRef = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (!projects.length) return;
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;
      gsap.set(headerRef.current, { opacity: 0, y: 20 });
      gsap.to(headerRef.current, {
        scrollTrigger: { trigger: headerRef.current, start: "top 80%", once: true },
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    },
    { scope: containerRef, dependencies: [projects] }
  );

  return (
    <section
      ref={containerRef}
      id="projects"
      data-section="projects"
      className="py-28 md:py-36 px-6 bg-surface dot-grid"
    >
      <div className="max-w-5xl mx-auto w-full flex flex-col gap-16">
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <SectionHeader
            number="02"
            title="Selected Projects"
          />
          <p className="font-sans text-sm text-text-muted max-w-xs md:pb-2">
            A cross-section of our most impactful initiatives — every project a new beginning.
          </p>
        </div>

        {/* Card grid — 2-col desktop, 1-col mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-14 md:gap-y-16">
          {projects.map((project, i) => (
            <div
              key={project.id}
              ref={(el) => { cardsRef.current[i] = el; }}
            >
              <PhotoCard
                initials={project.title.slice(0, 2).toUpperCase()}
                name={project.title}
                role={`${project.category} · ${project.year}`}
                detail={project.detail}
                category={project.category}
                accentColor={project.color}
                rotate={rotations[i % rotations.length]}
                size="md"
                showHoverReveal
                instagramUrl={project.instagramUrl}
                image={project.image || undefined}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
