import type { SiteConfig } from "@/types/site-config.types"

export const siteConfig: SiteConfig = {
  // ── Global metadata (root layout) ──
  metadata: {
    title: "Rotaract Club of Thane North End — Aagaz",
    description:
      "Every beginning holds endless possibilities. Rotaract Club of Thane North End — young leaders building real change in Thane and beyond.",
    keywords: ["Rotaract", "Thane", "Community Service", "Youth Leadership", "RCTNE"],
    openGraph: {
      title: "Rotaract Club of Thane North End",
      description: "Young leaders. Real impact.",
      type: "website",
    },
  },

  // ── Per-page metadata ──
  pages: {
    about: {
      title: "About Us — RCTNE",
      description:
        "Learn about the Rotaract Club of Thane North End — our history, mission, vision, district, and awards.",
    },
    contact: {
      title: "Join & Contact — RCTNE",
      description:
        "Join the Rotaract Club of Thane North End or get in touch with us.",
    },
    calendar: {
      title: "Calendar — RCTNE",
      description:
        "Upcoming and past events by the Rotaract Club of Thane North End.",
    },
    gallery: {
      title: "Gallery — RCTNE",
      description:
        "Photos and highlights from Rotaract Club of Thane North End events and initiatives.",
    },
    projects: {
      title: "Projects — RCTNE",
      description:
        "Community service projects and initiatives by the Rotaract Club of Thane North End.",
    },
    team: {
      title: "Our Team — RCTNE",
      description:
        "Meet the members and board of the Rotaract Club of Thane North End.",
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
}
