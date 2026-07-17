"use client";

import { useEffect, useState } from "react";
import { Marquee as MagicMarquee } from "@/components/ui/marquee";
import { contentService } from "@/services/content.service";
import { cn } from "@/lib/utils";
import type { Partner } from "@/types/content.types";

function PartnerChip({ partner }: { partner: Partner }) {
  return (
    <div className={cn(
      "flex items-center gap-2.5 px-6 py-3 mx-2",
      "rounded-full border border-border/50 bg-surface/60",
      "font-heading font-semibold text-sm text-text-muted/80",
      "whitespace-nowrap transition-colors hover:text-text hover:border-accent/40 hover:bg-surface",
      "select-none cursor-default"
    )}>
      <div className="w-1.5 h-1.5 rounded-full bg-accent/60 shrink-0" />
      {partner.abbr}
    </div>
  );
}

export function Marquee() {
  const [partners, setPartners] = useState<Partner[]>([]);

  useEffect(() => {
    contentService.getPartners().then(setPartners);
  }, []);

  if (!partners.length) return null;

  return (
    <section className="relative py-10 border-y border-border/50 bg-surface/50 overflow-hidden">
      {/* Edge fades */}
      <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-surface/80 to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-surface/80 to-transparent pointer-events-none" />

      <MagicMarquee
        pauseOnHover
        className="[--duration:35s] [--gap:0px]"
      >
        {partners.map((p, i) => (
          <PartnerChip key={i} partner={p} />
        ))}
      </MagicMarquee>

      <p className="text-center font-sans text-[10px] text-text-muted/50 uppercase tracking-[0.25em] mt-6 pointer-events-none select-none">
        Partners &amp; Affiliates
      </p>
    </section>
  );
}
