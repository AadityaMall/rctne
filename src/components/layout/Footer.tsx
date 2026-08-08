"use client";

import React from "react";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, type LucideIcon } from "lucide-react";
import { contentService } from "@/services/content.service";
import type { SocialLink } from "@/types/content.types";

/* ──────────────────────────────────────────────
   Inline SVG icon components for social brand icons.
   Lucide-react doesn't ship brand icons in this version,
   so we define minimal inline SVGs following the same
   size/className API as lucide icons.
────────────────────────────────────────────── */

function IconInstagram({ size = 15, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconLinkedIn({ size = 15, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function IconX({ size = 15, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function IconYouTube({ size = 15, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58a2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon fill="none" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
    </svg>
  );
}

function IconFacebook({ size = 15, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function IconGitHub({ size = 15, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

/* ──────────────────────────────────────────────
   Social config — add entries here for new platforms.
   Fallback to ExternalLink for unknown platforms.
────────────────────────────────────────────── */
interface SocialIconComponent {
  ({ size, className }: { size?: number; className?: string }): React.ReactElement;
}

interface SocialConfig {
  SvgIcon: SocialIconComponent | LucideIcon;
  hoverBg: string;
  hoverBorder: string;
  hoverIcon: string;
}

const SOCIAL_CONFIG: Record<string, SocialConfig> = {
  Instagram: {
    SvgIcon: IconInstagram,
    hoverBg: "hover:bg-gradient-to-tr hover:from-yellow-400/15 hover:via-pink-500/15 hover:to-purple-600/15",
    hoverBorder: "hover:border-pink-400/50",
    hoverIcon: "group-hover:text-pink-500",
  },
  LinkedIn: {
    SvgIcon: IconLinkedIn,
    hoverBg: "hover:bg-blue-500/10",
    hoverBorder: "hover:border-blue-400/50",
    hoverIcon: "group-hover:text-blue-500",
  },
  Twitter: {
    SvgIcon: IconX,
    hoverBg: "hover:bg-foreground/8",
    hoverBorder: "hover:border-foreground/30",
    hoverIcon: "group-hover:text-foreground",
  },
  X: {
    SvgIcon: IconX,
    hoverBg: "hover:bg-foreground/8",
    hoverBorder: "hover:border-foreground/30",
    hoverIcon: "group-hover:text-foreground",
  },
  YouTube: {
    SvgIcon: IconYouTube,
    hoverBg: "hover:bg-red-500/10",
    hoverBorder: "hover:border-red-400/50",
    hoverIcon: "group-hover:text-red-500",
  },
  Facebook: {
    SvgIcon: IconFacebook,
    hoverBg: "hover:bg-blue-600/10",
    hoverBorder: "hover:border-blue-500/50",
    hoverIcon: "group-hover:text-blue-600",
  },
  GitHub: {
    SvgIcon: IconGitHub,
    hoverBg: "hover:bg-foreground/6",
    hoverBorder: "hover:border-foreground/30",
    hoverIcon: "group-hover:text-foreground",
  },
};

function SocialButton({ social }: { social: SocialLink }) {
  const cfg = SOCIAL_CONFIG[social.platform];

  if (!cfg) {
    // Fallback for any unknown platform — generic link icon
    return (
      <motion.a
        href={social.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={social.platform}
        title={social.handle || social.platform}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.94 }}
        transition={{ type: "tween", duration: 0.16, ease: "easeOut" }}
        className="group inline-flex items-center justify-center w-9 h-9 rounded-full border border-border/60 bg-transparent hover:bg-accent/10 hover:border-accent/40 transition-colors duration-200"
      >
        <ExternalLink size={14} className="text-text-muted group-hover:text-accent transition-colors duration-200" />
      </motion.a>
    );
  }

  const { SvgIcon, hoverBg, hoverBorder, hoverIcon } = cfg;

  return (
    <motion.a
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={social.platform}
      title={social.handle || social.platform}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.94 }}
      transition={{ type: "tween", duration: 0.16, ease: "easeOut" }}
      className={[
        "group inline-flex items-center justify-center w-9 h-9 rounded-full",
        "border border-border/60 bg-transparent",
        "transition-colors duration-200",
        hoverBg,
        hoverBorder,
      ].join(" ")}
    >
      <SvgIcon
        size={15}
        className={["text-text-muted transition-colors duration-200", hoverIcon].join(" ")}
      />
    </motion.a>
  );
}

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
            <div>
              <Image
                src="/images/theme/logo-black-cropped.png"
                alt="Rotaract Club of Thane North End"
                width={1211}
                height={277}
                className="h-10 w-auto dark:hidden"
              />
              <Image
                src="/images/theme/logo-white-cropped.png"
                alt="Rotaract Club of Thane North End"
                width={1211}
                height={277}
                className="h-10 w-auto hidden dark:block"
              />
            </div>
            <p className="font-sans text-sm text-text-muted leading-relaxed">
              Rotaract Club of Thane North End.<br />
              Young leaders. Real impact.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col md:flex-row gap-10">
            <div className="flex flex-col gap-3">
              <div className="font-heading font-semibold text-sm text-text uppercase tracking-wider">Navigate</div>
              {(
                [
                  { href: "/about",    label: "About"    },
                  { href: "/projects", label: "Projects" },
                  { href: "/contact",  label: "Contact"  },
                ] as const
              ).map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="font-sans text-sm text-text-muted hover:text-accent transition-colors"
                >
                  {label}
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

          {/* Socials — fully dynamic, driven by contact.data.ts */}
          <div className="flex flex-col gap-3">
            <div className="font-heading font-semibold text-sm text-text uppercase tracking-wider">Connect</div>
            <div className="flex gap-2.5 flex-wrap">
              {socials.map((social) => (
                <SocialButton key={social.platform} social={social} />
              ))}
            </div>
            {socials[0]?.handle && (
              <p className="font-sans text-xs text-text-muted/60 mt-0.5">
                {socials[0].handle}
              </p>
            )}
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
