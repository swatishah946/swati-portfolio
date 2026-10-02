// Single source of truth for the portfolio. Every fact here comes from
// Swati's resume or her project READMEs — edit this file to update the site.

export type Project = {
  id: string;
  name: string;
  /** One line: what it is. */
  tagline: string;
  status: "Live" | "Open source" | "Team project";
  period?: string;
  /** Who it's for. */
  audience: string;
  /** Two sentences at most. */
  summary: string;
  /** How a request moves through the system, as short labels. */
  flow: string[];
  highlights: string[];
  proof?: { value: string; label: string }[];
  credit?: string;
  stack: string[];
  links: { live?: string; github?: string };
};

export const profile = {
  name: "Swati Shah",
  firstName: "Swati",
  role: "Full-stack developer",
  location: "Kota, Rajasthan",
  availability: "Open to full-stack and AI internships",
  intro:
    "I’m a full-stack developer and computer science student at IIIT Kota. I build thoughtful web applications and AI-powered products, from the interface to the backend.",
 about: [
  "I’m a Computer Science student at IIIT Kota and a full-stack developer. I enjoy building web applications and AI-powered products, working across the stack from the first idea to the finished product.",
  "I’m drawn to practical problems and thoughtful engineering. I like understanding how people work, then creating software that makes everyday tasks simpler and more reliable.",
],
  facts: [
    { label: "Based in", value: "Kota, Rajasthan" },
    { label: "Studying", value: "B.Tech CSE, IIIT Kota" },
    { label: "Interested in", value: "Full-stack and AI systems" },
    { label: "Looking for", value: "Full-stack and AI internships" },
  ],
  email: "swati.shah034306@gmail.com",
  resume: "/Swati_Shah_Resume.pdf",
  social: {
    github: "https://github.com/swatishah946",
    linkedin: "https://linkedin.com/in/swati-shah-544977286",
    leetcode: "https://leetcode.com/u/shahswati946/",
    codeforces: "https://codeforces.com/profile/swatishah_321",
    codechef: "https://www.codechef.com/users/shahswati946",
    codolio: "https://codolio.com/profile/shahswati946",
  },
};

export const projects: Project[] = [
  {
    id: "voicekhata",
    name: "VoiceKhata",
    tagline: "WhatsApp voice notes become ledger entries and invoices",
    status: "Live",
    period: "May 2026 – present",
    audience: "Stone merchants, wholesalers and hardware shops",
    summary:
      "A shop owner sends a Hindi or English voice note on WhatsApp. VoiceKhata transcribes it, records the sale in a ledger and replies with a PDF bill.",
    flow: ["WhatsApp", "Webhook", "BullMQ", "Gemini", "Llama-3", "PostgreSQL", "PDF bill"],
    highlights: [
      "Queue-based backend (BullMQ + Redis) answers WhatsApp instantly and retries failed AI calls, with model fallbacks so no entry is lost.",
      "Gemini transcribes mixed-language audio; Llama-3 returns strict JSON with the intent, item, quantity and party.",
      "Prices come from the PostgreSQL price list, not the model. Invoices are drawn in memory and sent back on WhatsApp.",
    ],
    stack: ["Node.js", "TypeScript", "Next.js", "PostgreSQL", "Redis", "BullMQ", "Gemini API", "Llama-3", "Tailwind CSS", "JWT"],
    links: { live: "https://voice-khata.vercel.app/", github: "https://github.com/swatishah946/VoiceKhata" },
  },
  {
    id: "nexusdesk",
    name: "NexusDesk",
    tagline: "A helpdesk with deadlines, smart routing and an AI copilot",
    status: "Open source",
    period: "Mar – Apr 2026",
    audience: "Support teams: customers, agents and admins",
    summary:
      "Tickets get deadlines by priority, go to the least busy agent with the right skills, and update live for everyone without a refresh.",
    flow: ["React", "nginx", "Django REST", "Redis", "Celery", "Gemini"],
    highlights: [
      "AI suggests a category and priority while the customer types, and drafts agent replies from similar solved tickets.",
      "Fixed an N+1 query pattern: the ticket list went from 303 queries for 51 tickets to 2 per page.",
      "Runs with Docker Compose on an Azure VM behind nginx, with httpOnly cookies and origin-checked WebSockets.",
    ],
    proof: [
      { value: "98", label: "automated tests" },
      { value: "97%", label: "backend coverage" },
      { value: "−40%", label: "dashboard query latency" },
    ],
    stack: ["Python", "Django", "React.js", "PostgreSQL", "Redis", "Celery", "Docker", "Azure", "Nginx", "Gemini API", "CI/CD"],
    links: { github: "https://github.com/swatishah946/SupportTicketSystem" },
  },
  {
    id: "nowledgehub",
    name: "NowledgeHub",
    tagline: "A study platform with chat-with-your-PDF and live study rooms",
    status: "Live",
    period: "Jan – Feb 2026",
    audience: "Students studying alone or in groups",
    summary:
      "Students upload their notes and ask questions answered from those PDFs, with the sections cited. A research agent handles open-ended questions.",
    flow: ["PDF upload", "Embeddings", "Vector Search", "LangChain.js", "Gemini"],
    highlights: [
      "RAG pipeline on MongoDB Atlas Vector Search and LangChain.js for long, complex PDFs.",
      "Deep-research agent built on the Tavily API for multi-step questions.",
      "Socket.IO study rooms with synced Pomodoro timers; JWT sessions with email verification.",
    ],
    stack: ["Node.js", "Express.js", "React.js", "MongoDB", "Vector Search", "LangChain.js", "Gemini API", "Socket.IO", "JWT"],
    links: { live: "https://nowledgehub.vercel.app/", github: "https://github.com/swatishah946/NowledgeHub" },
  },
  {
    id: "vedaai",
    name: "VedaAI",
    tagline: "Exam papers generated from a teacher’s own material",
    status: "Live",
    audience: "Teachers preparing assessments",
    summary:
      "A teacher uploads a PDF and sets the subject, questions and marks. VedaAI returns an editable paper that exports as an A4 PDF.",
    flow: ["Next.js", "Express", "BullMQ", "Gemini", "MongoDB", "Socket.IO"],
    highlights: [
      "Generation runs as a BullMQ job: the API replies 202 right away and Socket.IO tells the page when the paper is ready.",
      "Gemini 2.5 Flash returns a typed JSON paper grounded in the uploaded PDF.",
      "A review step lets teachers edit questions and marks before publishing.",
    ],
    proof: [{ value: "<20 ms", label: "cached history loads" }],
    stack: ["Next.js", "TypeScript", "Node.js", "Express.js", "MongoDB", "Redis", "BullMQ", "Gemini API", "Socket.IO"],
    links: { live: "https://veda-ai-ai-asssessment-creator.vercel.app/", github: "https://github.com/swatishah946/VedaAI-AI-Asssessment-Creator" },
  },
  {
    id: "bondspace",
    name: "BondSpace",
    tagline: "Voice-first roommate matching for women’s co-living spaces",
    status: "Team project",
    audience: "Residents and admins of women’s co-living spaces",
    summary:
      "New residents answer a short voice survey instead of a long form. BondSpace suggests roommates with a visible compatibility score and the reasons behind it.",
    flow: ["Voice survey", "Profile", "Matching", "Room allocation", "Re-match"],
    highlights: [
      "Five-question conversational intake through Omnidim.io voice AI.",
      "Explainable matching: every match shows its score and reasons, and criteria such as race or religion are never used.",
      "Room allocation, real-time chat over Socket.IO, re-matching with feedback, and an admin dashboard with manual overrides.",
    ],
    credit: "Built with team Huntrix: Anishka Verma, Advika Tiwari and Swati Shah.",
    stack: ["React.js", "Node.js", "Express.js", "MongoDB", "Socket.IO", "JWT", "Tailwind CSS", "Cloudinary"],
    links: { github: "https://github.com/anishka7755/BondSpace" },
  },
];

