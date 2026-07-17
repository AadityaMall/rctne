"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function ClosingCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;

      // Line sweeps in from left on scroll
      gsap.set(lineRef.current, { scaleX: 0, transformOrigin: "left center" });
      gsap.to(lineRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
        scaleX: 1,
        duration: 1.2,
        ease: "power3.out",
      });

      // Text slides up
      gsap.set(textRef.current, { y: 40, opacity: 0 });
      gsap.to(textRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%", once: true },
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        delay: 0.15,
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="py-28 md:py-36 px-6 bg-background overflow-hidden"
    >
      <div className="max-w-5xl mx-auto w-full flex flex-col gap-10">

        {/* Sweeping line */}
        <div ref={lineRef} className="w-full h-px bg-gradient-to-r from-accent via-accent-secondary to-accent/0" />

        {/* Big statement */}
        <div ref={textRef} className="flex flex-col gap-6">
          <h2 className="font-heading font-bold text-[clamp(3rem,9vw,7.5rem)] text-text leading-[0.95] tracking-tight">
            Service
          </h2>
          <h2 className="font-heading font-bold text-[clamp(3rem,9vw,7.5rem)] text-accent leading-[0.95] tracking-tight">
            Above Self.
          </h2>
        </div>

        {/* Sub line + CTA */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pt-4">
          <p className="font-sans text-base text-text-muted max-w-sm leading-relaxed">
            Ready to be part of something bigger? Join RCTNE and start your journey as a changemaker.
          </p>
          <div className="flex flex-wrap gap-4">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-accent text-background font-heading font-bold px-8 py-3.5 rounded-full text-sm tracking-wide hover:bg-accent/90 transition-colors"
              >
                Get in touch
              </Link>
            </motion.div>
            <motion.div whileHover={{ x: 3 }}>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 font-sans text-sm text-text-muted hover:text-accent transition-colors py-3.5"
              >
                Our story →
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
