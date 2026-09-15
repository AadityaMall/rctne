import type { CalendarSection } from "@/types/content.types"
import { siteConfig } from "@/data/site-config.data"

export const calendar: CalendarSection = {
  number: "05",
  title: "Events",
  events: [
    {
      id: "1",
      name: "Beach Cleanup Drive",
      date: "Sep 21, 2026",
      location: "Kelva Beach, Palghar",
      type: "Environment",
      status: "upcoming",
      description: "Join us for a community-led beach cleanup to restore Kelva Beach. Together we collect waste, raise awareness, and protect the coastline.",
      registrationUrl: siteConfig.whatsappChannel,
    },
    {
      id: "4",
      name: "Blood Donation Camp",
      date: "Jan 18, 2026",
      location: "Thane Civil Hospital",
      type: "Medical Aid",
      status: "past",
      highlights: "Collected 85 units of blood in a single day — one of RCTNE's highest-impact medical drives to date.",
    },
    {
      id: "5",
      name: "SkillUp Workshop",
      date: "Mar 2, 2026",
      location: "VJTI, Mumbai",
      type: "Leadership",
      status: "past",
      highlights: "Over 70 students attended sessions on public speaking, resume building, and professional networking.",
    },
    {
      id: "6",
      name: "Plantation Drive",
      date: "Jun 5, 2026",
      location: "Yeoor Hills, Thane",
      type: "Environment",
      status: "past",
      highlights: "Planted 200+ saplings at Yeoor Hills on World Environment Day with 40 volunteers.",
    },
  ],
}

