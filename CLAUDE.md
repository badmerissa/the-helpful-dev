# CLAUDE.md

This file provides guidance to Claude when working with code in this repository.

## Commands

```bash
npm run dev          # Start development server (localhost:3000)
npm run build        # Production build
npm run lint         # ESLint
npm run test         # Vitest unit tests (single run)
npm run test:watch   # Vitest in watch mode
npm run test:coverage # Vitest with coverage report
npm run e2e          # Playwright E2E tests (requires built app)
npm run e2e:ui       # Playwright with interactive UI
npm run analyze      # Bundle size analysis (set ANALYZE=true)
```

Run a single unit test file:
```bash
npx vitest run __tests__/Navbar.test.tsx
```

Run a single Playwright spec:
```bash
npx playwright test e2e/smoke.spec.ts --project=chromium
```

## Skills Available

Read the appropriate skill file **before** starting any task in these areas:

| Task | Skill file |
|---|---|
| Adding a new app to the portfolio | `.claude/skills/add-app/SKILL.md` |
| Any visual or copy change | `.claude/skills/brand/SKILL.md` |
| Adding a new shared component | `.claude/skills/new-component/SKILL.md` |
| Shipping a new page | `.claude/skills/seo-checklist/SKILL.md` |
| Writing a blog post | `.claude/skills/blog-post/SKILL.md` |

If you skip reading the relevant skill, you will likely miss required steps (SEO metadata, privacy copy, test coverage, brand rules).

---

## Before You Code

For any non-trivial change, run through this checklist mentally before writing code:

1. **Does a skill cover this task?** Check the table above.
2. **Is `lib/app-data.ts` the right place to start?** For any new app or page referencing app metadata — yes.
3. **Is this a blog post?** Read `.claude/skills/blog-post/SKILL.md` first, then register in `lib/blog-data.ts` before writing any page code.
4. **Does this need a new route?** If so, check `lib/nav.ts` and `app/sitemap.ts` too.
5. **Will this render inline scripts?** If yes, get the CSP nonce from `headers().get('x-nonce')` in the Server Component.
6. **Is this a visual change?** Read `.claude/skills/brand/SKILL.md` first.
7. **Does this need a unit test?** Almost always yes — see Testing section.

---

## Architecture

**Next.js App Router** portfolio/landing site for an indie developer showcasing free web apps.

### Key Data Flow

- `lib/app-data.ts` — **single source of truth** for all app metadata and JSON-LD schemas. Any new app must be added here first. Referenced by individual app pages and the sitemap.
- `lib/nav.ts` — navigation categories and links shared between `Navbar` and footer. Add new categories here.
- `app/layout.tsx` — root layout: Geist fonts, Vercel Analytics/Speed Insights, CSP nonce (from middleware), cookie consent, skip-to-content.
- `proxy.ts` (middleware) — generates a per-request nonce and injects CSP headers. The nonce is forwarded via `x-nonce` header.

### Blog

Blog posts live under `app/blog/<slug>/page.tsx`. Post metadata (title, date, tags, read time) is registered in `lib/blog-data.ts` — always update there first, newest post at the top.

**Post structure:** Each post is a self-contained Server Component with an inline set of sub-components (`Callout`, `CodeBlock`, `BeforeAfter`, `TakeawayCard`). Do not extract these to `app/components/` unless two or more posts need them. The `claude-workflow` post is the canonical reference implementation.

**Voice:** First-person, past tense, honest about failures. Every post must include a section on how AI/LLM tooling shaped the development process — this is both genuine and good for search visibility.

**SEO:** Blog posts need a `metadata` export (title, description, canonical, OpenGraph) and a `BlogPosting` JSON-LD schema. They are **not** auto-included in the sitemap — add each post manually to `app/sitemap.ts`.

Before writing any blog post, read `.claude/skills/blog-post/SKILL.md` in full.

---

### Adding a New App

Use the `add-app` skill (`.claude/skills/add-app/SKILL.md`) for step-by-step guidance. The short version:

