// Site-wide configuration types

export interface SiteMetadata {
  title: string
  description: string
  keywords: string[]
  openGraph: {
    title: string
    description: string
    type: string
  }
}

export interface PageMeta {
  title: string
  description: string
}

export interface ContactFormConfig {
  /** Email addresses that receive contact form submissions */
  recipients: string[]
  /** Name shown in the "From" field of outgoing emails */
  senderName: string
  /** Subject prefix for contact form emails */
  subjectPrefix: string
}

export interface SiteConfig {
  /** Global site metadata (used in root layout) */
  metadata: SiteMetadata
  /** Per-page metadata overrides */
  pages: {
    about: PageMeta
    contact: PageMeta
    calendar: PageMeta
    gallery: PageMeta
    projects: PageMeta
    team: PageMeta
  }
  /** Contact form email configuration */
  contactForm: ContactFormConfig
  /** WhatsApp channel invite URL (floating CTA + event registration) */
  whatsappChannel: string
  /** Google Form URL for membership applications */
  joinFormUrl: string
}
