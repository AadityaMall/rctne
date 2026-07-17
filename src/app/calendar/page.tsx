import { contentService } from "@/services/content.service";
import { BlurFade } from "@/components/ui/blur-fade";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { Calendar, MapPin, ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calendar — RCTNE",
  description: "Upcoming and past events by the Rotaract Club of Thane North End.",
};

const TYPE_DOT: Record<string, string> = {
  Environment: "oklch(55% 0.14 148)",
  Leadership: "oklch(62% 0.17 40)",
  Fundraiser: "oklch(57% 0.14 280)",
  "Medical Aid": "oklch(60% 0.15 20)",
  Community: "oklch(62% 0.17 40)",
};

export default async function CalendarPage() {
  const { events } = await contentService.getCalendar();
  const upcoming = events.filter((e) => e.status !== "past");
  const past = events.filter((e) => e.status === "past");

  return (
    <main className="min-h-screen bg-background pt-28 pb-32">
      <div className="max-w-5xl mx-auto px-6 md:px-16">

        {/* Back */}
        <BlurFade delay={0.05} inView>
          <Link href="/" className="inline-flex items-center gap-2 font-sans text-sm text-text-muted hover:text-accent transition-colors mb-8 w-fit">
            <ArrowLeft size={14} /> Home
          </Link>
        </BlurFade>

        {/* Header */}
        <BlurFade delay={0.1} inView>
          <div className="inline-flex items-center rounded-full border border-accent/30 bg-accent/8 px-4 py-1.5 mb-5">
            <AnimatedShinyText className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-accent">
              ✦ Events
            </AnimatedShinyText>
          </div>
          <h1 className="font-heading font-bold text-[clamp(2.5rem,7vw,5.5rem)] text-text leading-[0.98] tracking-tight">
            Mark your<br />calendar.
          </h1>
        </BlurFade>

        <BlurFade delay={0.2} inView>
          <p className="font-sans text-base md:text-lg text-text-muted max-w-md mt-4 mb-14 leading-relaxed">
            Every event is a new chance to serve, connect, and grow. Stay up to date with what RCTNE has planned.
          </p>
        </BlurFade>

        {/* Upcoming */}
        {upcoming.length > 0 && (
          <>
            <BlurFade delay={0.1} inView>
              <h2 className="font-heading font-bold text-xl text-text mb-6 flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold uppercase tracking-widest bg-accent/10 text-accent px-3 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  Upcoming
                </span>
              </h2>
            </BlurFade>
            <ul className="flex flex-col divide-y divide-border/40 mb-16">
              {upcoming.map((event, i) => (
                <BlurFade key={event.id} delay={0.1 + i * 0.07} inView>
                  <li className="flex flex-col md:flex-row md:items-center justify-between py-7 gap-4">
                    <div className="flex items-start gap-5">
                      <div
                        className="w-2.5 h-2.5 rounded-full shrink-0 mt-2"
                        style={{ backgroundColor: TYPE_DOT[event.type] ?? TYPE_DOT.Leadership }}
                      />
                      <div className="flex flex-col gap-2">
                        <h3 className="font-heading font-bold text-xl md:text-2xl text-text leading-tight">
                          {event.name}
                        </h3>
                        <div className="flex flex-wrap items-center gap-4 font-sans text-sm text-text-muted">
                          <span className="flex items-center gap-1.5"><Calendar size={12} />{event.date}</span>
                          <span className="flex items-center gap-1.5"><MapPin size={12} />{event.location}</span>
                        </div>
                      </div>
                    </div>
                    <span className="ml-7 md:ml-0 inline-flex font-sans text-xs font-semibold uppercase tracking-wider text-text-muted border border-border/50 px-3 py-1.5 rounded-full">
                      {event.type}
                    </span>
                  </li>
                </BlurFade>
              ))}
            </ul>
          </>
        )}

        {/* Past events */}
        {past.length > 0 && (
          <>
            <BlurFade delay={0.1} inView>
              <h2 className="font-heading font-bold text-xl text-text mb-6 flex items-center gap-3">
                <span className="inline-flex items-center text-xs font-sans font-semibold uppercase tracking-widest bg-surface text-text-muted px-3 py-1 rounded-full border border-border/50">
                  Past
                </span>
              </h2>
            </BlurFade>
            <ul className="flex flex-col divide-y divide-border/40 opacity-60">
              {past.map((event, i) => (
                <BlurFade key={event.id} delay={0.07 + i * 0.05} inView>
                  <li className="flex flex-col md:flex-row md:items-center justify-between py-6 gap-3">
                    <div className="flex items-start gap-5">
                      <div className="w-2 h-2 rounded-full bg-border shrink-0 mt-2" />
                      <div className="flex flex-col gap-1.5">
                        <h3 className="font-heading font-bold text-lg text-text leading-tight">{event.name}</h3>
                        <div className="flex flex-wrap items-center gap-4 font-sans text-sm text-text-muted">
                          <span className="flex items-center gap-1.5"><Calendar size={12} />{event.date}</span>
                          <span className="flex items-center gap-1.5"><MapPin size={12} />{event.location}</span>
                        </div>
                      </div>
                    </div>
                    <span className="ml-7 md:ml-0 font-sans text-xs text-text-muted border border-border/40 px-3 py-1.5 rounded-full">
                      {event.type}
                    </span>
                  </li>
                </BlurFade>
              ))}
            </ul>
          </>
        )}

      </div>
    </main>
  );
}
