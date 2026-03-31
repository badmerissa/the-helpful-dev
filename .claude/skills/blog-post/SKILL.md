# Skill: Write a Blog Post

Use this skill whenever you're creating a new blog post for The Helpful Dev. These posts document real lessons learned while building the apps — honest, code-heavy, useful. Follow every step in order.

---

## The Goal

Each post should feel like a senior dev sharing war stories over coffee: what they built, what they tried, what blew up, and what they'd do differently. Posts must include concrete code snippets and real takeaways. They are not marketing copy — they are genuine technical narratives.

Every post should also surface naturally in AI-related search traffic. The apps are built with AI assistance, so the posts should honestly discuss that. Weave in relevant AI/LLM terminology where it genuinely fits (see §7 below).

---

## Step 1 — Gather content before writing any code

Answer these questions before touching any files:

- **App name** — which app is this post about?
- **Slug** — e.g. `building-fasting-tracker` (kebab-case, no `/blog/` prefix)
- **Title** — specific and benefit-driven. Not "How I built X" but "The thing that kept breaking in X — and how I finally fixed it."
- **Description** — one compelling sentence, under 160 chars, benefit-first.
- **Read time** — estimate after drafting (format: `"8 min read"`)
- **Tags** — 2–3 tags from the approved list below, or propose new ones.
- **Core narrative** — what is the main thing the post is about? One sentence.
- **3–5 concrete things that happened** — what worked, what didn't, what surprised you.
- **2–3 code snippets** — actual code (or pseudocode) that illustrates a key point.

### Approved tags (use existing tags where they fit; propose new ones sparingly)

`"App Development"`, `"AI Development"`, `"Workflow"`, `"Next.js"`, `"React"`, `"TypeScript"`, `"Performance"`, `"Testing"`, `"PWA"`, `"Accessibility"`, `"UX"`, `"Debugging"`, `"State Management"`, `"LLM"`, `"Prompt Engineering"`

---

## Step 2 — Register the post in `lib/blog-data.ts`

Add the new post **at the top** of the `posts` array (newest first):

```ts
{
  slug: "building-fasting-tracker",
  title: "Your Full Post Title Here",
  description: "One compelling sentence under 160 chars.",
  date: "2026-04-15",          // ISO date: when the post will be published
  readTime: "9 min read",      // estimate after drafting
  tags: ["App Development", "AI Development"],
},
```

---

## Step 3 — Create the page file

Create `app/blog/<slug>/page.tsx`. This is a **Server Component** — no `"use client"` directive.

### 3a. File header — metadata + JSON-LD

```tsx
import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/app/components/JsonLd";

export const metadata: Metadata = {
  title: "Your Post Title — The Helpful Dev",
  description: "One compelling sentence under 160 chars.",
  alternates: {
    canonical: "https://thehelpfuldev.com/blog/<slug>",
  },
  openGraph: {
    title: "Your Post Title",
    description: "Short version for social cards.",
    url: "https://thehelpfuldev.com/blog/<slug>",
  },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "Your Post Title",
  description: "One compelling sentence.",
  datePublished: "2026-04-15",   // ISO date, matches blog-data.ts
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
  url: "https://thehelpfuldev.com/blog/<slug>",
  mainEntityOfPage: "https://thehelpfuldev.com/blog/<slug>",
};
```

### 3b. Inline sub-components (copy from existing post, keep consistent)

Define these **above** the page component in the same file. Do not extract them to `app/components/` unless they will be used across multiple posts.

```tsx
/* ─── Reusable sub-components ─────────────────────────────────────── */

// Callout — key insight, tip, warning, or general insight box
function Callout({ variant, icon, label, children }: {
  variant: "key" | "insight" | "tip" | "warn";
  icon: string;
  label: string;
  children: React.ReactNode;
}) {
  const styles = {
    key:     "bg-cyan-50 border border-cyan-200",
    insight: "bg-slate-50 border border-slate-200",
    tip:     "bg-green-50 border border-green-200",
    warn:    "bg-amber-50 border border-amber-200",
  };
  const labelStyles = {
    key:     "text-cyan-700",
    insight: "text-cyan-600",
    tip:     "text-green-700",
    warn:    "text-amber-700",
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

// CodeBlock — for code snippets with a language/filename label
function CodeBlock({ label, children }: { label: string; children: React.ReactNode }) {
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

// BeforeAfter — show a bad approach vs the fix side by side
function BeforeAfter({ before, after, beforeLabel = "Before", afterLabel = "After (the fix)" }: {
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

// TakeawayCard — a numbered lesson at the end of a section
function TakeawayCard({ number, title, children }: {
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
```

### 3c. Page component structure

