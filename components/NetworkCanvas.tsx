"use client";

import { useEffect, useRef } from "react";

type Node = { x: number; y: number; vx: number; vy: number; r: number; accent: boolean };

const readRGB = (name: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim().split(/\s+/).join(",");

/**
 * Drifting nodes that link up when they come close — a nod to the queues and
 * pipelines in the projects. Lines also reach toward the pointer.
 * Pauses when off screen or in a background tab; draws one still frame for reduced motion.
 */
export function NetworkCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, dpr = 1;
    let nodes: Node[] = [];
    let ink = readRGB("--ink");
    let accent = readRGB("--khata");
    const pointer = { x: -9999, y: -9999 };
    let running = true;
    let raf = 0;

    const seed = () => {
      const count = Math.min(90, Math.max(28, Math.round((w * h) / 15000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        r: Math.random() * 1.4 + 0.8,
        accent: Math.random() < 0.16,
      }));
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
      if (reduced) draw();
    };

    const LINK = 130;
    const REACH = 190;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK * LINK) {
            const o = (1 - Math.sqrt(d2) / LINK) * 0.22;
            ctx.strokeStyle = a.accent || b.accent ? `rgba(${accent},${o * 1.4})` : `rgba(${ink},${o})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        const px = a.x - pointer.x, py = a.y - pointer.y;
        const pd = Math.sqrt(px * px + py * py);
        if (pd < REACH) {
          ctx.strokeStyle = `rgba(${accent},${(1 - pd / REACH) * 0.55})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(pointer.x, pointer.y);
          ctx.stroke();
        }
      }
      for (const n of nodes) {
        ctx.fillStyle = n.accent ? `rgba(${accent},0.9)` : `rgba(${ink},0.35)`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.accent ? n.r + 0.6 : n.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const step = () => {
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        // gentle pull toward the pointer
        const dx = pointer.x - n.x, dy = pointer.y - n.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < REACH * REACH && d2 > 1) {
          n.x += dx * 0.0025;
          n.y += dy * 0.0025;
        }
        if (n.x < -20) n.x = w + 20; else if (n.x > w + 20) n.x = -20;
        if (n.y < -20) n.y = h + 20; else if (n.y > h + 20) n.y = -20;
      }
      draw();
      if (running) raf = requestAnimationFrame(step);
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
    };
    const onLeave = () => { pointer.x = -9999; pointer.y = -9999; };

    const start = () => { if (!running && !reduced) { running = true; raf = requestAnimationFrame(step); } };
    const stop = () => { running = false; cancelAnimationFrame(raf); };

    const vis = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()));
    const onVisibility = () => (document.hidden ? stop() : start());
    const themeWatch = new MutationObserver(() => {
      ink = readRGB("--ink");
      accent = readRGB("--khata");
      if (reduced) draw();
    });

    resize();
    window.addEventListener("resize", resize);
    const host = canvas.parentElement ?? canvas;
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);
    themeWatch.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    if (reduced) {
      running = false;
      draw();
    } else {
      raf = requestAnimationFrame(step);
      vis.observe(canvas);
    }

    return () => {
      stop();
      vis.disconnect();
      themeWatch.disconnect();
      window.removeEventListener("resize", resize);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={ref} className="network" aria-hidden="true" />;
}