export const alsoBuilt = [
  {
    name: "EmailService",
    note: "A resilient email API in Node.js using exponential backoff and a circuit breaker.",
    href: "https://github.com/swatishah946",
  },
  {
    name: "Ochi design study",
    note: "An animation-heavy front-end build with Framer Motion and Locomotive Scroll.",
    href: "https://github.com/swatishah946",
  },
];

export const skillGroups = [
  { name: "Languages", items: ["C/C++", "Python", "JavaScript", "TypeScript", "SQL"] },
  {
    name: "Backend and web",
    items: ["Node.js", "Express.js", "Next.js", "React.js", "Django", "REST APIs", "Socket.IO", "JWT", "Tailwind CSS"],
  },
  { name: "Databases", items: ["MongoDB", "PostgreSQL", "Redis", "Vector Search"] },
  { name: "Generative AI", items: ["LLM integration", "Prompt engineering", "RAG", "LangChain.js", "Gemini API", "Llama-3"] },
  { name: "Cloud and tools", items: ["Docker", "Azure", "Nginx", "BullMQ", "Linux", "Git", "Postman", "Vercel", "Render", "CI/CD"] },
];

// Map display names in skillGroups to the names projects use, where they differ.
export const skillAliases: Record<string, string> = {
  "LLM integration": "Gemini API",
};

export const problemSolving = {
  solved: "750+",
  profiles: [
    { site: "LeetCode", title: "Knight", rating: "1870", note: "Top 6% of contestants", href: profile.social.leetcode },
    { site: "Codeforces", title: "Pupil", rating: "1344+", note: "Rated contests", href: profile.social.codeforces },
    { site: "CodeChef", title: "", rating: "", note: "Contest history", href: profile.social.codechef },
  ],
  codolio: profile.social.codolio,
};

export const recognition = [
  { title: "ICPC AlgoQueen 2026", result: "Rank 90", detail: "National competitive programming contest — top 100." },
  { title: "Innerve 9, AIT Pune", result: "Top 30 of 5,000+ teams", detail: "Built a logistics platform in a 24-hour hackathon (top 0.6%)." },
  { title: "Flipkart GRID 8.0", result: "Semi-finalist", detail: "Flipkart’s national-level engineering competition." },
];

export const leadership = {
  role: "Logistics Executive & Sports Secretary",
  org: "IIIT Kota",
  detail: "Ran event operations, team coordination and budgets for college fests and tournaments.",
};

export const education = [
  { place: "IIIT Kota", what: "B.Tech, Computer Science and Engineering", when: "2023 – 2027", score: "CGPA 7.78" },
  { place: "Sigma School of Excellence", what: "Class XII, CBSE", when: "2023", score: "87.6%" },
  { place: "Roop Nagar Public School", what: "Class X, CBSE", when: "2021", score: "95.5%" },
];

export const coursework = ["DSA", "OOP", "Operating systems", "DBMS", "DAA", "Computer networks", "Cloud computing", "SDLC"];
