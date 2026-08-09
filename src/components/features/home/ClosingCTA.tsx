"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export function ClosingCTA() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      className="py-28 md:py-36 px-6 bg-background overflow-hidden"
    >
      <div className="max-w-5xl mx-auto w-full flex flex-col gap-10">

        {/* Sweeping line */}
        <motion.div
          className="w-full h-px bg-gradient-to-r from-accent via-accent-secondary to-accent/0"
          initial={{ scaleX: 0, originX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Big statement */}
        <motion.div
          className="flex flex-col gap-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        >
          <h2 className="font-heading font-bold text-[clamp(3rem,9vw,7.5rem)] text-text leading-[0.95] tracking-tight">
            Service
          </h2>
          <h2 className="font-heading font-bold text-[clamp(3rem,9vw,7.5rem)] text-accent leading-[0.95] tracking-tight">
            Above Self.
          </h2>
        </motion.div>

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
