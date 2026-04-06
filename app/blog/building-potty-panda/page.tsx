import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/app/components/JsonLd";

export const metadata: Metadata = {
  title:
    "Vibe Coding Potty Panda: The App That Worked Perfectly Until I Left the Sandbox — The Helpful Dev",
  description:
    "I built a complete potty training tracker with Gemini in one sitting. The preview looked flawless. Then I tried to ship it.",
  alternates: {
    canonical: "https://thehelpfuldev.com/blog/building-potty-panda",
  },
  openGraph: {
    title:
      "Vibe Coding Potty Panda: The App That Worked Perfectly Until I Left the Sandbox",
    description:
      "I built a complete potty training tracker with Gemini in one sitting. The preview looked flawless. Then I tried to ship it.",
    url: "https://thehelpfuldev.com/blog/building-potty-panda",
  },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline:
    "Vibe Coding Potty Panda: The App That Worked Perfectly Until I Left the Sandbox",
  description:
    "I built a complete potty training tracker with Gemini in one sitting. The preview looked flawless. Then I tried to ship it.",
  datePublished: "2026-04-06",
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
  url: "https://thehelpfuldev.com/blog/building-potty-panda",
  mainEntityOfPage: "https://thehelpfuldev.com/blog/building-potty-panda",
};

/* ─── Sub-components ─────────────────────────────────────────────── */

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
    <div
      className={`${styles[variant]} rounded-xl p-5 my-5 flex gap-4 items-start text-sm leading-relaxed`}
    >
      <span className="text-xl shrink-0 mt-0.5">{icon}</span>
      <div className="flex-1 text-slate-700">
        <strong
          className={`block mb-1 text-xs uppercase tracking-wider font-semibold ${labelStyles[variant]}`}
        >
          {label}
        </strong>
        {children}
      </div>
    </div>
  );
}

