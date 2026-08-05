import { HomeHero } from "@/components/features/home/HomeHero";
import { Marquee } from "@/components/features/home/Marquee";
import { AboutSection } from "@/components/features/home/AboutSection";
import { WorkGlimpse } from "@/components/features/home/WorkGlimpse";
import { TeamSection } from "@/components/features/home/TeamSection";
import { MoreAboutSection } from "@/components/features/home/MoreAboutSection";
import { ClosingCTA } from "@/components/features/home/ClosingCTA";

export default function Home() {
  return (
    <main className="flex flex-col w-full">
      <HomeHero />
      <Marquee />
      <AboutSection />
      <WorkGlimpse />
      <TeamSection />
      <MoreAboutSection />
      <ClosingCTA />
    </main>
  );
}
