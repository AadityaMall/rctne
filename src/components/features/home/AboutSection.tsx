"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { BlurFade } from "@/components/ui/blur-fade";
import { contentService } from "@/services/content.service";
import { SectionHeader } from "@/components/shared/SectionHeader";
import type { AboutContent } from "@/types/content.types";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function AboutSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [content, setContent] = useState<AboutContent | null>(null);

  useEffect(() => {
    contentService.getAbout().then(setContent);
  }, []);

  useGSAP(
    () => {
      if (!content) return;
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const words = containerRef.current?.querySelectorAll<HTMLSpanElement>(".about-word");
      if (!words?.length) return;

      if (prefersReducedMotion) {
        words.forEach((w) => { w.style.opacity = "1"; });
        return;
      }

      gsap.set(words, { opacity: 0.08 });
      gsap.to(words, {
        scrollTrigger: {
          trigger: containerRef.current,
          // Fire MUCH earlier so words start lighting up the moment section enters view
          start: "top 85%",
          end: "center 40%",
          scrub: 0.6,
        },
        opacity: 1,
        stagger: 0.07,
        ease: "none",
      });
    },
    { scope: containerRef, dependencies: [content] }
  );

  return (
    <section
      ref={containerRef}
      id="about-brief"
      data-section="about-brief"
      className="py-24 md:py-32 px-6 bg-background"
    >
      <div className="max-w-5xl mx-auto w-full grid md:grid-cols-[2fr_3fr] gap-12 md:gap-20 items-start">
        <BlurFade delay={0.1} inView>
          <SectionHeader
            number={content?.number ?? "01"}
            title={content?.title ?? "About Us"}
          />
          <div className="mt-6">
            <a
              href="/about"
              className="inline-flex items-center gap-1.5 font-sans text-sm font-semibold text-accent hover:text-accent/80 transition-colors"
            >
              Full story →
            </a>
          </div>
        </BlurFade>

        <div className="flex items-start pt-2">
          <p className="font-heading font-semibold text-[clamp(1.3rem,2.6vw,2rem)] leading-[1.45] text-text-muted">
            {content?.body.split(" ").map((word, i) => (
              <span key={i} className="about-word inline-block mr-[0.25em]">
                {word}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
