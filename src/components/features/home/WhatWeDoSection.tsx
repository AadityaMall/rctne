"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BlurFade } from "@/components/ui/blur-fade";
import { Heart, Trophy, Star, Users } from "lucide-react";

const PILLARS = [
  {
    icon: Heart,
    title: "Community Service",
    description:
      "Hands-on projects designed to create real, lasting positive change in our community.",
  },
  {
    icon: Trophy,
    title: "Leadership",
    description:
      "Training and development opportunities that shape confident, capable young leaders.",
  },
  {
    icon: Star,
    title: "Events & Fellowship",
    description:
      "Social, cultural, and educational experiences that build lasting friendships.",
  },
  {
    icon: Users,
    title: "Professional Growth",
    description:
      "Networking and skill-building to prepare members for a meaningful future.",
  },
];

export function WhatWeDoSection() {
  return (
    <section
      id="what-we-do"
      data-section="what-we-do"
      className="py-24 md:py-32 px-6 bg-surface/40"
    >
      <div className="max-w-5xl mx-auto w-full flex flex-col gap-14">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <BlurFade delay={0.05} inView>
            <div className="flex flex-col gap-2">
              <span className="font-heading font-bold text-5xl text-accent/20 block">
                02
              </span>
              <h2 className="font-heading font-bold text-[clamp(2rem,4vw,3rem)] text-text leading-tight tracking-tight">
                What We Do
              </h2>
            </div>
          </BlurFade>
          <BlurFade delay={0.15} inView>
            <p className="font-sans text-base text-text-muted max-w-xs md:pb-2 leading-relaxed">
              Four pillars that define how we serve, grow, and connect.
            </p>
          </BlurFade>
        </div>

        {/* Pillar cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PILLARS.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <BlurFade key={pillar.title} delay={0.08 + i * 0.08} inView>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                  className="flex flex-col gap-5 p-6 rounded-2xl border border-border/50 bg-background hover:border-accent/30 hover:shadow-sm transition-colors h-full"
                >
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-accent" />
                  </div>
                  <div className="flex flex-col gap-2 flex-1">
                    <h3 className="font-heading font-bold text-base text-text leading-snug">
                      {pillar.title}
                    </h3>
                    <p className="font-sans text-sm text-text-muted leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </motion.div>
              </BlurFade>
            );
          })}
        </div>

        {/* Learn more */}
        <BlurFade delay={0.45} inView>
          <Link
            href="/about"
            className="inline-flex items-center gap-1.5 font-sans text-sm font-semibold text-accent hover:text-accent/80 transition-colors"
          >
            See how we operate →
          </Link>
        </BlurFade>

      </div>
    </section>
  );
}
