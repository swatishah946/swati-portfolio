"use client";

import { useRef, useState } from "react";
import { ArrowUp, ArrowUpRight, Check, Copy, FileText, Mail } from "lucide-react";
import { profile } from "@/data/swati";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { TechIcon } from "./TechIcon";
import { Magnetic } from "./Magnetic";
import { Split } from "./Motion";
import { WordMarquee } from "./Marquee";

const PROFILES = [
  { href: profile.social.github, label: "GitHub", handle: "swatishah946", icon: <GithubIcon className="w-[18px] h-[18px]" /> },
  { href: profile.social.linkedin, label: "LinkedIn", handle: "Swati Shah", icon: <LinkedinIcon className="w-[17px] h-[17px]" /> },
  { href: profile.social.leetcode, label: "LeetCode", handle: "shahswati946", icon: <TechIcon name="LeetCode" size={17} /> },
  { href: profile.social.codeforces, label: "Codeforces", handle: "swatishah_321", icon: <TechIcon name="Codeforces" size={17} /> },
  { href: profile.social.codechef, label: "CodeChef", handle: "shahswati946", icon: <TechIcon name="CodeChef" size={17} /> },
];

// The closing section of the page: contact invitation, profiles and the credit line.
export function Footer() {
  const [copied, setCopied] = useState(false);
  const emailRef = useRef<HTMLAnchorElement>(null);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard refused: select the address so it can be copied by hand.
      const el = emailRef.current;
      if (el) {
        const r = document.createRange();
        r.selectNodeContents(el);
        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(r);
      }
    }
  };

  return (
    <footer id="contact" className="closing mt-8">
      <WordMarquee words={["Open to internships", "Full-stack development", "AI products", "Let’s build something useful"]} />
      <div className="page pt-[clamp(48px,7vw,88px)] pb-10">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
          <div className="flex flex-col gap-7">
            <h2 className="h2 split"><Split text="Get in touch" /></h2>
            <p className="lede" data-reveal>
              I’m looking for full-stack and AI internships. Email is the quickest way to reach me.
            </p>
            <a
              ref={emailRef}
              href={`mailto:${profile.email}`}
              className="font-display font-semibold tracking-tight leading-tight text-[clamp(1.35rem,3.6vw,2.4rem)] ink break-all hover:text-khata transition-colors self-start inline-flex items-center gap-3"
            >
              <Mail className="w-[0.8em] h-[0.8em] text-khata shrink-0" aria-hidden="true" />
              {profile.email}
            </a>
            <div className="flex flex-wrap gap-3">
              <Magnetic>
                <button type="button" onClick={copy} className="btn btn-solid" aria-live="polite">
                  {copied ? <Check className="w-4 h-4" aria-hidden="true" /> : <Copy className="w-4 h-4" aria-hidden="true" />}
                  {copied ? "Email copied" : "Copy email"}
                </button>
              </Magnetic>
              <a href={profile.resume} target="_blank" rel="noreferrer" className="btn btn-line">
                <FileText className="w-4 h-4" aria-hidden="true" /> View resume
              </a>
            </div>
          </div>

          <div>
            <h3 className="h4 mb-4">Profiles</h3>
            <ul className="grid gap-2.5" data-stagger="0.07">
              {PROFILES.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noreferrer" className="social" data-spotlight>
                    <span className="w-9 h-9 rounded-[10px] bg-slab2 grid place-items-center shrink-0" aria-hidden="true">
                      {s.icon}
                    </span>
                    <span className="flex flex-col leading-tight">
                      <span className="font-semibold">{s.label}</span>
                      <span className="small muted">{s.handle}</span>
                    </span>
                    <ArrowUpRight className="ext w-4 h-4" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-20 pt-6 border-t border-line flex flex-col sm:flex-row sm:items-center justify-between gap-4 small muted">
          <p>Designed and built by Swati Shah in Kota, Rajasthan.</p>
          <a href="#top" className="inline-flex items-center gap-2 ink hover:text-khata transition-colors self-start sm:self-auto">
            Back to top <ArrowUp className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
