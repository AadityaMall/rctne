import { navLinks } from "@/data/nav.data"
import { hero } from "@/data/hero.data"
import { partners } from "@/data/partners.data"
import { about } from "@/data/about.data"
import { aboutPage } from "@/data/about-page.data"
import { projects } from "@/data/projects.data"
import { testimonials } from "@/data/testimonials.data"
import { calendar } from "@/data/calendar.data"
import { moreAbout } from "@/data/more-about.data"
import { contact, closing } from "@/data/contact.data"
import { teamTiers } from "@/data/team.data"
import type {
  NavLink,
  Partner,
  HeroContent,
  AboutContent,
  AboutPageContent,
  Project,
  Testimonial,
  CalendarSection,
  MoreAboutContent,
  ContactContent,
  TeamTierGroup,
} from "@/types/content.types"

export const contentService = {
  getNavLinks: (): Promise<NavLink[]> => Promise.resolve(navLinks),
  getHero: (): Promise<HeroContent> => Promise.resolve(hero),
  getPartners: (): Promise<Partner[]> => Promise.resolve(partners),
  getAbout: (): Promise<AboutContent> => Promise.resolve(about),
  getAboutPage: (): Promise<AboutPageContent> => Promise.resolve(aboutPage),
  getProjects: (): Promise<Project[]> => Promise.resolve(projects),
  getTestimonials: (): Promise<Testimonial[]> => Promise.resolve(testimonials),
  getCalendar: (): Promise<CalendarSection> => Promise.resolve(calendar),
  getMoreAbout: (): Promise<MoreAboutContent> => Promise.resolve(moreAbout),
  getContact: (): Promise<ContactContent> => Promise.resolve(contact),
  getClosingStatement: (): Promise<string> => Promise.resolve(closing.statement),
  getTeamTiers: (): Promise<TeamTierGroup[]> => Promise.resolve(teamTiers),
}
