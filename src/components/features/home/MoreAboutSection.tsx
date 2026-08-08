"use client";

import { useEffect, useState } from "react";
import { BlurFade } from "@/components/ui/blur-fade";
import { NumberTicker } from "@/components/ui/number-ticker";
import Image from "next/image";
import { contentService } from "@/services/content.service";
import { SectionHeader } from "@/components/shared/SectionHeader";
import type { MoreAboutContent } from "@/types/content.types";

interface StatDisplay {
  rawNumber: number;
  suffix: string;
  label: string;
}

function parseStats(stats: { value: string; label: string }[]): StatDisplay[] {
  return stats.map((s) => {
    const num = parseInt(s.value, 10);
    const suffix = s.value.replace(/[0-9]/g, "");
    return { rawNumber: num, suffix: suffix || "+", label: s.label };
  });
}

export function MoreAboutSection() {
  const [content, setContent] = useState<MoreAboutContent | null>(null);

  useEffect(() => {
    contentService.getMoreAbout().then(setContent);
  }, []);

  const stats = content ? parseStats(content.stats) : [];

  return (
    <section
      id="more-about"
      data-section="more-about"
      className="py-28 md:py-36 px-6 bg-surface"
    >
      <div className="max-w-5xl mx-auto w-full flex flex-col gap-20">

        {/* Header + body */}
        <div className="grid md:grid-cols-[2fr_3fr] gap-12 md:gap-20 items-start">
          <BlurFade delay={0.1} inView>
            <div className="flex flex-col gap-6">
              <SectionHeader
                number={content?.number ?? "04"}
                title={content?.title ?? "Our Impact"}
              />
              {/* Aagaz emblem */}
              <div className="relative w-28 h-28 opacity-80">
                <Image
                  src="/images/theme/aagaz-emblem.png"
                  alt="Aagaz '26–27 theme emblem"
                  width={112}
                  height={112}
                  className="w-full h-full object-contain drop-shadow-md"
                />
              </div>
            </div>
          </BlurFade>
          <BlurFade delay={0.25} inView>
            <p className="font-sans text-lg text-text-muted leading-relaxed max-w-md pt-2">
              {content?.body}
            </p>
          </BlurFade>
        </div>

        {/* Stats — NumberTicker */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-border/40">
          {stats.map((stat, i) => (
            <BlurFade key={i} delay={0.1 + i * 0.15} inView>
              <div className="flex flex-col gap-3 pt-12 md:pr-12 md:border-r border-border/40 last:border-0 last:md:pr-0">
                <div className="font-heading font-bold text-[clamp(3.5rem,8vw,6rem)] text-text tracking-tighter leading-none flex items-end gap-1">
                  <NumberTicker
                    value={stat.rawNumber >= 10000 ? Math.round(stat.rawNumber / 1000) : stat.rawNumber}
                    className="font-heading font-bold text-[clamp(3.5rem,8vw,6rem)] text-text tracking-tighter leading-none"
                  />
                  <span className="text-[clamp(2rem,4vw,3rem)] text-accent pb-1">
                    {stat.rawNumber >= 10000 ? "k+" : stat.suffix}
                  </span>
                </div>
                <div className="font-sans font-semibold text-sm text-accent uppercase tracking-widest">
                  {stat.label}
                </div>
              </div>
            </BlurFade>
          ))}
        </div>

      </div>
    </section>
  );
}
