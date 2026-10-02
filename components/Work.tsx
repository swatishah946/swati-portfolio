import { ArrowUpRight, ChevronRight } from "lucide-react";
import { projects, alsoBuilt, type Project } from "@/data/swati";
import { GithubIcon } from "./BrandIcons";
import { TechIcon } from "./TechIcon";
import { CountUp } from "./CountUp";
import { Split } from "./Motion";

function Flow({ steps }: { steps: string[] }) {
  return (
    <div>
      <p className="small muted mb-2.5">How it works</p>
      <ol className="flow" aria-label="How a request moves through the system">
        {steps.map((s, i) => (
          <li key={s} className="contents">
            <span className="flow-node" style={{ "--i": i, "--n": steps.length } as React.CSSProperties}>
              <TechIcon name={s} size={14} />
              {s}
            </span>
            {i < steps.length - 1 ? (
              <ChevronRight className="flow-sep w-4 h-4" style={{ "--i": i, "--n": steps.length } as React.CSSProperties} aria-hidden="true" />
            ) : null}
          </li>
        ))}
      </ol>
    </div>
  );
}

function ProjectEntry({ p }: { p: Project }) {
  return (
    <article id={p.id} className="project">
      <span className="watermark-clip" aria-hidden="true"><span className="watermark" data-parallax="-0.1">{p.name}</span></span>
      <div className="project-grid">
        {/* identity column */}
        <div className="flex flex-col gap-5 lg:sticky lg:top-28 lg:self-start" data-reveal>
          <p className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className={`status ${p.status === "Live" ? "live" : ""}`}>
              <i aria-hidden="true" />
              {p.status}
            </span>
            {p.period ? <span className="small muted">{p.period}</span> : null}
          </p>
          <h3 className="h3">{p.name}</h3>
          <p className="text-[1.08rem] ink max-w-[34ch] leading-snug">{p.tagline}</p>
          <p className="small muted">For {p.audience.charAt(0).toLowerCase() + p.audience.slice(1)}</p>
          <div className="flex flex-wrap gap-2.5 pt-1">
            {p.links.live ? (
              <a href={p.links.live} target="_blank" rel="noreferrer" className="btn btn-solid btn-sm">
                Live app <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>
            ) : null}
            {p.links.github ? (
              <a href={p.links.github} target="_blank" rel="noreferrer" className="btn btn-line btn-sm">
                <GithubIcon className="w-4 h-4" /> Code
              </a>
            ) : null}
          </div>
        </div>

        {/* detail column */}
        <div className="flex flex-col gap-7 min-w-0" data-reveal style={{ "--d": "0.12s" } as React.CSSProperties}>
          <p className="text-[1.08rem] leading-relaxed max-w-[62ch]">{p.summary}</p>
          <ul className="dash-list" data-stagger="0.1">
            {p.highlights.map((h) => <li key={h}>{h}</li>)}
          </ul>
          {p.proof ? (
            <dl className="flex flex-wrap gap-x-10 gap-y-4">
              {p.proof.map((m) => (
                <div key={m.label} className="proof flex flex-col">
                  <dt className="small muted order-2 mt-1">{m.label}</dt>
                  <dd className="order-1 font-display font-bold text-[1.9rem] leading-none tracking-tight ink"><CountUp value={m.value} /></dd>
                </div>
              ))}
            </dl>
          ) : null}
          <Flow steps={p.flow} />
          <ul className="flex flex-wrap gap-2" data-stagger="0.03" aria-label={`${p.name} is built with`}>
            {p.stack.map((s) => (
              <li key={s} className="chip">
                <TechIcon name={s} size={13} />
                {s}
              </li>
            ))}
          </ul>
          {p.credit ? <p className="small muted">{p.credit}</p> : null}
        </div>
      </div>
    </article>
  );
}

export function Work() {
  return (
    <section id="work" className="section page">
      <div className="opener section-head">
        <h2 className="h2 split"><Split text="Selected work" /></h2>
        <p className="muted lg:justify-self-end" data-reveal>
          Things I’ve built recently, from the database to the interface. Most are live or open source.
        </p>
      </div>

      <div>
        {projects.map((p) => <ProjectEntry key={p.id} p={p} />)}
      </div>

      <div className="mt-6 pt-10 border-t border-line grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
        <h3 className="h4">Smaller builds</h3>
        <ul className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
          {alsoBuilt.map((a) => (
            <li key={a.name}>
              <a href={a.href} target="_blank" rel="noreferrer" className="link font-semibold inline-flex items-center gap-1">
                {a.name} <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
              <p className="small muted mt-1.5 max-w-[42ch]">{a.note}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
