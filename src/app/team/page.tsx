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

const rotations: (-2 | 0 | 2)[] = [-2, 2, -2, 2, -2, 2];

const tierCardSize: Record<string, string> = {
  district: "w-full aspect-[3/4]",
  press: "w-full aspect-[4/5]",
  core: "w-full aspect-[4/5]",
  board: "w-full aspect-[4/5]",
  general: "w-full aspect-square",
};

const tierGridCols: Record<string, string> = {
  district: "grid-cols-1 sm:grid-cols-2 max-w-2xl",
  press: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
  core: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
  board: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
  general: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6",
};

function MemberCard({ member, rotate, isCompact }: { member: TeamMember; rotate: -2 | 0 | 2; isCompact?: boolean }) {
  return (
    <motion.div
      initial={{ rotate: isCompact ? 0 : rotate }}
      whileHover={{ rotate: 0, scale: isCompact ? 1.04 : 1.02 }}
      transition={{ type: "spring", stiffness: 220, damping: 22 }}
      className="group flex flex-col gap-2 origin-bottom"
    >
      {/* Frame */}
      <div
        className="relative overflow-hidden rounded-xl border-[3px]"
        style={{
          borderColor: "var(--accent-secondary)",
          ...(tierCardSize[member.tier] ? {} : {}),
        }}
      >
        <div className={`relative ${isCompact ? "aspect-square" : tierCardSize[member.tier]}`}>
          {/* Placeholder fill */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, oklch(93% 0.02 70) 0%, oklch(88% 0.04 60) 100%)",
            }}
          >
            <span
              className="font-heading font-bold text-text-muted/60"
              style={{ fontSize: isCompact ? "1.25rem" : "2.5rem" }}
            >
              {member.initials}
            </span>
          </div>

          {/* Hover overlay (not on compact general body) */}
          {!isCompact && (
            <div className="absolute inset-0 bg-background/70 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-250 flex flex-col items-center justify-center gap-2 p-4 text-center">
              <p className="font-sans text-xs text-text-muted leading-relaxed">
                Driving the club&apos;s initiatives with passion and commitment to community.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Caption */}
      <div className="px-0.5">
        <h3
          className="font-heading font-bold text-text leading-tight"
          style={{ fontSize: isCompact ? "0.8rem" : "1rem" }}
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

function TierSection({ tier, index }: { tier: TeamTierGroup; index: number }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
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
            stagger: 0.08,
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

  const headerRef = useRef<HTMLDivElement>(null);
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
        className={`grid gap-x-8 gap-y-10 ${tierGridCols[tier.tier]} ${
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
              rotate={rotations[i % rotations.length] as -2 | 0 | 2}
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
        {tiers.map((tier, i) => (
          <TierSection key={tier.tier} tier={tier} index={i} />
        ))}

      </div>
    </main>
  );
}
