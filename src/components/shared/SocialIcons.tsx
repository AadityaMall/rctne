import React from "react";
import type { LucideIcon } from "lucide-react";

export function IconInstagram({ size = 15, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconLinkedIn({ size = 15, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export function IconX({ size = 15, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function IconFacebook({ size = 15, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}



export interface SocialIconComponent {
  ({ size, className }: { size?: number; className?: string }): React.ReactElement;
}

export interface SocialConfig {
  SvgIcon: SocialIconComponent | LucideIcon;
  hoverBg: string;
  hoverBorder: string;
  hoverIcon: string;
}

export const SOCIAL_CONFIG: Record<string, SocialConfig> = {
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
  Facebook: {
    SvgIcon: IconFacebook,
    hoverBg: "hover:bg-blue-600/10",
    hoverBorder: "hover:border-blue-500/50",
    hoverIcon: "group-hover:text-blue-600",
  },
};
