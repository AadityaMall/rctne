"use client";

import { useEffect, useState } from "react";
import { BlurFade } from "@/components/ui/blur-fade";
import { contentService } from "@/services/content.service";
import { SectionHeader } from "@/components/shared/SectionHeader";
import type { AboutContent } from "@/types/content.types";

export function AboutSection() {
  const [content, setContent] = useState<AboutContent | null>(null);

  useEffect(() => {
    contentService.getAbout().then(setContent);
  }, []);

  return (
    <section
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

        <BlurFade delay={0.2} inView>
          <div className="flex items-start pt-2">
            <p className="font-heading font-semibold text-[clamp(1.3rem,2.6vw,2rem)] leading-[1.45] text-text-muted">
              {content?.body}
            </p>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}

