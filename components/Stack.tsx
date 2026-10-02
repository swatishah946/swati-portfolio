"use client";

import { useState } from "react";
import { projects, skillGroups, skillAliases, coursework } from "@/data/swati";
import { TechIcon } from "./TechIcon";
import { Split } from "./Motion";

const OUTSIDE_PROJECTS: Record<string, string> = {
  "C/C++": "My language for competitive programming.",
  SQL: "Behind the PostgreSQL schemas in VoiceKhata and NexusDesk.",
  Linux: "Day-to-day development and server deployments.",
  Git: "Every project here lives on GitHub.",
  Postman: "API testing while building the REST backends.",
  Vercel: "Hosts the VoiceKhata, NowledgeHub and VedaAI front ends.",
  Render: "Hosts the NowledgeHub and VedaAI APIs.",
  "Prompt engineering": "Strict JSON prompts in VoiceKhata, NexusDesk and VedaAI.",
};

function usedIn(skill: string) {
  const name = (skillAliases[skill] ?? skill).toLowerCase();
  return projects.filter((p) => p.stack.some((s) => s.toLowerCase() === name));
}

function Usage({ skill }: { skill: string }) {
  const used = usedIn(skill);
  const note = OUTSIDE_PROJECTS[skill];
  return (
    <p className="usage small" aria-live="polite">
      <span className="ink font-semibold">{skill}</span>
      <span className="muted">
        {used.length ? (
          <>
            {" "}— used in{" "}
            {used.map((p, i) => (
              <span key={p.id}>
                <a href={`#${p.id}`} className="link">{p.name}</a>
                {i < used.length - 2 ? ", " : i === used.length - 2 ? " and " : ""}
              </span>
            ))}
            .
          </>
        ) : (
          <> — {note ?? "Used in coursework and smaller builds."}</>
        )}
      </span>
    </p>
  );
}

export function Stack() {
  const [picked, setPicked] = useState<{ group: string; skill: string } | null>(null);

  return (
    <section id="tools" className="section page">
      <div className="opener section-head">
        <h2 className="h2 split"><Split text="Tools I use" /></h2>
        <p className="muted lg:justify-self-end" data-reveal>Grouped by what they’re for. Select one to see which projects use it.</p>
      </div>

      <div className="tool-grid" data-stagger="0.08">
        {skillGroups.map((g) => (
          <div key={g.name} className="tool-card" data-spotlight>
            <h3 className="h4">{g.name}</h3>
            <ul className="flex flex-wrap gap-2">
              {g.items.map((s) => {
                const on = picked?.skill === s && picked.group === g.name;
                return (
                  <li key={s}>
                    <button
                      type="button"
                      className="chip"
                      aria-pressed={on}
                      onClick={() => setPicked(on ? null : { group: g.name, skill: s })}
                    >
                      <TechIcon name={s} size={14} />
                      {s}
                    </button>
                  </li>
                );
              })}
            </ul>
            {picked?.group === g.name ? <Usage skill={picked.skill} /> : null}
          </div>
        ))}
        <div className="tool-card" data-spotlight>
          <h3 className="h4">Coursework</h3>
          <ul className="flex flex-wrap gap-2">
            {coursework.map((c) => <li key={c} className="chip">{c}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}
