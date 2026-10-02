"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowRight, ArrowUpRight, Mail } from "lucide-react";
import { profile, projects } from "@/data/swati";
import { Magnetic } from "./Magnetic";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { NetworkCanvas } from "./NetworkCanvas";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);

  // One quiet entrance on load; skipped entirely for reduced motion.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-rise]", { y: 16, opacity: 0, duration: 0.9, ease: "expo.out", stagger: 0.07, delay: 0.05 });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="top" className="hero">
      <div className="hero-bg" aria-hidden="true">
        <span className="aurora a" />
        <span className="aurora b" />
        <span className="aurora c" />
      </div>
      <NetworkCanvas />
      <div ref={ref} className="page pt-[120px] sm:pt-[150px] pb-6 sm:pb-16 grid gap-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-16 items-center">
        <div className="flex flex-col gap-7">
          <p data-rise className="self-start avail">
            <span className="avail-dot" aria-hidden="true" />
            {profile.availability}
          </p>

          <h1 className="display hero-name" aria-label={profile.name}>
            {profile.name.split(" ").map((word, wi, all) => (
              <span key={word} aria-hidden="true" className="whitespace-nowrap">
                {word.split("").map((c, ci) => (
                  <span key={ci} className="l" style={{ "--i": wi * 6 + ci } as React.CSSProperties}>{c}</span>
                ))}
                {wi < all.length - 1 ? " " : ""}
              </span>
            ))}
          </h1>

          <p data-rise className="lede">{profile.intro}</p>

          <div data-rise className="flex flex-wrap items-center gap-3 pt-1">
            <Magnetic>
              <a href="#work" className="btn btn-solid">
                See selected work <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </Magnetic>
            <a href={profile.resume} target="_blank" rel="noreferrer" className="btn btn-line">
              Resume <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>

          <ul data-rise className="flex items-center gap-2" aria-label="Profiles">
            <li>
              <a href={profile.social.github} target="_blank" rel="noreferrer" className="icon-btn" aria-label="GitHub">
                <GithubIcon className="w-[18px] h-[18px]" />
              </a>
            </li>
            <li>
              <a href={profile.social.linkedin} target="_blank" rel="noreferrer" className="icon-btn" aria-label="LinkedIn">
                <LinkedinIcon className="w-[17px] h-[17px]" />
              </a>
            </li>
            <li>
              <a href="#contact" className="icon-btn" aria-label="Email">
                <Mail className="w-[18px] h-[18px]" />
              </a>
            </li>
          </ul>

          <a data-rise href="#work" className="scroll-cue self-start mt-4 hidden lg:inline-flex">
            <span className="mouse" aria-hidden="true" />
            Scroll to see the work
          </a>
        </div>

        <div data-rise className="panel overflow-hidden" data-tilt data-spotlight>
          <div className="flex items-baseline justify-between gap-4 px-[22px] pt-5 pb-4">
            <h2 className="h4">Recent projects</h2>
            <span className="small muted">{projects.length} featured</span>
          </div>
          <ul data-stagger="0.08">
            {projects.map((p) => (
              <li key={p.id}>
                <a href={`#${p.id}`} className="index-row">
                  <span className="font-display font-semibold text-[1.12rem] ink">{p.name}</span>
                  <ArrowRight className="index-arrow w-4 h-4 row-span-2" aria-hidden="true" />
                  <span className="small muted sm:truncate">{p.tagline}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
