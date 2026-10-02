import { ArrowUpRight } from "lucide-react";
import { problemSolving, recognition, leadership } from "@/data/swati";
import { CountUp } from "./CountUp";
import { Split } from "./Motion";

export function ProblemSolving() {
  return (
    <section id="problem-solving" className="section page">
      <div className="opener grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <div>
          <h2 className="h2 split"><Split text="Problem solving" /></h2>
          <div className="orbit-wrap mt-20 ml-2">
            <svg className="orbits" viewBox="0 0 200 200" aria-hidden="true">
              <circle cx="100" cy="100" r="96" />
              <g className="spin"><circle className="dash" cx="100" cy="100" r="78" /><circle className="sat" cx="178" cy="100" r="2.6" /></g>
              <g className="spin rev"><circle cx="100" cy="100" r="60" /><circle className="sat" cx="100" cy="40" r="2" /></g>
            </svg>
            <p className="display ink text-[clamp(4.8rem,12vw,9.5rem)]">
              <CountUp value={problemSolving.solved} duration={1800} />
            </p>
          </div>
          <p className="lede mt-20" data-reveal>DSA problems solved across LeetCode, Codeforces and CodeChef.</p>
          <a href={problemSolving.codolio} target="_blank" rel="noreferrer" className="link small inline-flex items-center gap-1 mt-5">
            All profiles on Codolio <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        </div>

        <div className="flex flex-col gap-14">
          <ul className="border-t-[1.5px] border-ink/70" data-stagger="0.1">
            {problemSolving.profiles.map((p) => (
              <li key={p.site} className="border-b border-line">
                <a
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                  className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-6 gap-y-1 py-5 group items-baseline"
                >
                  <span className="font-display font-semibold text-[1.45rem] ink group-hover:text-khata transition-colors">
                    {p.site}
                  </span>
                  <span className="font-display font-bold text-[1.45rem] tabular-nums text-right ink">
                    {p.rating ? <>{p.title} <CountUp value={p.rating} /></> : <ArrowUpRight className="w-5 h-5 inline muted" aria-label="Open profile" />}
                  </span>
                  <span className="small muted">{p.note}</span>
                </a>
              </li>
            ))}
          </ul>

          <div>
            <h3 className="h4 mb-4">Recognition</h3>
            <ul className="border-t border-line" data-stagger="0.1">
              {recognition.map((r) => (
                <li key={r.title} className="py-5 border-b border-line grid gap-1 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-x-6">
                  <span className="font-semibold ink">{r.title}</span>
                  <span className="font-semibold text-khata sm:text-right">{r.result}</span>
                  <span className="small muted sm:col-span-2">{r.detail}</span>
                </li>
              ))}
              <li className="py-5 border-b border-line grid gap-1">
                <span className="font-semibold ink">{leadership.role}, {leadership.org}</span>
                <span className="small muted">{leadership.detail}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
