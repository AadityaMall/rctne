import type { Metadata } from "next";
import { siteConfig } from "@/data/site-config.data";
import { ProjectsPageContent } from "@/components/features/projects/ProjectsPageContent";

export const metadata: Metadata = {
  title: siteConfig.pages.projects.title,
  description: siteConfig.pages.projects.description,
  keywords: siteConfig.pages.projects.keywords,
  alternates: {
    canonical: `${siteConfig.siteUrl}${siteConfig.pages.projects.path}`,
  },
  openGraph: {
    title: siteConfig.pages.projects.title,
    description: siteConfig.pages.projects.description,
    url: `${siteConfig.siteUrl}${siteConfig.pages.projects.path}`,
    siteName: siteConfig.siteName,
    locale: siteConfig.locale,
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: siteConfig.pages.projects.title }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.pages.projects.title,
    description: siteConfig.pages.projects.description,
    images: ["/opengraph-image"],
  },
};

export default function ProjectsPage() {
  return <ProjectsPageContent />;
}
