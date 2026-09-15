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
  /** Route path, e.g. "/about" — used to build canonical URLs and the sitemap */
  path: string
  /** Per-page targeted SEO keywords */
  keywords: string[]
}

export interface ContactFormConfig {
  /** Email addresses that receive contact form submissions */
  recipients: string[]
  /** Name shown in the "From" field of outgoing emails */
  senderName: string
  /** Subject prefix for contact form emails */
  subjectPrefix: string
}

/** Verification codes for search engine / webmaster tools */
export interface SiteVerification {
  /** content value of the google-site-verification meta tag */
  google?: string
}

/** Feeds the sitewide Organization JSON-LD structured data block */
export interface OrganizationInfo {
  legalName: string
  foundingYear: string
  addressLocality: string
  addressRegion: string
  addressCountry: string
  /** Path to the org logo, relative to /public */
  logo: string
  /** Social profile URLs referenced as sameAs in structured data */
  sameAs: string[]
}

export interface SiteConfig {
  /** Canonical base URL of the site — change this single value when the domain changes */
  siteUrl: string
  /** Short brand name (OpenGraph site_name, manifest short_name) */
  siteName: string
  /** BCP 47 locale, e.g. "en_IN" */
  locale: string
  /** Hex theme color for browser UI / manifest */
  themeColor: string
  /** Global site metadata (used in root layout) */
  metadata: SiteMetadata
  /** Per-page metadata overrides */
  pages: {
    home: PageMeta
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
  /** Search engine / webmaster verification codes */
  verification: SiteVerification
  /** Organization details for structured data (JSON-LD) */
  organization: OrganizationInfo
}
