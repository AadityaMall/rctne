import { navLinks } from "@/data/nav.data"
import { siteConfig } from "@/data/site-config.data"
import { hero } from "@/data/hero.data"
import { partners } from "@/data/partners.data"
import { about } from "@/data/about.data"
import { aboutPage } from "@/data/about-page.data"
import { projects } from "@/data/projects.data"
import { calendar } from "@/data/calendar.data"
import { moreAbout } from "@/data/more-about.data"
import { contact, closing } from "@/data/contact.data"
import { teamTiers } from "@/data/team.data"
import { galleryItems } from "@/data/gallery.data"
import type {
  NavLink,
  Partner,
  HeroContent,
  AboutContent,
  AboutPageContent,
  Project,
  CalendarSection,
  MoreAboutContent,
  ContactContent,
  TeamTierGroup,
  GalleryItem,
} from "@/types/content.types"
import type { SiteConfig, PageMeta } from "@/types/site-config.types"

export const contentService = {
  getNavLinks: (): Promise<NavLink[]> => Promise.resolve(navLinks),
  getHero: (): Promise<HeroContent> => Promise.resolve(hero),
  getPartners: (): Promise<Partner[]> => Promise.resolve(partners),
  getAbout: (): Promise<AboutContent> => Promise.resolve(about),
  getAboutPage: (): Promise<AboutPageContent> => Promise.resolve(aboutPage),
  getProjects: (): Promise<Project[]> => Promise.resolve(projects),
  getCalendar: (): Promise<CalendarSection> => Promise.resolve(calendar),
  getMoreAbout: (): Promise<MoreAboutContent> => Promise.resolve(moreAbout),
  getContact: (): Promise<ContactContent> => Promise.resolve(contact),
  getClosingStatement: (): Promise<string> => Promise.resolve(closing.statement),
  getTeamTiers: (): Promise<TeamTierGroup[]> => Promise.resolve(teamTiers),
  getGallery: (): Promise<GalleryItem[]> => Promise.resolve(galleryItems),
  getSiteConfig: (): Promise<SiteConfig> => Promise.resolve(siteConfig),
  getPageMeta: (page: keyof SiteConfig["pages"]): Promise<PageMeta> =>
    Promise.resolve(siteConfig.pages[page]),
}
