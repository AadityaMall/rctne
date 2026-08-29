// Navigation links
export interface NavLink {
  label: string
  href: string
}

// Marquee
export interface Partner {
  name: string
  abbr: string
}

// Hero
export interface HeroContent {
  headline: string
  subtext: string
  cta: string
}

// About (home brief)
export interface AboutContent {
  number: string
  title: string
  body: string
}

// About page (full)
export interface AboutPageContent {
  established: string
  district: string
  districtNumber: string
  presidentTheme: string
  mission: string
  vision: string
  history: string
  pillars: string[]
  values: ValueItem[]
  awards: AwardItem[]
}

export interface ValueItem {
  label: string
  description: string
}

export interface AwardItem {
  title: string
  year: string
  issuer: string
}

// Projects
export interface Project {
  id: string
  title: string
  /** Month abbreviation this project runs, e.g. "Jun", "Apr" */
  month: string
  category: string
  image: string
  detail: string
  instagramUrl?: string
}

// Testimonials
export interface Testimonial {
  quote: string
  name: string
  role: string
}

// Calendar
export interface CalendarSection {
  number: string
  title: string
  events: CalendarEvent[]
}

export interface CalendarEvent {
  id: string
  name: string
  date: string
  location: string
  type: string
  status?: "upcoming" | "past"
}

// Stats / Impact
export interface Stat {
  value: string
  label: string
}

export interface MoreAboutContent {
  number: string
  title: string
  body: string
  stats: Stat[]
}

// Contact
export interface ContactContent {
  email: string
  socials: SocialLink[]
}

export interface SocialLink {
  platform: string
  url: string
  handle: string
}

// Team
export type TeamTier = "district" | "press" | "core" | "board" | "general"

export interface TeamMember {
  id: string
  name: string
  role: string
  tagline?: string
  image?: string
  tier: TeamTier
  initials: string
}

export interface TeamTierGroup {
  number: string
  tier: TeamTier
  title: string
  subtitle: string
  members: TeamMember[]
}
