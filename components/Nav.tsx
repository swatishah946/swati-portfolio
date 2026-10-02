"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, Search, X } from "lucide-react";
import { profile } from "@/data/swati";
import { ThemeToggle } from "./ThemeToggle";

const LINKS = [
  { href: "#work", label: "Work" },
  { href: "#tools", label: "Tools" },
  { href: "#problem-solving", label: "Problem solving" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function Nav({ onAsk }: { onAsk: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mac, setMac] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setMac(/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent));
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    const close = () => window.innerWidth >= 1024 && setOpen(false);
    window.addEventListener("resize", close);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", close);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-[background-color,border-color] duration-300 border-b ${
        scrolled || open ? "bg-stone/85 backdrop-blur-md border-line" : "bg-transparent border-transparent"
      }`}
    >
      <nav className="page h-[68px] flex items-center justify-between gap-6" aria-label="Main">
        <a href="#top" className="flex items-center gap-2.5 font-display font-bold text-[1.12rem] tracking-tight ink">
          <span className="w-2 h-2 rounded-full bg-khata" aria-hidden="true" />
          Swati Shah
        </a>

        <ul className="hidden lg:flex items-center gap-7 text-[0.95rem]">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="ink hover:text-khata transition-colors">{l.label}</a>
            </li>
          ))}
          <li>
            <a href={profile.resume} target="_blank" rel="noreferrer" className="ink hover:text-khata transition-colors inline-flex items-center gap-1">
              Resume <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </li>
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onAsk}
            className="h-[42px] pl-3.5 pr-2.5 rounded-full border border-line hover:border-ink/60 transition-colors flex items-center gap-2 text-[0.92rem] ink"
            aria-label="Ask a question about Swati"
          >
            <Search className="w-4 h-4" aria-hidden="true" />
            <span className="hidden sm:inline">Ask</span>
            <span className="kbd hidden sm:inline">{mac ? "⌘K" : "Ctrl K"}</span>
          </button>
          <ThemeToggle />
          <button
            type="button"
            className="icon-btn lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="w-[18px] h-[18px]" /> : <Menu className="w-[18px] h-[18px]" />}
          </button>
        </div>
      </nav>
      <span className="progress" aria-hidden="true" />

      {open ? (
        <div id="mobile-menu" className="menu-panel lg:hidden">
          <ul className="page py-4 grid">
            {[...LINKS, { href: profile.resume, label: "Resume" }].map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  {...(l.label === "Resume" ? { target: "_blank", rel: "noreferrer" } : {})}
                  className="flex items-center justify-between py-3.5 border-b border-line text-[1.05rem] ink"
                >
                  {l.label}
                  {l.label === "Resume" ? <ArrowUpRight className="w-4 h-4 muted" aria-hidden="true" /> : null}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </header>
  );
}
