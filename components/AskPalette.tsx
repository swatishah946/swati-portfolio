"use client";

import { useEffect, useRef, useState } from "react";
import { CornerDownLeft, Search, X } from "lucide-react";
import { answerFromFacts } from "@/lib/knowledge";

type Msg = { role: "user" | "assistant"; content: string; source?: string };

const SUGGESTIONS = [
  "How does VoiceKhata avoid losing a voice note?",
  "What has Swati built with RAG?",
  "What's her competitive programming record?",
  "Why would she be a good intern?",
  "How do I contact her?",
];

export function AskPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [busy, setBusy] = useState(false);
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    lastFocus.current = document.activeElement as HTMLElement;
    window.dispatchEvent(new CustomEvent("scroll-lock", { detail: true }));
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => inputRef.current?.focus(), 30);
    return () => {
      clearTimeout(t);
      window.dispatchEvent(new CustomEvent("scroll-lock", { detail: false }));
      document.body.style.overflow = "";
      lastFocus.current?.focus?.();
    };
  }, [open]);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, busy]);

  const ask = async (q: string) => {
    const question = q.trim();
    if (!question || busy) return;
    const next: Msg[] = [...msgs, { role: "user", content: question }];
    setMsgs(next);
    setInput("");
    setBusy(true);
    let answer = "";
    let source = "facts";
    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.map(({ role, content }) => ({ role, content })) }),
      });
      if (!res.ok) throw new Error(String(res.status));
      const data = await res.json();
      answer = data.answer;
      source = data.source;
    } catch {
      // Static hosting or network trouble: answer from the same facts, in the browser.
      answer = answerFromFacts(question);
    }
    setMsgs((m) => [...m, { role: "assistant", content: answer, source }]);
    setBusy(false);
    inputRef.current?.focus();
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") { e.preventDefault(); onClose(); return; }
    if (msgs.length === 0 && !input) {
      if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => (a + 1) % SUGGESTIONS.length); }
      if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => (a - 1 + SUGGESTIONS.length) % SUGGESTIONS.length); }
      if (e.key === "Enter") { e.preventDefault(); ask(SUGGESTIONS[active]); }
    }
  };

  if (!open) return null;

  return (
    <>
      <div className="scrim" onClick={onClose} aria-hidden="true" />
      <div className="palette palette-enter" role="dialog" aria-modal="true" aria-label="Ask about Swati" onKeyDown={onKey}>
        <form
          onSubmit={(e) => { e.preventDefault(); ask(input); }}
          className="flex items-center gap-3 px-5 h-16 border-b border-line shrink-0"
        >
          <Search className="w-5 h-5 muted shrink-0" aria-hidden="true" />
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about her projects, stack or experience"
            className="flex-1 bg-transparent outline-none focus-visible:outline-none text-[1.05rem] placeholder:text-muted min-w-0"
            aria-label="Your question"
            maxLength={300}
          />
          <button type="button" onClick={onClose} className="w-8 h-8 rounded-full grid place-items-center hover:bg-stone" aria-label="Close">
            <X className="w-4 h-4" />
          </button>
        </form>

        <div ref={bodyRef} className="overflow-y-auto px-3 py-3" data-lenis-prevent>
          {msgs.length === 0 ? (
            <ul role="listbox" aria-label="Suggested questions">
              {SUGGESTIONS.map((s, i) => (
                <li key={s}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={i === active}
                    data-active={i === active}
                    onMouseEnter={() => setActive(i)}
                    onClick={() => ask(s)}
                    className="suggest w-full text-left px-3 py-3 rounded-xl flex items-center justify-between gap-3"
                  >
                    {s}
                    {i === active ? <CornerDownLeft className="w-4 h-4 muted shrink-0" aria-hidden="true" /> : null}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col gap-5 px-2 py-2" aria-live="polite">
              {msgs.map((m, i) =>
                m.role === "user" ? (
                  <p key={i} className="font-semibold">{m.content}</p>
                ) : (
                  <div key={i} className="pl-4 border-l-2 border-khata">
                    <p className="whitespace-pre-line leading-relaxed">{m.content}</p>
                    <p className="small muted mt-2">
                      {m.source === "gemini" ? "Gemini, limited to facts from this site" : "Answered from the facts on this site"}
                    </p>
                  </div>
                )
              )}
              {busy ? <p className="small muted">Looking that up…</p> : null}
            </div>
          )}
        </div>

        <div className="px-5 py-3 border-t border-line flex items-center justify-between gap-3 small muted shrink-0">
          <span>Answers only use what&rsquo;s on this site.</span>
          <span className="hidden sm:flex items-center gap-2"><span className="kbd">Esc</span> to close</span>
        </div>
      </div>
    </>
  );
}
