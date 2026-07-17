"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ExternalLink, ArrowRight } from "lucide-react";
import { contentService } from "@/services/content.service";
import type { SocialLink } from "@/types/content.types";

export function Footer() {
  const [socials, setSocials] = useState<SocialLink[]>([]);

  useEffect(() => {
    contentService.getContact().then((c) => setSocials(c.socials));
  }, []);

  return (
    <footer className="bg-background border-t border-border/40 py-14 px-6">
      <div className="max-w-5xl mx-auto w-full">

        <div className="flex flex-col md:flex-row justify-between items-start gap-10 mb-12">

          {/* Brand */}
          <div className="flex flex-col gap-3 max-w-xs">
            <div className="font-heading font-bold text-2xl text-text">RCTNE</div>
            <p className="font-sans text-sm text-text-muted leading-relaxed">
              Rotaract Club of Thane North End.<br />
              Young leaders. Real impact.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col md:flex-row gap-10">
            <div className="flex flex-col gap-3">
              <div className="font-heading font-semibold text-sm text-text uppercase tracking-wider">Navigate</div>
              {["/#about", "/#projects", "/#calendar", "/#contact"].map((href) => (
                <Link
                  key={href}
                  href={href}
                  className="font-sans text-sm text-text-muted hover:text-accent transition-colors"
                >
                  {href.replace("/#", "").replace("-", " ").replace(/^\w/, (c) => c.toUpperCase())}
                </Link>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <div className="font-heading font-semibold text-sm text-text uppercase tracking-wider">Team</div>
              <Link
                href="/team"
                className="inline-flex items-center gap-1.5 font-sans text-sm text-accent hover:text-accent/80 transition-colors font-medium"
              >
                Meet the Team
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Socials */}
          <div className="flex flex-col gap-3">
            <div className="font-heading font-semibold text-sm text-text uppercase tracking-wider">Connect</div>
            <div className="flex gap-3">
              {socials.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  aria-label={social.platform}
                  className="inline-flex items-center gap-1.5 p-2.5 rounded-full border border-border/60 text-text-muted hover:text-accent hover:border-accent/40 transition-colors"
                >
                  <ExternalLink size={14} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border/30 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="font-sans text-xs text-text-muted">
            © {new Date().getFullYear()} Rotaract Club of Thane North End. All rights reserved.
          </p>
          <p className="font-sans text-xs text-text-muted">
            Service above self.
          </p>
        </div>

      </div>
    </footer>
  );
}
