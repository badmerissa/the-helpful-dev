import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "@/lib/blog-data";

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
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="border-b border-slate-100 bg-white">
        <div className="max-w-4xl mx-auto px-6 py-16 lg:py-20">
          <div className="mb-6">
            <Link
              href="/"
              className="text-sm text-slate-400 hover:text-cyan-600 transition-colors"
            >
              ← The Helpful Dev
            </Link>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-4">
            The <span className="gradient-text">Blog</span>
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed max-w-xl">
            Honest write-ups on building one app a month with AI tools — what worked,
            what broke, and what I&apos;d do differently.
          </p>
        </div>
      </section>

      {/* Posts */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <div className="flex flex-col gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-white border border-slate-200 rounded-2xl p-6 card-hover block"
            >
              <div className="flex flex-wrap gap-2 mb-3">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-cyan-50 border border-cyan-100 text-cyan-700 text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-cyan-700 transition-colors leading-snug">
                {post.title}
              </h2>
              <p className="text-slate-500 text-base leading-relaxed mb-4">
                {post.description}
              </p>
              <div className="flex items-center gap-3 text-sm text-slate-400">
                <span>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span>·</span>
                <span>{post.readTime}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
