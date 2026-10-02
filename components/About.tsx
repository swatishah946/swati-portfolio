import { Briefcase, GraduationCap, MapPin, Sparkle } from "lucide-react";
import { profile, education } from "@/data/swati";
import { Split } from "./Motion";

const FACT_ICONS = [MapPin, GraduationCap, Sparkle, Briefcase];

export function About() {
  return (
    <section id="about" className="section page">
      <div className="opener grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
        <div className="flex flex-col gap-8">
          <h2 className="h2 split"><Split text="A little about me" /></h2>
          <div className="panel p-6 sm:p-7" data-reveal data-spotlight>
            <div className="flex items-center gap-4 pb-5 mb-1 border-b border-line">
              <span className="avatar" aria-hidden="true"><span>SS</span></span>
              <div>
                <p className="font-display font-semibold text-[1.15rem] ink leading-tight">{profile.name}</p>
                <p className="small muted">{profile.role}</p>
              </div>
            </div>
            <ul data-stagger="0.08">
              {profile.facts.map((f, i) => {
                const Icon = FACT_ICONS[i % FACT_ICONS.length];
                return (
                  <li key={f.label} className="fact-row">
                    <span className="fact-icon" aria-hidden="true"><Icon className="w-4 h-4" /></span>
                    <span className="small muted">{f.label}</span>
                    <span className="ink">{f.value}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-12 lg:pt-[4.6rem]">
          <div className="flex flex-col gap-5 text-[1.15rem] leading-relaxed max-w-[58ch]" data-stagger="0.15">
            {profile.about.map((p) => <p key={p}>{p}</p>)}
          </div>

          <div>
            <h3 className="h4 mb-6">Education</h3>
            <ol className="timeline">
              {education.map((e) => (
                <li key={e.place} className="grid gap-0.5 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-x-6">
                  <span className="font-semibold ink">{e.place}</span>
                  <span className="font-semibold ink tabular-nums sm:text-right">{e.score}</span>
                  <span className="small muted">{e.what}</span>
                  <span className="small muted tabular-nums sm:text-right">{e.when}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
