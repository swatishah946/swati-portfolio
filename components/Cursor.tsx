"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/** A ring that trails the pointer and swells over anything clickable. Desktop pointers only. */
export function Cursor() {
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ring.current;
    if (!el) return;
    if (!window.matchMedia("(pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const x = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3.out" });
    const y = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3.out" });
    let shown = false;

    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      if (!shown) {
        gsap.set(el, { x: e.clientX, y: e.clientY });
        el.classList.add("on");
        shown = true;
      }
      x(e.clientX);
      y(e.clientY);
      const hit = (e.target as HTMLElement)?.closest?.("a, button, [role='tab'], input, label");
      el.classList.toggle("hot", !!hit);
    };
    const hide = () => { el.classList.remove("on"); shown = false; };
    const down = () => el.classList.add("press");
    const up = () => el.classList.remove("press");

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", hide);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", hide);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
    };
  }, []);

  return <div ref={ring} className="cursor-ring" aria-hidden="true" />;
}
