import { NextResponse } from "next/server";
import { SYSTEM_PROMPT, answerFromFacts } from "@/lib/knowledge";

export const runtime = "nodejs";

type Msg = { role: "user" | "assistant"; content: string };

const MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";

export async function POST(req: Request) {
  let messages: Msg[] = [];
  try {
    const body = await req.json();
    messages = Array.isArray(body?.messages) ? body.messages.slice(-8) : [];
  } catch {
    return NextResponse.json({ error: "Send JSON with a messages array." }, { status: 400 });
  }

  const last = messages[messages.length - 1]?.content?.slice(0, 600) ?? "";
  if (!last.trim()) return NextResponse.json({ error: "Ask a question first." }, { status: 400 });

  const key = process.env.GEMINI_API_KEY;
  if (!key) return NextResponse.json({ answer: answerFromFacts(last), source: "facts" });

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-goog-api-key": key },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents: messages.map((m) => ({
            role: m.role === "assistant" ? "model" : "user",
            parts: [{ text: m.content.slice(0, 600) }],
          })),
          generationConfig: { temperature: 0.3, maxOutputTokens: 400 },
        }),
        signal: AbortSignal.timeout(12000),
      }
    );
    if (!res.ok) throw new Error(`Gemini ${res.status}`);
    const data = await res.json();
    const text: string | undefined = data?.candidates?.[0]?.content?.parts
      ?.map((p: { text?: string }) => p.text ?? "")
      .join("")
      .trim();
    if (!text) throw new Error("Empty answer");
    return NextResponse.json({ answer: text, source: "gemini" });
  } catch (err) {
    // Same idea as VoiceKhata: if the model fails, fall back instead of failing the user.
    console.error("ask route:", err);
    return NextResponse.json({ answer: answerFromFacts(last), source: "facts" });
  }
}
