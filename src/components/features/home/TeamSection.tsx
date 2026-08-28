"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import { contentService } from "@/services/content.service";
import type { TeamMember } from "@/types/content.types";

// Warm gradient placeholders — vary per card
const MEMBER_GRADIENTS = [
  "linear-gradient(145deg, oklch(92% 0.025 65) 0%, oklch(86% 0.04 55) 100%)",
  "linear-gradient(145deg, oklch(91% 0.025 80) 0%, oklch(85% 0.035 70) 100%)",
  "linear-gradient(145deg, oklch(93% 0.02 50) 0%, oklch(87% 0.03 45) 100%)",
  "linear-gradient(145deg, oklch(91% 0.03 60) 0%, oklch(85% 0.04 50) 100%)",
];

// Subtle rotations for polaroid feel
const ROTATIONS = [-1.5, 1, -0.5, 1.5];

interface MemberTeaserCardProps {
  member: TeamMember;
  index: number;
  delay: number;
}

function MemberTeaserCard({ member, index, delay }: MemberTeaserCardProps) {
  const rotation = ROTATIONS[index % ROTATIONS.length];
  const gradient = MEMBER_GRADIENTS[index % MEMBER_GRADIENTS.length];

  return (
    <BlurFade delay={delay} inView>
      <motion.div
        initial={{ rotate: rotation }}
        whileHover={{ rotate: 0, y: -6, scale: 1.03 }}
        transition={{ type: "spring", stiffness: 220, damping: 20 }}
        className="flex flex-col gap-3 origin-bottom cursor-default"
      >
        {/* Photo frame */}
        <div
          className="relative w-full aspect-[3/4] rounded-xl overflow-hidden border-[3px]"
          style={{ borderColor: "var(--accent-secondary)" }}
        >
          {/* Gradient base — always present */}
          <div className="absolute inset-0" style={{ background: gradient }} />

          {member.image ? (
            <Image
              src={member.image}
              alt={member.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
              className="object-cover object-top"
            />
          ) : (
            /* Initials watermark fallback */
            <span
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-heading font-bold text-6xl select-none pointer-events-none"
              style={{ color: "oklch(62% 0.17 40 / 0.12)" }}
            >
              {member.initials}
            </span>
          )}
        </div>

        {/* Caption */}
        <div className="px-0.5">
          <h3 className="font-heading font-bold text-base text-text leading-tight">
            {member.name}
          </h3>
          <p className="font-sans text-xs font-semibold uppercase tracking-wide mt-0.5 text-accent">
            {member.role}
          </p>
        </div>
      </motion.div>
    </BlurFade>
  );
}

export function TeamSection() {
  const [coreMembers, setCoreMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    contentService.getTeamTiers().then((tiers) => {
      const core = tiers.find((t) => t.tier === "core");
      if (core) setCoreMembers(core.members.slice(0, 4));
    });
  }, []);

  return (
    <section
      id="team"
      data-section="team"
      className="py-24 md:py-32 px-6 bg-background"
    >
      <div className="max-w-5xl mx-auto w-full flex flex-col gap-12">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
          <BlurFade delay={0.1} inView>
            <div>
              <span className="font-heading font-bold text-5xl text-accent/20 block leading-none">06</span>
              <h2 className="font-heading font-bold text-4xl md:text-5xl text-text tracking-tight mt-1 leading-[1.05]">
                Our Team
              </h2>
              <p className="font-sans text-sm text-text-muted mt-2 max-w-xs">
                The driven individuals behind every RCTNE initiative.
              </p>
            </div>
          </BlurFade>
          <BlurFade delay={0.2} inView>
            <Link
              href="/team"
              className="inline-flex items-center gap-2 font-heading font-semibold text-sm text-text-muted hover:text-accent transition-colors group border border-border/60 hover:border-accent/40 px-4 py-2 rounded-full"
            >
              Meet everyone
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowRight size={14} />
              </motion.span>
            </Link>
          </BlurFade>
        </div>

        {/* 4-card polaroid grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {coreMembers.map((member, i) => (
            <MemberTeaserCard
              key={member.id}
              member={member}
              index={i}
              delay={0.15 + i * 0.1}
            />
          ))}
        </div>

        {/* CTA */}
        <BlurFade delay={0.55} inView>
          <div className="flex justify-center">
            <Link
              href="/team"
              className="inline-flex items-center gap-2.5 font-heading font-bold text-sm bg-accent text-background px-8 py-3.5 rounded-full hover:bg-accent/90 transition-colors"
            >
              View full team
              <ArrowRight size={14} />
            </Link>
          </div>
        </BlurFade>

      </div>
    </section>
  );
}
