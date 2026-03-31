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
    slug: "claude-workflow",
    title:
      "Think Before You Build: A Visual Guide to Working Smarter with Claude",
    description:
      "Stop fighting your AI assistant. A battle-tested, visual workflow that turns Claude from a clever autocomplete into a true engineering partner — from first idea to production-ready code.",
    date: "2026-03-30",
    readTime: "14 min read",
    tags: ["Workflow", "AI Development"],
  },
];
