"use client";

import { useEffect, useState } from "react";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Work } from "@/components/Work";
import { Stack } from "@/components/Stack";
import { ProblemSolving } from "@/components/ProblemSolving";
import { About } from "@/components/About";
import { Footer } from "@/components/Contact";
import { AskPalette } from "@/components/AskPalette";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Motion } from "@/components/Motion";
import { Cursor } from "@/components/Cursor";
import { ToolMarquee } from "@/components/Marquee";

export default function Home() {
  const [asking, setAsking] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setAsking((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const ask = () => setAsking(true);

  return (
    <>
      <SmoothScroll />
      <Motion />
      <Cursor />
      <a href="#work" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-ink focus:text-stone focus:px-4 focus:py-2 focus:rounded-full">
        Skip to work
      </a>
      <Nav onAsk={ask} />
      <main>
        <Hero />
        <ToolMarquee />
        <Work />
        <Stack />
        <ProblemSolving />
        <About />
      </main>
      <Footer />
      <AskPalette open={asking} onClose={() => setAsking(false)} />
    </>
  );
}
