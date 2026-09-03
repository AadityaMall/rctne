"use client";

import React from "react";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, type LucideIcon } from "lucide-react";
import { contentService } from "@/services/content.service";
import type { SocialLink } from "@/types/content.types";

import { SOCIAL_CONFIG } from "@/components/shared/SocialIcons";

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

        {/* TOP: Logos spanning across the content */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-10 border-b border-border/60 pb-12 mb-12 w-full">
          {/* 1st Logo: Main Logo (Spans top row on mobile, 1/3 column on desktop) */}
          <Link href="/" className="flex flex-1 items-center justify-center w-full hover:opacity-90 transition-opacity">
            <Image 
              src="/images/theme/logo-black-cropped.png" 
              alt="Rotaract Club of Thane North End" 
              width={1211} 
              height={277} 
              className="h-[68px] sm:h-[100px] md:h-[170px] w-auto max-w-full object-contain dark:hidden" 
            />
            <Image 
              src="/images/theme/logo-white-cropped.png" 
              alt="Rotaract Club of Thane North End" 
              width={1211} 
              height={277} 
              className="h-[68px] sm:h-[100px] md:h-[170px] w-auto max-w-full object-contain hidden dark:block" 
            />
          </Link>
          
          {/* Vertical line between Main Logo and the rest (Desktop only) */}
          <div className="w-px h-[120px] bg-border hidden md:block shrink-0"></div>

          {/* 2nd & 3rd Logos: Side by side on mobile and tablet, continuing row on desktop */}
          <div className="flex flex-row items-center justify-center gap-6 sm:gap-10 w-full md:w-auto md:flex-[2]">
            {/* 2nd Logo: Magical Vibes Final */}
            <div className="flex-1 flex items-center justify-center">
              <Image 
                src="/images/logos/Rotaract%20%26%20Year%20Theme%20Logos/Theme%20Logos/Magical%20Vibes%20Logo%20Final.png" 
                alt="Magical Vibes Theme" 
                width={600} 
                height={300} 
                className="h-[78px] sm:h-[115px] md:h-[195px] w-auto max-w-full object-contain" 
              />
            </div>

            {/* Vertical line between Magical Vibes and District Logo (Always visible) */}
            <div className="w-px h-16 sm:h-20 md:h-[120px] bg-border shrink-0"></div>

            {/* 3rd Logo: Rotaract District */}
            <div className="flex-1 flex items-center justify-center">
              <Image 
                src="/images/logos/Rotaract%20%26%20Year%20Theme%20Logos/District%20Logos/Rotaract%20Logo%20Black.png" 
                alt="Rotaract District" 
                width={600} 
                height={300} 
                className="h-[38px] sm:h-[55px] md:h-[95px] w-auto max-w-full object-contain dark:hidden" 
              />
              <Image 
                src="/images/logos/Rotaract%20%26%20Year%20Theme%20Logos/District%20Logos/Rotaract%20Logo%20White.png" 
                alt="Rotaract District" 
                width={600} 
                height={300} 
                className="h-[38px] sm:h-[55px] md:h-[95px] w-auto max-w-full object-contain hidden dark:block" 
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-10 mb-12 w-full">
          
          {/* Brand Info */}
          <div className="flex flex-col gap-3 max-w-sm text-center md:text-left items-center md:items-start">
            <p className="font-sans text-sm text-text-muted leading-relaxed">
              <span className="font-semibold text-text">Rotaract Club of Thane North End</span><br />
              Young leaders building real change in Thane and beyond. Empowering youth through leadership and community service.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-6 w-full md:w-auto text-center md:text-left">
            <div className="font-heading font-semibold text-sm text-text uppercase tracking-wider">Quick Links</div>
            <div className="grid grid-cols-2 gap-x-12 gap-y-3 text-left w-max mx-auto md:mx-0">
              {(
                [
                  { href: "/",         label: "Home"     },
                  { href: "/about",    label: "About"    },
                  { href: "/team",     label: "Team"     },
                  { href: "/projects", label: "Projects" },
                  { href: "/gallery",  label: "Gallery"  },
                  { href: "/contact",  label: "Join Us"  },
                  { href: "/contact",  label: "Contact"  },
                ] as const
              ).map(({ href, label }) => (
                <Link
                  key={label}
                  href={href}
                  className="font-sans text-sm text-text-muted hover:text-accent transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Socials — fully dynamic, driven by contact.data.ts */}
          <div className="flex flex-col gap-3 w-full md:w-auto items-center md:items-start text-center md:text-left">
            <div className="font-heading font-semibold text-sm text-text uppercase tracking-wider">Connect</div>
            <div className="flex gap-2.5 flex-wrap justify-center md:justify-start">
              {socials.map((social) => (
                <SocialButton key={social.platform} social={social} />
              ))}
            </div>
            {socials[0]?.handle && (
              <p className="font-sans text-xs text-text-muted/60 mt-0.5">
                {socials[0].handle}
              </p>
            )}
            <a
              href="mailto:hello@rctne.org"
              className="font-sans text-xs text-text-muted hover:text-accent transition-colors mt-1"
            >
              hello@rctne.org
            </a>
          </div>
        </div>

        <div className="border-t border-border/30 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 w-full">
          <p className="font-sans text-xs text-text-muted text-center md:text-left">
            Copyright {new Date().getFullYear()} Rotaract Club of Thane North End. All Rights Reserved.
          </p>
          <p className="font-sans text-xs font-medium text-accent text-center md:text-right">
            Service above self.
          </p>
        </div>

      </div>
    </footer>
  );
}
