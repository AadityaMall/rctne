"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { MOCK_DATA } from "@/mockData";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function TeamSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    // Set initial state for cards (hidden below and scaled down slightly)
    cardsRef.current.forEach((card, i) => {
      if (i !== 0) { // First card is already visible
        gsap.set(card, { y: window.innerHeight, scale: 0.8, opacity: 0 });
      }
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${cardsRef.current.length * 100}%`, // Pin length based on number of cards
        pin: true,
        scrub: 1,
      }
    });

    // Animate each card stacking on top
    cardsRef.current.forEach((card, i) => {
      if (i === 0) return; // Skip first

      tl.to(card, {
        y: 0,
        scale: 1 - ((cardsRef.current.length - 1 - i) * 0.05), // Slight scale down for cards in back
        opacity: 1,
        ease: "power2.out",
        duration: 1,
      }, i * 0.5); // Stagger timing
      
      // Push previous cards slightly back
      if (i > 0) {
        const prevCards = cardsRef.current.slice(0, i);
        tl.to(prevCards, {
          scale: "-=0.05",
          y: "-=20",
          ease: "power2.out",
          duration: 1
        }, i * 0.5);
      }
    });

  }, { scope: sectionRef });

  return (
    <section 
      ref={sectionRef}
      id="team" 
      data-section="team" 
      className="h-screen bg-transparent overflow-hidden flex items-center justify-center relative"
    >
      <div className="absolute top-24 md:top-32 left-6 md:left-24 z-20">
        {/* Section Header */}
        <div className="flex flex-col gap-2">
          <span className="text-accent font-heading font-bold text-xl">
            ({MOCK_DATA.team.number})
          </span>
          <h2 className="font-heading font-bold text-4xl md:text-6xl text-text tracking-tight">
            {MOCK_DATA.team.title}
          </h2>
        </div>
      </div>

      {/* Stacking Card Deck */}
      <div className="relative w-full max-w-sm md:max-w-md aspect-[3/4] mt-24">
        {MOCK_DATA.team.items.map((member, i) => (
          <div 
            key={member.id}
            ref={el => { cardsRef.current[i] = el; }}
            className={cn(
              "absolute inset-0 group flex flex-col gap-3 rounded-2xl shadow-2xl bg-surface border border-border/20 overflow-hidden",
              i === 0 ? "z-10" : `z-[${10 + i}]`
            )}
            style={{ transformOrigin: "top center" }}
          >
            <div className="relative flex-1 w-full bg-surface-hover flex items-center justify-center">
              <span className="font-sans text-text-muted">{member.image}</span>
              
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-background/80 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-center p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <p className="font-heading font-bold text-2xl text-text mb-2">{member.name}</p>
                  <p className="font-sans text-accent font-medium">{member.role}</p>
                </div>
              </div>
            </div>
            
            {/* Base info strip */}
            <div className="bg-background p-6 border-t border-border/10 flex justify-between items-center">
              <h3 className="font-heading font-bold text-xl text-text">{member.name}</h3>
              <span className="font-sans text-xs font-semibold text-accent uppercase tracking-wider bg-accent/10 px-3 py-1 rounded-full">
                {member.role.split(" ")[0]}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
