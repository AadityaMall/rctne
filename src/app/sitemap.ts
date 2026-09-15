import type { MetadataRoute } from "next"
import { siteConfig } from "@/data/site-config.data"

const ROUTE_WEIGHT: Record<
  keyof typeof siteConfig.pages,
  { priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }
> = {
  home: { priority: 1.0, changeFrequency: "weekly" },
  projects: { priority: 0.9, changeFrequency: "weekly" },
  calendar: { priority: 0.9, changeFrequency: "weekly" },
  about: { priority: 0.8, changeFrequency: "monthly" },
  contact: { priority: 0.7, changeFrequency: "yearly" },
  team: { priority: 0.6, changeFrequency: "monthly" },
  gallery: { priority: 0.6, changeFrequency: "monthly" },
}

export default function sitemap(): MetadataRoute.Sitemap {
  return (Object.keys(siteConfig.pages) as (keyof typeof siteConfig.pages)[]).map((key) => {
    const page = siteConfig.pages[key]
    const weight = ROUTE_WEIGHT[key]

    return {
      url: `${siteConfig.siteUrl}${page.path}`,
      lastModified: new Date(),
      changeFrequency: weight.changeFrequency,
      priority: weight.priority,
    }
  })
}
