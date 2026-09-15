import type { SiteConfig } from "@/types/site-config.types"

export const siteConfig: SiteConfig = {
  // ── Canonical domain — the ONLY place to change when the domain changes ──
  siteUrl: "https://rctne.vercel.app",
  siteName: "RCTNE",
  locale: "en_IN",
  themeColor: "#c9723f",

  // ── Global metadata (root layout) ──
  metadata: {
    title: "Rotaract Club of Thane North End — Aagaz",
    description:
      "Every beginning holds endless possibilities. Rotaract Club of Thane North End (RCTNE) — a youth-led Rotaract community service club in Thane, District 3142, building real change through volunteering, leadership, and service.",
    keywords: [
      "Rotaract Club Thane",
      "Rotaract District 3142",
      "RCTNE",
      "youth community service Thane",
      "volunteer NGO Thane",
      "youth leadership Maharashtra",
    ],
    openGraph: {
      title: "Rotaract Club of Thane North End",
      description: "Young leaders. Real impact.",
      type: "website",
    },
  },

  // ── Per-page metadata ──
  pages: {
    home: {
      title: "Rotaract Club of Thane North End — Aagaz '26–27",
      description:
        "Every beginning holds endless possibilities. A youth-led Rotaract community service club in Thane, District 3142 — service, leadership, and lasting change.",
      path: "/",
      keywords: [
        "Rotaract Club Thane",
        "Rotaract District 3142",
        "youth community service Thane",
        "volunteer NGO Thane",
        "RCTNE",
      ],
    },
    about: {
      title: "About Us — RCTNE",
      description:
        "Learn about the Rotaract Club of Thane North End — our history, mission, vision, District 3142 affiliation, and awards.",
      path: "/about",
      keywords: [
        "Rotaract Club Thane history",
        "Rotaract District 3142",
        "youth leadership NGO Thane",
        "RCTNE mission vision",
      ],
    },
    contact: {
      title: "Join & Contact — RCTNE",
      description:
        "Join the Rotaract Club of Thane North End or get in touch with us — membership, volunteering, and general inquiries.",
      path: "/contact",
      keywords: [
        "join Rotaract Club Thane",
        "volunteer sign up Thane NGO",
        "RCTNE contact",
        "Rotaract membership Thane",
      ],
    },
    calendar: {
      title: "Calendar — RCTNE",
      description:
        "Upcoming and past events by the Rotaract Club of Thane North End — drives, workshops, and community service dates.",
      path: "/calendar",
      keywords: [
        "Rotaract events Thane",
        "volunteer drives Thane calendar",
        "NGO events Maharashtra",
        "RCTNE upcoming events",
      ],
    },
    gallery: {
      title: "Gallery — RCTNE",
      description:
        "Photos and highlights from Rotaract Club of Thane North End events and initiatives.",
      path: "/gallery",
      keywords: [
        "Rotaract Club Thane photos",
        "RCTNE event gallery",
        "Rotaract community service pictures",
      ],
    },
    projects: {
      title: "Projects — RCTNE",
      description:
        "Community service projects and initiatives by the Rotaract Club of Thane North End.",
      path: "/projects",
      keywords: [
        "Rotaract community service projects Thane",
        "youth volunteering drives Thane",
        "RCTNE projects",
        "District 3142 service projects",
      ],
    },
    team: {
      title: "Our Team — RCTNE",
      description:
        "Meet the members and board of the Rotaract Club of Thane North End.",
      path: "/team",
      keywords: [
        "Rotaract Club Thane board members",
        "RCTNE leadership team",
        "Rotaract District 3142 team",
      ],
    },
  },

  // ── Contact form email settings ──
  contactForm: {
    recipients: ["rotaractthanenorthend@gmail.com","rtrkhushimahajan@gmail.com", "rtr.virajpongurlekar@gmail.com", "rtr.anoushkka.nair@gmail.com", "rtrshreyadeshpande@gmail.com"],
    senderName: "RCTNE Website",
    subjectPrefix: "Contact Form",
  },

  // ── WhatsApp channel ──
  whatsappChannel: "https://whatsapp.com/channel/0029Vb8jEJoF6sn6OzY2K802",

  // ── Membership form ──
  joinFormUrl: "https://docs.google.com/forms/d/e/1FAIpQLSd4PMpFJBqYdsu8-CJOFm8DBKcnf_eUlXclo_QuyXF34FAKKw/viewform",

  // ── Search engine verification — paste new codes here when adding tools (GSC, Bing, etc.) ──
  verification: {
    google: "D8RVB00inrkxMJDGpCb-g5wc-xGx_OvN8EhaKJjV7DQ",
  },

  // ── Organization details for structured data (JSON-LD) ──
  organization: {
    legalName: "Rotaract Club of Thane North End",
    foundingYear: "2015",
    addressLocality: "Thane",
    addressRegion: "Maharashtra",
    addressCountry: "IN",
    logo: "/images/theme/logo-black-cropped.png",
    sameAs: [
      "https://www.instagram.com/rc_thanenorthend/",
      "https://www.linkedin.com/company/rctne/",
    ],
  },
}
