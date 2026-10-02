import {
  siC, siCelery, siCodechef, siCodeforces, siDjango, siDocker, siExpress, siGit, siGithub, siGooglegemini,
  siJavascript, siJsonwebtokens, siLangchain, siLeetcode, siLinux, siMeta, siMongodb, siNextdotjs, siNginx,
  siNodedotjs, siPostgresql, siPostman, siPython, siReact, siRedis, siRender, siSocketdotio, siTailwindcss,
  siTypescript, siVercel, siWhatsapp, siCloudinary,
} from "simple-icons";
import {
  Bot, Braces, Cloud, Database, FileText, ListOrdered, MessageSquareCode, Mic, Network, RefreshCw,
  ScanSearch, TextSearch, UserRound, Users, Webhook, Workflow, DoorOpen, type LucideIcon,
} from "lucide-react";

type Brand = { path: string };

// Brand logos come from Simple Icons; ideas that have no logo use Lucide.
// Both render monochrome in currentColor at the same size, inside the same badge.
const BRANDS: Record<string, Brand> = {
  "C/C++": siC, Python: siPython, JavaScript: siJavascript, TypeScript: siTypescript,
  "Node.js": siNodedotjs, "Express.js": siExpress, Express: siExpress, "Next.js": siNextdotjs,
  "React.js": siReact, React: siReact, Django: siDjango, "Django REST": siDjango,
  "Socket.IO": siSocketdotio, JWT: siJsonwebtokens, "Tailwind CSS": siTailwindcss,
  MongoDB: siMongodb, PostgreSQL: siPostgresql, Redis: siRedis, Docker: siDocker, Nginx: siNginx, nginx: siNginx,
  Linux: siLinux, Git: siGit, GitHub: siGithub, Postman: siPostman, Vercel: siVercel, Render: siRender,
  "LangChain.js": siLangchain, "Gemini API": siGooglegemini, Gemini: siGooglegemini, "Llama-3": siMeta,
  Celery: siCelery, WhatsApp: siWhatsapp, Cloudinary: siCloudinary,
  LeetCode: siLeetcode, Codeforces: siCodeforces, CodeChef: siCodechef,
};

const CONCEPTS: Record<string, LucideIcon> = {
  SQL: Database, "REST APIs": Network, "Vector Search": ScanSearch, "LLM integration": Bot,
  "Prompt engineering": MessageSquareCode, RAG: TextSearch, BullMQ: ListOrdered, Azure: Cloud, "CI/CD": Workflow,
  Webhook: Webhook, "PDF bill": FileText, "PDF upload": FileText, Embeddings: Braces,
  "Voice survey": Mic, Profile: UserRound, Matching: Users, "Room allocation": DoorOpen, "Re-match": RefreshCw,
};

export function hasTechIcon(name: string) {
  return name in BRANDS || name in CONCEPTS;
}

export function TechIcon({ name, size = 15 }: { name: string; size?: number }) {
  const brand = BRANDS[name];
  if (brand) {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true" className="shrink-0">
        <path d={brand.path} />
      </svg>
    );
  }
  const Icon = CONCEPTS[name];
  if (Icon) return <Icon width={size} height={size} strokeWidth={2} aria-hidden="true" className="shrink-0" />;
  return null;
}
