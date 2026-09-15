import { contentService } from "@/services/content.service";
import { BlurFade } from "@/components/ui/blur-fade";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { Mail, Phone, MapPin, ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import { SOCIAL_CONFIG } from "@/components/shared/SocialIcons";
import { ContactForm } from "@/components/features/contact/ContactForm";
import { siteConfig } from "@/data/site-config.data";
import type { Metadata } from "next";

export const metadata: Metadata = siteConfig.pages.contact;

export default async function ContactPage() {
  const contact = await contentService.getContact();

  return (
    <main className="min-h-screen bg-background pt-28 pb-32">
      <div className="max-w-4xl mx-auto px-6 md:px-12">

        {/* Back */}
        <BlurFade delay={0.05} inView>
          <Link href="/" className="inline-flex items-center gap-2 font-sans text-sm text-text-muted hover:text-accent transition-colors mb-12 w-fit">
            <ArrowLeft size={14} /> Home
          </Link>
        </BlurFade>

        {/* ── JOIN US SECTION ── */}
        <section id="join-us" className="mb-24">
          <BlurFade delay={0.1} inView>
            <div className="inline-flex items-center rounded-full border border-accent/30 bg-accent/8 px-4 py-1.5 mb-5">
              <AnimatedShinyText className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-accent">
                ✦ Become a Member
              </AnimatedShinyText>
            </div>
            <h1 className="font-heading font-bold text-[clamp(2.5rem,6vw,4.5rem)] text-text leading-[1] tracking-tight mb-8">
              Want to join us?
            </h1>
          </BlurFade>

          <BlurFade delay={0.2} inView>
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-12">
              <div className="flex flex-col gap-2">
                <h3 className="font-heading font-bold text-xl text-text">Who can join?</h3>
                <p className="font-sans text-sm text-text-muted leading-relaxed">
                  Anyone aged 18-30 with a passion for community service, leadership, and personal growth can join our club. You don&apos;t need any prior experience—just the willingness to make a difference.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-heading font-bold text-xl text-text">What do members get?</h3>
                <p className="font-sans text-sm text-text-muted leading-relaxed">
                  Members gain access to professional development workshops, networking opportunities with industry leaders, and the chance to lead impactful community projects.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-heading font-bold text-xl text-text">What does the organization do?</h3>
                <p className="font-sans text-sm text-text-muted leading-relaxed">
                  We organize events and initiatives across various avenues like community service, professional development, international service, and club service to create positive change.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-heading font-bold text-xl text-text">How does membership work?</h3>
                <p className="font-sans text-sm text-text-muted leading-relaxed">
                  You start as a prospective member, attend our meetings and events, and once you complete the induction process, you become an official member of the club.
                </p>
              </div>
            </div>

            <a
              href={siteConfig.joinFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-text text-background font-heading font-bold px-8 py-4 rounded-full text-sm tracking-wide hover:bg-text/90 transition-colors"
            >
              Apply Now
            </a>
          </BlurFade>
        </section>

        {/* ── WHATSAPP CHANNEL SECTION ── */}
        <section id="whatsapp-channel" className="mb-24">
          <BlurFade delay={0.1} inView>
            <div className="bg-surface/80 border border-emerald-500/20 dark:border-emerald-500/30 rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
              <div className="flex flex-col gap-2 max-w-xl">
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-sans text-xs font-semibold uppercase tracking-widest">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Official WhatsApp Channel
                </div>
                <h3 className="font-heading font-bold text-2xl md:text-3xl text-text leading-snug">
                  Get instant updates on WhatsApp
                </h3>
                <p className="font-sans text-sm text-text-muted leading-relaxed">
                  Join our official WhatsApp Channel to receive real-time announcements on upcoming drives, meeting schedules, and project highlights.
                </p>
              </div>
              <a
                href={siteConfig.whatsappChannel}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 font-heading font-bold px-6 py-3.5 rounded-full text-xs uppercase tracking-wider transition-colors shrink-0"
              >
                <svg
                  className="w-4 h-4 fill-current shrink-0"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
                Join Channel
              </a>
            </div>
          </BlurFade>
        </section>

        <div className="h-px w-full bg-border/50 mb-24" />

        {/* ── CONTACT SECTION ── */}
        <section id="contact-section">
          <BlurFade delay={0.1} inView>
            <h2 className="font-heading font-bold text-4xl text-text leading-[1] tracking-tight mb-12">
              Contact us
            </h2>
          </BlurFade>

          <div className="grid md:grid-cols-2 gap-16">
            
            {/* Contact Info */}
            <BlurFade delay={0.2} inView>
              <div className="flex flex-col gap-10">
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0 text-accent">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="font-sans text-xs font-semibold uppercase tracking-widest text-text-muted mb-1">Email</p>
                    <a href={`mailto:${contact.email}`} className="font-heading font-semibold text-lg text-text hover:text-accent transition-colors">
                      {contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0 text-accent">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="font-sans text-xs font-semibold uppercase tracking-widest text-text-muted mb-1">Phone</p>
                    <a href={`tel:${contact.phone.replace(/[^0-9+]/g, "")}`} className="font-heading font-semibold text-lg text-text hover:text-accent transition-colors">
                      {contact.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0 text-accent">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="font-sans text-xs font-semibold uppercase tracking-widest text-text-muted mb-1">Location</p>
                    <p className="font-heading font-semibold text-lg text-text">
                      {contact.location}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="font-sans text-xs font-semibold uppercase tracking-widest text-text-muted mb-4">Social Media</p>
                  <div className="flex flex-col gap-3">
                    {contact.socials.map((social) => {
                      const cfg = SOCIAL_CONFIG[social.platform];
                      const Icon = cfg ? cfg.SvgIcon : ExternalLink;
                      
                      return (
                        <a
                          key={social.platform}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-3 font-sans text-sm text-text-muted hover:text-accent transition-colors group w-fit"
                        >
                          <span className={`w-9 h-9 rounded-full border border-border/50 flex items-center justify-center transition-colors ${cfg ? `${cfg.hoverBg} ${cfg.hoverBorder}` : 'group-hover:border-accent/40 group-hover:bg-accent/8'}`}>
                            <Icon size={15} className={cfg ? cfg.hoverIcon : ''} />
                          </span>
                          <span>
                            <span className="font-semibold text-text group-hover:text-accent transition-colors">{social.platform}</span>
                            <span className="text-text-muted ml-1.5">{social.handle}</span>
                          </span>
                        </a>
                      );
                    })}
                  </div>
                </div>

              </div>
            </BlurFade>

            {/* Contact Form */}
            <BlurFade delay={0.3} inView>
              <ContactForm />
            </BlurFade>

          </div>
        </section>

      </div>
    </main>
  );
}
