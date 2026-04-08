import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { carouselApps } from "@/lib/app-data";
import AppSpotlight from "@/app/components/AppSpotlight";
import TerminalCard from "@/app/components/TerminalCard";

export const metadata: Metadata = {
  title: "All Apps — The Helpful Dev",
  description:
    "Free browser-based tools built one per month with AI. No login. No data collected. Everything runs in your browser.",
  alternates: {
    canonical: "https://thehelpfuldev.com/apps",
  },
  openGraph: {
    title: "All Apps — The Helpful Dev",
    description:
      "Free browser-based tools built one per month with AI. No login. No data collected. Everything runs in your browser.",
    url: "https://thehelpfuldev.com/apps",
  },
};

const shippedApps = carouselApps.filter((a) => !a.comingSoon);
const comingSoonApps = carouselApps.filter((a) => a.comingSoon);

export default function AppsPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#0d1117]">
      {/* Hero */}
      <section className="border-b border-slate-100 dark:border-[#30363d] bg-white dark:bg-[#0d1117]">
        <div className="max-w-4xl mx-auto px-6 py-16 lg:py-20">
          <div className="mb-6">
            <Link
              href="/"
              className="text-sm text-slate-400 dark:text-[#6e7681] hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
            >
              ← The Helpful Dev
            </Link>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-[#e6edf3] mb-4">
            All <span className="gradient-text">Apps</span>
          </h1>
          <p className="text-lg text-slate-500 dark:text-[#8b949e] leading-relaxed max-w-xl">
            One free app shipped per month using AI tools. No login. No data collected.
            Everything runs entirely in your browser.
          </p>
        </div>
      </section>

      {/* App Spotlights */}
      {shippedApps.map((app, i) => (
        <AppSpotlight
          key={app.name}
          icon={
            app.icon ? (
              <Image src={app.icon} alt="" width={24} height={24} />
            ) : (
              <span className="text-lg">🤖</span>
            )
          }
          status="LIVE"
          title={app.name}
          tagline={app.tagline}
          description={`${app.description} No login. No data collected.`}
          bullets={app.bullets ?? []}
          href={app.href!}
          ctaLabel={app.ctaLabel ?? "Open App"}
          reverse={i % 2 !== 0}
          previewContent={
            <TerminalCard
              title={`~/${app.name.toLowerCase().replace(/\s+/g, "-")}`}
              accentColor={app.accentColor}
              lines={app.spotlightTerminalLines ?? app.terminalLines ?? []}
              interactiveCommand={
                app.terminalCommand && app.href
                  ? { command: app.terminalCommand, href: app.href }
                  : undefined
              }
            />
          }
        />
      ))}

      {/* Coming soon */}
      {comingSoonApps.length > 0 && (
        <section className="max-w-4xl mx-auto px-6 pb-16">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400 dark:text-[#6e7681] mb-6">
            Coming soon
          </h2>
          <div className="flex flex-col gap-4">
            {comingSoonApps.map((app) => (
              <div
                key={app.name}
                className="bg-white dark:bg-[#161b22] border border-dashed border-slate-200 dark:border-[#30363d] rounded-2xl p-6 opacity-75"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full border text-xs font-medium ${app.accentClass}`}
                  >
                    {app.tagline}
                  </span>
                  <span className="text-xs text-slate-400 dark:text-[#6e7681] font-mono shrink-0 pt-0.5">
                    Month {app.month}
                  </span>
                </div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-[#e6edf3] mb-2 leading-snug">
                  {app.name}
                </h2>
                <p className="text-slate-500 dark:text-[#8b949e] text-base leading-relaxed mb-4">
                  {app.description}
                </p>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 dark:text-[#6e7681]">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-[#30363d]" />
                  Coming soon
                </span>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
