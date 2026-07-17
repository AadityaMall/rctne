"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar as CalendarIcon, MapPin, ArrowRight } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import { contentService } from "@/services/content.service";
import { SectionHeader } from "@/components/shared/SectionHeader";
import type { CalendarSection as CalendarData } from "@/types/content.types";

const typeColors: Record<string, string> = {
  Environment: "oklch(55% 0.14 148)",
  Leadership: "oklch(62% 0.17 40)",
  Fundraiser: "oklch(57% 0.14 280)",
  "Medical Aid": "oklch(60% 0.15 20)",
};

export function CalendarSection() {
  const [calendarData, setCalendarData] = useState<CalendarData | null>(null);

  useEffect(() => {
    contentService.getCalendar().then(setCalendarData);
  }, []);

  return (
    <section
      id="calendar"
      data-section="calendar"
      className="py-28 md:py-36 px-6 bg-background"
    >
      <div className="max-w-5xl mx-auto w-full flex flex-col gap-14">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <BlurFade delay={0.1} inView>
            <SectionHeader
              number={calendarData?.number ?? "03"}
              title={calendarData?.title ?? "Upcoming Events"}
            />
          </BlurFade>
          <BlurFade delay={0.2} inView>
            <p className="font-sans text-sm text-text-muted md:pb-2 max-w-xs">
              Mark your calendar — every event is a chance to make a difference.
            </p>
          </BlurFade>
        </div>

        <ul className="flex flex-col divide-y divide-border/40">
          {calendarData?.events.map((event, i) => {
            const dotColor = typeColors[event.type] ?? "oklch(62% 0.17 40)";
            return (
              <BlurFade key={event.id} delay={0.1 + i * 0.08} inView>
                <motion.li
                  whileHover={{ x: 8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 28 }}
                  className="group flex flex-col md:flex-row md:items-center justify-between py-7 gap-4 cursor-default"
                >
                  <div className="flex items-start gap-5">
                    <div className="w-2.5 h-2.5 rounded-full shrink-0 mt-2.5" style={{ backgroundColor: dotColor }} />
                    <div className="flex flex-col gap-2">
                      <h3 className="font-heading font-bold text-2xl text-text group-hover:text-accent transition-colors">
                        {event.name}
                      </h3>
                      <div className="flex flex-wrap items-center gap-5 font-sans text-sm text-text-muted">
                        <div className="flex items-center gap-1.5">
                          <CalendarIcon size={13} />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin size={13} />
                          <span>{event.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <span
                    className="ml-7 md:ml-0 inline-flex items-center gap-1.5 font-sans text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full border transition-colors group-hover:border-accent group-hover:text-accent"
                    style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
                  >
                    {event.type}
                    <ArrowRight size={11} />
                  </span>
                </motion.li>
              </BlurFade>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