1. Add the app's JSON-LD schema to `lib/app-data.ts`
2. Add a nav entry to `lib/nav.ts` if it introduces a new category
3. Create `app/app/<name>/page.tsx` (copy an existing app page as a template)
4. Add an `AppSpotlight` block to `app/page.tsx`
5. Add icons/assets to `public/`
6. Write unit tests in `__tests__/` and a smoke E2E spec in `e2e/`
7. If the app is external, add a 308 redirect in `next.config.ts`

### Adding a New Shared Component

Use the `new-component` skill (`.claude/skills/new-component/SKILL.md`). Quick rules:

- All shared components go in `app/components/`
- Default to **Server Component** — add `"use client"` only if you need interactivity or browser APIs
- Props interface in the same file unless it needs to be shared
- Write at least one unit test in `__tests__/ComponentName.test.tsx`
- Export a named interface `ComponentNameProps` for discoverability

### Security / CSP Pattern

Inline scripts **must** use the nonce from `headers().get('x-nonce')`. The middleware (`proxy.ts`) injects the nonce into CSP on every request.

- **Never** add `unsafe-inline` to `script-src`.
- `JsonLd.tsx` uses `dangerouslySetInnerHTML` — **only ever pass static, hardcoded objects** to it. Never pass user-controlled data.
- The nonce is only available in Server Components. Do not attempt to read it in Client Components.

### Styling Conventions

This project uses **Tailwind CSS v4** (not v3). All customisation is in `app/globals.css` via CSS variables:

```css
--brand-gradient-from: #0092ae;   /* bright cyan */
--brand-gradient-to:   #00637d;   /* deep teal   */
--bg-base:             #ffffff;
--text-primary:        #0f172a;
```

The `.gradient-text` utility applies the brand gradient to text — use it for hero headings and emphasis.

