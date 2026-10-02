"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.12, anchors: { offset: -72 } });
    let id = 0;
    const raf = (t: number) => { lenis.raf(t); id = requestAnimationFrame(raf); };
    id = requestAnimationFrame(raf);
    const lock = (e: Event) => ((e as CustomEvent).detail ? lenis.stop() : lenis.start());
    window.addEventListener("scroll-lock", lock);
    return () => { cancelAnimationFrame(id); window.removeEventListener("scroll-lock", lock); lenis.destroy(); };
  }, []);
  return null;
}
