export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
}

export const posts: BlogPost[] = [
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