```tsx
export default function YourPostPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <JsonLd data={articleJsonLd} />

      {/* ── Hero ── */}
      <section className="border-b border-slate-100 bg-white">
        <div className="max-w-3xl mx-auto px-6 py-14 lg:py-20">
          {/* Breadcrumb */}
          <div className="flex items-center gap-3 mb-6 text-sm text-slate-400">
            <Link href="/" className="hover:text-cyan-600 transition-colors">The Helpful Dev</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-cyan-600 transition-colors">Blog</Link>
          </div>
          {/* Category pill */}
          <div className="mb-5">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-100 text-cyan-700 text-sm font-medium">
              App Development · AI Development
            </span>
          </div>
          {/* Title — use gradient-text on ONE key phrase */}
          <h1 className="text-3xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-tight mb-5">
            The Thing That Kept Breaking in{" "}
            <span className="gradient-text">Fasting Tracker</span>{" "}
            — and How I Fixed It
          </h1>
          {/* Standfirst */}
          <p className="text-lg text-slate-500 leading-relaxed mb-6 max-w-2xl">
            Two sentences that expand the title and make a specific promise about what the reader will learn.
          </p>
          {/* Byline */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
            <span>April 15, 2026</span>
            <span>·</span>
            <span>9 min read</span>
            <span>·</span>
            <span>Intermediate</span>   {/* Beginner / Intermediate / Advanced */}
          </div>
        </div>
      </section>

      {/* ── Article body ── */}
      <div className="max-w-3xl mx-auto px-6 pb-20">

        {/* Table of Contents — always include */}
        <nav className="bg-slate-50 border border-slate-200 rounded-2xl px-7 py-6 my-10">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">In this post</h3>
          <ol className="space-y-2 pl-5 list-decimal">
            {[
              ["#context",   "What I was building"],
              ["#problem",   "The problem"],
              ["#attempt-1", "First attempt — what I tried"],
              ["#what-broke","What broke and why"],
              ["#solution",  "The fix"],
              ["#ai-angle",  "How AI shaped the approach"],
              ["#takeaways", "Key takeaways"],
            ].map(([href, label]) => (
              <li key={href}>
                <a href={href} className="text-sm text-slate-700 hover:text-cyan-600 transition-colors">{label}</a>
              </li>
            ))}
          </ol>
        </nav>

        {/* ── Article sections (see §4 below for writing guidance) ── */}

      </div>
    </main>
  );
}
```

---

## Step 4 — Writing the article body

### Narrative structure

Use this structure for every app post. Adapt section headings freely — the structure is the skeleton, not the script.

**1. What I was building** (`id="context"`)
One paragraph of context. What is the app, what problem does it solve, who uses it. Keep it tight — readers care about the lesson, not the sales pitch.

**2. The problem** (`id="problem"`)
The specific technical challenge. Be concrete: not "performance was bad" but "the fasting timer was drifting by 2–3 seconds per minute on low-power Android devices." Name the constraint.

**3. First attempt** (`id="attempt-1"`)
What you tried first. Include the actual code. Use `<CodeBlock>` for anything 5+ lines. Be honest about why it seemed reasonable — this builds trust with the reader.

**4. What broke and why** (`id="what-broke"`)
What went wrong. Use `<BeforeAfter>` if comparing old vs new code is the clearest way to show it. Use `<Callout variant="warn">` for gotchas that might bite others.

**5. The fix** (`id="solution"`)
The actual solution, with code. If there were multiple attempts, briefly mention them and focus on what finally worked. Use `<Callout variant="tip">` for non-obvious tricks.

**6. How AI shaped the approach** (`id="ai-angle"`)
This section is **required for every post**. Discuss honestly how using an AI coding assistant (Claude or otherwise) affected the development. Did it help you find the bug faster? Did it suggest the wrong approach first? Did it write a test that caught something you'd missed? This is where the AI/LLM keywords live naturally. See §7 for the vocabulary.

**7. Key takeaways** (`id="takeaways"`)
3–5 `<TakeawayCard>` components, each with a numbered lesson and 2–3 sentences of explanation. These should be skimmable and self-contained.

---

### Writing voice

- **First person, past tense** — "I found that…", "This broke because…"
- **Honest about failures** — readers trust specificity over positivity
- **No hedging on facts** — "this is slower because X" not "this might be slower"
- **Conversational but precise** — contractions are fine; vague adjectives are not
- **Short paragraphs** — 2–4 sentences max
- **One idea per paragraph**

### What to avoid

- Do not retell the app's marketing copy — the reader found this post via search, not the homepage
- Do not claim AI wrote everything perfectly first time — readers know that's not true and it destroys credibility
- Do not pad length — if a section is done in 2 sentences, stop there
- Do not use `<h1>` inside the body — the hero section owns the `<h1>`
- Do not skip the "AI angle" section — it's both honest and good for SEO

