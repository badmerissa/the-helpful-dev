import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/app/components/JsonLd";

export const metadata: Metadata = {
  title:
    "Think Before You Build: A Visual Guide to Working Smarter with Claude — The Helpful Dev",
  description:
    "Stop fighting your AI assistant. A battle-tested, visual workflow that turns Claude from a clever autocomplete into a true engineering partner — from first idea to production-ready, tested code.",
  alternates: {
    canonical: "https://thehelpfuldev.com/blog/claude-workflow",
  },
  openGraph: {
    title: "Think Before You Build: A Visual Guide to Working Smarter with Claude",
    description:
      "A battle-tested workflow that turns Claude into a true engineering partner. From first idea to production-ready code.",
    url: "https://thehelpfuldev.com/blog/claude-workflow",
  },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline:
    "Think Before You Build: A Visual Guide to Working Smarter with Claude",
  description:
    "Stop fighting your AI assistant. A battle-tested, visual workflow that turns Claude from a clever autocomplete into a true engineering partner — from first idea to production-ready, tested code.",
  datePublished: "2026-03-30",
  author: {
    "@type": "Person",
    name: "The Helpful Dev",
    url: "https://thehelpfuldev.com",
  },
  publisher: {
    "@type": "Organization",
    name: "The Helpful Dev",
    url: "https://thehelpfuldev.com",
  },
  url: "https://thehelpfuldev.com/blog/claude-workflow",
  mainEntityOfPage: "https://thehelpfuldev.com/blog/claude-workflow",
};

/* ─── Reusable sub-components ─────────────────────────────────────── */

function Callout({
  variant,
  icon,
  label,
  children,
}: {
  variant: "key" | "insight" | "tip" | "warn";
  icon: string;
  label: string;
  children: React.ReactNode;
}) {
  const styles = {
    key: "bg-cyan-50 border border-cyan-200",
    insight: "bg-slate-50 border border-slate-200",
    tip: "bg-green-50 border border-green-200",
    warn: "bg-amber-50 border border-amber-200",
  };
  const labelStyles = {
    key: "text-cyan-700",
    insight: "text-cyan-600",
    tip: "text-green-700",
    warn: "text-amber-700",
  };
  return (
    <div className={`${styles[variant]} rounded-xl p-5 my-5 flex gap-4 items-start text-sm leading-relaxed`}>
      <span className="text-xl shrink-0 mt-0.5">{icon}</span>
      <div className="flex-1 text-slate-700">
        <strong className={`block mb-1 text-xs uppercase tracking-wider font-semibold ${labelStyles[variant]}`}>
          {label}
        </strong>
        {children}
      </div>
    </div>
  );
}

function PromptBox({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="bg-slate-900 rounded-xl overflow-hidden my-5 border border-slate-700 border-l-4 border-l-cyan-500">
      <div className="bg-slate-800 px-4 py-2 text-xs font-bold tracking-widest uppercase text-cyan-400 border-b border-slate-700">
        {label}
      </div>
      <pre className="px-5 py-4 text-sm leading-relaxed text-slate-200 font-mono whitespace-pre-wrap overflow-x-auto">
        {children}
      </pre>
    </div>
  );
}

