"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { contentService } from "@/services/content.service";
import { SectionHeader } from "@/components/shared/SectionHeader";
import type { TeamTierGroup, TeamMember } from "@/types/content.types";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ROTATIONS = [-1.5, 0.8, -0.5, 1.2, -1, 0.5];

// Fallback backgrounds — use semantic CSS vars so they adapt to light/dark mode
const FALLBACK_GRADIENTS = [
  "linear-gradient(145deg, var(--surface) 0%, var(--surface-hover) 100%)",
  "linear-gradient(145deg, var(--surface-hover) 0%, var(--surface) 100%)",
  "linear-gradient(145deg, var(--surface) 0%, var(--surface-hover) 100%)",
  "linear-gradient(145deg, var(--surface-hover) 0%, var(--surface) 100%)",
  "linear-gradient(145deg, var(--surface) 0%, var(--surface-hover) 100%)",
  "linear-gradient(145deg, var(--surface-hover) 0%, var(--surface) 100%)",
];

const tierCardAspect: Record<string, string> = {
  district: "aspect-[3/4]",
  press:    "aspect-[3/4]",
  core:     "aspect-[3/4]",
  board:    "aspect-[4/5]",
  general:  "aspect-square",
};

const tierGridCols: Record<string, string> = {
  district: "grid-cols-1 sm:grid-cols-2 max-w-2xl",
  press:    "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
  core:     "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5",
  board:    "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5",
  general:  "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6",
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
  const fallbackGradient = FALLBACK_GRADIENTS[index % FALLBACK_GRADIENTS.length];
  const hasImage = !!member.image;

  return (
    <motion.div
      initial={{ rotate: isCompact ? 0 : rotation }}
      whileHover={{ rotate: 0, y: isCompact ? -4 : -6, scale: isCompact ? 1.03 : 1.02 }}
      transition={{ type: "spring", stiffness: 220, damping: 22 }}
      className="flex flex-col gap-2 origin-bottom cursor-default"
    >
      {/* Photo frame */}
      <div
        className={`relative w-full overflow-hidden rounded-xl border-[2.5px] ${tierCardAspect[member.tier]}`}
        style={{ borderColor: "oklch(60% 0.14 48 / 0.55)" }}
      >
        {hasImage ? (
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover object-top"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          />
        ) : (
          /* Fallback: accent-tinted dark card with large initials */
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: fallbackGradient }}
          >
            <span
              className="font-heading font-bold select-none pointer-events-none"
              style={{
                fontSize: isCompact ? "2rem" : "3.5rem",
                color: "var(--accent)",
                opacity: 0.4,
              }}
            >
              {member.initials}
            </span>
          </div>
        )}

        {/* Subtle bottom vignette so name caption reads well */}
        <div
          className="absolute bottom-0 left-0 right-0 h-12 pointer-events-none"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 100%)" }}
        />
      </div>

      {/* Caption */}
      <div className="px-0.5">
        <h3
          className="font-heading font-bold text-text leading-tight"
          style={{ fontSize: isCompact ? "0.72rem" : "0.92rem" }}
        >
          {member.name}
        </h3>
        {!isCompact && (
          <p className="font-sans text-[0.68rem] font-semibold uppercase tracking-wide mt-0.5 text-accent leading-snug">
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
            stagger: 0.06,
            duration: 0.6,
            ease: "power3.out",
          });
        },
        once: true,
        start: "top 88%",
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
        className={`grid gap-x-5 gap-y-8 ${tierGridCols[tier.tier]} ${
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
      <div className="max-w-6xl mx-auto w-full flex flex-col gap-28 md:gap-36">

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
              Meet the driven individuals who make RCTNE what it is — from core leadership to every director steering our service avenues.
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
