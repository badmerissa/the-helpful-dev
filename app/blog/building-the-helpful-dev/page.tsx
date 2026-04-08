import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import JsonLd from "@/app/components/JsonLd";

export const metadata: Metadata = {
  title:
    "The App Idea Closet Cleanout: How I Finally Shipped — and Built a Brand I'm Proud Of — The Helpful Dev",
  description:
    "A tired mum of two, a colleague's challenge, and a year of AI-assisted shipping — how The Helpful Dev went from a Gemini-built card grid to an agentic engineering hub.",
  alternates: {
    canonical: "https://thehelpfuldev.com/blog/building-the-helpful-dev",
  },
  openGraph: {
    title:
      "The App Idea Closet Cleanout: How I Finally Shipped — and Built a Brand I'm Proud Of",
    description:
      "A tired mum of two, a colleague's challenge, and a year of AI-assisted shipping — the story behind The Helpful Dev.",
    url: "https://thehelpfuldev.com/blog/building-the-helpful-dev",
  },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline:
    "The App Idea Closet Cleanout: How I Finally Shipped — and Built a Brand I'm Proud Of",
  description:
    "A tired mum of two, a colleague's challenge, and a year of AI-assisted shipping — how The Helpful Dev went from a Gemini-built card grid to an agentic engineering hub.",
  datePublished: "2026-03-31",
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
  url: "https://thehelpfuldev.com/blog/building-the-helpful-dev",
  mainEntityOfPage: "https://thehelpfuldev.com/blog/building-the-helpful-dev",
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
    <div className="border rounded-2xl overflow-hidden mb-4" style={{ background: "var(--bg-base)", borderColor: "var(--border-color)" }}>
      <div className="border-b px-6 py-4 flex items-center gap-4" style={{ background: "var(--bg-surface)", borderColor: "var(--border-color)" }}>
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-cyan-100 text-cyan-700 text-sm font-bold shrink-0">
          {number}
        </span>
        <h3 className="text-base font-semibold" style={{ color: "var(--text-primary)" }}>{title}</h3>
      </div>
      <div className="px-6 py-5 text-sm leading-relaxed [&>p]:mb-3 [&>p:last-child]:mb-0" style={{ color: "var(--text-secondary)" }}>
        {children}
      </div>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────── */

export default function BuildingTheHelpfulDevPage() {
  return (
    <main className="min-h-screen" style={{ background: "var(--bg-base)", color: "var(--text-primary)" }}>
      <JsonLd data={articleJsonLd} />

      {/* ── Hero ── */}
      <section className="border-b" style={{ borderColor: "var(--border-color)", background: "var(--bg-base)" }}>
        <div className="max-w-3xl mx-auto px-6 py-14 lg:py-20">
          <div className="flex items-center gap-3 mb-6 text-sm" style={{ color: "var(--text-muted)" }}>
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
              App Development · AI Development · Workflow
            </span>
          </div>

          <h1 className="text-3xl lg:text-5xl font-bold tracking-tight leading-tight mb-5" style={{ color: "var(--text-primary)" }}>
            The App Idea{" "}
            <span className="gradient-text">Closet Cleanout</span>: How I
            Finally Shipped — and Built a Brand I&apos;m Proud Of
          </h1>

          <p className="text-lg leading-relaxed mb-6 max-w-2xl" style={{ color: "var(--text-secondary)" }}>
            I&apos;m a tired mum of two with a head full of app ideas I&apos;d
            never shipped. One colleague&apos;s comment at a work function
            changed that. This is the story of everything that happened next —
            the vibe coding, the rebrand, the color crisis, and the shift to
            agentic engineering that made it all click.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-sm" style={{ color: "var(--text-muted)" }}>
            <span>March 31, 2026</span>
            <span>·</span>
            <span>10 min read</span>
            <span>·</span>
            <span>Beginner</span>
          </div>
        </div>
      </section>

      {/* ── Article body ── */}
      <div className="max-w-3xl mx-auto px-6 pb-20">

        {/* Table of Contents */}
        <nav className="border rounded-2xl px-7 py-6 my-10" style={{ background: "var(--bg-surface)", borderColor: "var(--border-color)" }}>
          <h3 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: "var(--text-muted)" }}>
            In this post
          </h3>
          <ol className="space-y-2 pl-5 list-decimal">
            {[
              ["#context", "What The Helpful Dev actually is"],
              ["#spark", "The colleague who started it all"],
              ["#v1", "v1: Vibe coding with Gemini — and being proud of it"],
              ["#shift", "The second conversation: agentic engineering"],
              ["#rebrand", "The rebrand, the switch to Claude, and the color crisis"],
              ["#v3", "Stop being a portfolio, start being a journey"],
              ["#ai-angle", "How AI-assisted development shaped every decision"],
              ["#takeaways", "Key takeaways"],
            ].map(([href, label]) => (
              <li key={href}>
                <a
                  href={href}
                  className="text-sm hover:text-cyan-600 transition-colors"
                  style={{ color: "var(--text-primary)" }}
                >
                  {label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* ── Context ── */}
        <section id="context" className="mb-12">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            What The Helpful Dev actually is
          </h2>
          <p className="leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
            The premise is simple: 12 free, privacy-first web apps in 12
            months. No ads, no login, no data collection. Just stuff that works
            in your browser. The site you&apos;re reading is the hub — a place
            to find the apps, follow the build-in-public journey, and come along
            for the ride.
          </p>
          <p className="leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            But the more honest story is that this site is an AI learning
            journey. It&apos;s what happens when someone who has always had
            ideas but never had the time finally finds the right tool — and
            decides to document everything along the way.
          </p>
        </section>

        {/* ── Spark ── */}
        <section id="spark" className="mb-12">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            The colleague who started it all
          </h2>
          <p className="leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
            I&apos;ve always had app ideas. Lots of them. They lived in my head,
            in notes apps, in the back of conversations. I&apos;d had them for
            years. But I&apos;m also a mum of two, and anyone who&apos;s lived
            that life knows that &quot;I&apos;ll build that side project
            tonight&quot; is a sentence that doesn&apos;t survive contact with
            reality.
          </p>
          <p className="leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
            At a work function, a colleague asked me why I hadn&apos;t shipped
            any of them. I said exactly that — I&apos;m a tired mum, I
            don&apos;t have the time. His response stopped me:
          </p>
          <blockquote className="border-l-4 border-cyan-400 pl-5 my-6 italic text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            &ldquo;AI is the best thing someone who doesn&apos;t have time can
            leverage to make time.&rdquo;
          </blockquote>
          <p className="leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            That was the spark. I decided 2026 was going to be two things at
            once: an AI learning journey, and an app idea closet cleanout. Get
            those ideas off the shelf and into the world.
          </p>
        </section>

        {/* ── V1 ── */}
        <section id="v1" className="mb-12">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            v1: Vibe coding with Gemini — and being proud of it
          </h2>
          <p className="leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
            I built v1 with Gemini. No brand guidelines, no design system, no
            SEO, no hooks. I hadn&apos;t yet made the switch to Claude. I was
            doing what I&apos;d later learn was called &quot;vibe coding&quot; —
            describing what I wanted, accepting what came back, iterating fast
            and loose. And I was proud of it.
          </p>
          <p className="leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
            Here&apos;s the thing: I should have been. It was live. The DNS zone
            file was something I&apos;d configured myself for the first time in
            my life — for my own domain, my own project. The email subscriber
            list was up and tested. Two apps were in the grid with green{" "}
            <code className="bg-slate-100 px-1.5 py-0.5 rounded text-sm font-mono text-slate-800">
              LIVE
            </code>{" "}
            badges on them. I&apos;d shipped.
          </p>

          {/* v1 screenshot */}
          <figure className="my-8">
            <div className="rounded-2xl overflow-hidden border shadow-sm" style={{ borderColor: "var(--border-color)" }}>
              <Image
                src="/blog-v1-screenshot.jpg"
                alt="The Helpful Dev v1 — a simple card grid with blue buttons, built with Gemini"
                width={900}
                height={600}
                className="w-full"
              />
            </div>
            <figcaption className="text-center text-sm mt-3" style={{ color: "var(--text-muted)" }}>
              The v1 homepage — card grid, blue buttons, disabled email input
              and all. Built with Gemini. I was so proud of this.
            </figcaption>
          </figure>

          <Callout variant="insight" icon="💡" label="What I noticed">
            Looking at that screenshot now, I can see what I couldn&apos;t then:
            every colour was &quot;default blue,&quot; there was no visual
            identity, and the &quot;Open source and supported by people like
            you&quot; copy was aspirational at best. But it was real, it was
            live, and it was mine. That matters.
          </Callout>

          <p className="leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
            The first commit landed in January 2026. The hero copy was
            straightforward — helpful tools, no ads, no tracking. The card grid
            was called &quot;The Toolbox.&quot; Everything was blue because
            blue felt techy, not because I&apos;d thought about it. There was
            even a &quot;Buy me a coffee&quot; button at the bottom.
          </p>

          <CodeBlock label="app/page.tsx — The Toolbox, January 2026">
{`<section>
  <h2 className="text-xl font-bold mb-6">The Toolbox</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
    {apps.map((app) => (
      <div key={app.name} className="bg-white border rounded-xl p-6">
        <div className="flex justify-between items-start mb-3">
          <img src={app.icon} alt="" className="w-8 h-8" />
          <span className="text-xs font-semibold text-green-600
              bg-green-50 px-2 py-0.5 rounded-full">
            {app.status}
          </span>
        </div>
        <h3 className="font-bold mb-1">{app.name}</h3>
        <p className="text-sm text-slate-500 mb-4">{app.description}</p>
        <a href={app.href}
           className="block w-full text-center bg-blue-600
               text-white py-2 rounded-lg font-medium">
          Launch App →
        </a>
      </div>
    ))}
  </div>
</section>`}
          </CodeBlock>

          <p className="leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            That code is embarrassing now. But it shipped, it worked, and it
            taught me what I actually wanted the site to become. You need a v1
            before you can have a v2.
          </p>
        </section>

        {/* ── The shift ── */}
        <section id="shift" className="mb-12">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            The second conversation: agentic engineering
          </h2>
          <p className="leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
            A few months into the journey, I had another conversation with the
            same colleague who&apos;d started it all. I was talking about vibe
            coding — excited, dorky probably — and he cut me off with two words:
            agentic engineering.
          </p>
          <p className="leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
            I went home and researched it. The difference, as I came to
            understand it: vibe coding is prompting and hoping. Agentic
            engineering is providing structured context — a plan, a spec, a
            brand reference — and letting the model execute with real autonomy.
            Less &quot;write me a button,&quot; more &quot;here&apos;s the full
            codebase, here&apos;s what I want to change, run it.&quot;
          </p>

          <Callout variant="key" icon="🔑" label="Key insight">
            The switch from vibe coding to agentic engineering isn&apos;t about
            typing less — it&apos;s about thinking more upfront. You trade
            reactive prompting for deliberate context-setting. The AI does more;
            you direct better.
          </Callout>

          <p className="leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            That research also coincided with switching from Gemini to Claude.
            The timing wasn&apos;t a coincidence — I was learning that the tool
            and the approach matter together. Better model, better workflow,
            better outputs.
          </p>
        </section>

        {/* ── Rebrand ── */}
        <section id="rebrand" className="mb-12">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            The rebrand, the switch to Claude, and the color crisis
          </h2>
          <p className="leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
            The redesign came in March. Four apps were live or nearly live, and
            the card grid wasn&apos;t doing them justice. I wanted something
            that felt like a real product site — a sticky navbar, alternating
            showcase sections with live app previews, a newsletter form that
            didn&apos;t apologize for existing.
          </p>
          <p className="leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
            I gave Claude the full codebase as context, described the layout I
            wanted, and let it run. This was my first real agentic workflow. The
            result — shipped as a PR on March 14th — was a complete
            architectural overhaul. A new{" "}
            <code className="bg-slate-100 px-1.5 py-0.5 rounded text-sm font-mono text-slate-800">
              AppSpotlight
            </code>{" "}
            component, proper component abstractions, a real design system. The
            mind-blow was real.
          </p>

          <BeforeAfter
            beforeLabel="v1 — blue card grid"
            afterLabel="v2 — AppSpotlight component"
            before={`// v1: hardcoded card for each app
<div className="bg-white border rounded-xl p-6">
  <img src={app.icon} />
  <span className="text-green-600">LIVE</span>
  <h3>{app.name}</h3>
  <p>{app.description}</p>
  <a className="bg-blue-600 text-white">
    Launch App →
  </a>
</div>`}
            after={`// v2: reusable component with proper props
<AppSpotlight
  icon={<FastingIcon />}
  status="live"
  title="Intermittent Fasting Tracker"
  tagline="Fast without the faff."
  description={...}
  bullets={[...]}
  href="https://fasting.thehelpfuldev.com"
  ctaLabel="Start Fasting Free"
  previewContent={<AppPreview ... />}
/>`}
          />

          <p className="leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
            There was just one problem. Claude chose indigo as the brand color.
          </p>
          <p className="leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
            Here&apos;s the honest version of how that got resolved: as an
            engineer, I didn&apos;t immediately care about the color. Indigo is
            fine. It&apos;s technically not wrong. But then the rebrand happened
            and AI landed on cyan — and I just liked it more. The whole site
            felt more like itself. Cyan stuck. I looked at the git log afterward
            and saw two &quot;indigo to cyan&quot; commits on the same day,
            which tells you everything about how that decision was made.
          </p>

          <CodeBlock label="git log — March 14, 2026 (the color crisis in three lines)">
{`a937036 Merge pull request #3 — Redesign app hub UI
047b1d25 Indigo to cyan rebrand
046134f  Indigo to cyan rebrand`}
          </CodeBlock>

          <Callout variant="warn" icon="⚠️" label="Watch out">
            When you run an agentic design session without a brand reference,
            the model will make reasonable but generic choices. After this
            experience I wrote{" "}
            <code className="bg-slate-100 px-1.5 py-0.5 rounded text-sm font-mono text-slate-800">
              .claude/skills/brand/SKILL.md
            </code>{" "}
            — a brand document that now goes into every design session as
            upfront context. Two commits to fix the same color on the same day
            is a great teacher.
          </Callout>

          <p className="leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            The logo also landed on March 14th — a cyberpunk animated coffee
            mug dropped into the navbar as an SVG. It immediately made the site
            feel like something specific. That single file had more impact than
            any 400-line component PR. Visual identity is disproportionately
            load-bearing.
          </p>
        </section>

        {/* ── V3 ── */}
        <section id="v3" className="mb-12">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            Stop being a portfolio, start being a journey
          </h2>
          <p className="leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
            The v2 homepage looked polished. Four full showcase sections, live
            app previews, proper copywriting. But it had a problem: a new
            visitor would see four apps and think &quot;neat, a
            portfolio.&quot; There was no reason to come back.
          </p>
          <p className="leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
            The real story was more interesting — 12 apps in 12 months, built in
            public, privacy-first, documented as I go. That&apos;s worth
            following. The homepage just wasn&apos;t saying it. So I changed it.
            The hero now leads with the challenge itself — progress bar, apps
            shipped, months left. The blog surfaces above the app grid. The
            newsletter CTA changed from &quot;Stay in the loop&quot; to
            &quot;Follow the journey.&quot;
          </p>

          <CodeBlock label="app/page.tsx — Challenge config (update once a month)">
{`// Two fields. That's all that changes each month.
const CHALLENGE = {
  currentMonth: 3,
  totalMonths: 12,
  appsShipped: 4,
  year: 2026,
};

// Drives: progress bar width, hero badge copy,
// "4 apps shipped · 9 months remaining" stats strip.`}
          </CodeBlock>

          <p className="leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            The blog launched as part of the same push — it documents how the
            apps get built, which feeds back into the homepage narrative. Posts
            surface on the homepage, the homepage links to the blog. A loop
            instead of a dead end. A site worth returning to.
          </p>
        </section>

        {/* ── AI angle ── */}
        <section id="ai-angle" className="mb-12">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            How AI-assisted development shaped every decision
          </h2>
          <p className="leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
            I started this project using Gemini and a vibe coding approach —
            describe what I want, accept what comes back, move fast. That got
            v1 live. It also meant no brand, no architecture, no SEO, and no
            real system holding it together.
          </p>
          <p className="leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
            The switch to Claude and the shift to agentic engineering changed the
            output quality dramatically. The v2 redesign was the first real test:
            I provided the full codebase as context, a written spec of what I
            wanted, and let Claude run as an autonomous agent across the session.
            The component output was consistent, correctly wired up, and matched
            the spec. What it couldn&apos;t do was make brand judgments —
            because I hadn&apos;t given it the brand as context. The indigo
            situation taught me that.
          </p>
          <p className="leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
            For the SEO and security audit work, I used a two-phase approach: an
            AI session to produce a written plan first, then a human review, then
            a separate AI session to implement what was approved. This
            plan-then-implement pattern kept me in control of direction without
            having to do the execution work myself. It also caught two
            suggestions I disagreed with before they touched the codebase.
          </p>
          <p className="leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
            The v3 pivot — journey-first homepage — was co-authored in the truest
            sense. The idea was mine; I&apos;d been thinking about why the site
            felt like a dead end. Claude helped me translate it into a structural
            change: what to remove, what to add, how to isolate the challenge
            data into a config object so updating it each month takes two seconds
            instead of a structural edit.
          </p>

          <Callout variant="insight" icon="💡" label="What I noticed">
            The biggest shift wasn&apos;t the tool — it was learning to treat
            the AI as an engineer I&apos;m delegating to, not a search box
            I&apos;m prompting. That means writing proper context, reviewing
            plans before execution, and knowing which decisions require my
            judgment vs. which ones I can hand off. Agentic engineering
            isn&apos;t about doing less. It&apos;s about directing better.
          </Callout>
        </section>

        {/* ── Takeaways ── */}
        <section id="takeaways" className="mb-6">
          <h2 className="text-2xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>
            Key takeaways
          </h2>

          <TakeawayCard number={1} title="Ship the embarrassing v1">
            <p>
              I was proud of v1 when it launched. Looking at it now, I can see
              all the gaps — no brand, no SEO, default-blue everything. But that
              pride was correct at the time because it was real and live. You
              learn what you actually want by shipping something, not by planning
              forever. The card grid had to exist before the showcase redesign
              made sense.
            </p>
          </TakeawayCard>

          <TakeawayCard number={2} title="Write the brand doc before the first design session">
            <p>
              Two &quot;indigo to cyan&quot; commits on the same day is a lesson
              I won&apos;t repeat. Before any design-heavy agentic session now, I
              include a brand reference in the context window. The model uses the
              right colors the first time. A one-page brand document saves
              same-day fix commits.
            </p>
          </TakeawayCard>

          <TakeawayCard number={3} title="Vibe coding gets you started; agentic engineering gets you somewhere">
            <p>
              Vibe coding got v1 live. Agentic engineering produced a
              professional redesign, a proper component library, structured data,
              CSP headers, and a real SEO strategy. The difference is the
              upfront context you provide and the autonomy you grant. Learn the
              distinction early — it compounds.
            </p>
          </TakeawayCard>

          <TakeawayCard number={4} title="Plan-then-implement beats unconstrained agentic runs for complex work">
            <p>
              For feature work with a clear spec, letting the AI run works well.
              For audits, SEO, or anything touching shared infrastructure, produce
              a written plan first. Review it. Strike out what you disagree with.
              Then execute. The checkpoint costs 10 minutes and protects you from
              implementing the wrong direction across 20 files.
            </p>
          </TakeawayCard>

          <TakeawayCard number={5} title="A portfolio has no reason to return. A journey does.">
            <p>
              The v2 homepage answered &quot;what is this?&quot; The v3 homepage
              answers &quot;why come back?&quot; — because more apps are
              shipping, the blog is documenting how, and there&apos;s a
              challenge running you can follow. If your site is a static showcase,
              it has no pull. Give people a reason to check in again next month.
            </p>
          </TakeawayCard>
            <Callout variant="insight" icon="💡" label="Where it's going">
              The 12-apps challenge runs through 2026, but The Helpful Dev
              isn&apos;t ending there. After the challenge wraps I want this to
              be a proper AI-assisted engineering hub — more challenges, more
              rebrands, more honest documentation of what it looks like to build
              real things with AI when you&apos;re not a full-time developer with
              unlimited time. I&apos;m also working on a companion book covering
              the full challenge. Follow along — that&apos;s what the newsletter
              is for.
            </Callout>
        </section>

        {/* ── Footer nav ── */}
        <div className="border-t pt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4" style={{ borderColor: "var(--border-color)" }}>
          <Link
            href="/blog"
            className="text-sm hover:text-cyan-600 transition-colors"
            style={{ color: "var(--text-secondary)" }}
          >
            &larr; Back to Blog
          </Link>
          <Link
            href="/"
            className="text-sm hover:text-cyan-600 transition-colors"
            style={{ color: "var(--text-secondary)" }}
          >
            See the apps &rarr;
          </Link>
        </div>
      </div>
    </main>
  );
}
