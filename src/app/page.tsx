import { HomeHero } from "@/components/features/home/HomeHero";
import { Marquee } from "@/components/features/home/Marquee";
import { AboutSection } from "@/components/features/home/AboutSection";
import { WhatWeDoSection } from "@/components/features/home/WhatWeDoSection";
import { MoreAboutSection } from "@/components/features/home/MoreAboutSection";
import { WorkGlimpse } from "@/components/features/home/WorkGlimpse";
import { CalendarSection } from "@/components/features/home/CalendarSection";
import { TeamSection } from "@/components/features/home/TeamSection";
import { ClosingCTA } from "@/components/features/home/ClosingCTA";
import { siteConfig } from "@/data/site-config.data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: siteConfig.pages.home.title,
  description: siteConfig.pages.home.description,
  keywords: siteConfig.pages.home.keywords,
  alternates: {
    canonical: `${siteConfig.siteUrl}${siteConfig.pages.home.path}`,
  },
  openGraph: {
    title: siteConfig.pages.home.title,
    description: siteConfig.pages.home.description,
    url: `${siteConfig.siteUrl}${siteConfig.pages.home.path}`,
    siteName: siteConfig.siteName,
    locale: siteConfig.locale,
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: siteConfig.pages.home.title }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.pages.home.title,
    description: siteConfig.pages.home.description,
    images: ["/opengraph-image"],
  },
};

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
