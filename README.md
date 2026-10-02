# Swati Shah — Portfolio

Personal site for Swati Shah, full-stack developer (IIIT Kota). Built with Next.js 14, TypeScript, Tailwind CSS and GSAP.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
```

Production check: `npm run build && npm start`.

## Edit the content

Almost everything on the page comes from **`data/swati.ts`** — projects, "how it works" flows, skills, ratings, education, links. Change it there and every section (and the Ask assistant) updates.

- Resume download: replace `public/Swati_Shah_Resume.pdf`.
- Tech icons: `components/TechIcon.tsx` maps each tool name to a Simple Icons logo (or a Lucide icon for general ideas like RAG or REST APIs).
- Colours and type: CSS variables at the top of `app/globals.css`.

## The "Ask about Swati" assistant

Opens from the nav or with ⌘K / Ctrl K. It calls `app/api/ask/route.ts`.

- **Without a key** it answers from a built-in fact sheet (`lib/knowledge.ts`), so it always works.
- **With Gemini**: copy `.env.example` to `.env.local` and set `GEMINI_API_KEY`. Answers are restricted to the facts in `data/swati.ts`; if Gemini fails or times out, it falls back to the fact sheet.

## Deploy to Vercel

1. Push this folder to a GitHub repo.
2. Import it on vercel.com (framework is detected automatically).
3. Optional: add `GEMINI_API_KEY` under Settings → Environment Variables.

## Design notes

- Palette: charcoal slate with a muted ledger-red accent.
- Type: Bricolage Grotesque (display), Public Sans (body), JetBrains Mono (code only). Fonts are self-hosted through `@fontsource-variable`, so there are no requests to Google Fonts.
- Dark theme by default; the toggle switches to light and remembers the choice.
- Each project shows a short "How it works" flow built from `flow` in `data/swati.ts`.
- Motion respects `prefers-reduced-motion`; all interactive parts are keyboard reachable.
