"use client";

import { useEffect, useRef } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function LenisGSAPBridge() {
  const lenis = useLenis(({ scroll }) => {
    // Keep ScrollTrigger in sync with Lenis
    ScrollTrigger.update();
    void scroll;
  });

  useEffect(() => {
    if (!lenis) return;
    // Sync Lenis RAF with GSAP ticker
    function update(time: number) {
      lenis!.raf(time * 1000);
    }
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
    };
  }, [lenis]);

  return null;
}

export function SmoothScroller({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        // Disable Lenis's own RAF — GSAP ticker drives it instead
        autoRaf: false,
      }}
    >
      <LenisGSAPBridge />
      {children}
    </ReactLenis>
  );
}
