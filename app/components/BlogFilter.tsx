"use client";

import Link from "next/link";
import { useState } from "react";
import {
  BlogPost,
  TAG_COLORS,
  TAG_ACTIVE,
  FALLBACK_TAG,
  FALLBACK_TAG_ACTIVE,
} from "@/lib/blog-data";

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
function formatDate(dateStr: string) {
  const [y, m, d] = dateStr.split("-").map(Number);
  return `${MONTHS[m - 1]} ${d}, ${y}`;
}

function tagPillClass(tag: string, active: boolean) {
  return active
    ? (TAG_ACTIVE[tag] ?? FALLBACK_TAG_ACTIVE)
    : (TAG_COLORS[tag] ?? FALLBACK_TAG);
}

interface BlogFilterProps {
  posts: BlogPost[];
}

export default function BlogFilter({ posts }: BlogFilterProps) {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags)));

  const filtered = posts.filter((p) => {
    const matchesTag = !activeTag || p.tags.includes(activeTag);
    const q = query.trim().toLowerCase();
    const matchesQuery =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q));
    return matchesTag && matchesQuery;
  });

  const toggleTag = (tag: string) =>
    setActiveTag((prev) => (prev === tag ? null : tag));

  const hasFilters = query.trim() !== "" || activeTag !== null;

  return (
    <div className="space-y-6">
      {/* Search bar */}
      <div className="relative">
        <svg
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M10 10l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <input
          type="search"
          placeholder="Search posts by title, tag, or keyword…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-xl border text-sm placeholder:text-slate-400 dark:placeholder:text-[#6e7681] focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
          style={{ borderColor: "var(--border-color)", background: "var(--bg-surface)", color: "var(--text-primary)" }}
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            aria-label="Clear search"
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors text-lg leading-none"
          >
            ×
          </button>
        )}
      </div>

      {/* Tag filter chips */}
      <div className="flex flex-wrap gap-2">
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => toggleTag(tag)}
            className={`inline-flex items-center px-3 py-1.5 rounded-full border text-xs font-medium transition-all ${tagPillClass(tag, activeTag === tag)}`}
          >
            {tag}
          </button>
        ))}
        {hasFilters && (
          <button
            onClick={() => { setQuery(""); setActiveTag(null); }}
            className="inline-flex items-center px-3 py-1.5 rounded-full border text-xs font-medium transition-all"
            style={{ borderColor: "var(--border-color)", color: "var(--text-muted)" }}
          >
            Clear all ×
          </button>
        )}
      </div>

      {/* Results count when filtering */}
      {hasFilters && (
        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
          {filtered.length === 0
            ? "No posts match your search."
            : `${filtered.length} post${filtered.length === 1 ? "" : "s"} found`}
        </p>
      )}

      {/* Post list */}
      {filtered.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>No posts match your search.</p>
          <button
            onClick={() => { setQuery(""); setActiveTag(null); }}
            className="mt-3 text-sm text-cyan-600 hover:text-cyan-700 font-medium transition-colors"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filtered.map((post, index) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group border rounded-2xl p-6 card-hover block"
              style={{ background: "var(--bg-surface)", borderColor: "var(--border-color)" }}
            >
              {/* Top row: tags + date/read-time */}
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full border text-xs font-medium ${TAG_COLORS[tag] ?? FALLBACK_TAG}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="text-xs shrink-0 pt-0.5" style={{ color: "var(--text-muted)" }}>
                  {formatDate(post.date)}
                  {" · "}
                  {post.readTime}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-xl font-semibold mb-2 group-hover:text-cyan-700 dark:group-hover:text-cyan-400 transition-colors leading-snug" style={{ color: "var(--text-primary)" }}>
                {index === 0 && (
                  <span className="inline-block mr-2 text-xs font-bold uppercase tracking-widest text-cyan-600 align-middle relative -top-0.5">
                    Latest
                  </span>
                )}
                {post.title}
              </h2>

              {/* Description */}
              <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
                {post.description}
              </p>

              {/* CTA */}
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-600 group-hover:gap-3 transition-all">
                Read post
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path
                    d="M3 7h8M7 3l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
