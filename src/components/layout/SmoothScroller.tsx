"use client";

import { useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/*
  LenisGSAPBridge — correct integration pattern:

  ✅ GSAP ticker drives Lenis via performance.now() (ms), not the ticker's
     seconds-based `time` argument.
  ✅ ScrollTrigger.update() called ONCE per frame inside the Lenis callback
     (which fires after Lenis has updated scroll position for that frame).
  ✅ autoRaf: false — Lenis does NOT run its own requestAnimationFrame loop;
     GSAP ticker owns the RAF.

  This eliminates the two main sources of jank:
  - Wrong time units passed to lenis.raf() (was: time*1000 in seconds)
  - Double ScrollTrigger.update() (was: in both useLenis + GSAP add)
*/
function LenisGSAPBridge() {
  // useLenis fires after Lenis has scrolled for this frame —
  // safe to update ScrollTrigger here (positions are committed).
  useLenis(() => {
    ScrollTrigger.update();
  });

  useEffect(() => {
    // Drive Lenis with GSAP's ticker using performance.now() directly.
    // GSAP passes seconds; lenis.raf() needs the current timestamp in ms.
    function onTick() {
      // Access the lenis instance from the ReactLenis root context.
      // We reach it via the globally registered lenis instance.
      // performance.now() is the correct argument for lenis.raf().
      (window as unknown as { __lenis?: { raf: (t: number) => void } }).__lenis?.raf(performance.now());
    }

    gsap.ticker.add(onTick);
    // lagSmoothing(0) prevents GSAP from artificially capping delta time,
    // which would cause Lenis to skip frames during background tab catch-up.
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onTick);
    };
  }, []);

  return null;
}

function LenisInstanceRegistrar() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    (window as unknown as { __lenis?: unknown }).__lenis = lenis;
    return () => {
      (window as unknown as { __lenis?: unknown }).__lenis = undefined;
    };
  }, [lenis]);

  return null;
}

export function SmoothScroller({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        // GSAP ticker drives Lenis — Lenis must NOT run its own RAF loop.
        autoRaf: false,
        // Prevent Lenis from hijacking touch events on mobile
        // (browser handles momentum scrolling natively, smoother on iOS)
        prevent: (el) => {
          return el.closest("[data-lenis-prevent]") !== null;
        },
      }}
    >
      <LenisInstanceRegistrar />
      <LenisGSAPBridge />
      {children}
    </ReactLenis>
  );
}
