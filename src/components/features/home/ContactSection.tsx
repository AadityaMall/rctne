"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";
import { MapPin, Instagram, Facebook, Linkedin, Link2 } from "lucide-react";
import { contentService } from "@/services/content.service";
import type { ContactContent } from "@/types/content.types";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function ContactSection() {
  const containerRef = useRef<HTMLElement>(null);
  const closingRef = useRef<HTMLDivElement>(null);
  const [contactData, setContactData] = useState<ContactContent | null>(null);
  const [closingStatement, setClosingStatement] = useState<string>("");

  useEffect(() => {
    Promise.all([
      contentService.getContact(),
      contentService.getClosingStatement(),
    ]).then(([contact, statement]) => {
      setContactData(contact);
      setClosingStatement(statement);
    });
  }, []);

  useGSAP(
    () => {
      if (!closingStatement) return;
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) {
        gsap.set(closingRef.current, { opacity: 1 });
        return;
      }
      gsap.set(closingRef.current, { opacity: 0, y: 30 });
      gsap.to(closingRef.current, {
        scrollTrigger: { trigger: containerRef.current, start: "top 70%", once: true },
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      });
    },
    { scope: containerRef, dependencies: [closingStatement] }
  );

  return (
    <section
      ref={containerRef}
      id="contact"
      data-section="contact"
      className="pt-28 pb-0 px-6 bg-background"
    >
      {/* Closing CTA statement */}
      <div ref={closingRef} className="max-w-5xl mx-auto w-full text-center mb-24 md:mb-32 flex flex-col items-center gap-2">
        <h2 className="font-heading font-bold text-[clamp(3rem,9vw,7rem)] tracking-tight text-text leading-[1.0] uppercase">
          {closingStatement}
        </h2>
        <h2
          aria-hidden="true"
          className="font-heading font-bold text-[clamp(3rem,9vw,7rem)] tracking-tight text-text/25 leading-[1.0] uppercase"
        >
          {closingStatement}
        </h2>
      </div>

      {/* Contact form + info */}
      <div className="max-w-5xl mx-auto w-full grid md:grid-cols-2 gap-16 pb-28">

        {/* Form */}
        <div className="flex flex-col gap-8">
          <div>
            <h3 className="font-heading font-bold text-3xl md:text-4xl text-text">Get in touch.</h3>
            <p className="font-sans text-text-muted mt-2">
              Have a question, or want to get involved? We'd love to hear from you.
            </p>
          </div>

          <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="contact-name" className="font-sans text-sm font-medium text-text">
                Name
              </label>
              <input
                id="contact-name"
                type="text"
                placeholder="Your name"
                className="bg-surface border border-border/60 rounded-xl px-4 py-3 text-text placeholder:text-text-muted/50 focus:outline-none focus:border-accent transition-colors font-sans text-sm"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="contact-email" className="font-sans text-sm font-medium text-text">
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                placeholder="hello@example.com"
                className="bg-surface border border-border/60 rounded-xl px-4 py-3 text-text placeholder:text-text-muted/50 focus:outline-none focus:border-accent transition-colors font-sans text-sm"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="contact-message" className="font-sans text-sm font-medium text-text">
                Message
              </label>
              <textarea
                id="contact-message"
                rows={4}
                placeholder="How can we help?"
                className="bg-surface border border-border/60 rounded-xl px-4 py-3 text-text placeholder:text-text-muted/50 focus:outline-none focus:border-accent transition-colors font-sans text-sm resize-none"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="self-start bg-accent text-background font-heading font-bold px-8 py-3.5 rounded-full text-sm tracking-wide hover:bg-accent/90 transition-colors"
            >
              Send Message
            </motion.button>
          </form>
        </div>

        {/* Info side */}
        <div className="flex flex-col gap-10">
          {/* Map placeholder */}
          <div className="w-full aspect-video bg-surface border border-border/40 rounded-2xl flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 dot-grid" />
            <div className="relative z-10 flex flex-col items-center gap-2 text-text-muted">
              <MapPin size={28} strokeWidth={1.5} />
              <span className="font-sans text-xs">Thane, Maharashtra</span>
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <div className="font-heading font-semibold text-sm text-text uppercase tracking-wider">Email</div>
            <a
              href={`mailto:${contactData?.email}`}
              className="font-sans text-text-muted hover:text-accent transition-colors text-sm"
            >
              {contactData?.email}
            </a>
          </div>

          {/* Socials */}
          <div className="flex flex-col gap-3">
            <div className="font-heading font-semibold text-sm text-text uppercase tracking-wider">Follow Us</div>
            <div className="flex flex-col gap-2">
              {contactData?.socials.map((social) => {
                const icon = {
                  Instagram: <Instagram size={13} />,
                  Facebook: <Facebook size={13} />,
                  LinkedIn: <Linkedin size={13} />,
                }[social.platform] ?? <Link2 size={13} />;
                return (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-sm text-text-muted hover:text-accent transition-colors flex items-center gap-2"
                  >
                    <span className="text-accent/70">{icon}</span>
                    {social.platform}
                    <span className="text-text-muted/50">·</span>
                    <span>{social.handle}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
