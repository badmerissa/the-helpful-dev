"use client";

import Link from "next/link";
import { useRef, useState, useEffect, useCallback } from "react";
import {
  BlogPost,
  TAG_COLORS,
  TAG_ACTIVE,
  FALLBACK_TAG,
  FALLBACK_TAG_ACTIVE,
} from "@/lib/blog-data";

function tagPillClass(tag: string, active: boolean) {
  return active
    ? (TAG_ACTIVE[tag] ?? FALLBACK_TAG_ACTIVE)
    : (TAG_COLORS[tag] ?? FALLBACK_TAG);
}

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function formatDate(dateStr: string) {
  const [y, m, d] = dateStr.split("-").map(Number);
  return `${MONTHS[m - 1]} ${d}, ${y}`;
}

function formatDateShort(dateStr: string) {
  const [, m, d] = dateStr.split("-").map(Number);
  return `${MONTHS[m - 1]} ${d}`;
}

interface BlogSectionProps {
  posts: BlogPost[];
}

export default function BlogSection({ posts }: BlogSectionProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const featured = posts[0];
  const rest = posts.slice(1, 4);

  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags)));

  const filtered = activeTag
    ? rest.filter((p) => p.tags.includes(activeTag))
    : rest;

  const scrollToIndex = useCallback((index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.children[index] as HTMLElement;
    if (card) {
      el.scrollTo({ left: card.offsetLeft - el.offsetLeft, behavior: "smooth" });
    }
  }, []);

  const prev = () => scrollToIndex(Math.max(0, activeIndex - 1));
  const next = () => scrollToIndex(Math.min(filtered.length - 1, activeIndex + 1));

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const cards = Array.from(el.children) as HTMLElement[];
      let closest = 0;
      let minDist = Infinity;
      cards.forEach((card, i) => {
        const dist = Math.abs(card.offsetLeft - el.offsetLeft - el.scrollLeft);
        if (dist < minDist) {
          minDist = dist;
          closest = i;
        }
      });
      setActiveIndex(closest);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [filtered.length]);

  const toggleTag = (tag: string) => {
    setActiveTag((prev) => (prev === tag ? null : tag));
    setActiveIndex(0);
    scrollRef.current?.scrollTo({ left: 0, behavior: "smooth" });
  };

  if (!featured) return null;

  return (
    <div className="space-y-6">
      {/* Featured post — large magazine card */}
      <Link href={`/blog/${featured.slug}`} className="group block">
        <div className="relative bg-white dark:bg-[#161b22] rounded-2xl border border-slate-200 dark:border-[#30363d] overflow-hidden card-hover shadow-sm dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]">
          <div className="h-1 bg-gradient-to-r from-cyan-500 to-teal-600" />
          <div className="p-7 lg:p-10">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-5">
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400 shrink-0">
                Latest post
              </span>
              <span className="h-px flex-1 bg-slate-100 dark:bg-[#30363d]" />
              <span className="text-xs text-slate-400 dark:text-[#6e7681] shrink-0">
                {formatDate(featured.date)} · {featured.readTime}
              </span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {featured.tags.map((tag) => (
                <span
                  key={tag}
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full border text-xs font-medium ${TAG_COLORS[tag] ?? FALLBACK_TAG}`}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-[#e6edf3] mb-3 group-hover:text-cyan-700 dark:group-hover:text-cyan-300 transition-colors leading-snug max-w-2xl">
              {featured.title}
            </h3>

            {/* Description */}
            <p className="text-slate-500 dark:text-[#8b949e] leading-relaxed mb-7 max-w-2xl">
              {featured.description}
            </p>

            {/* CTA */}
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-600 dark:text-cyan-400 group-hover:gap-3 transition-all">
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
          </div>
        </div>
      </Link>

      {/* Tag filter chips */}
      {rest.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`inline-flex items-center px-3 py-1 rounded-full border text-xs font-medium transition-all ${tagPillClass(tag, activeTag === tag)}`}
            >
              {tag}
            </button>
          ))}
          {activeTag && (
            <button
              onClick={() => setActiveTag(null)}
              className="inline-flex items-center px-3 py-1 rounded-full border border-slate-200 dark:border-[#30363d] text-xs font-medium text-slate-400 dark:text-[#6e7681] hover:border-slate-300 dark:hover:border-[#6e7681] hover:text-slate-600 dark:hover:text-[#8b949e] transition-all"
            >
              Clear ×
            </button>
          )}
        </div>
      )}

      {/* Carousel (mobile scroll) / Grid (sm+) */}
      {rest.length > 0 && (
        <>
          {filtered.length === 0 ? (
            <p className="text-sm text-slate-400 dark:text-[#6e7681] py-6 text-center">
              No other posts tagged &ldquo;{activeTag}&rdquo; yet.
            </p>
          ) : (
            <div className="relative">
              {/* Prev arrow — mobile only */}
              <button
                onClick={prev}
                disabled={activeIndex === 0}
                aria-label="Previous post"
                className="sm:hidden absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-9 h-9 rounded-full bg-white dark:bg-[#1c2128] border border-slate-200 dark:border-[#30363d] shadow-md flex items-center justify-center text-slate-500 dark:text-[#8b949e] hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-300 transition-all disabled:opacity-0 disabled:pointer-events-none"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {/* Card container: horizontal scroll on mobile, grid on sm+ */}
              <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:overflow-x-visible sm:snap-none sm:pb-0"
              >
                {filtered.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group flex-none w-[82vw] max-w-72 snap-start sm:w-auto sm:max-w-none bg-white dark:bg-[#161b22] border border-slate-200 dark:border-[#30363d] rounded-2xl p-5 card-hover flex flex-col gap-3"
                  >
                    {/* Top row: primary tag + date */}
                    <div className="flex items-start justify-between gap-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full border text-xs font-medium ${TAG_COLORS[post.tags[0]] ?? FALLBACK_TAG}`}>
                        {post.tags[0]}
                      </span>
                      <span className="text-xs text-slate-400 dark:text-[#6e7681] font-mono shrink-0 pt-0.5">
                        {formatDateShort(post.date)}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-semibold text-slate-900 dark:text-[#e6edf3] group-hover:text-cyan-700 dark:group-hover:text-cyan-300 transition-colors leading-tight line-clamp-2">
                      {post.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-slate-500 dark:text-[#8b949e] leading-relaxed flex-1 line-clamp-3">
                      {post.description}
                    </p>

                    {/* CTA */}
                    <span className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 group-hover:text-cyan-700 dark:group-hover:text-cyan-300 transition-colors">
                      Read post →
                    </span>
                  </Link>
                ))}
              </div>

              {/* Next arrow — mobile only */}
              <button
                onClick={next}
                disabled={activeIndex === filtered.length - 1}
                aria-label="Next post"
                className="sm:hidden absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-9 h-9 rounded-full bg-white dark:bg-[#1c2128] border border-slate-200 dark:border-[#30363d] shadow-md flex items-center justify-center text-slate-500 dark:text-[#8b949e] hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-300 transition-all disabled:opacity-0 disabled:pointer-events-none"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {/* Dot indicators — mobile only */}
              {filtered.length > 1 && (
                <div className="flex sm:hidden justify-center gap-1.5 mt-5" role="tablist" aria-label="Post navigation">
                  {filtered.map((post, i) => (
                    <button
                      key={post.slug}
                      role="tab"
                      aria-selected={i === activeIndex}
                      aria-label={`Go to post ${i + 1}`}
                      onClick={() => scrollToIndex(i)}
                      className={`rounded-full transition-all ${
                        i === activeIndex
                          ? "w-5 h-2 bg-cyan-600"
                          : "w-2 h-2 bg-slate-300 dark:bg-[#30363d] hover:bg-slate-400 dark:hover:bg-[#6e7681]"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