**Per-app accent colours** (use on the respective app's page and spotlight section):

| App | CSS variable | Tailwind approx | Notes |
|---|---|---|---|
| Fasting Tracker | `--app-fasting` `#22c55e` | `green-500` | Health/wellness |
| Potty Panda | `--app-potty` `#f59e0b` | `amber-500` | Playful/warm |
| unvAIl | `--app-unvail` `#8b5cf6` | `violet-500` | Mystery/AI |
| Timeagotchi | `--app-timeagotchi` `#f97316` | `orange-500` | Energy/productivity |

**Colour palette in use:**
- Cyan: `cyan-50` through `cyan-800` (primary brand)
- Slate: `slate-50` through `slate-900` (text, backgrounds, borders)
- Status colours: `green-*` (success), `red-500` (error)

Do **not** add new Tailwind colours without updating `globals.css`. Keep the palette consistent.

**Fonts:** Geist Sans (`--font-geist-sans`) and Geist Mono (`--font-geist-mono`) — served locally from the npm package, not from Google Fonts.

**Brand utility classes** (defined in `globals.css`):

| Class | Use |
|---|---|
| `.gradient-text` | Gradient fill on a key phrase in headings |
| `.card-hover` | Lift-and-shadow on hover for interactive cards |
| `.texture-dots` | Subtle dot-grid background for hero/section depth |
| `.gradient-cta` | Enhanced CTA band with radial highlight overlay |
| `.hero-grid` | Fine grid pattern for hero background depth |
| `.animate-fade-up` | Entrance animation (opacity + translateY) |

### Component Patterns

All shared components live in `app/components/`. Prefer Server Components; only use `"use client"` when you need interactivity or browser APIs.

Key components:
- `AppSpotlight` — alternating left/right section for each app. Props: `icon`, `status`, `title`, `tagline`, `description`, `bullets`, `href`, `ctaLabel`, `previewContent`, optional `reverse`.
- `AppPreview` — iframe wrapper with 4-second timeout fallback (some browsers silently block iframes).
- `NewsletterForm` — ConvertKit form with retry/exponential backoff, `variant` prop (`"dark"` | `"light"`).
- `JsonLd` — structured data injection. **Static objects only.**

### Page Structure (App Pages)

Each app under `app/app/<name>/` is a standalone marketing/landing page:
- Import schema from `lib/app-data.ts`
- Include `<JsonLd data={...} />` for structured data
- Export a `metadata` object for SEO
- Add an `opengraph-image.tsx` at the route level for social cards

### Routing

- `/app/fasting` permanently redirects (308) to `https://fasting.thehelpfuldev.com/` via `next.config.ts`
- Other app pages render locally under `/app/<name>/`

### SEO Pattern

Every page should export a `metadata` object and include JSON-LD. App-level schemas live in `lib/app-data.ts`. The sitemap (`app/sitemap.ts`) reads from `lib/app-data.ts` — always update there first.

Before shipping any new page, run through `.claude/skills/seo-checklist/SKILL.md`.

### Testing

- **Unit tests** (`__tests__/`): Vitest + jsdom + Testing Library. `describe`/`it`/`expect` are globals — no import needed.
- **E2E tests** (`e2e/`): Playwright. Config auto-builds and starts the server if not running.
- CI order: lint → unit tests → build → E2E (Chromium + Firefox).
- Aim for at least one unit test per new component and one E2E smoke spec per new page.

### Environment Variables

- `NEXT_PUBLIC_CONVERTKIT_FORM_ID` — ConvertKit newsletter form ID (defaults to `"8957581"` if unset)
- `ANALYZE=true` — enables bundle size analysis at build time

---

## Common Pitfalls

These are the most frequent mistakes when working in this codebase. Check before committing.

### Tailwind v4 ≠ v3
This project uses **Tailwind v4**. Key differences:
- No `tailwind.config.ts` — all custom tokens go in `app/globals.css` under `@theme`
- Arbitrary values work the same: `bg-[#0092ae]`
- Plugins are PostCSS plugins, not `tailwind.config.ts` plugins
- If a utility class isn't working, check if it's been added to `globals.css` first

### CSP Nonce
- The nonce is **only available in Server Components** via `headers().get('x-nonce')`
- Never try to pass it as a prop through a Client Component boundary
- If you need a nonce in a script, restructure to keep it in a Server Component

### JSON-LD safety
- `JsonLd.tsx` uses `dangerouslySetInnerHTML` — **never** pass anything derived from user input or URL parameters
- All schemas should be static objects defined in `lib/app-data.ts`

### Sitemap
- The sitemap auto-generates from `lib/app-data.ts`. If you add a new page that isn't app-based, add it manually to `app/sitemap.ts`

### Privacy copy
- Every app landing page **must** include the privacy line: `"No login. No data collected. [App] works entirely in your browser."`
- This is a brand requirement, not just nice-to-have

### Adding an app icon
- Icons go in `public/` with kebab-case names: `app-name-icon.png`
- Size: 32×32px (minimum), 64×64px (preferred for retina displays)
- Format: PNG with transparent background

---

## Brand & Visual Identity

Refer to `.claude/skills/brand/SKILL.md` for the full brand guide before making any visual changes. Short summary:

- **Primary:** cyan-to-teal gradient (`#0092ae` → `#00637d`)
- **Logo:** cyberpunk animated coffee mug — do not modify without designer sign-off
- **Voice:** friendly, practical, privacy-first — no jargon, no hype
- Privacy messaging ("No login. No data collected. Just stuff that works.") should appear on every app landing page

---

## File Naming Conventions

- React components: `PascalCase.tsx`
- Pages: `page.tsx` (Next.js App Router convention)
- Utilities/lib: `kebab-case.ts`
- Tests: mirror source path, e.g. `__tests__/Navbar.test.tsx`
- E2E specs: `e2e/<name>.spec.ts`
- Public assets: `kebab-case` (e.g. `f-icon.png`, `pp-icon.png`)

---

## TypeScript

- Use the `@/*` path alias (resolves to project root)
- Avoid `any` — use `unknown` and narrow where needed
- Props interfaces go in the same file as the component unless shared
- Server Component by default; add `"use client"` only when necessary
