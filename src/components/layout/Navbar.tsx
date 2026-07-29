"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { contentService } from "@/services/content.service";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";
import type { NavLink } from "@/types/content.types";

export function Navbar() {
  const [navLinks, setNavLinks] = useState<NavLink[]>([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    contentService.getNavLinks().then(setNavLinks);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 pointer-events-none">
        <motion.div
          initial={{ y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "pointer-events-auto flex items-center justify-between rounded-full px-5 py-2.5 w-full max-w-5xl transition-all duration-500 ease-out",
            scrolled
              ? "bg-background/90 backdrop-blur-2xl border border-border/70 shadow-[0_4px_30px_oklch(57%_0.16_45_/_0.07)]"
              : "bg-background/80 backdrop-blur-md border border-border/50 shadow-[0_2px_12px_oklch(22%_0.02_50_/_0.06)]"
          )}
        >
          {/* Brand */}
          <Link
            href="/"
            className="font-heading text-xl font-bold tracking-tight text-text hover:text-accent transition-colors duration-200"
          >
            RCTNE
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-0.5 font-sans text-sm font-medium">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-3.5 py-1.5 rounded-full transition-colors duration-200 select-none",
                    active ? "text-accent" : "text-text-muted hover:text-text"
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-accent/10 border border-accent/25"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen((p) => !p)}
              className="md:hidden p-2 rounded-full hover:bg-surface transition-colors text-text-muted hover:text-text"
              aria-label="Toggle navigation"
              aria-expanded={mobileOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <X size={20} />
                  </motion.span>
                ) : (
                  <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <Menu size={20} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </motion.div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-text/10 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.nav
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[80vw] max-w-[320px] bg-background/97 backdrop-blur-3xl border-l border-border/50 flex flex-col px-8 pt-24 pb-12 md:hidden"
            >
              <div className="font-heading text-3xl font-bold text-text mb-6">RCTNE</div>
              <div className="flex flex-col gap-1">
                {navLinks.map((link, i) => {
                  const active = isActive(link.href);
                  return (
                    <motion.div key={link.href} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 + i * 0.04 }}>
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          "block text-xl font-heading font-semibold py-2.5 px-4 rounded-xl transition-colors",
                          active ? "text-accent bg-accent/8" : "text-text hover:text-accent hover:bg-surface"
                        )}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
