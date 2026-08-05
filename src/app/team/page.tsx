"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { contentService } from "@/services/content.service";
import { SectionHeader } from "@/components/shared/SectionHeader";
import type { TeamTierGroup, TeamMember } from "@/types/content.types";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Per-member gradient palette (cycles for large groups)
const PHOTO_GRADIENTS = [
  "linear-gradient(145deg, oklch(92% 0.025 65) 0%, oklch(86% 0.04 55) 100%)",
  "linear-gradient(145deg, oklch(91% 0.025 80) 0%, oklch(85% 0.035 70) 100%)",
  "linear-gradient(145deg, oklch(93% 0.02 50) 0%, oklch(87% 0.03 45) 100%)",
  "linear-gradient(145deg, oklch(91% 0.03 60) 0%, oklch(85% 0.04 50) 100%)",
  "linear-gradient(145deg, oklch(92% 0.03 70) 0%, oklch(86% 0.045 60) 100%)",
  "linear-gradient(145deg, oklch(90% 0.025 55) 0%, oklch(84% 0.035 50) 100%)",
];

const ROTATIONS = [-1.5, 0.8, -0.5, 1.2, -1, 0.5];

const tierCardAspect: Record<string, string> = {
  district: "aspect-[3/4]",
  press: "aspect-[3/4]",
  core: "aspect-[3/4]",
  board: "aspect-[4/5]",
  general: "aspect-square",
};

const tierGridCols: Record<string, string> = {
  district: "grid-cols-1 sm:grid-cols-2 max-w-2xl",
  press: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
  core: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
  board: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
  general: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6",
};

function MemberCard({
  member,
  index,
  isCompact,
}: {
  member: TeamMember;
  index: number;
  isCompact?: boolean;
}) {
  const rotation = ROTATIONS[index % ROTATIONS.length];
  const gradient = PHOTO_GRADIENTS[index % PHOTO_GRADIENTS.length];

  return (
    <motion.div
      initial={{ rotate: isCompact ? 0 : rotation }}
      whileHover={{ rotate: 0, y: isCompact ? -4 : -6, scale: isCompact ? 1.03 : 1.02 }}
      transition={{ type: "spring", stiffness: 220, damping: 22 }}
      className="flex flex-col gap-2 origin-bottom cursor-default"
    >
      {/* Photo frame */}
      <div
        className={`relative w-full overflow-hidden rounded-xl border-[3px] ${tierCardAspect[member.tier]}`}
        style={{ borderColor: "var(--accent-secondary)" }}
      >
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ background: gradient }}
        >
          {/* Faint initials watermark */}
          <span
            className="font-heading font-bold select-none pointer-events-none opacity-[0.12]"
            style={{
              fontSize: isCompact ? "2.5rem" : "4rem",
              color: "oklch(62% 0.17 40)",
            }}
          >
            {member.initials}
          </span>
        </div>
      </div>

      {/* Caption */}
      <div className="px-0.5">
        <h3
          className="font-heading font-bold text-text leading-tight"
          style={{ fontSize: isCompact ? "0.75rem" : "1rem" }}
        >
          {member.name}
        </h3>
        {!isCompact && (
          <p className="font-sans text-xs font-semibold uppercase tracking-wide mt-0.5 text-accent">
            {member.role}
          </p>
        )}
      </div>
    </motion.div>
  );
}

function TierSection({ tier }: { tier: TeamTierGroup }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);
  const isCompact = tier.tier === "general";

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const cards = cardsRef.current.filter(Boolean);
      if (!cards.length || prefersReducedMotion) return;

      gsap.set(cards, { opacity: 0, y: 30, scale: 0.96 });
      ScrollTrigger.batch(cards, {
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.07,
            duration: 0.65,
            ease: "power3.out",
          });
        },
        once: true,
        start: "top 87%",
      });
    },
    { scope: sectionRef }
  );

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;
      gsap.set(headerRef.current, { opacity: 0, x: -20 });
      gsap.to(headerRef.current, {
        scrollTrigger: { trigger: headerRef.current, start: "top 82%", once: true },
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    },
    { scope: sectionRef }
  );

  return (
    <div ref={sectionRef} className="flex flex-col gap-10">
      <div ref={headerRef}>
        <SectionHeader
          number={tier.number}
          title={tier.title}
          subtitle={tier.subtitle}
        />
      </div>

      <div
        className={`grid gap-x-6 gap-y-10 ${tierGridCols[tier.tier]} ${
          tier.tier === "district" ? "mx-auto" : ""
        }`}
      >
        {tier.members.map((member, i) => (
          <div
            key={member.id}
            ref={(el) => { cardsRef.current[i] = el; }}
          >
            <MemberCard
              member={member}
              index={i}
              isCompact={isCompact}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TeamPage() {
  const [tiers, setTiers] = useState<TeamTierGroup[]>([]);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    contentService.getTeamTiers().then(setTiers);
  }, []);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) {
        gsap.set(heroRef.current, { opacity: 1, y: 0 });
        return;
      }
      gsap.set(heroRef.current, { opacity: 0, y: 24 });
      gsap.to(heroRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        delay: 0.15,
      });
    },
    { scope: heroRef }
  );

  return (
    <main className="min-h-screen pt-28 pb-32 px-6 relative z-10 w-full">
      <div className="max-w-5xl mx-auto w-full flex flex-col gap-28 md:gap-36">

        {/* Header */}
        <div ref={heroRef} className="flex flex-col gap-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-sans text-sm text-text-muted hover:text-accent transition-colors w-fit"
          >
            <ArrowLeft size={16} />
            Back to home
          </Link>

          <div className="flex flex-col gap-4 max-w-3xl">
            <div className="flex items-center gap-3">
              <div className="w-8 h-px bg-accent" />
              <span className="font-sans text-xs text-accent uppercase tracking-[0.22em] font-medium">
                Rotaract Club of Thane North End
              </span>
            </div>

            <h1 className="font-heading font-bold text-[clamp(2.5rem,7vw,5rem)] text-text leading-[1.06] tracking-tight">
              The people<br />behind the purpose.
            </h1>

            <p className="font-sans text-lg text-text-muted max-w-lg leading-relaxed">
              A cross-section of the driven individuals who make RCTNE what it is — from district leadership to our vibrant general body.
            </p>
          </div>
        </div>

        {/* Tier sections */}
        {tiers.map((tier) => (
          <TierSection key={tier.tier} tier={tier} />
        ))}

      </div>
    </main>
  );
}
