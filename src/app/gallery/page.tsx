import type { Metadata } from "next";
import { siteConfig } from "@/data/site-config.data";
import { GalleryPageContent } from "@/components/features/gallery/GalleryPageContent";

export const metadata: Metadata = {
  title: siteConfig.pages.gallery.title,
  description: siteConfig.pages.gallery.description,
  keywords: siteConfig.pages.gallery.keywords,
  alternates: {
    canonical: `${siteConfig.siteUrl}${siteConfig.pages.gallery.path}`,
  },
  openGraph: {
    title: siteConfig.pages.gallery.title,
    description: siteConfig.pages.gallery.description,
    url: `${siteConfig.siteUrl}${siteConfig.pages.gallery.path}`,
    siteName: siteConfig.siteName,
    locale: siteConfig.locale,
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: siteConfig.pages.gallery.title }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.pages.gallery.title,
    description: siteConfig.pages.gallery.description,
    images: ["/opengraph-image"],
  },
};

export default function GalleryPage() {
  return <GalleryPageContent />;
}
