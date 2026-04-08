export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
}

/** Tailwind classes for each tag — inactive (pill) state */
export const TAG_COLORS: Record<string, string> = {
  "App Development": "text-cyan-700 bg-cyan-50 border-cyan-100",
  "AI Development": "text-violet-700 bg-violet-50 border-violet-100",
  "Debugging":       "text-amber-700 bg-amber-50 border-amber-100",
  "Workflow":        "text-green-700 bg-green-50 border-green-100",
  "LLM":             "text-orange-700 bg-orange-50 border-orange-100",
};

/** Tailwind classes for each tag — active (selected) state */
export const TAG_ACTIVE: Record<string, string> = {
  "App Development": "bg-cyan-600 text-white border-cyan-600",
  "AI Development":  "bg-violet-600 text-white border-violet-600",
  "Debugging":       "bg-amber-500 text-white border-amber-500",
  "Workflow":        "bg-green-600 text-white border-green-600",
  "LLM":             "bg-orange-500 text-white border-orange-500",
};

export const FALLBACK_TAG = "text-cyan-700 bg-cyan-50 border-cyan-100";
export const FALLBACK_TAG_ACTIVE = "bg-cyan-600 text-white border-cyan-600";

export const posts: BlogPost[] = [
  {
    slug: "building-potty-panda",
    title:
      "Vibe Coding Potty Panda: The App That Worked Perfectly Until I Left the Sandbox",
    description:
      "I built a complete potty training tracker with Gemini in one sitting. The preview looked flawless. Then I tried to ship it.",
    date: "2026-04-06",
    readTime: "10 min read",
    tags: ["App Development", "AI Development", "Debugging"],
  },
  {
    slug: "building-the-helpful-dev",
    title: "The App Idea Closet Cleanout: How I Finally Shipped — and Built a Brand I'm Proud Of",
    description:
      "A tired mum of two, a colleague's challenge, and a year of AI-assisted shipping — how The Helpful Dev went from a Gemini-built card grid to an agentic engineering hub.",
    date: "2026-03-31",
    readTime: "10 min read",
    tags: ["App Development", "AI Development", "Workflow"],
  },
  {
    slug: "claude-workflow",
    title: "How I Work With Claude to Build Apps Fast",
    description:
      "The exact workflow I use with Claude to ship full-stack features in hours instead of days — prompting strategy, context management, and where it falls flat.",
    date: "2026-03-30",
    readTime: "9 min read",
    tags: ["AI Development", "Workflow", "LLM"],
  },
];