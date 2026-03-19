"use client";

import { useState, useEffect } from "react";

interface AppPreviewProps {
  src: string;
  title: string;
  appName: string;
  appHref: string;
}

// Timeout (ms) before assuming the iframe is blocked or unavailable.
// Some browsers silently block iframes (X-Frame-Options) without firing onError,
// so a timeout is the only reliable cross-browser detection mechanism.
const LOAD_TIMEOUT_MS = 4000;

export default function AppPreview({ src, title, appName, appHref }: AppPreviewProps) {
  const [state, setState] = useState<"loading" | "loaded" | "fallback">("loading");

  useEffect(() => {
    const timer = setTimeout(() => {
      setState((prev) => (prev === "loading" ? "fallback" : prev));
    }, LOAD_TIMEOUT_MS);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-[600px] rounded-lg overflow-hidden border border-slate-200 bg-slate-50">
      {/* Iframe: hidden until loaded, removed entirely on fallback */}
      {state !== "fallback" && (
        <iframe
          src={src}
          title={title}
          className={`w-full h-full border-0 overflow-hidden pointer-events-none transition-opacity duration-300 ${
            state === "loaded" ? "opacity-100" : "opacity-0"
          }`}
          loading="lazy"
          sandbox="allow-scripts allow-same-origin allow-forms"
          onLoad={() => setState("loaded")}
          onError={() => setState("fallback")}
        />
      )}

      {/* Loading skeleton */}
      {state === "loading" && (
        <div className="absolute inset-0 bg-slate-100 animate-pulse rounded-lg" aria-hidden="true" />
      )}

      {/* Fallback: shown when iframe is blocked or times out */}
      {state === "fallback" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-cyan-50 p-6 text-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-cyan-100 flex items-center justify-center">
            <svg
              className="w-6 h-6 text-cyan-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </div>
          <p className="text-slate-500 text-sm">Live preview requires opening the app directly.</p>
          <a
            href={appHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${appName} (opens in new tab)`}
            className="px-5 py-2.5 bg-cyan-600 text-white text-sm font-semibold rounded-lg hover:bg-cyan-700 transition-colors"
          >
            Open {appName} →
          </a>
        </div>
      )}

      {/* Preview badge: shown when iframe loaded successfully */}
      {state === "loaded" && (
        <div
          className="absolute bottom-3 right-3 text-xs bg-black/50 text-white px-2 py-1 rounded pointer-events-none select-none"
          aria-hidden="true"
        >
          Preview only — click the button above to use the app
        </div>
      )}
    </div>
  );
}