function StepSection({
  badge,
  badgeVariant,
  title,
  subtitle,
  children,
}: {
  badge: string;
  badgeVariant: "cyan" | "teal" | "green" | "orange" | "violet";
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  const badgeStyles = {
    cyan: "bg-cyan-100 text-cyan-700 border border-cyan-200",
    teal: "bg-teal-100 text-teal-700 border border-teal-200",
    green: "bg-green-100 text-green-700 border border-green-200",
    orange: "bg-orange-100 text-orange-700 border border-orange-200",
    violet: "bg-violet-100 text-violet-700 border border-violet-200",
  };
  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden mb-5">
      <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-start gap-4 flex-wrap">
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold shrink-0 ${badgeStyles[badgeVariant]}`}>
          {badge}
        </span>
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold text-slate-900 leading-snug">{title}</h3>
          <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>
        </div>
      </div>
      <div className="px-6 py-5 text-slate-600 text-sm leading-relaxed [&>p]:mb-3 [&>p:last-child]:mb-0">
        {children}
      </div>
    </div>
  );
}

function PhaseStrip({
  phase,
  variant,
  id,
  title,
  subtitle,
}: {
  phase: string;
  variant: "plan" | "build";
  id: string;
  title: string;
  subtitle: string;
}) {
  const styles = {
    plan: "bg-cyan-50 border border-cyan-200",
    build: "bg-green-50 border border-green-200",
  };
  const numStyles = {
    plan: "text-cyan-300",
    build: "text-green-300",
  };
  return (
    <div id={id} className={`${styles[variant]} rounded-2xl px-7 py-5 flex items-center gap-6 mt-14 mb-6`}>
      <span className={`text-5xl font-black leading-none ${numStyles[variant]}`}>{phase}</span>
      <div>
        <h2 className="text-lg font-bold text-slate-900 mb-1">{title}</h2>
        <p className="text-sm text-slate-500">{subtitle}</p>
      </div>
    </div>
  );
}

function ResetBanner({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-amber-50 border border-amber-200 border-dashed rounded-xl px-5 py-3 my-5 flex items-center gap-3 text-sm font-medium text-amber-800">
      {children}
    </div>
  );
}

/* ─── Page ─────────────────────────────────────────────────────────── */

export default function ClaudeWorkflowPost() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <JsonLd data={articleJsonLd} />

      {/* ── Hero ── */}
      <section className="border-b border-slate-100 bg-white">
        <div className="max-w-3xl mx-auto px-6 py-14 lg:py-20">
          <div className="flex items-center gap-3 mb-6 text-sm text-slate-400">
            <Link href="/" className="hover:text-cyan-600 transition-colors">
              The Helpful Dev
            </Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-cyan-600 transition-colors">
              Blog
            </Link>
          </div>
          <div className="mb-5">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-100 text-cyan-700 text-sm font-medium">
              Workflow Guide · AI Development
            </span>
          </div>
          <h1 className="text-3xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-tight mb-5">
            Think Before You Build: A{" "}
            <span className="gradient-text">Visual Guide</span> to Working
            Smarter with Claude
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed mb-6 max-w-2xl">
            Stop fighting your AI assistant. Here&apos;s a battle-tested workflow
            that turns Claude from a clever autocomplete into a true engineering
            partner — from the first idea to production-ready, tested code.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
            <span>March 30, 2026</span>
            <span>·</span>
            <span>14 min read</span>
            <span>·</span>
            <span>Any experience level</span>
          </div>
        </div>
      </section>

      {/* ── Article body ── */}
      <div className="max-w-3xl mx-auto px-6 pb-20">

        {/* TOC */}
        <nav className="bg-slate-50 border border-slate-200 rounded-2xl px-7 py-6 my-10">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">
            In this post
          </h3>
          <ol className="space-y-2 pl-5 list-decimal">
            {[
              ["#why", "How this workflow came together"],
              ["#big-picture", "The workflow at a glance"],
              ["#phase1", "Phase 1 — Plan: Lay the foundations"],
              ["#phase2", "Phase 2 — Build & Verify: One phase at a time"],
              ["#reference", "Quick reference"],
              ["#resources", "Further reading"],
            ].map(([href, label]) => (
              <li key={href}>
                <a
                  href={href}
                  className="text-sm text-slate-700 hover:text-cyan-600 transition-colors"
                >
                  {label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* ── WHY ── */}
        <h2
          id="why"
          className="text-2xl font-bold text-slate-900 mt-12 mb-4 pt-2"
        >
          How this workflow came together
        </h2>

        <p className="text-slate-600 leading-relaxed mb-4">
          I built the first version of The Helpful Dev the way most people start with AI — describe
          what you want, accept what comes back, iterate fast. It worked well enough to ship.
          Then I tried the same approach on bigger work: a full site rebrand, a complete
          architectural overhaul, an SEO audit across every page. The output was inconsistent,
          the colour choices weren&apos;t mine, and I ended up with two commits fixing the same
          brand colour on the same day.
        </p>

        <p className="text-slate-600 leading-relaxed mb-4">
          The problem wasn&apos;t Claude — it was the absence of structure. An AI
          assistant is like a brilliant contractor who can build anything you
          describe. Give them a vague napkin sketch and they&apos;ll build you
          something. Give them a proper set of architectural drawings, a spec,
          and a phased plan — and they&apos;ll build you something great.
        </p>

        <Callout variant="key" icon="🔑" label="The core insight">
          AI output quality is almost entirely determined by the quality of the
          context and structure you provide — not just in one message, but
          across your whole workflow. The workflow below is the structure.
          Follow it and you&apos;ll consistently produce better results in less time.
        </Callout>

        <p className="text-slate-600 leading-relaxed mb-4">
          This workflow is built on patterns from Anthropic&apos;s own
          documentation, the Spec-to-Code methodology, and the Writer/Reviewer
          pattern for unbiased review. Every practice here exists for a concrete
          reason — and each one is explained inline.
        </p>

        {/* ── BIG PICTURE ── */}
        <h2
          id="big-picture"
          className="text-2xl font-bold text-slate-900 mt-12 mb-4 pt-2"
        >
          The workflow at a glance
        </h2>

        <p className="text-slate-600 leading-relaxed mb-6">
          Two distinct phases. One rule that runs through all of it:{" "}
          <strong className="text-slate-800">
            iterate exactly twice, then stop.
          </strong>{" "}
          Here&apos;s the full picture before we break it down.
        </p>

        {/* SVG Diagram */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 my-8 overflow-x-auto">
          <svg
            width="820"
            height="680"
            viewBox="0 0 820 680"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ maxWidth: "100%", height: "auto" }}
          >
            <defs>
              <marker id="arr"   markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#94a3b8" /></marker>
              <marker id="arr-b" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#0092ae" /></marker>
              <marker id="arr-t" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#00637d" /></marker>
              <marker id="arr-g" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#16a34a" /></marker>
              <marker id="arr-o" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#f97316" /></marker>
              <marker id="arr-p" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#8b5cf6" /></marker>
            </defs>

            {/* ══ PHASE 1 LANE ══ */}
            <rect x="10" y="10" width="378" height="660" rx="12" fill="rgba(0,146,174,0.04)" stroke="rgba(0,146,174,0.2)" strokeWidth="1" />
            <text x="199" y="32" textAnchor="middle" fontFamily="Geist Sans,system-ui,sans-serif" fontSize="11" fontWeight="700" letterSpacing="0.09em" fill="#0092ae">PHASE 1 — PLAN</text>

            {/* ══ PHASE 2 LANE ══ */}
            <rect x="406" y="10" width="404" height="660" rx="12" fill="rgba(22,163,74,0.04)" stroke="rgba(22,163,74,0.2)" strokeWidth="1" />
            <text x="608" y="32" textAnchor="middle" fontFamily="Geist Sans,system-ui,sans-serif" fontSize="11" fontWeight="700" letterSpacing="0.09em" fill="#16a34a">PHASE 2 — BUILD &amp; VERIFY (repeat per phase)</text>

            {/* P1-1: Requirements Interview */}
            <rect x="30" y="46" width="338" height="56" rx="10" fill="#f8fafc" stroke="#0092ae" strokeWidth="1.5" />
            <text x="56" y="68" fontFamily="Geist Sans,system-ui,sans-serif" fontSize="13" fontWeight="700" fill="#0f172a">1.1  Requirements Interview</text>
            <text x="56" y="88" fontFamily="Geist Sans,system-ui,sans-serif" fontSize="11.5" fill="#64748b">Claude asks you questions → writes requirements.md</text>
            <text x="36" y="80" fontSize="17">🎤</text>
            <line x1="199" y1="102" x2="199" y2="122" stroke="#0092ae" strokeWidth="1.5" markerEnd="url(#arr-b)" />

            {/* P1-2: Annotate + Critique ×2 */}
            <rect x="30" y="123" width="338" height="56" rx="10" fill="#f8fafc" stroke="#0092ae" strokeWidth="1.5" />
            <text x="56" y="145" fontFamily="Geist Sans,system-ui,sans-serif" fontSize="13" fontWeight="700" fill="#0f172a">1.2  Annotate + Critique ×2 → stop</text>
            <text x="56" y="165" fontFamily="Geist Sans,system-ui,sans-serif" fontSize="11.5" fill="#64748b">You annotate → Claude self-critiques → two rounds only</text>
            <text x="36" y="157" fontSize="17">✏️</text>
            <path d="M368,138 Q398,138 398,151 Q398,164 368,164" stroke="#0092ae" strokeWidth="1.2" strokeDasharray="4 3" fill="none" markerEnd="url(#arr-b)" />
            <text x="372" y="149" fontFamily="Geist Sans,system-ui,sans-serif" fontSize="9.5" fill="#0092ae">×2</text>
            <text x="372" y="162" fontFamily="Geist Sans,system-ui,sans-serif" fontSize="9.5" fill="#0092ae">stop</text>
            <line x1="199" y1="179" x2="199" y2="199" stroke="#0092ae" strokeWidth="1.5" markerEnd="url(#arr-b)" />

            {/* P1-3: Architectural Spec */}
            <rect x="30" y="200" width="338" height="56" rx="10" fill="#f8fafc" stroke="#00637d" strokeWidth="1.5" />
            <text x="56" y="222" fontFamily="Geist Sans,system-ui,sans-serif" fontSize="13" fontWeight="700" fill="#0f172a">1.3  Architectural Specification</text>
            <text x="56" y="242" fontFamily="Geist Sans,system-ui,sans-serif" fontSize="11.5" fill="#64748b">System design, tech stack, component boundaries, data flows</text>
            <text x="36" y="234" fontSize="17">🏗️</text>
            <line x1="199" y1="256" x2="199" y2="276" stroke="#00637d" strokeWidth="1.5" markerEnd="url(#arr-t)" />

            {/* P1-4: Annotate + Critique arch ×2 */}
            <rect x="30" y="277" width="338" height="56" rx="10" fill="#f8fafc" stroke="#00637d" strokeWidth="1.5" />
            <text x="56" y="299" fontFamily="Geist Sans,system-ui,sans-serif" fontSize="13" fontWeight="700" fill="#0f172a">1.4  Annotate + Critique ×2 → stop</text>
            <text x="56" y="319" fontFamily="Geist Sans,system-ui,sans-serif" fontSize="11.5" fill="#64748b">Same pattern as 1.2 — refine arch, stop at two rounds</text>
            <text x="36" y="311" fontSize="17">✏️</text>
            <path d="M368,292 Q398,292 398,305 Q398,318 368,318" stroke="#00637d" strokeWidth="1.2" strokeDasharray="4 3" fill="none" markerEnd="url(#arr-t)" />
            <text x="372" y="303" fontFamily="Geist Sans,system-ui,sans-serif" fontSize="9.5" fill="#00637d">×2</text>
            <text x="372" y="316" fontFamily="Geist Sans,system-ui,sans-serif" fontSize="9.5" fill="#00637d">stop</text>
            <line x1="199" y1="333" x2="199" y2="353" stroke="#0092ae" strokeWidth="1.5" markerEnd="url(#arr-b)" />

            {/* P1-5: CLAUDE.md + commit */}
            <rect x="30" y="354" width="338" height="56" rx="10" fill="#f8fafc" stroke="#0092ae" strokeWidth="1.5" />
            <text x="56" y="376" fontFamily="Geist Sans,system-ui,sans-serif" fontSize="13" fontWeight="700" fill="#0f172a">1.5  CLAUDE.md + Skills → commit all</text>
            <text x="56" y="396" fontFamily="Geist Sans,system-ui,sans-serif" fontSize="11.5" fill="#64748b">Configure context files, commit specs + arch + CLAUDE.md</text>
            <text x="36" y="388" fontSize="17">⚙️</text>
            <line x1="199" y1="410" x2="199" y2="430" stroke="#0092ae" strokeWidth="1.5" markerEnd="url(#arr-b)" />

            {/* RESET 1 */}
            <rect x="60" y="431" width="278" height="32" rx="8" fill="rgba(254,243,199,0.9)" stroke="rgba(245,158,11,0.5)" strokeWidth="1" strokeDasharray="5 3" />
            <text x="199" y="451" textAnchor="middle" fontFamily="Geist Sans,system-ui,sans-serif" fontSize="12" fontWeight="600" fill="#92400e">🧹  Clear chat — fresh context</text>
            <line x1="199" y1="463" x2="199" y2="483" stroke="#0092ae" strokeWidth="1.5" markerEnd="url(#arr-b)" />

            {/* P1-6: Impl Plan ×2 */}
            <rect x="30" y="484" width="338" height="56" rx="10" fill="#f8fafc" stroke="#0092ae" strokeWidth="1.5" />
            <text x="56" y="506" fontFamily="Geist Sans,system-ui,sans-serif" fontSize="13" fontWeight="700" fill="#0f172a">1.6  Implementation Plan ×2 → stop</text>
            <text x="56" y="526" fontFamily="Geist Sans,system-ui,sans-serif" fontSize="11.5" fill="#64748b">Phased plan from both docs — no scope creep</text>
            <text x="36" y="518" fontSize="17">📋</text>
            <path d="M368,499 Q398,499 398,512 Q398,525 368,525" stroke="#0092ae" strokeWidth="1.2" strokeDasharray="4 3" fill="none" markerEnd="url(#arr-b)" />
            <text x="372" y="510" fontFamily="Geist Sans,system-ui,sans-serif" fontSize="9.5" fill="#0092ae">×2</text>
            <text x="372" y="523" fontFamily="Geist Sans,system-ui,sans-serif" fontSize="9.5" fill="#0092ae">stop</text>

            {/* Crossover arrow */}
            <line x1="199" y1="540" x2="199" y2="620" stroke="#94a3b8" strokeWidth="1.5" />
            <line x1="199" y1="620" x2="608" y2="620" stroke="#94a3b8" strokeWidth="1.5" />
            <line x1="608" y1="620" x2="608" y2="584" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arr)" />

            {/* ══ PHASE 2 NODES ══ */}

            {/* P2-1: Write tests FIRST */}
            <rect x="426" y="46" width="358" height="56" rx="10" fill="#f8fafc" stroke="#16a34a" strokeWidth="1.5" />
            <text x="452" y="68" fontFamily="Geist Sans,system-ui,sans-serif" fontSize="13" fontWeight="700" fill="#0f172a">2.1  Write Tests First</text>
            <text x="452" y="88" fontFamily="Geist Sans,system-ui,sans-serif" fontSize="11.5" fill="#64748b">Define success criteria as tests before any code is written</text>
            <text x="432" y="80" fontSize="17">🧪</text>
            <line x1="608" y1="102" x2="608" y2="122" stroke="#16a34a" strokeWidth="1.5" markerEnd="url(#arr-g)" />

            {/* P2-2: Implement with verification */}
            <rect x="426" y="123" width="358" height="56" rx="10" fill="#f8fafc" stroke="#16a34a" strokeWidth="1.5" />
            <text x="452" y="145" fontFamily="Geist Sans,system-ui,sans-serif" fontSize="13" fontWeight="700" fill="#0f172a">2.2  Implement Phase (new session)</text>
            <text x="452" y="165" fontFamily="Geist Sans,system-ui,sans-serif" fontSize="11.5" fill="#64748b">Run tests, fix failures — verify before declaring done</text>
            <text x="432" y="157" fontSize="17">🔨</text>
            <line x1="608" y1="179" x2="608" y2="199" stroke="#f97316" strokeWidth="1.5" markerEnd="url(#arr-o)" />

            {/* P2-3: Separate reviewer session */}
            <rect x="426" y="200" width="358" height="56" rx="10" fill="#f8fafc" stroke="#f97316" strokeWidth="1.5" />
            <text x="452" y="222" fontFamily="Geist Sans,system-ui,sans-serif" fontSize="13" fontWeight="700" fill="#0f172a">2.3  Separate Reviewer Session</text>
            <text x="452" y="242" fontFamily="Geist Sans,system-ui,sans-serif" fontSize="11.5" fill="#64748b">Fresh context · Robustness · Quality · Security · Maintainability</text>
            <text x="432" y="234" fontSize="17">🔍</text>
            <line x1="608" y1="256" x2="608" y2="276" stroke="#f97316" strokeWidth="1.5" markerEnd="url(#arr-o)" />

            {/* P2-4: Polish ×2 */}
            <rect x="426" y="277" width="358" height="56" rx="10" fill="#f8fafc" stroke="#f97316" strokeWidth="1.5" />
            <text x="452" y="299" fontFamily="Geist Sans,system-ui,sans-serif" fontSize="13" fontWeight="700" fill="#0f172a">2.4  Polish (new session) ×2 → stop</text>
            <text x="452" y="319" fontFamily="Geist Sans,system-ui,sans-serif" fontSize="11.5" fill="#64748b">Implement scorecard suggestions, re-review, stop at two</text>
            <text x="432" y="311" fontSize="17">✨</text>
            <path d="M784,292 Q808,292 808,305 Q808,318 784,318" stroke="#f97316" strokeWidth="1.2" strokeDasharray="4 3" fill="none" markerEnd="url(#arr-o)" />
            <text x="787" y="303" fontFamily="Geist Sans,system-ui,sans-serif" fontSize="9.5" fill="#f97316">×2</text>
            <text x="787" y="316" fontFamily="Geist Sans,system-ui,sans-serif" fontSize="9.5" fill="#f97316">stop</text>
            <line x1="608" y1="333" x2="608" y2="353" stroke="#8b5cf6" strokeWidth="1.5" markerEnd="url(#arr-p)" />

            {/* P2-5: Complete test suite */}
            <rect x="426" y="354" width="358" height="56" rx="10" fill="#f8fafc" stroke="#8b5cf6" strokeWidth="1.5" />
            <text x="452" y="376" fontFamily="Geist Sans,system-ui,sans-serif" fontSize="13" fontWeight="700" fill="#0f172a">2.5  Complete Test Suite</text>
            <text x="452" y="396" fontFamily="Geist Sans,system-ui,sans-serif" fontSize="11.5" fill="#64748b">Edge cases, error conditions, integration points from arch doc</text>
            <text x="432" y="388" fontSize="17">✅</text>
            <line x1="608" y1="410" x2="608" y2="430" stroke="#8b5cf6" strokeWidth="1.5" markerEnd="url(#arr-p)" />

            {/* RESET 2 */}
            <rect x="456" y="431" width="298" height="32" rx="8" fill="rgba(254,243,199,0.9)" stroke="rgba(245,158,11,0.5)" strokeWidth="1" strokeDasharray="5 3" />
            <text x="605" y="451" textAnchor="middle" fontFamily="Geist Sans,system-ui,sans-serif" fontSize="12" fontWeight="600" fill="#92400e">🧹  Clear chat — next phase → repeat 2.1–2.5</text>

            {/* Legend */}
            <rect x="14" y="640" width="380" height="32" rx="6" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="1" />
            <circle cx="28" cy="657" r="5" fill="#0092ae" />
            <text x="38" y="661" fontFamily="Geist Sans,system-ui,sans-serif" fontSize="10" fill="#64748b">Planning (cyan)</text>
            <circle cx="118" cy="657" r="5" fill="#00637d" />
            <text x="128" y="661" fontFamily="Geist Sans,system-ui,sans-serif" fontSize="10" fill="#64748b">Arch spec (teal)</text>
            <circle cx="210" cy="657" r="5" fill="#16a34a" />
            <text x="220" y="661" fontFamily="Geist Sans,system-ui,sans-serif" fontSize="10" fill="#64748b">Build (green)</text>
            <circle cx="284" cy="657" r="5" fill="#f97316" />
            <text x="294" y="661" fontFamily="Geist Sans,system-ui,sans-serif" fontSize="10" fill="#64748b">Review (orange)</text>

            <rect x="416" y="640" width="200" height="32" rx="6" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="1" />
            <rect x="428" y="649" width="30" height="12" rx="2" fill="none" stroke="rgba(245,158,11,0.6)" strokeDasharray="4 2" />
            <text x="463" y="659" fontFamily="Geist Sans,system-ui,sans-serif" fontSize="10" fill="#64748b">Dashed box = context reset</text>
          </svg>
        </div>

        <p className="text-slate-600 leading-relaxed mb-4">
          Two zones. Eight steps. Everything flows downward. The dashed amber
          boxes are deliberate context resets — you close the chat and start
          fresh. The &ldquo;×2 stop&rdquo; loops are the discipline that keeps you from
          over-refining. Let&apos;s walk through each step.
        </p>

        {/* ── Real-world examples ── */}
        <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4 pt-2">
          This workflow in practice
        </h2>

        <p className="text-slate-600 leading-relaxed mb-4">
          I developed this by doing it wrong first, then working out what would have prevented
          each mistake. These are the three places it&apos;s made the biggest difference on this site.
        </p>

        <div className="space-y-4 mb-8">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
            <div className="text-xs text-slate-400 uppercase tracking-wider mb-2">The Helpful Dev rebrand — March 2026</div>
            <p className="text-sm text-slate-700 leading-relaxed">
              Full site architectural overhaul: new component library, design system, AppSpotlight
              sections, real SEO structure. I gave Claude the full codebase plus a written spec and
              let it run as an autonomous agent. The output was clean and correctly wired. What it
              couldn&apos;t do was make brand judgements — because I hadn&apos;t given it the brand as context.
              It chose indigo as the primary colour. Technically reasonable. Not mine.
              The result: two &ldquo;indigo to cyan&rdquo; commits on the same day, which is how{" "}
              <code className="font-mono text-xs bg-slate-200 px-1 py-0.5 rounded">.claude/skills/brand/SKILL.md</code> got
              created. Step 1.5 now exists partly because of that afternoon.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
            <div className="text-xs text-slate-400 uppercase tracking-wider mb-2">SEO overhaul across all app pages</div>
            <p className="text-sm text-slate-700 leading-relaxed">
              I used the plan-then-implement pattern from Step 1.6 for this: a separate session to
              produce a written plan, a human review pass where I struck out two suggestions I
              disagreed with, then a separate session to execute only what was approved. Neither of
              the bad ideas touched the codebase. The checkpoint cost ten minutes and protected me from
              implementing the wrong direction across a dozen files.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
            <div className="text-xs text-slate-400 uppercase tracking-wider mb-2">Loamy — coming May 2026</div>
            <p className="text-sm text-slate-700 leading-relaxed">
              The first app I&apos;ll build entirely with this workflow from day one — requirements
              interview, architecture doc, implementation plan, all of it — rather than retrofitting
              it onto vibe-coded work. There&apos;ll be a full post on how it goes.
            </p>
          </div>
        </div>

        {/* ═══ PHASE 1 ═══ */}
        <PhaseStrip
          phase="1"
          variant="plan"
          id="phase1"
          title="Phase 1 — Plan: Lay the foundations"
          subtitle="You don't write a single line of code here. You build the documents that every implementation session will reference. This investment pays back tenfold."
        />

        {/* Step 1.1 */}
        <StepSection
          badge="Step 1.1"
          badgeVariant="cyan"
          title="Requirements Interview"
          subtitle="Claude asks you the questions — not the other way around"
        >
          <p>
            Don&apos;t write a requirements document yourself. Open a conversation
            and ask Claude to interview you. This approach surfaces things you
            haven&apos;t thought about yet — edge cases, tradeoffs, unclear
            assumptions. You answer the questions; Claude assembles the spec.
          </p>
          <PromptBox label="💬 Example prompt">
            {`I want to build [brief description].

Interview me in detail. Ask about technical requirements, user experience, edge cases, potential problems, and tradeoffs I should consider. Don't ask obvious questions — dig into the hard parts I might not have considered.

When we've covered everything, write a complete requirements specification document and save it as requirements.md.`}
          </PromptBox>
          <Callout variant="insight" icon="💡" label="Why this works">
            When you write the spec yourself, you write down what you know you
            want. When Claude interviews you, it asks about what you{" "}
            <em>don&apos;t</em> know you want. Those are the gaps that become bugs
            later.
          </Callout>
        </StepSection>

        {/* Step 1.2 */}
        <StepSection
          badge="Step 1.2"
          badgeVariant="cyan"
          title="Annotate + Critique — exactly twice, then stop"
          subtitle="The ×2 rule is the most important discipline in this workflow"
        >
          <p>
            Read the requirements document. Add your corrections and comments
            inline — mark anything that&apos;s wrong, missing, or unclear. Then ask
            Claude to incorporate your changes <em>and</em> critique its own
            work. Repeat once more. That&apos;s two rounds total.
          </p>
          <PromptBox label="💬 Example prompt">
            {`Here is the requirements doc with my annotations in [square brackets].

Please:
1. Address every annotation I've made
2. Critique your own work — what's missing, ambiguous, inconsistent, or over-specified?
3. Produce a clean, updated requirements.md

[Paste annotated document here]`}
          </PromptBox>
          <Callout variant="warn" icon="⚠️" label="The refinement trap">
            It is deeply tempting to keep going. Don&apos;t. Two rounds catches the
            major gaps without burning time. A 90% spec that moves forward beats
            a 100% spec that never does. The implementation phase will reveal
            the last 10%.
          </Callout>
        </StepSection>

        {/* Step 1.3 */}
        <StepSection
          badge="Step 1.3"
          badgeVariant="teal"
          title="Architectural Specification"
          subtitle="The blueprint every implementation session will reference"
        >
          <p>
            Once the requirements are solid, ask Claude to generate an
            architectural specification. This document makes the big structural
            decisions upfront — tech stack, system components, data flows,
            integration boundaries — so implementation sessions aren&apos;t making
            those calls on the fly.
          </p>
          <PromptBox label="💬 Example prompt">
            {`Based on the finalized requirements, generate an architectural specification document (architecture.md) that covers:

1. System overview — what are the main components and how do they relate?
2. Technology stack decisions — what tools/frameworks/languages, and why?
3. Data model — key entities, relationships, and storage approach
4. Component boundaries — what does each part own, what are the interfaces?
5. Data flows — how does information move through the system?
6. Key technical decisions and their tradeoffs
7. Constraints and assumptions baked into this design

Be specific. This document will be referenced in every implementation session.

[Paste requirements.md]`}
          </PromptBox>
          <Callout variant="insight" icon="💡" label="Why the arch doc is worth the time">
            Without it, every new implementation session has to re-derive
            structural decisions from scratch — and will sometimes get them
            wrong, or inconsistently. The arch doc is the single source of
            truth for &ldquo;how is this thing built?&rdquo;
          </Callout>
        </StepSection>

        {/* Step 1.4 */}
        <StepSection
          badge="Step 1.4"
          badgeVariant="teal"
          title="Annotate + Critique the architecture — twice, then stop"
          subtitle="Same discipline as 1.2 — applied to the structural design"
        >
          <p>
            Same pattern as 1.2. Read the architecture doc carefully, annotate
            your disagreements and questions, then ask Claude to revise and
            self-critique. Two rounds.
          </p>
          <p>
            Focus your annotations on: decisions that feel wrong, missing
            components, technology choices you want to challenge, and anything
            that conflicts with the requirements doc.
          </p>
          <PromptBox label="💬 Example prompt">
            {`Here is the architecture doc with my annotations in [square brackets].

Please:
1. Address every annotation
2. Critique the architecture — are there gaps, over-engineered parts, or decisions that don't align with the requirements?
3. Produce an updated architecture.md

[Paste annotated architecture doc]`}
          </PromptBox>
        </StepSection>

        {/* Step 1.5 */}
        <StepSection
          badge="Step 1.5"
          badgeVariant="cyan"
          title="Generate CLAUDE.md + Skills — commit everything to git"
          subtitle="Make all your decisions permanent, versioned, and shareable"
        >
          <p>
            Ask Claude to propose a <code className="font-mono bg-slate-100 border border-slate-200 rounded px-1.5 py-0.5 text-xs text-slate-700">CLAUDE.md</code> — the persistent context file it reads at
            the start of every session — based on both the requirements and the
            architecture. Then commit <em>everything</em>:{" "}
            <code className="font-mono bg-slate-100 border border-slate-200 rounded px-1.5 py-0.5 text-xs text-slate-700">requirements.md</code>,{" "}
            <code className="font-mono bg-slate-100 border border-slate-200 rounded px-1.5 py-0.5 text-xs text-slate-700">architecture.md</code>,{" "}
            <code className="font-mono bg-slate-100 border border-slate-200 rounded px-1.5 py-0.5 text-xs text-slate-700">CLAUDE.md</code>, and any Skills
            to version control before moving on.
          </p>
          <PromptBox label="💬 Example prompt">
            {`Based on the requirements and architecture docs, suggest:

1. A minimal CLAUDE.md that captures only things Claude can't figure out from the code — project conventions, key constraints, and any gotchas that will matter in every session. Each line should answer: "Would removing this cause Claude to make mistakes?"

2. Any Skills we should create for repeatable workflows in this project (e.g. a "code review" skill, a "new component" scaffold workflow).

Keep CLAUDE.md lean. A bloated config file gets ignored.

[Paste requirements.md and architecture.md]`}
          </PromptBox>
          <Callout variant="tip" icon="✅" label="Commit the spec docs to git">
            <code className="font-mono text-xs">requirements.md</code> and{" "}
            <code className="font-mono text-xs">architecture.md</code> belong in
            version control alongside your code. Every design decision becomes
            traceable, every collaborator can be onboarded in minutes, and you
            can paste a section into a new Claude session as clean context any
            time.
          </Callout>
          <Callout variant="warn" icon="⚠️" label="The brand Skill lesson">
            After the indigo incident on The Helpful Dev rebrand, I created{" "}
            <code className="font-mono text-xs">.claude/skills/brand/SKILL.md</code> — a one-page
            document covering brand colours, typography, voice, and per-app accent colours. It goes
            into every design session as upfront context. The model has used the right colours on
            the first attempt ever since. If your project has a visual identity, it belongs in a
            Skill before the first design session starts — not as a correction after the fact.
          </Callout>
        </StepSection>

        <ResetBanner>
          🧹 Clear the chat before proceeding — the planning conversation has
          served its purpose. Start fresh for the implementation plan.
        </ResetBanner>

        {/* Step 1.6 */}
        <StepSection
          badge="Step 1.6"
          badgeVariant="cyan"
          title="Implementation Plan — twice, then stop"
          subtitle="One plan to rule all implementation sessions — strict no-scope-creep rule"
        >
          <p>
            In a fresh chat, share only the final{" "}
            <code className="font-mono bg-slate-100 border border-slate-200 rounded px-1.5 py-0.5 text-xs text-slate-700">requirements.md</code> and{" "}
            <code className="font-mono bg-slate-100 border border-slate-200 rounded px-1.5 py-0.5 text-xs text-slate-700">architecture.md</code>. Ask Claude to
            produce a phased implementation plan. The most important constraint:
            implement everything in the spec — and nothing that isn&apos;t in the
            spec.
          </p>
          <PromptBox label="💬 Example prompt">
            {`Here are the finalized requirements and architecture:

[Paste requirements.md]
[Paste architecture.md]

Generate a phased implementation plan that:
- Covers every requirement — nothing left out
- Adds nothing beyond what's specified (no scope creep)
- Groups related work into logical, ordered phases
- States dependencies between phases clearly
- Lists success criteria for each phase
- Flags technical risks or decisions that need to be made during implementation

[Annotate and run a second round of critique before finalizing]`}
          </PromptBox>
          <Callout variant="warn" icon="⚠️" label="Scope creep is silent and deadly">
            Claude will often suggest useful-sounding additions. Resist. Extra
            scope in the plan becomes extra scope in implementation, which
            becomes extra testing surface, which becomes delays. Every addition
            should require a conscious decision to update the requirements doc
            first.
          </Callout>
          <Callout variant="insight" icon="💡" label="The SEO overhaul — plan-then-implement in action">
            When I ran the SEO overhaul across The Helpful Dev&apos;s app pages, I used exactly this
            pattern. Phase 1 produced a written plan. I reviewed it before anything was executed
            and struck out two suggestions I actively disagreed with — both of which Claude had
            framed as obvious improvements. Neither touched the codebase. The review checkpoint cost
            ten minutes; catching a bad implementation across a dozen files would have cost hours.
          </Callout>
        </StepSection>

        {/* ═══ PHASE 2 ═══ */}
        <PhaseStrip
          phase="2"
          variant="build"
          id="phase2"
          title="Phase 2 — Build & Verify: One phase at a time"
          subtitle="Take each phase from the implementation plan and run it through the full Build & Verify loop below. Fresh session per phase, every time."
        />

        {/* Step 2.1 */}
        <StepSection
          badge="Step 2.1"
          badgeVariant="green"
          title="Write the tests before writing the code"
          subtitle="Define 'done' before you start — removes all ambiguity"
        >
          <p>
            For each phase, start with tests. Take the success criteria from
            the implementation plan and ask Claude to write tests that define
            what &ldquo;this phase is complete&rdquo; looks like. Then implement to make
            those tests pass.
          </p>
          <p>
            This is Test-Driven Development (TDD) applied to AI-assisted work —
            and it solves a common failure mode where Claude produces code that{" "}
            <em>looks</em> right but doesn&apos;t actually meet the criteria. The
            tests are the criteria.
          </p>
          <PromptBox label="💬 Example prompt">
            {`We're starting Phase [N]: [phase name].

Here are the success criteria from the implementation plan:
[Paste phase success criteria]

Before writing any implementation code:
1. Write tests that define what success looks like for each criterion
2. Include at least one test for the expected happy path and one for a failure/edge case per criterion
3. These tests should currently fail — that's correct, we haven't built anything yet

We'll implement to make these pass in the next step.`}
          </PromptBox>
          <Callout variant="tip" icon="✅" label="Tests = verification criteria">
            Claude performs dramatically better when it can run something to
            check its own work. Writing tests first gives it an automatic
            feedback loop: implement → run tests → fix failures → done. You get
            fewer &ldquo;it looks fine to me&rdquo; moments.
          </Callout>
        </StepSection>

        {/* Step 2.2 */}
        <StepSection
          badge="Step 2.2"
          badgeVariant="green"
          title="Implement the phase — with verification baked in"
          subtitle="Verification criteria live in the prompt, not just the review"
        >
          <p>
            Now implement. Provide the requirements, architecture doc, the
            specific phase from the plan, and the tests you just wrote.
            Critically: instruct Claude to run the tests and fix failures before
            telling you it&apos;s done. Don&apos;t leave verification for the review step.
          </p>
          <PromptBox label="💬 Example prompt">
            {`Implement Phase [N]: [phase name].

Context:
[Paste requirements.md]
[Paste architecture.md]
[Paste this phase from implementation-plan.md]
[Paste the tests from Step 2.1]

Instructions:
- Stay strictly within the scope of this phase
- Run the tests as you build
- Fix any test failures before telling me you're done
- Confirm which success criteria are met when complete`}
          </PromptBox>
          <Callout variant="insight" icon="💡" label="Why 'run the tests' belongs in the prompt">
            Without it, Claude will often report success based on reading its
            own code. With it, Claude has to prove success by running something.
            The difference in output quality is significant.
          </Callout>
        </StepSection>

        {/* Step 2.3 */}
        <StepSection
          badge="Step 2.3"
          badgeVariant="orange"
          title="Separate reviewer session with a 4-metric scorecard"
          subtitle="Fresh context = unbiased review — the Writer/Reviewer pattern"
        >
          <p>
            Open a <em>new</em> chat. Share only the implementation code — not
            the conversation context, not the implementation decisions. A Claude
            that didn&apos;t write the code has no attachment to its design choices.
            It will flag problems the author&apos;s session would rationalise away.
          </p>
          <p>Ask for a structured scorecard on four dimensions:</p>

          {/* Scorecard */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden my-5">
            <div className="bg-slate-50 border-b border-slate-200 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Review Scorecard — Low / Medium / High
            </div>
            {[
              {
                icon: "🛡️",
                label: "Robustness",
                desc: "Handles errors, edge cases, unexpected input, and failure modes gracefully",
              },
              {
                icon: "📐",
                label: "Code Quality",
                desc: "Readable, well-structured, consistent patterns, appropriate abstractions",
              },
              {
                icon: "🔒",
                label: "Security",
                desc: "No obvious vulnerabilities, safe data handling, proper input validation",
              },
              {
                icon: "🔧",
                label: "Maintainability",
                desc: "Can a future developer change this safely without being there when it was built?",
              },
            ].map((row, i, arr) => (
              <div
                key={row.label}
                className={`flex items-center gap-4 px-5 py-4 ${
                  i < arr.length - 1 ? "border-b border-slate-100" : ""
                }`}
              >
                <span className="text-lg shrink-0">{row.icon}</span>
                <span className="text-sm font-semibold text-slate-800 min-w-[120px]">
                  {row.label}
                </span>
                <span className="text-sm text-slate-500">{row.desc}</span>
              </div>
            ))}
          </div>

          <PromptBox label="💬 Example prompt">
            {`Please perform a rigorous code review of the following implementation.

[Paste implementation files]

Rate each criterion on Low / Medium / High. For each:
- Justify the rating with specific observations
- List concrete improvements that would move it to High

Criteria: Robustness · Code Quality · Security · Maintainability

Be critical. Don't rate anything High unless it genuinely deserves it.
This is a fresh review — you have no context about how the code was written.`}
          </PromptBox>
          <Callout variant="key" icon="🔑" label="Why a separate session?">
            Claude that wrote the code will unconsciously defend its own
            choices. A fresh session has no context about the implementation
            decisions and reviews the output purely on merit. This is the
            Writer/Reviewer pattern — the same reason engineering teams use
            different people for code review.
          </Callout>
        </StepSection>

        {/* Step 2.4 */}
        <StepSection
          badge="Step 2.4"
          badgeVariant="orange"
          title="Polish in a new session — twice, then stop"
          subtitle="Act on the scorecard, re-review, move on"
        >
          <p>
            Open a fresh session. Provide the implementation and the review
            scorecard. Ask Claude to implement all the suggested improvements,
            then re-score. Two rounds — done. Accept any remaining Medium ratings
            with a brief written explanation of why they&apos;re acceptable.
          </p>
          <PromptBox label="💬 Example prompt">
            {`Here is the implementation and the review scorecard:

[Paste implementation files]
[Paste scorecard from Step 2.3]

Please:
1. Implement all suggested improvements from the scorecard
2. Re-score after changes
3. For any criterion still below High, explain briefly why it's acceptable at this stage (or what would be needed to raise it)

This is round [1 or 2 of 2].`}
          </PromptBox>
        </StepSection>

        {/* Step 2.5 */}
        <StepSection
          badge="Step 2.5"
          badgeVariant="violet"
          title="Complete the test suite"
          subtitle="Prove it works — including the parts that shouldn't work"
        >
          <p>
            You wrote the initial tests in Step 2.1 to drive development. Now
            round them out. Ask Claude to fill in edge cases, error conditions,
            and — critically — integration points defined in the architecture
            doc. These boundary tests are what catch the real bugs.
          </p>
          <PromptBox label="💬 Example prompt">
            {`Review the existing tests and complete the test suite for this phase.

[Paste implementation files]
[Paste existing tests]
[Paste relevant section of architecture.md showing integration boundaries]

Add tests that cover:
- Edge cases (boundary values, empty/null inputs, max/min sizes)
- Error conditions (what happens when dependencies fail, invalid auth, unexpected data)
- Integration boundaries defined in the architecture doc
- Any security-relevant scenarios

For each test, include a brief comment explaining what scenario it covers and why it matters.`}
          </PromptBox>
        </StepSection>

        <ResetBanner>
          🧹 Phase complete. Clear the chat. Next phase: repeat steps 2.1 →
          2.5 with the next phase from the implementation plan.
        </ResetBanner>

        {/* ── Quick Reference ── */}
        <hr className="border-slate-100 my-10" />
        <h2 id="reference" className="text-2xl font-bold text-slate-900 mb-2 pt-2">
          Quick reference
        </h2>
        <p className="text-slate-500 mb-6 text-sm">The complete workflow on one screen.</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10">
          {[
            { id: "1.1", label: "Requirements Interview", desc: "Claude interviews you → writes requirements.md", color: "bg-cyan-500" },
            { id: "1.2", label: "Annotate + Critique ×2", desc: "Annotate → Claude refines → stop at two rounds", color: "bg-cyan-500" },
            { id: "1.3", label: "Architectural Spec", desc: "Tech stack, components, data flows, boundaries", color: "bg-teal-600" },
            { id: "1.4", label: "Annotate Arch ×2", desc: "Same discipline — stop at two rounds", color: "bg-teal-600" },
            { id: "1.5", label: "CLAUDE.md + Commit", desc: "Configure context, commit all docs to git", color: "bg-cyan-500" },
            { id: "1.6", label: "Impl. Plan ×2", desc: "Phased plan from both docs — no scope creep", color: "bg-cyan-500" },
            { id: "2.1", label: "Write Tests First", desc: "Define done as tests before implementation starts", color: "bg-green-600" },
            { id: "2.2", label: "Implement + Verify", desc: "Build, run tests, fix failures — then declare done", color: "bg-green-600" },
            { id: "2.3", label: "Separate Reviewer", desc: "Fresh session: 4-metric scorecard, honest critique", color: "bg-orange-500" },
            { id: "2.4", label: "Polish ×2", desc: "Implement scorecard improvements, re-review, stop", color: "bg-orange-500" },
            { id: "2.5", label: "Complete Test Suite", desc: "Edge cases, errors, integration boundaries", color: "bg-violet-500" },
            { id: "↻", label: "Repeat per Phase", desc: "Clear chat → next phase → steps 2.1–2.5 again", color: "bg-green-600" },
          ].map((card) => (
            <div
              key={card.id}
              className="bg-slate-50 border border-slate-200 rounded-xl p-4 card-hover"
            >
              <div className={`w-7 h-0.5 rounded-full ${card.color} mb-3`} />
              <div className="text-xs text-slate-400 uppercase tracking-wider mb-1.5">
                {card.id}
              </div>
              <h4 className="text-sm font-semibold text-slate-800 mb-1">
                {card.label}
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>

        {/* ── Resources ── */}
        <h2 id="resources" className="text-2xl font-bold text-slate-900 mb-2 pt-2">
          Further reading
        </h2>
        <p className="text-slate-500 mb-6 text-sm">
          The sources that shaped this workflow — for when you want to go deeper
          on any one part.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {[
            {
              source: "Anthropic · Official docs",
              title: "Best Practices for Claude Code",
              href: "https://code.claude.com/docs/en/best-practices",
              desc: "CLAUDE.md, context management, Plan Mode, Writer/Reviewer pattern, and verification-first workflows.",
            },
            {
              source: "Anthropic · Official docs",
              title: "Common Workflows — Claude Code",
              href: "https://code.claude.com/docs/en/common-workflows",
              desc: "Step-by-step recipes for debugging, testing, PRs, and more.",
            },
            {
              source: "HumanLayer Blog",
              title: "Writing a Good CLAUDE.md",
              href: "https://www.humanlayer.dev/blog/writing-a-good-claude-md",
              desc: "Practical guide to structuring your persistent context file — what to include and what to cut.",
            },
            {
              source: "Anthropic · Official docs",
              title: "Skill Authoring Best Practices",
              href: "https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices",
              desc: "How to create reusable skill modules for repeatable project workflows.",
            },
            {
              source: "DEV Community",
              title: "A Week with Claude Code: Lessons & Smarter Workflows",
              href: "https://dev.to/ujja/a-week-with-claude-code-lessons-surprises-and-smarter-workflows-23ip",
              desc: "Real-world lessons from a developer who tested these patterns in practice.",
            },
            {
              source: "Builder.io",
              title: "Improve your AI code output with AGENTS.md",
              href: "https://www.builder.io/blog/agents-md",
              desc: "Tips on agent memory files and how to make persistent context work across tools.",
            },
          ].map((card) => (
            <a
              key={card.href}
              href={card.href}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-50 border border-slate-200 rounded-xl p-4 card-hover block group"
            >
              <div className="text-xs text-slate-400 uppercase tracking-wider mb-1.5">
                {card.source}
              </div>
              <div className="text-sm font-semibold text-slate-800 group-hover:text-cyan-600 transition-colors mb-1.5">
                {card.title}
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">{card.desc}</p>
            </a>
          ))}
        </div>

        <hr className="border-slate-100 my-10" />

        <Callout variant="key" icon="🚀" label="The bottom line">
          The workflow is the structure. The ×2 stop rule is the discipline. The
          fresh sessions are the quality mechanism. None of this requires
          technical expertise to follow — it just requires the patience to plan
          before you build, and the restraint to stop refining when the loop
          says stop.
        </Callout>

        {/* Post footer */}
        <div className="mt-14 pt-8 border-t border-slate-100 text-center text-sm text-slate-400">
          <p>
            Built with Claude, several context resets, and exactly two rounds of
            critique.
          </p>
          <p className="mt-2">
            The first app built with this workflow end-to-end — Loamy — ships in May. There&apos;ll be
            a full post on how the workflow holds up when used from day one rather than retrofitted.
          </p>
          <div className="mt-6">
            <Link
              href="/blog"
              className="text-cyan-600 hover:text-cyan-700 underline underline-offset-2 text-sm"
            >
              ← Back to the blog
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
