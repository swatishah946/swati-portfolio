"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts up to the number inside a value like "750+", "97%", "−40%" or "<20 ms"
 * when it scrolls into view. The final text is rendered on the server, so it is
 * always correct without JavaScript or with reduced motion.
 */
export function CountUp({ value, duration = 1400 }: { value: string; duration?: number }) {
  const m = value.match(/^([^\d]*)([\d,]+(?:\.\d+)?)(.*)$/);
  const [text, setText] = useState(value);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!m || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const [, pre, num, post] = m;
    const target = Number(num.replace(/,/g, ""));
    const decimals = num.includes(".") ? num.split(".")[1].length : 0;
    const fmt = (n: number) =>
      `${pre}${n.toLocaleString("en-IN", { minimumFractionDigits: decimals, maximumFractionDigits: decimals, useGrouping: num.includes(",") })}${post}`;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) return; // already visible on load: leave as is
    setText(fmt(0));
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / duration);
        const eased = 1 - Math.pow(1 - p, 4);
        setText(p < 1 ? fmt(target * eased) : value);
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <span ref={ref} className="tabular-nums" aria-label={value}>
      <span aria-hidden="true">{text}</span>
    </span>
  );
}