---

## Step 5 — Code snippets

### Rules for code blocks

- Use `<CodeBlock label="TypeScript">` for all code 5+ lines
- Label should be the language or filename: `"TypeScript"`, `"hooks/useFastingTimer.ts"`, `"CSS"`, `"Shell"`, `"JSON"`
- Inline code references in prose: wrap in `<code className="bg-slate-100 px-1.5 py-0.5 rounded text-sm font-mono text-slate-800">...</code>`
- Use `<BeforeAfter>` for before/after comparisons — avoid describing the diff in prose when code shows it better
- Trim code to the relevant part — don't paste 80-line files; show the 10 lines that matter

### Code quality

- Code snippets must be accurate and runnable (or clearly labeled as pseudocode)
- Include type annotations where they make the snippet clearer
- If the snippet imports from a project path, use the `@/` alias convention

---

## Step 6 — Checklist before committing

- [ ] Post registered in `lib/blog-data.ts` (newest first, correct ISO date)
- [ ] `app/blog/<slug>/page.tsx` created
- [ ] Metadata exported: `title`, `description`, `canonical`, `openGraph`
- [ ] `articleJsonLd` defined and `<JsonLd data={articleJsonLd} />` rendered
- [ ] Breadcrumb: The Helpful Dev → Blog → (post title is the H1)
- [ ] `gradient-text` used on exactly **one** key phrase in the H1
- [ ] Category pill matches post tags
- [ ] TOC present with correct anchor IDs
- [ ] "How AI shaped the approach" section included
- [ ] At least **2 code snippets** using `<CodeBlock>`
- [ ] At least **3 `<TakeawayCard>` items** at the end
- [ ] `<Callout>` used at least once (insight, tip, or warning)
- [ ] Read time estimate is updated to match actual draft length
- [ ] `npm run lint` passes
- [ ] `npm run build` succeeds (catches metadata type errors)

---

## Step 7 — AI / LLM keyword vocabulary

Weave these terms in **where they are genuinely true**. Do not stuff them — one or two per section is plenty. The goal is natural discoverability, not a keyword list.

### High-value terms for this site's audience

| Term | When to use it |
|---|---|
| AI-assisted development | When describing the overall development approach |
| LLM (large language model) | When referring to the underlying model technically |
| prompt engineering | When you crafted a specific prompt to solve a problem |
| context window | When discussing how much information the model could hold at once |
| AI coding assistant | General term for Claude/Copilot/Cursor in the workflow |
| agentic workflow | When Claude took multi-step actions autonomously |
| zero-shot | When the model solved something without prior examples |
| few-shot prompting | When you gave examples before asking for output |
| AI pair programming | When describing the collaborative coding dynamic |
| vibe coding | When describing exploratory, intuition-driven AI-assisted coding |
| hallucination | When the model confidently produced incorrect output |
| context management | When discussing how you kept the AI on track across a long session |
| RAG / retrieval-augmented generation | Only if actually relevant to the app |
| token limit | When you hit context size constraints |
| system prompt | When you configured the assistant's behaviour |

### App-specific search terms to work in naturally

| App | Key terms |
|---|---|
| Fasting Tracker | intermittent fasting app, fasting timer, IF tracker, 16:8 fasting, fasting window |
| Potty Panda | potty training app, toddler toilet training, reward chart app, potty training tracker |
| unvAIl | AI word game, daily word puzzle, LLM word game, Wordle alternative, AI-generated puzzle |
| Timeagotchi | productivity app, time tracking, gamified productivity, Tamagotchi timer, focus timer |

---

## Step 8 — Sitemap

Blog posts are **not** currently auto-generated in the sitemap via `lib/blog-data.ts`. Add each new post manually to `app/sitemap.ts`:

```ts
{ url: "https://thehelpfuldev.com/blog/<slug>", lastModified: new Date("2026-04-15") },
```

---

## Reference: component quick-pick

| Situation | Component |
|---|---|
| Key insight the reader must not miss | `<Callout variant="key" icon="🔑" label="Key insight">` |
| General "interesting" observation | `<Callout variant="insight" icon="💡" label="What I noticed">` |
| Practical trick the reader can steal | `<Callout variant="tip" icon="✅" label="Pro tip">` |
| Gotcha that will bite others | `<Callout variant="warn" icon="⚠️" label="Watch out">` |
| Code snippet (5+ lines) | `<CodeBlock label="TypeScript">` |
| Before / after code comparison | `<BeforeAfter before={...} after={...} />` |
| Numbered lesson at end of post | `<TakeawayCard number={1} title="Lesson title">` |
