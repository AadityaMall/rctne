import type { Metadata } from "next";
import { siteConfig } from "@/data/site-config.data";
import { TeamPageContent } from "@/components/features/team/TeamPageContent";

export const metadata: Metadata = {
  title: siteConfig.pages.team.title,
  description: siteConfig.pages.team.description,
  keywords: siteConfig.pages.team.keywords,
  alternates: {
    canonical: `${siteConfig.siteUrl}${siteConfig.pages.team.path}`,
  },
  openGraph: {
    title: siteConfig.pages.team.title,
    description: siteConfig.pages.team.description,
    url: `${siteConfig.siteUrl}${siteConfig.pages.team.path}`,
    siteName: siteConfig.siteName,
    locale: siteConfig.locale,
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: siteConfig.pages.team.title }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.pages.team.title,
    description: siteConfig.pages.team.description,
    images: ["/opengraph-image"],
  },
};

export default function TeamPage() {
  return <TeamPageContent />;
}
