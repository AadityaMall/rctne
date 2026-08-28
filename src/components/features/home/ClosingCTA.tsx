"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BlurFade } from "@/components/ui/blur-fade";
import { ArrowRight, Share2 } from "lucide-react";

export function ClosingCTA() {
  return (
    <>
      {/* ── Join Us ── */}
      <section className="py-24 md:py-32 px-6 bg-background overflow-hidden">
        <div className="max-w-5xl mx-auto w-full">

          {/* Sweeping line */}
          <motion.div
            className="w-full h-px bg-gradient-to-r from-accent via-accent-secondary to-accent/0 mb-14"
            initial={{ scaleX: 0, originX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          />

          <div className="grid md:grid-cols-[3fr_2fr] gap-12 md:gap-16 items-center">

            {/* Left — text */}
            <BlurFade delay={0.1} inView>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-1">
                  <span className="font-heading font-bold text-5xl text-accent/20 block">
                    07
                  </span>
                  <h2 className="font-heading font-bold text-[clamp(2.5rem,6vw,5rem)] text-text leading-[0.98] tracking-tight">
                    Want to be part
                  </h2>
                  <h2 className="font-heading font-bold text-[clamp(2.5rem,6vw,5rem)] text-accent leading-[0.98] tracking-tight">
                    of the movement?
                  </h2>
                </div>
                <p className="font-sans text-base md:text-lg text-text-muted max-w-sm leading-relaxed">
                  Join a community of young leaders who show up, serve, and make
                  a real difference. Membership is open — all it takes is the
                  will to begin.
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 bg-accent text-background font-heading font-bold px-8 py-3.5 rounded-full text-sm tracking-wide hover:bg-accent/90 transition-colors"
                    >
                      Join Our Organisation
                      <ArrowRight size={14} aria-hidden />
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
            </BlurFade>

            {/* Right — Instagram CTA */}
            <BlurFade delay={0.25} inView>
              <div className="flex flex-col gap-5 p-8 rounded-2xl border border-border/50 bg-surface">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <Share2 size={18} className="text-accent" />
                  </div>
                  <div>
                    <p className="font-heading font-bold text-sm text-text">Follow us on Instagram</p>
                    <p className="font-sans text-xs text-text-muted">@rc_thanenorthend</p>
                  </div>
                </div>
                <p className="font-sans text-sm text-text-muted leading-relaxed">
                  Stay up to date with our latest events, projects, and moments — all on Instagram.
                </p>
                <motion.a
                  href="https://www.instagram.com/rc_thanenorthend/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "tween", duration: 0.15, ease: "easeOut" }}
                  className="inline-flex items-center justify-center gap-2 border border-accent/30 text-accent font-heading font-bold px-6 py-3 rounded-full text-sm tracking-wide hover:bg-accent/8 transition-colors"
                >
                  <Share2 size={14} />
                  View our Instagram
                </motion.a>
              </div>
            </BlurFade>

          </div>
        </div>
      </section>
    </>
  );
}
