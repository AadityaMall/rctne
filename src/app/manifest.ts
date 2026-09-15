import type { MetadataRoute } from "next"
import { siteConfig } from "@/data/site-config.data"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.organization.legalName,
    short_name: siteConfig.siteName,
    description: siteConfig.metadata.description,
    start_url: "/",
    display: "standalone",
    background_color: "#f5efe4",
    theme_color: siteConfig.themeColor,
    icons: [
      { src: "/icon.png", sizes: "192x192", type: "image/png" },
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
  }
}
