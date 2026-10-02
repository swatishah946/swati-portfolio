import { profile, projects, alsoBuilt, skillGroups, problemSolving, recognition, leadership, education, coursework } from "@/data/swati";

// Plain-text fact sheet built from data/swati.ts, so the assistant can never drift from the site.
export function factSheet(): string {
  const lines: string[] = [];
  lines.push(`Name: ${profile.name}. ${profile.role}, ${profile.location}. ${profile.availability}.`);
  lines.push(`Intro: ${profile.intro}`);
  profile.about.forEach((p) => lines.push(`About: ${p}`));
  lines.push(`Email: ${profile.email}. GitHub: ${profile.social.github}. LinkedIn: ${profile.social.linkedin}.`);
  lines.push("");
  lines.push("PROJECTS");
  projects.forEach((p) => {
    lines.push(`- ${p.name} (${p.status}${p.period ? `, ${p.period}` : ""}): ${p.tagline}. For: ${p.audience}. ${p.summary}`);
    lines.push(`  Flow: ${p.flow.join(" -> ")}`);
    p.highlights.forEach((pt) => lines.push(`  * ${pt}`));
    p.proof?.forEach((m) => lines.push(`  * ${m.value} ${m.label}`));
    if (p.credit) lines.push(`  ${p.credit}`);
    lines.push(`  Stack: ${p.stack.join(", ")}`);
    lines.push(`  Links: ${[p.links.live, p.links.github].filter(Boolean).join(" , ")}`);
  });
  alsoBuilt.forEach((a) => lines.push(`- Also: ${a.name} — ${a.note}`));
  lines.push("");
  lines.push("SKILLS");
  skillGroups.forEach((g) => lines.push(`- ${g.name}: ${g.items.join(", ")}`));
  lines.push(`- Coursework: ${coursework.join(", ")}`);
  lines.push("");
  lines.push(`PROBLEM SOLVING: ${problemSolving.solved} DSA problems solved.`);
  problemSolving.profiles.forEach((p) => lines.push(`- ${p.site}: ${p.title} ${p.rating} (${p.note})`));
  lines.push("");
  lines.push("RECOGNITION");
  recognition.forEach((r) => lines.push(`- ${r.title}: ${r.result}. ${r.detail}`));
  lines.push(`LEADERSHIP: ${leadership.role}, ${leadership.org}. ${leadership.detail}`);
  lines.push("");
  lines.push("EDUCATION");
  education.forEach((e) => lines.push(`- ${e.place}: ${e.what}, ${e.when}, ${e.score}`));
  return lines.join("\n");
}

export const SYSTEM_PROMPT = `You answer questions about Swati Shah for visitors to her portfolio — usually recruiters and engineers.
Rules:
- Use only the facts below. If something isn't covered, say you don't have that detail and suggest emailing ${profile.email}.
- Refer to her as "Swati" in the third person. Be specific and brief: 2–5 sentences or a short list.
- Never invent numbers, dates, employers or links.
- Plain text only, no markdown headings. Short "- " lists are fine.

FACTS
${factSheet()}`;

type Topic = { keys: string[]; answer: () => string };

const list = (items: string[]) => items.map((i) => `- ${i}`).join("\n");

const topics: Topic[] = [
  ...projects.map((p) => ({
    keys: Array.from(new Set([p.id, p.name.toLowerCase()])),
    answer: () =>
      `${p.name}: ${p.tagline}.\n\n${p.summary}\n\n${list(p.highlights)}\n\n${p.credit ? p.credit + "\n" : ""}Stack: ${p.stack.slice(0, 7).join(", ")}.`,
  })),
  {
    keys: ["project", "portfolio", "what has she made"],
    answer: () =>
      `Swati's main projects:\n${list(projects.map((p) => `${p.name}: ${p.tagline}`))}\n\nAsk about any one of them for the architecture.`,
  },
  {
    keys: ["rag", "vector", "langchain", "llm", "gemini", " ai", "ai ", "prompt"],
    answer: () =>
      `Swati's AI work is mostly LLMs wired into real backends:\n- RAG over PDFs with MongoDB Atlas Vector Search and LangChain.js (NowledgeHub)\n- Strict JSON output from Gemini and Llama-3 so code can trust the result (VoiceKhata, NexusDesk, VedaAI)\n- AI calls kept off the request path with BullMQ or Celery, with retries and fallbacks`,
  },
  {
    keys: ["queue", "bullmq", "redis", "backend", "scale", "fault", "reliab", "system design", "avoid losing", "lose", "retry", "idempoten", "fallback"],
    answer: () =>
      `Reliability shows up across her backends:\n- VoiceKhata replies 200 OK to WhatsApp instantly, queues work in BullMQ, de-duplicates retries with SHA-256 and falls back between AI models.\n- NexusDesk runs AI in Celery so ticket creation never waits, and fixed an N+1 pattern (303 queries → 2 per page).\n- VedaAI returns 202 Accepted and notifies the page over Socket.IO when generation finishes.`,
  },
  {
    keys: ["skill", "stack", "tech", "language", "know"],
    answer: () => `Swati's stack:\n${list(skillGroups.map((g) => `${g.name}: ${g.items.join(", ")}`))}`,
  },
  {
    keys: ["leetcode", "codeforces", "codechef", "dsa", "competitive", "rating", "contest", "icpc", "algo"],
    answer: () =>
      `Problem solving:\n- LeetCode Knight, 1870 (top 6%)\n- Codeforces Pupil, 1344+\n- 750+ DSA problems solved\n- ICPC AlgoQueen 2026: rank 90`,
  },
  {
    keys: ["hackathon", "achievement", "award", "flipkart", "innerve", "win"],
    answer: () => `Recognition:\n${list(recognition.map((r) => `${r.title}: ${r.result}. ${r.detail}`))}`,
  },
  {
    keys: ["lead", "club", "secretary", "logistic", "sport"],
    answer: () => `${leadership.role}, ${leadership.org}. ${leadership.detail}`,
  },
  {
    keys: ["education", "college", "iiit", "cgpa", "gpa", "degree", "school", "graduat", "year"],
    answer: () => `${list(education.map((e) => `${e.place}: ${e.what} (${e.when}), ${e.score}`))}`,
  },
  {
    keys: ["hire", "why", "fit", "intern", "available", "role", "job"],
    answer: () =>
      `Swati is looking for full-stack and AI internships. She has built four AI products end to end (queues, databases, LLM pipelines and front ends) plus the team project BondSpace, and backs it with strong fundamentals: LeetCode Knight (top 6%) and 750+ problems solved. Reach her at ${profile.email}.`,
  },
  {
    keys: ["contact", "email", "reach", "resume", "cv", "linkedin", "github"],
    answer: () =>
      `Email: ${profile.email}\nLinkedIn: ${profile.social.linkedin}\nGitHub: ${profile.social.github}\nThe resume is downloadable from the contact section.`,
  },
];

export function answerFromFacts(question: string): string {
  const q = ` ${question.toLowerCase()} `;
  let best: Topic | null = null;
  let bestScore = 0;
  for (const t of topics) {
    const score = t.keys.reduce((s, k) => (q.includes(k) ? s + k.length : s), 0);
    if (score > bestScore) {
      best = t;
      bestScore = score;
    }
  }
  if (best) return best.answer();
  return `I can answer questions about Swati's projects (VoiceKhata, NexusDesk, NowledgeHub, VedaAI, BondSpace), her stack, problem-solving record, education and how to reach her. For anything else, email ${profile.email}.`;
}
