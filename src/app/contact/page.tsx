import { contentService } from "@/services/content.service";
import { BlurFade } from "@/components/ui/blur-fade";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { Mail, ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — RCTNE",
  description: "Get in touch with the Rotaract Club of Thane North End.",
};

export default async function ContactPage() {
  const contact = await contentService.getContact();

  return (
    <main className="min-h-screen bg-background pt-28 pb-32">
      <div className="max-w-5xl mx-auto px-6 md:px-16">

        {/* Back */}
        <BlurFade delay={0.05} inView>
          <Link href="/" className="inline-flex items-center gap-2 font-sans text-sm text-text-muted hover:text-accent transition-colors mb-8 w-fit">
            <ArrowLeft size={14} /> Home
          </Link>
        </BlurFade>

        {/* Header */}
        <BlurFade delay={0.1} inView>
          <div className="inline-flex items-center rounded-full border border-accent/30 bg-accent/8 px-4 py-1.5 mb-5">
            <AnimatedShinyText className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-accent">
              ✦ Say Hello
            </AnimatedShinyText>
          </div>
          <h1 className="font-heading font-bold text-[clamp(2.5rem,7vw,5.5rem)] text-text leading-[0.98] tracking-tight">
            Let&apos;s start<br />something.
          </h1>
        </BlurFade>

        <BlurFade delay={0.2} inView>
          <p className="font-sans text-base md:text-lg text-text-muted max-w-md mt-4 mb-14 leading-relaxed">
            Whether you want to join RCTNE, partner with us, or just ask a question — we&apos;d love to hear from you.
          </p>
        </BlurFade>

        <div className="grid md:grid-cols-[3fr_2fr] gap-12 md:gap-16">

          {/* Contact form */}
          <BlurFade delay={0.25} inView>
            <form className="flex flex-col gap-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-name" className="font-sans text-xs font-semibold uppercase tracking-widest text-text-muted">Name</label>
                  <input
                    id="contact-name"
                    type="text"
                    placeholder="Your name"
                    className="font-sans text-sm text-text bg-surface border border-border/60 rounded-xl px-4 py-3.5 placeholder:text-text-muted/40 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-email" className="font-sans text-xs font-semibold uppercase tracking-widest text-text-muted">Email</label>
                  <input
                    id="contact-email"
                    type="email"
                    placeholder="you@email.com"
                    className="font-sans text-sm text-text bg-surface border border-border/60 rounded-xl px-4 py-3.5 placeholder:text-text-muted/40 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="contact-subject" className="font-sans text-xs font-semibold uppercase tracking-widest text-text-muted">Subject</label>
                <input
                  id="contact-subject"
                  type="text"
                  placeholder="What's this about?"
                  className="font-sans text-sm text-text bg-surface border border-border/60 rounded-xl px-4 py-3.5 placeholder:text-text-muted/40 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="contact-message" className="font-sans text-xs font-semibold uppercase tracking-widest text-text-muted">Message</label>
                <textarea
                  id="contact-message"
                  rows={6}
                  placeholder="Tell us more..."
                  className="font-sans text-sm text-text bg-surface border border-border/60 rounded-xl px-4 py-3.5 resize-none placeholder:text-text-muted/40 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all"
                />
              </div>
              <button
                type="submit"
                className="self-start inline-flex items-center gap-2 bg-accent text-background font-heading font-bold px-7 py-3.5 rounded-full text-sm tracking-wide hover:bg-accent/90 transition-colors"
              >
                Send message
              </button>
            </form>
          </BlurFade>

          {/* Contact info */}
          <BlurFade delay={0.35} inView>
            <div className="flex flex-col gap-8 pt-2">
              <div>
                <p className="font-sans text-xs font-semibold uppercase tracking-widest text-text-muted mb-3">Email</p>
                <a
                  href={`mailto:${contact.email}`}
                  className="inline-flex items-center gap-2 font-heading font-semibold text-lg text-text hover:text-accent transition-colors"
                >
                  <Mail size={18} className="text-accent" />
                  {contact.email}
                </a>
              </div>

              <div>
                <p className="font-sans text-xs font-semibold uppercase tracking-widest text-text-muted mb-4">Find us on</p>
                <div className="flex flex-col gap-3">
                  {contact.socials.map((social) => (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 font-sans text-sm text-text-muted hover:text-accent transition-colors group"
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

              <div className="bg-surface border border-border/40 rounded-2xl p-6">
                <p className="font-sans text-xs font-semibold uppercase tracking-widest text-text-muted mb-2">District</p>
                <p className="font-heading font-bold text-base text-text">Rotaract District 3141</p>
                <p className="font-sans text-sm text-text-muted mt-1">Thane, Maharashtra, India</p>
              </div>
            </div>
          </BlurFade>
        </div>

      </div>
    </main>
  );
}
