import { HomeHero } from "@/components/features/home/HomeHero";
import { Marquee } from "@/components/features/home/Marquee";
import { AboutSection } from "@/components/features/home/AboutSection";
import { WhatWeDoSection } from "@/components/features/home/WhatWeDoSection";
import { MoreAboutSection } from "@/components/features/home/MoreAboutSection";
import { WorkGlimpse } from "@/components/features/home/WorkGlimpse";
import { CalendarSection } from "@/components/features/home/CalendarSection";
import { TeamSection } from "@/components/features/home/TeamSection";
import { ClosingCTA } from "@/components/features/home/ClosingCTA";

export default function Home() {
  return (
    <main className="flex flex-col w-full">
      {/* 1 — Hero */}
      <HomeHero />

      {/* Marquee strip */}
      <Marquee />

      {/* 2 — Who We Are */}
      <AboutSection />

      {/* 3 — What We Do */}
      <WhatWeDoSection />

      {/* 4 — Our Impact */}
      <MoreAboutSection />

      {/* 5 — Featured Projects */}
      <WorkGlimpse />

      {/* 6 — Upcoming Events */}
      <CalendarSection />

      {/* Team teaser */}
      <TeamSection />

      {/* 7 — Join Us + Social */}
      <ClosingCTA />
    </main>
  );
}
