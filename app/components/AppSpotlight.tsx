import type { ReactNode } from "react";

interface AppSpotlightProps {
  icon: ReactNode;
  status: "LIVE" | "COMING SOON";
  title: string;
  tagline: string;
  description: string;
  bullets: string[];
  href: string;
  ctaLabel: string;
  reverse?: boolean;
  previewContent: ReactNode;
}

export default function AppSpotlight({
  icon,
  status,
  title,
  tagline,
  description,
  bullets,
  href,
  ctaLabel,
  reverse = false,
  previewContent,
}: AppSpotlightProps) {
  const isLive = status === "LIVE";

  return (
    <section className="py-20 lg:py-28 border-b border-slate-100 last:border-0">
      <div
        className={`max-w-6xl mx-auto px-6 flex flex-col gap-12 lg:gap-16 items-center ${
          reverse ? "lg:flex-row-reverse" : "lg:flex-row"
        }`}
      >
        <div className="flex-1 w-full">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-cyan-50 flex items-center justify-center">
              {icon}
            </div>
            <span
              className={`text-xs font-bold px-2 py-1 rounded-full ${
                isLive ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"
              }`}
            >
              {status}
            </span>
          </div>

          <p className="text-sm font-semibold text-cyan-600 mb-2 uppercase tracking-widest">
            {tagline}
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight mb-4">
            {title}
          </h2>
          <p className="text-lg text-slate-500 leading-relaxed mb-6">{description}</p>

          <ul className="space-y-2 mb-8">
            {bullets.map((bullet) => (
              <li key={bullet} className="flex items-center gap-2 text-slate-600 text-sm">
                <svg
                  className="w-4 h-4 text-cyan-500 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                {bullet}
              </li>
            ))}
          </ul>

          {isLive ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${ctaLabel} (opens in new tab)`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-cyan-600 text-white text-sm font-semibold hover:bg-cyan-700 transition-colors"
            >
              {ctaLabel} →
            </a>
          ) : (
            <span
              aria-disabled="true"
              className="inline-flex items-center px-5 py-2.5 rounded-lg bg-slate-100 text-slate-400 text-sm font-semibold cursor-not-allowed select-none"
            >
              Coming Soon
            </span>
          )}
        </div>

        <div className="flex-1 w-full max-w-md lg:max-w-none">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 shadow-lg overflow-hidden p-6">
            {previewContent}
          </div>
        </div>
      </div>
    </section>
  );
}