function CodeBlock({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
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

function BeforeAfter({
  before,
  after,
  beforeLabel = "Before",
  afterLabel = "After (the fix)",
}: {
  before: string;
  after: string;
  beforeLabel?: string;
  afterLabel?: string;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-5">
      <div className="bg-red-950 rounded-xl overflow-hidden border border-red-800 border-l-4 border-l-red-500">
        <div className="bg-red-900 px-4 py-2 text-xs font-bold tracking-widest uppercase text-red-300 border-b border-red-800">
          {beforeLabel}
        </div>
        <pre className="px-5 py-4 text-sm leading-relaxed text-red-200 font-mono whitespace-pre-wrap overflow-x-auto">
          {before}
        </pre>
      </div>
      <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-700 border-l-4 border-l-green-500">
        <div className="bg-slate-800 px-4 py-2 text-xs font-bold tracking-widest uppercase text-green-400 border-b border-slate-700">
          {afterLabel}
        </div>
        <pre className="px-5 py-4 text-sm leading-relaxed text-slate-200 font-mono whitespace-pre-wrap overflow-x-auto">
          {after}
        </pre>
      </div>
    </div>
  );
}

function TakeawayCard({
  number,
  title,
  children,
}: {
  number: number | string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden mb-4">
      <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center gap-4">
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-cyan-100 text-cyan-700 text-sm font-bold shrink-0">
          {number}
        </span>
        <h3 className="text-base font-semibold text-slate-900">{title}</h3>
      </div>
      <div className="px-6 py-5 text-slate-600 text-sm leading-relaxed [&>p]:mb-3 [&>p:last-child]:mb-0">
        {children}
      </div>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────── */

export default function BuildingPottyPandaPage() {
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
            <Link
              href="/blog"
              className="hover:text-cyan-600 transition-colors"
            >
              Blog
            </Link>
          </div>

          <div className="mb-5">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-100 text-cyan-700 text-sm font-medium">
              App Development · AI Development · Debugging
            </span>
          </div>

          <h1 className="text-3xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-tight mb-5">
            Vibe Coding{" "}
            <span className="gradient-text">Potty Panda</span>: The App That
            Worked Perfectly Until I Left the Sandbox
          </h1>

          <p className="text-lg text-slate-500 leading-relaxed mb-6 max-w-2xl">
            I built a complete potty training tracker with Gemini in one sitting.
            The preview looked flawless — multiple profiles, clipboard export,
            timestamped logs. Then I tried to deploy it, and learned exactly how
            much a browser-based AI preview hides from you.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
            <span>April 6, 2026</span>
            <span>·</span>
            <span>10 min read</span>
            <span>·</span>
            <span>Intermediate</span>
          </div>
        </div>
      </section>

      {/* ── Article body ── */}
      <div className="max-w-3xl mx-auto px-6 pb-20">

        {/* Table of Contents */}
        <nav className="bg-slate-50 border border-slate-200 rounded-2xl px-7 py-6 my-10">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">
            In this post
          </h3>
          <ol className="space-y-2 pl-5 list-decimal">
            {[
              ["#context", "What Potty Panda is"],
              ["#vibe-session", "One sitting, one file, one very good preview"],
              ["#ux-decisions", "The UX decisions: designing for exhausted parents"],
              ["#the-cliff", "The deployment cliff"],
              ["#bugs", "The silent delete bug"],
              ["#ai-angle", "What Gemini got right — and what it couldn't see"],
              ["#takeaways", "Key takeaways"],
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

        {/* ── Context ── */}
        <section id="context" className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            What Potty Panda is
          </h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            Potty Panda is a potty training tracker — a free, privacy-first web
            app for parents and childcare workers managing toddler toilet training.
            You log incidents (pee, poop, success, miss), add notes, switch
            between child profiles, and export a summary to the clipboard to share
            with a teacher or co-parent. No login. No data collected. Everything
            lives in{" "}
            <code className="bg-slate-100 px-1.5 py-0.5 rounded text-sm font-mono text-slate-800">
              localStorage
            </code>
            , entirely in your browser.
          </p>
          <p className="text-slate-700 leading-relaxed">
            This was the very first app I built for The Helpful Dev — before the
            brand existed, before I had a design system, before I&apos;d learned
            the difference between vibe coding and agentic engineering. I built it
            with Gemini in a single session, and I was proud of it. I should have
            been — it worked. What I didn&apos;t yet understand was how much
            Gemini&apos;s Canvas preview was carrying for me.
          </p>
        </section>

        {/* ── Vibe session ── */}
        <section id="vibe-session" className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            One sitting, one file, one very good preview
          </h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            By this point I&apos;d been actively studying prompt engineering —
            reading docs, testing patterns, learning what actually changes model
            output. I didn&apos;t open Gemini and wing it. I wrote a structured
            prompt that specified a role, a tech stack, design philosophy, and
            a precise feature list before Gemini wrote a single line of code.
          </p>

          <CodeBlock label="My prompt to Gemini (abbreviated)">
{`Role:
You are an expert React developer specializing in building
high-quality, lightweight, mobile-first utility web apps.
Build a complete, single-file React application that functions
exactly like a native mobile app.

Tech Stack Constraints:
- Framework: React (Functional Components + Hooks)
- Styling: Tailwind CSS. Crucial: inject the Tailwind CDN script
  via useEffect if missing, so the preview works instantly.
- Icons: lucide-react for all iconography
- Storage: localStorage exclusively — no backend
- File Structure: ENTIRE app in a SINGLE .jsx file block

Design & UI Philosophy:
- Mobile-First: min-h-screen, flex, flex-col
- Clean, "App-like" feel — rounded-2xl, large touch targets
- Navigation via state variables, not a router
- Consistent modal design (centered card, backdrop blur)

Core Features:
- Main dashboard with clear visual indicator
- Action buttons — large, prominent
- History log with formatted timestamps, edit (pencil) and
  delete (trash) with a confirmation step
- Settings modal with Clear History and Ko-Fi support link
- Streak/gamification pill

The App: "Potty Panda" — a potty training tracker.
- Two large buttons: Pee and Poop
- Toggle: Accident vs Success
- "Last went: 2 hours ago" indicator (no timer ring)
- History icons per event type
- Dry Streak counter
- Color theme: white, soft blues, oranges`}
          </CodeBlock>

          <p className="text-slate-700 leading-relaxed mb-4">
            That level of specificity matters. The role framing, the explicit
            CDN injection requirement, the constraint to a single file —
            these weren&apos;t random choices. They came from learning what
            LLMs respond to: concrete constraints produce concrete output.
            Gemini generated{" "}
            <code className="bg-slate-100 px-1.5 py-0.5 rounded text-sm font-mono text-slate-800">
              PottyPanda.jsx
            </code>{" "}
            — a single file, self-contained, with Tailwind injected via CDN
            script exactly as specified, rendering instantly in the Canvas preview.
          </p>
          <p className="text-slate-700 leading-relaxed mb-4">
            The Canvas preview looked great. It was interactive. I could tap the
            buttons, see state update, watch the log fill in. I iterated through
            five or six rounds of changes without once leaving the browser tab.
            This is vibe coding at its best: low friction, high velocity, fast
            feedback.
          </p>

          <CodeBlock label="PottyPanda.jsx — The initial Gemini output (abbreviated)">
{`// Gemini auto-injected Tailwind via CDN for Canvas preview
// <script src="https://cdn.tailwindcss.com"></script>

import React, { useState, useEffect } from 'react';
import { Baby, CheckCircle, XCircle, Clock, Trash2 } from 'lucide-react';

const STORAGE_KEY = 'potty-panda-logs';

export default function PottyPanda() {
  const [logs, setLogs] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  const [type, setType] = useState('pee');      // 'pee' | 'poop'
  const [outcome, setOutcome] = useState('success'); // 'success' | 'accident'

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
  }, [logs]);

  function logIncident() {
    setLogs(prev => [
      { id: Date.now(), type, outcome, timestamp: new Date().toISOString() },
      ...prev,
    ]);
  }

  // ... render
}`}
          </CodeBlock>

          <p className="text-slate-700 leading-relaxed">
            Clean, readable, exactly what I asked for. The CDN Tailwind script
            meant it rendered perfectly in Gemini&apos;s preview environment.
            That detail would matter later.
          </p>
        </section>

        {/* ── UX decisions ── */}
        <section id="ux-decisions" className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            The UX decisions: designing for exhausted parents
          </h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            The first version had some friction points that I caught quickly by
            just using it. Gemini&apos;s initial output had a big red
            &ldquo;Accident&rdquo; button — high contrast, alarming. For a tired
            parent already stressed about their kid&apos;s progress, that felt
            wrong. I asked Gemini to change it to &ldquo;Potty Missed&rdquo; and
            replace the red with slate grey. It did, immediately.
          </p>
          <p className="text-slate-700 leading-relaxed mb-4">
            The initial design also had a &ldquo;Dry Streak&rdquo; counter — a
            number showing how many consecutive successes the child had achieved.
            It sounds encouraging. In practice it means there&apos;s a visible
            counter that resets to zero the moment there&apos;s an accident,
            right in front of a parent who&apos;s already at the end of their
            rope. I asked Gemini to remove it entirely. No argument, no
            negotiation — just &ldquo;remove the dry streak counter.&rdquo; Gone.
          </p>

          <Callout variant="insight" icon="💡" label="What I noticed">
            This is where AI-assisted development actually shines for UX work.
            The model generates a reasonable first pass. You use it as a real
            person would, notice what feels wrong, describe the fix in plain
            language, and iterate. No PRs, no design specs — just a conversation.
            The feedback loop is fast enough that you can design through feeling
            rather than planning.
          </Callout>

          <p className="text-slate-700 leading-relaxed mb-4">
            Later rounds added child profiles (for nursery teachers managing
            multiple kids), a notes field per log entry, and a clipboard export
            that formatted the day&apos;s activity into a readable text summary.
            Each of these came from thinking about who actually uses this app —
            not just parents at home, but childcare workers who needed to hand
            off a log at the end of a session.
          </p>
          <p className="text-slate-700 leading-relaxed">
            By the end of the session I had a genuinely useful app. The Canvas
            preview was smooth. The data model was solid. Profiles worked, logs
            were timestamped, export copied to clipboard with a toast
            notification. I was ready to ship.
          </p>
        </section>

        {/* ── The deployment cliff ── */}
        <section id="the-cliff" className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            The deployment cliff
          </h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            I left Gemini&apos;s Canvas. I opened a terminal. Things immediately
            stopped working.
          </p>
          <p className="text-slate-700 leading-relaxed mb-4">
            The plan was straightforward: scaffold a Vite project, drop in the
            component, wire up Tailwind, push to GitHub, deploy to Vercel. In
            practice, nothing went cleanly. Tailwind wasn&apos;t configured the
            way Gemini expected. Git had opinions about the repo history I
            hadn&apos;t anticipated. Each problem had a fix, but each fix
            required knowing something the model had no way to tell me — because
            it had no visibility into my local environment.
          </p>
          <p className="text-slate-700 leading-relaxed mb-4">
            This is the bit the Canvas preview hid completely. Inside Gemini,
            Tailwind was injected via CDN script — no config, no build step, just
            instant rendering. The moment I took the same code local, I was
            responsible for all of that setup. The model gave me instructions
            based on its best guess at my environment. Its best guess was wrong
            in a few places.
          </p>

          <Callout variant="warn" icon="⚠️" label="Watch out">
            Gemini&apos;s deployment instructions assumed a specific local setup
            that didn&apos;t match mine. Nothing it told me was wrong in
            isolation — it just described a different environment. Before asking
            an AI for setup instructions, tell it exactly what you have: package
            versions, build tool, deploy target. Otherwise you&apos;re debugging
            a mismatch between two environments that were never compared.
          </Callout>

          <p className="text-slate-700 leading-relaxed">
            Once I worked through the setup issues and got to Vercel, the app was
            live. I clicked through it and everything looked right — until I tried
            to delete a profile.
          </p>
        </section>

        {/* ── The silent delete bug ── */}
        <section id="bugs" className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            The silent delete bug
          </h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            The delete buttons did nothing. Not an error, not a flash — just
            nothing. I clicked &ldquo;Delete Profile.&rdquo; Nothing. I clicked
            &ldquo;Clear History.&rdquo; Nothing. The buttons were wired up. The
            state logic was correct. But something upstream of the actual deletion
            was silently failing.
          </p>
          <p className="text-slate-700 leading-relaxed mb-4">
            The culprit was{" "}
            <code className="bg-slate-100 px-1.5 py-0.5 rounded text-sm font-mono text-slate-800">
              window.confirm()
            </code>
            . Gemini had used native browser confirm dialogs as a guard before
            destructive actions — reasonable enough. But in certain environments
            (including Vercel&apos;s deployment context and some stricter mobile
            browsers), the confirm dialog is silently blocked. The function
            returns{" "}
            <code className="bg-slate-100 px-1.5 py-0.5 rounded text-sm font-mono text-slate-800">
              false
            </code>{" "}
            without ever showing anything. From the user&apos;s perspective: you
            click delete, nothing happens.
          </p>

          <BeforeAfter
            beforeLabel="window.confirm (silently blocked)"
            afterLabel="Custom ConfirmationModal (works everywhere)"
            before={`function deleteProfile(id) {
  const ok = window.confirm(
    "Delete this profile?"
  );
  // ok is silently false in some
  // environments — no dialog shown,
  // no deletion, no feedback
  if (!ok) return;
  setProfiles(prev =>
    prev.filter(p => p.id !== id)
  );
}`}
            after={`// Custom modal, rendered in React DOM
function ConfirmationModal({
  message, onConfirm, onCancel
}) {
  return (
    <div className="fixed inset-0 bg-black/50
        flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6
          max-w-sm w-full mx-4 shadow-xl">
        <p className="text-slate-700 mb-6">
          {message}
        </p>
        <div className="flex gap-3 justify-end">
          <button onClick={onCancel}>Cancel</button>
          <button onClick={onConfirm}
            className="bg-red-500 text-white">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}`}
          />

          <p className="text-slate-700 leading-relaxed mb-4">
            The fix was to build a custom{" "}
            <code className="bg-slate-100 px-1.5 py-0.5 rounded text-sm font-mono text-slate-800">
              ConfirmationModal
            </code>{" "}
            component — a React overlay that lives in the DOM, can&apos;t be
            blocked by the browser, and handles all destructive confirmations in
            the app. It also happened to look much better than the native dialog,
            which was a free win.
          </p>

          <Callout variant="tip" icon="✅" label="Pro tip">
            Never use{" "}
            <code className="bg-slate-100 px-1.5 py-0.5 rounded text-sm font-mono text-slate-800">
              window.confirm()
            </code>{" "}
            for destructive actions in a React app that will be deployed. Build a
            modal. It&apos;s 20 extra lines of JSX, it works in every environment,
            and it lets you style the buttons to make the dangerous action
            obviously red. The native dialog can be blocked silently, and it looks
            terrible on mobile anyway.
          </Callout>
        </section>

        {/* ── AI angle ── */}
        <section id="ai-angle" className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            What Gemini got right — and what it couldn&apos;t see
          </h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            The app itself was genuinely good — and I think the structured
            prompt engineering was a big part of why. Specifying the role, the
            tech stack constraints, and the design philosophy upfront meant
            Gemini didn&apos;t have to guess at any of it. The output was
            clean, consistent React that matched what I&apos;d asked for.
            The iterative UX improvements in follow-up rounds responded well
            to plain-language descriptions too. As an AI pair programming
            session for getting an idea into working form fast, it delivered.
          </p>
          <p className="text-slate-700 leading-relaxed mb-4">
            What the LLM couldn&apos;t see was my environment. And this is the
            gap prompt engineering doesn&apos;t fully close — I&apos;d specified
            exactly how the Tailwind CDN injection should work inside Canvas,
            which worked perfectly there. But I hadn&apos;t told Gemini what
            version of Tailwind I had installed locally, because I didn&apos;t
            think to. The deployment instructions it generated assumed v3
            because that&apos;s what the boilerplate examples in its training
            data used. My prompt was thorough about the app; it was silent about
            the deployment environment.
          </p>
          <p className="text-slate-700 leading-relaxed mb-4">
            The{" "}
            <code className="bg-slate-100 px-1.5 py-0.5 rounded text-sm font-mono text-slate-800">
              window.confirm
            </code>{" "}
            issue is a slightly different failure mode — not a knowledge gap but
            an environment assumption. In the Canvas sandbox, confirm dialogs
            work. The model generated code that worked in its context and had no
            signal that it would behave differently at deploy time.
          </p>
          <p className="text-slate-700 leading-relaxed mb-4">
            Both problems have the same root cause: I treated the Gemini preview
            as representative of the production environment. It isn&apos;t. The
            preview is a sandbox with different constraints, a different runtime,
            and no access to the actual tech stack I&apos;d be deploying to.
            Vibe coding got me to a working prototype fast, but I was the one who
            had to bridge the gap to production.
          </p>

          <Callout variant="key" icon="🔑" label="Key insight">
            An AI coding assistant generates code for the environment it
            imagines, not the environment you have. The preview is seductive
            because it&apos;s immediate. But every assumption the model makes
            about your runtime, your package versions, and your deployment
            platform is invisible until you leave the sandbox. Prompt engineering
            the context upfront — &ldquo;I&apos;m using Tailwind v4, deploying
            to Vercel&rdquo; — would have prevented both issues.
          </Callout>

          <p className="text-slate-700 leading-relaxed">
            This was the lesson that pushed me toward the more structured approach
            I use now. The app is the easy part — the LLM handles it well.
            Environment, version constraints, and deployment context need to come
            from you, explicitly, before the session starts.
          </p>
        </section>

        {/* ── Takeaways ── */}
        <section id="takeaways" className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Key takeaways
          </h2>

          <TakeawayCard number={1} title="The preview is a sandbox — not production">
            <p>
              Gemini&apos;s Canvas injected Tailwind via CDN. My Vite project
              used npm. These behave differently, and the model had no way to know
              which one I had. Every AI coding assistant builds for the
              environment it imagines. Tell it your stack explicitly at the start
              of the session, or expect friction at deploy time.
            </p>
          </TakeawayCard>

          <TakeawayCard number={2} title="Prompt engineering the app isn't the same as prompting the deployment">
            <p>
              I had a well-structured prompt that covered role, tech stack,
              design philosophy, and feature requirements. It produced exactly
              the app I asked for. But I didn&apos;t tell Gemini what version of
              Tailwind I had locally, what build tool I was using, or how I was
              planning to deploy. Prompt engineering the app and prompt
              engineering the environment are two different tasks. Don&apos;t
              conflate them.
            </p>
          </TakeawayCard>

          <TakeawayCard number={3} title="Never use window.confirm for destructive actions in a deployed React app">
            <p>
              Native confirm dialogs can be silently blocked in deployed
              environments and on mobile. They return{" "}
              <code className="bg-slate-100 px-1.5 py-0.5 rounded text-sm font-mono text-slate-800">
                false
              </code>{" "}
              without showing anything, which means delete buttons appear broken
              with no error to debug. Build a custom confirmation modal — it
              takes 20 lines, it&apos;s unsuppressable, and it looks better.
            </p>
          </TakeawayCard>

          <TakeawayCard number={4} title="UX is faster to iterate with AI than without it">
            <p>
              Removing the Dry Streak counter, softening &ldquo;Accident&rdquo;
              to &ldquo;Potty Missed,&rdquo; switching to a timestamped list —
              each of these was a one-sentence prompt and one generated iteration.
              That&apos;s genuinely fast. The AI pair programming loop is at its
              best when you&apos;re making judgment calls about feel and the model
              is just executing them.
            </p>
          </TakeawayCard>

          <TakeawayCard number={5} title="Shipping something imperfect is still shipping">
            <p>
              Potty Panda launched with the wrong Tailwind setup, a git history
              that needed surgery, and delete buttons that silently failed. I
              found all of that before users did. The point isn&apos;t that the
              first vibe coding session produces a production-ready app — it
              doesn&apos;t. The point is it produces something real enough to
              test, break, and fix. That&apos;s worth more than a perfect spec
              that never ships.
            </p>
          </TakeawayCard>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl px-7 py-6 mt-8">
            <h3 className="text-base font-semibold text-slate-900 mb-2">
              Try Potty Panda
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              The app is live at{" "}
              <Link
                href="/app/potty-panda"
                className="text-amber-700 font-medium hover:underline"
              >
                thehelpfuldev.com/app/potty-panda
              </Link>
              . No login, no data collected. Your logs stay in your browser.
            </p>
          </div>
        </section>

        {/* ── Footer nav ── */}
        <div className="border-t border-slate-100 pt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <Link
            href="/blog"
            className="text-sm text-slate-500 hover:text-cyan-600 transition-colors"
          >
            &larr; Back to Blog
          </Link>
          <Link
            href="/"
            className="text-sm text-slate-500 hover:text-cyan-600 transition-colors"
          >
            See the apps &rarr;
          </Link>
        </div>
      </div>
    </main>
  );
}
