import { contentService } from "@/services/content.service";
import { BlurFade } from "@/components/ui/blur-fade";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { Mail, Phone, MapPin, ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join & Contact — RCTNE",
  description: "Join the Rotaract Club of Thane North End or get in touch with us.",
};

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
        <section className="mb-24">
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
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-text text-background font-heading font-bold px-8 py-4 rounded-full text-sm tracking-wide hover:bg-text/90 transition-colors"
            >
              Apply Now
            </a>
          </BlurFade>
        </section>

        <div className="h-px w-full bg-border/50 mb-24" />

        {/* ── CONTACT SECTION ── */}
        <section>
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
                    {contact.socials.map((social) => (
                      <a
                        key={social.platform}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 font-sans text-sm text-text-muted hover:text-accent transition-colors group w-fit"
                      >
                        <span className="w-9 h-9 rounded-full border border-border/50 flex items-center justify-center group-hover:border-accent/40 group-hover:bg-accent/8 transition-colors">
                          <ExternalLink size={15} />
                        </span>
                        <span>
                          <span className="font-semibold text-text group-hover:text-accent transition-colors">{social.platform}</span>
                          <span className="text-text-muted ml-1.5">{social.handle}</span>
                        </span>
                      </a>
                    ))}
                  </div>
                </div>

              </div>
            </BlurFade>

            {/* Contact Form */}
            <BlurFade delay={0.3} inView>
              <form className="flex flex-col gap-5 bg-surface/50 p-6 sm:p-8 rounded-2xl border border-border/50">
                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-name" className="font-sans text-xs font-semibold uppercase tracking-widest text-text-muted">Name</label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="Your name"
                    className="font-sans text-sm text-text bg-background border border-border/60 rounded-xl px-4 py-3.5 placeholder:text-text-muted/40 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-email" className="font-sans text-xs font-semibold uppercase tracking-widest text-text-muted">Email</label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    placeholder="you@email.com"
                    className="font-sans text-sm text-text bg-background border border-border/60 rounded-xl px-4 py-3.5 placeholder:text-text-muted/40 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-phone" className="font-sans text-xs font-semibold uppercase tracking-widest text-text-muted">Phone <span className="lowercase normal-case font-normal">(optional)</span></label>
                  <input
                    id="contact-phone"
                    type="tel"
                    placeholder="Your phone number"
                    className="font-sans text-sm text-text bg-background border border-border/60 rounded-xl px-4 py-3.5 placeholder:text-text-muted/40 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-message" className="font-sans text-xs font-semibold uppercase tracking-widest text-text-muted">Message</label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    required
                    placeholder="How can we help?"
                    className="font-sans text-sm text-text bg-background border border-border/60 rounded-xl px-4 py-3.5 resize-none placeholder:text-text-muted/40 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 bg-accent text-background font-heading font-bold px-7 py-3.5 mt-2 rounded-xl text-sm tracking-wide hover:bg-accent/90 transition-colors"
                >
                  Submit
                </button>
              </form>
            </BlurFade>

          </div>
        </section>

      </div>
    </main>
  );
}
