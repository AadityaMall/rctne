"use client";

import { motion } from "framer-motion";

interface TestimonialBlockProps {
  quote: string;
  name: string;
  role: string;
}

export function TestimonialBlock({ quote, name, role }: TestimonialBlockProps) {
  return (
    <section className="py-20 md:py-28 px-6 bg-background border-y border-border/40">
      <div className="max-w-3xl mx-auto w-full">
        <motion.div
          className="flex flex-col gap-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Large opening quote mark */}
          <svg
            aria-hidden="true"
            className="w-10 h-10 text-accent/40"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M11.3 4H6.5C5.1 4 4 5.1 4 6.5v5c0 1.4 1.1 2.5 2.5 2.5h2.6L7 20h3l2-6V6.5C12 5.1 11.6 4 11.3 4zM20.5 4h-4.8C14.3 4 13 5.1 13 6.5v5c0 1.4 1.1 2.5 2.5 2.5h2.6L16 20h3l2-6V6.5C21 5.1 20.8 4 20.5 4z" />
          </svg>

          <p className="font-heading font-semibold text-[clamp(1.4rem,3.2vw,2.2rem)] text-text leading-[1.3]">
            {quote}
          </p>

          <div className="flex items-center gap-4">
            <div className="w-10 h-px bg-accent" />
            <div>
              <div className="font-heading font-bold text-base text-text">{name}</div>
              <div className="font-sans text-sm text-text-muted mt-0.5">{role}</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
