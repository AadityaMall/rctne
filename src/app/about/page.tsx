import { contentService } from "@/services/content.service";
import { BlurFade } from "@/components/ui/blur-fade";
import { NumberTicker } from "@/components/ui/number-ticker";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { Trophy, Target, Eye, BookOpen, Award, MapPin } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us — RCTNE",
  description: "Learn about the Rotaract Club of Thane North End — our history, mission, vision, district, and awards.",
};

export default async function AboutPage() {
  const about = await contentService.getAboutPage();

  return (
    <main className="min-h-screen pt-28 pb-32 bg-background">

      {/* ── Page Header ── */}
      <section className="px-6 md:px-16 lg:px-24 py-16 md:py-24 max-w-5xl mx-auto">
        <BlurFade delay={0.05} inView>
          <div className="inline-flex items-center rounded-full border border-accent/30 bg-accent/8 px-4 py-1.5 mb-6">
            <AnimatedShinyText className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-accent">
              ✦ Our Story
            </AnimatedShinyText>
          </div>
        </BlurFade>

        <BlurFade delay={0.12} inView>
          <h1 className="font-heading font-bold text-[clamp(3rem,8vw,6rem)] text-text leading-[0.95] tracking-tight">
            More than<br />a club.
          </h1>
        </BlurFade>

        <BlurFade delay={0.22} inView>
          <p className="font-sans text-lg text-text-muted max-w-lg mt-5 leading-relaxed">
            Since {about.established}, the Rotaract Club of Thane North End has been a community of doers, dreamers, and leaders committed to meaningful service.
          </p>
        </BlurFade>

        {/* Quick facts bar */}
        <BlurFade delay={0.32} inView>
          <div className="flex flex-wrap items-center gap-4 mt-8">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-surface">
              <MapPin size={13} className="text-accent" />
              <span className="font-sans text-xs font-medium text-text-muted">{about.district}</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-surface">
              <BookOpen size={13} className="text-accent" />
              <span className="font-sans text-xs font-medium text-text-muted">Est. {about.established}</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-surface">
              <Trophy size={13} className="text-accent" />
              <span className="font-sans text-xs font-medium text-text-muted">{about.awards.length} District Awards</span>
            </div>
          </div>
        </BlurFade>
      </section>

      <div className="w-full h-px bg-border/40 max-w-5xl mx-auto px-6" />

      {/* ── History ── */}
      <section className="px-6 md:px-16 lg:px-24 py-16 md:py-24 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-[1fr_2fr] gap-10 md:gap-16 items-start">
          <BlurFade delay={0.1} inView>
            <div>
              <span className="font-heading font-bold text-5xl text-accent/20 block mb-2">01</span>
              <h2 className="font-heading font-bold text-2xl text-text">History</h2>
            </div>
          </BlurFade>
          <BlurFade delay={0.2} inView>
            <p className="font-sans text-base md:text-lg text-text-muted leading-relaxed">
              {about.history}
            </p>
          </BlurFade>
        </div>
      </section>

      <div className="w-full h-px bg-border/40 max-w-5xl mx-auto px-6" />

      {/* ── Mission + Vision ── */}
      <section className="px-6 md:px-16 lg:px-24 py-16 md:py-24 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          <BlurFade delay={0.1} inView>
            <div className="bg-surface rounded-2xl border border-border/40 p-8 flex flex-col gap-4">
              <div className="w-10 h-10 rounded-full bg-accent/12 flex items-center justify-center">
                <Target size={18} className="text-accent" />
              </div>
              <span className="font-heading font-bold text-5xl text-accent/20">02</span>
              <h2 className="font-heading font-bold text-2xl text-text">Mission</h2>
              <p className="font-sans text-sm md:text-base text-text-muted leading-relaxed">
                {about.mission}
              </p>
            </div>
          </BlurFade>

          <BlurFade delay={0.2} inView>
            <div className="bg-surface rounded-2xl border border-border/40 p-8 flex flex-col gap-4">
              <div className="w-10 h-10 rounded-full bg-accent/12 flex items-center justify-center">
                <Eye size={18} className="text-accent" />
              </div>
              <span className="font-heading font-bold text-5xl text-accent/20">03</span>
              <h2 className="font-heading font-bold text-2xl text-text">Vision</h2>
              <p className="font-sans text-sm md:text-base text-text-muted leading-relaxed">
                {about.vision}
              </p>
            </div>
          </BlurFade>
        </div>
      </section>

      <div className="w-full h-px bg-border/40 max-w-5xl mx-auto px-6" />

      {/* ── Pillars ── */}
      <section className="px-6 md:px-16 lg:px-24 py-16 md:py-24 max-w-5xl mx-auto">
        <BlurFade delay={0.1} inView>
          <span className="font-heading font-bold text-5xl text-accent/20 block mb-2">04</span>
          <h2 className="font-heading font-bold text-2xl text-text mb-10">What We Do</h2>
        </BlurFade>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {about.pillars.map((pillar, i) => (
            <BlurFade key={pillar} delay={0.08 + i * 0.07} inView>
              <div className="flex flex-col gap-2 p-5 rounded-xl border border-border/50 bg-surface hover:border-accent/30 transition-colors">
                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                </div>
                <p className="font-heading font-semibold text-sm text-text leading-snug">{pillar}</p>
              </div>
            </BlurFade>
          ))}
        </div>
      </section>

      <div className="w-full h-px bg-border/40 max-w-5xl mx-auto px-6" />

      {/* ── Values ── */}
      <section className="px-6 md:px-16 lg:px-24 py-16 md:py-24 max-w-5xl mx-auto">
        <BlurFade delay={0.1} inView>
          <span className="font-heading font-bold text-5xl text-accent/20 block mb-2">05</span>
          <h2 className="font-heading font-bold text-2xl text-text mb-10">Our Values</h2>
        </BlurFade>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {about.values.map((value, i) => (
            <BlurFade key={value.label} delay={0.08 + i * 0.07} inView>
              <div className="flex flex-col gap-3 p-6 rounded-2xl border border-border/50 bg-surface hover:border-accent/30 transition-colors h-full">
                <span className="font-heading font-bold text-lg text-text">{value.label}</span>
                <p className="font-sans text-sm text-text-muted leading-relaxed">{value.description}</p>
              </div>
            </BlurFade>
          ))}
        </div>
      </section>

      <div className="w-full h-px bg-border/40 max-w-5xl mx-auto px-6" />

      {/* ── Awards ── */}
      <section className="px-6 md:px-16 lg:px-24 py-16 md:py-24 max-w-5xl mx-auto">
        <BlurFade delay={0.1} inView>
          <span className="font-heading font-bold text-5xl text-accent/20 block mb-2">06</span>
          <h2 className="font-heading font-bold text-2xl text-text mb-10">Recognition</h2>
        </BlurFade>
        <div className="flex flex-col divide-y divide-border/40">
          {about.awards.map((award, i) => (
            <BlurFade key={award.title} delay={0.08 + i * 0.08} inView>
              <div className="flex flex-col md:flex-row md:items-center justify-between py-6 gap-3">
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Award size={15} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base text-text leading-snug">{award.title}</h3>
                    <p className="font-sans text-xs text-text-muted mt-1">{award.issuer}</p>
                  </div>
                </div>
                <span className="ml-12 md:ml-0 font-heading font-bold text-lg text-accent/70 shrink-0">{award.year}</span>
              </div>
            </BlurFade>
          ))}
        </div>
      </section>

      {/* ── President's Theme ── */}
      <section className="px-6 md:px-16 lg:px-24 py-16 max-w-5xl mx-auto">
        <BlurFade delay={0.1} inView>
          <div className="bg-surface border border-accent/20 rounded-2xl p-8 md:p-12">
            <p className="font-sans text-xs font-semibold uppercase tracking-widest text-accent mb-4">
              President&apos;s Theme {new Date().getFullYear()}-{new Date().getFullYear() + 1}
            </p>
            <blockquote className="font-heading font-bold text-[clamp(1.5rem,3vw,2.5rem)] text-text leading-tight">
              &ldquo;{about.presidentTheme}&rdquo;
            </blockquote>
          </div>
        </BlurFade>
      </section>

    </main>
  );
}
