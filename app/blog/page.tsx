import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "@/lib/blog-data";
import BlogFilter from "@/app/components/BlogFilter";

export const metadata: Metadata = {
  title: "Blog — The Helpful Dev",
  description:
    "Honest write-ups on building with AI — one app a month, twelve months, all the lessons in between.",
  alternates: {
    canonical: "https://thehelpfuldev.com/blog",
  },
  openGraph: {
    title: "Blog — The Helpful Dev",
    description:
      "Honest write-ups on building with AI — one app a month, twelve months, all the lessons in between.",
    url: "https://thehelpfuldev.com/blog",
  },
};

export default function BlogPage() {
  return (
    <main className="min-h-screen" style={{ background: "var(--bg-base)", color: "var(--text-primary)" }}>
      {/* Hero */}
      <section className="border-b" style={{ borderColor: "var(--border-color)", background: "var(--bg-base)" }}>
        <div className="max-w-4xl mx-auto px-6 py-16 lg:py-20">
          <div className="mb-6">
            <Link
              href="/"
              className="text-sm hover:text-cyan-600 transition-colors"
              style={{ color: "var(--text-muted)" }}
            >
              ← The Helpful Dev
            </Link>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4" style={{ color: "var(--text-primary)" }}>
            The <span className="gradient-text">Blog</span>
          </h1>
          <p className="text-lg leading-relaxed max-w-xl" style={{ color: "var(--text-secondary)" }}>
            Honest write-ups on building one app a month with AI tools — what worked,
            what broke, and what I&apos;d do differently.
          </p>
        </div>
      </section>

      {/* Posts with search + tag filter */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <BlogFilter posts={posts} />
      </section>
    </main>
  );
}
