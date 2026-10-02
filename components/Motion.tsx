"use client";

import { useEffect } from "react";
import { gsap } from "gsap";

/**
 * One place for all scroll and pointer driven effects, so components stay simple.
 * Everything is opt-in through data attributes and skipped for reduced motion:
 *   [data-reveal]        fades and rises when it enters the viewport
 *   [data-stagger]       its children reveal one after another
 *   .split               heading words rise out of a mask (see <Split />)
 *   .opener .flow .timeline   get .is-in for their CSS animations
 *   [data-spotlight]     a soft glow follows the pointer
 *   [data-tilt]          tilts slightly toward the pointer
 *   [data-parallax=n]    drifts horizontally while scrolling
 * Content is fully visible without JavaScript: hiding only starts once html.motion is set.
 */
export function Motion() {
  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;

    // Scroll progress for the bar under the nav (runs even with reduced motion; it's information).
    let ticking = false;
    const parallax = reduced ? [] : Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const max = root.scrollHeight - window.innerHeight;
        root.style.setProperty("--progress", String(max > 0 ? window.scrollY / max : 0));
        const vh = window.innerHeight;
        for (const el of parallax) {
          const r = el.getBoundingClientRect();
          if (r.bottom < -200 || r.top > vh + 200) continue;
          const k = Number(el.dataset.parallax) || 0.1;
          const offset = (r.top + r.height / 2 - vh / 2) * k;
          el.style.transform = `translate3d(${offset}px, 0, 0)`;
        }
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    if (reduced) {
      return () => {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
      };
    }

    root.classList.add("motion");

    // Stagger delays.
    document.querySelectorAll<HTMLElement>("[data-stagger]").forEach((group) => {
      const step = Number(group.dataset.stagger) || 0.06;
      Array.from(group.children).forEach((child, i) => (child as HTMLElement).style.setProperty("--d", `${i * step}s`));
    });

    // Reveal on enter.
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    document
      .querySelectorAll("[data-reveal], [data-stagger], .split, .opener, .flow, .timeline, .marquee")
      .forEach((el) => {
        // The hero plays as part of the load sequence, not on scroll.
        if (el.closest(".hero")) window.setTimeout(() => el.classList.add("is-in"), 450);
        else io.observe(el);
      });

    // Spotlight glow.
    const onMove = (e: PointerEvent) => {
      const el = (e.target as HTMLElement)?.closest?.("[data-spotlight]") as HTMLElement | null;
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    if (fine) document.addEventListener("pointermove", onMove, { passive: true });

    // Tilt.
    const cleanups: (() => void)[] = [];
    if (fine) {
      document.querySelectorAll<HTMLElement>("[data-tilt]").forEach((el) => {
        const rx = gsap.quickTo(el, "rotationX", { duration: 0.6, ease: "power3.out" });
        const ry = gsap.quickTo(el, "rotationY", { duration: 0.6, ease: "power3.out" });
        gsap.set(el, { transformPerspective: 1100 });
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          ry(px * 6);
          rx(-py * 6);
        };
        const leave = () => { rx(0); ry(0); };
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          el.removeEventListener("pointermove", move);
          el.removeEventListener("pointerleave", leave);
        });
      });
    }

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      document.removeEventListener("pointermove", onMove);
      cleanups.forEach((c) => c());
      root.classList.remove("motion");
    };
  }, []);

  return null;
}

/** Heading text split into words that rise from a mask when the heading scrolls in. */
export function Split({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((w, i) => (
          <span key={i}>
            <span className="w">
              <span style={{ "--i": i } as React.CSSProperties}>{w}</span>
            </span>
            {i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </span>
    </>
  );
}
