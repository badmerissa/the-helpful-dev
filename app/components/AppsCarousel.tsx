"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";

export interface CarouselApp {
  icon: string | null;
  name: string;
  tagline: string;
  description: string;
  href: string | null;
  month: number;
  accentClass: string;
  comingSoon?: boolean;
}

interface AppsCarouselProps {
  apps: CarouselApp[];
}

export default function AppsCarousel({ apps }: AppsCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const CARD_WIDTH = 288; // w-72 = 288px
  const GAP = 16; // gap-4 = 16px
  const STEP = CARD_WIDTH + GAP;

  const scrollTo = useCallback((index: number) => {
    scrollRef.current?.scrollTo({ left: index * STEP, behavior: "smooth" });
  }, [STEP]);

  const prev = () => scrollTo(Math.max(0, activeIndex - 1));
  const next = () => scrollTo(Math.min(apps.length - 1, activeIndex + 1));

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const idx = Math.round(el.scrollLeft / STEP);
      setActiveIndex(Math.min(idx, apps.length - 1));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [STEP, apps.length]);

  return (
    <div className="relative">
      {/* Prev button */}
      <button
        onClick={prev}
        disabled={activeIndex === 0}
        aria-label="Previous app"
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-9 h-9 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-slate-500 hover:text-cyan-600 hover:border-cyan-300 transition-all disabled:opacity-0 disabled:pointer-events-none"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Scroll container */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2"
      >
        {apps.map((app) =>
          app.comingSoon ? (
            <div
              key={app.name}
              className="flex-none w-72 snap-start bg-white border border-dashed border-slate-200 rounded-2xl p-5 flex flex-col gap-3 opacity-75"
            >
              <div className="flex items-start justify-between">
                <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full border text-xs font-medium ${app.accentClass}`}>
                  {app.tagline}
                </div>
                <span className="text-xs text-slate-400 font-mono">M{app.month}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 text-lg">
                  🌱
                </div>
                <h3 className="font-semibold text-slate-900 leading-tight">{app.name}</h3>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed flex-1">{app.description}</p>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                Coming soon
              </span>
            </div>
          ) : (
            <a
              key={app.name}
              href={app.href!}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${app.name} (opens in new tab)`}
              className="flex-none w-72 snap-start group bg-white border border-slate-200 rounded-2xl p-5 card-hover flex flex-col gap-3"
            >
              <div className="flex items-start justify-between">
                <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full border text-xs font-medium ${app.accentClass}`}>
                  {app.tagline}
                </div>
                <span className="text-xs text-slate-400 font-mono">M{app.month}</span>
              </div>
              <div className="flex items-center gap-3">
                {app.icon ? (
                  <Image src={app.icon} alt="" width={36} height={36} className="object-contain rounded-lg" />
                ) : (
                  <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 text-lg">
                    🤖
                  </div>
                )}
                <h3 className="font-semibold text-slate-900 group-hover:text-cyan-700 transition-colors leading-tight">
                  {app.name}
                </h3>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed flex-1">{app.description}</p>
              <span className="text-xs font-semibold text-cyan-600 group-hover:text-cyan-700 transition-colors">
                Open app →
              </span>
            </a>
          )
        )}
      </div>

      {/* Next button */}
      <button
        onClick={next}
        disabled={activeIndex === apps.length - 1}
        aria-label="Next app"
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-9 h-9 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-slate-500 hover:text-cyan-600 hover:border-cyan-300 transition-all disabled:opacity-0 disabled:pointer-events-none"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Dot indicators */}
      <div className="flex justify-center gap-1.5 mt-5" role="tablist" aria-label="App navigation">
        {apps.map((app, i) => (
          <button
            key={app.name}
            role="tab"
            aria-selected={i === activeIndex}
            aria-label={`Go to ${app.name}`}
            onClick={() => scrollTo(i)}
            className={`rounded-full transition-all ${
              i === activeIndex
                ? "w-5 h-2 bg-cyan-600"
                : "w-2 h-2 bg-slate-300 hover:bg-slate-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
