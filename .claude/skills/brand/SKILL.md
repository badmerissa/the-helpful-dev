# Skill: Brand Guidelines — The Helpful Dev

Read this file before making any visual or copy changes to the site. It covers colours, typography, voice, component conventions, and ready-to-use CSS patterns.

---

## Identity at a Glance

**The Helpful Dev** is a solo indie developer making free, privacy-first browser tools for everyday life. The brand personality is: *warm and practical, with a nerdy edge*. Think: "a developer friend who built something useful and is quietly proud of it."

---

## Colours

### Core Palette

| Token | Hex | Tailwind | Usage |
|---|---|---|---|
| Brand Cyan | `#0092ae` | `cyan-600` approx | Primary buttons, links, accents |
| Brand Teal | `#00637d` | `cyan-800` approx | Gradient end, darker accents |
| Ice Blue | `#BBE1FA` | — | Logo/illustration highlight |
| Background | `#ffffff` | `white` | Page background |
| Text Primary | `#0f172a` | `slate-900` | Body text, headings |

### Extended Palette (in use via Tailwind)

- **Surfaces:** `slate-50`, `slate-100`, `slate-200` — alternating section backgrounds, cards
- **Muted text:** `slate-400`, `slate-500` — secondary labels, captions
- **Borders:** `slate-100`, `slate-200` — subtle dividers
- **Success:** `green-50`, `green-700`
- **Error:** `red-500`

### Per-App Accent Colours

Each app has a secondary accent colour for use on its own landing page and `AppSpotlight` section. These are **supplements** to the primary cyan — do not replace cyan globally.

| App | CSS Variable | Hex | Tailwind | Personality |
|---|---|---|---|---|
| Fasting Tracker | `--app-fasting` | `#22c55e` | `green-500` | Health, freshness |
| Potty Panda | `--app-potty` | `#f59e0b` | `amber-500` | Playful, warm |
| unvAIl | `--app-unvail` | `#8b5cf6` | `violet-500` | Mystery, AI |
| Timeagotchi | `--app-timeagotchi` | `#f97316` | `orange-500` | Energy, momentum |

**Where to use accent colours:**
- Status badge background/border on the app's own page
- Bullet-point icons or accent lines in `AppSpotlight`
- Section highlight in the app's landing page hero
- **Do not** use on the homepage or in the navbar — those use only cyan/teal

**Usage pattern:**
```html
<!-- Fasting app badge -->
<span class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 border border-green-100 text-green-700 text-sm font-medium">
  LIVE
</span>

<!-- Potty Panda accent line -->
<div class="w-8 h-1 rounded-full bg-amber-400 mb-4"></div>
```

### Gradient

The brand gradient runs at **135°** from `#0092ae` to `#00637d`.

```css
background: linear-gradient(135deg, #0092ae, #00637d);
```

Used for:
- `.gradient-text` (hero headings, emphasis text)
- CTA band background
- OG image backgrounds

**Do not** introduce new gradient directions or colour stops without design review.

---

## Typography

**Font family:** Geist Sans (headings + body), Geist Mono (code snippets only)

Both are served locally — do not add Google Fonts or other CDN font imports.

### Scale in use

| Role | Classes | Notes |
|---|---|---|
| Hero H1 | `text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight` | Max 8 words |
| Section H2 | `text-3xl lg:text-4xl font-bold` | |
| Card H3 | `text-xl font-semibold` | |
| Body large | `text-lg lg:text-xl text-slate-500 leading-relaxed` | Subtitles, intros |
| Body | `text-base text-slate-500` | |
| Labels / caps | `text-sm font-semibold uppercase tracking-wider` | Footer section heads |
| Micro | `text-xs text-slate-400` | Copyright, footnotes |

**Rules:**
- Hero headings use `.gradient-text` on a key phrase only — not the whole heading.
- Sentence case everywhere (not Title Case for marketing copy).
- Maximum one gradient text element per section.

---

## Voice & Tone

**Do:**
- Short, plain sentences. "No login. No data collected. Just stuff that works."
- Lead with the user benefit, not the feature. "Track your fast, not your data."
- Use "you" and "your" — friendly, direct.
- Mention privacy/no-login on every app page.
- Use "free" prominently — it's a key differentiator.

**Don't:**
- No hype words: "revolutionary", "powerful", "seamless", "game-changing"
- No technical jargon on marketing pages (save it for the README)
- Don't say "we" — it's a solo dev. Use "I" or address the reader directly.
- Avoid exclamation marks except sparingly (1 max per section)

### Privacy line (required on all app pages)
```
No login. No data collected. [App] works entirely in your browser.
```
Or a variation of: "Your data stays local."

---

## Logo

The logo (`/logo.svg`) is an **animated cyberpunk coffee mug** with:
- A glitch/RGB-split animation on a 4.5s loop
- "THD" flickering text on the mug body
- Steam rising from the mug on a 2.2s loop
- Colours: cyan body, teal fill, ice-blue (`#BBE1FA`) highlights

**Usage rules:**
- Full logo (with mug): hero, footer wordmark, social/OG images
- Icon-only mode (small sizes): favicon, 28px footer icon
- Do not recolour the logo
- Do not crop or overlay text on the mug
- Minimum display size: 28×28px (icon mode), 80px wide (full logo)

---

## Component Conventions

### Buttons

Primary:
```html
px-6 py-3 rounded-lg bg-cyan-600 text-white font-semibold hover:bg-cyan-700 transition-colors text-sm
```

Secondary (ghost):
```html
px-6 py-3 rounded-lg border border-slate-300 text-slate-700 font-semibold hover:border-cyan-400 hover:text-cyan-600 transition-colors text-sm
```

Link-style:
```html
text-cyan-600 hover:text-cyan-700 underline underline-offset-2
```

### Status Badge

Default (cyan — for homepage):
```html
inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-100 text-cyan-700 text-sm font-medium
```

With pulse dot:
```html
<span class="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
```

Per-app variant (use on the app's own landing page):
```html
<!-- Green for Fasting -->
inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 border border-green-100 text-green-700 text-sm font-medium

<!-- Amber for Potty Panda -->
inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-sm font-medium

<!-- Violet for unvAIl -->
inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 border border-violet-100 text-violet-700 text-sm font-medium

<!-- Orange for Timeagotchi -->
inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-100 text-orange-700 text-sm font-medium
```

### Section Alternation

App spotlight sections alternate white and `slate-50` backgrounds. The `AppSpotlight` component handles this — do not override the background manually.

### Cards / Panels

Standard:
```html
bg-slate-50 rounded-2xl border border-slate-200 shadow-xl p-6
```

Interactive (add `.card-hover` from `globals.css`):
```html
bg-slate-50 rounded-2xl border border-slate-200 shadow-xl p-6 card-hover
```

### Borders / Dividers

Between sections: `border-b border-slate-100` or `border-b border-slate-200` (slightly heavier for major section breaks).

---

## Brand Utility Classes (globals.css)

These utility classes are defined in `app/globals.css`. Use them instead of writing inline styles.

### `.gradient-text`
Applies the brand gradient as text fill. Use on a key phrase in a heading.
```tsx
<h1 className="text-4xl font-bold tracking-tight">
  Apps built to <span className="gradient-text">actually help.</span>
</h1>
```

### `.card-hover`
Lifts the card on hover with a subtle cyan-tinted shadow. Use on any interactive card or spotlight section.
```tsx
<div className="bg-slate-50 rounded-2xl border border-slate-200 shadow-xl p-6 card-hover">
  ...
</div>
```
CSS defined as:
```css
.card-hover {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.card-hover:hover {
  transform: translateY(-3px);
  box-shadow: 0 24px 48px -12px rgba(0, 146, 174, 0.18);
}
```

### `.texture-dots`
Subtle dot-grid pattern using brand cyan at very low opacity. Use on hero sections or alternate section backgrounds to add visual depth.
```tsx
<section className="bg-slate-50 texture-dots py-20">
  ...
</section>
```
Works best on `slate-50` or `white` backgrounds.

### `.gradient-cta`
Enhanced version of the CTA band gradient — adds a radial highlight for depth. Use instead of manual `bg-gradient-to-br from-cyan-400 to-cyan-800` on full-width CTA sections.
```tsx
<section className="gradient-cta text-white py-20 px-6">
  ...
</section>
```

### `.hero-grid`
Fine grid line pattern for hero section backgrounds. Adds subtle depth without competing with content.
```tsx
<section className="hero-grid py-24">
  ...
</section>
```
Use on the homepage hero and app page heroes. Always ensure text contrast remains high.

### `.animate-fade-up`
Entrance animation: content fades in while sliding up 16px. Use on hero headings, card grids, or key sections.
```tsx
<h1 className="text-5xl font-bold animate-fade-up">
  ...
</h1>
```
Note: This is a CSS animation, not a scroll-triggered one. For scroll-triggered, you'll need a client-side intersection observer.

---

## Visual Depth: Approved Techniques

The brand is intentionally clean, but "flat" is a bug. These techniques add depth without sacrificing simplicity:

### 1. Layered shadows
Prefer `shadow-xl` over `shadow-md` for cards. Add a second, wider shadow for focal elements:
```html
shadow-xl shadow-cyan-100
```

### 2. Gradient borders
Use a gradient border for key callout boxes:
```tsx
<div className="rounded-2xl p-px bg-gradient-to-br from-cyan-400 to-cyan-800">
  <div className="rounded-2xl bg-white p-6">
    {/* content */}
  </div>
</div>
```

### 3. Dot-grid + gradient overlay
Combine texture with a gradient fade for hero sections:
```tsx
<section
  className="hero-grid relative overflow-hidden"
  style={{
    background: "linear-gradient(180deg, rgba(255,255,255,0) 0%, #fff 90%)",
  }}
>
```

### 4. Stats strip visual weight
The stats strip benefits from a slight border and subtle top gradient to separate it from the hero:
```tsx
<div className="border-t border-b border-slate-100 bg-gradient-to-b from-slate-50 to-white py-10">
```

### 5. CTA band radial highlight
Already in `.gradient-cta`. The key is the `::before` pseudo-element adding a radial glow.

---

## Do Not

- Do not add dark mode — the site is intentionally light-only
- Do not add new fonts
- Do not use `unsafe-inline` in CSP (see CLAUDE.md Security section)
- Do not use red except for error/destructive states
- Do not use `font-black` or very thin weights — the Geist variable font supports it but it's off-brand
- Do not animate large layout elements — subtle pulses and transitions only
- Do not use per-app accent colours on the homepage navigation or global chrome
- Do not use more than one `.texture-dots` section per page (visually noisy)

---

## Brand Improvement Roadmap

These are approved directions for future visual enhancement. Reference `brand-guidelines.html` for mockups:

1. **Per-app accent colours** ✓ *(defined above — implement on app-specific pages)*
2. **Subtle section texture** ✓ *(`.texture-dots` utility — use on hero and alternating sections)*
3. **Card hover lift** ✓ *(`.card-hover` utility — add to `AppSpotlight` and feature cards)*
4. **Richer CTA band** ✓ *(`.gradient-cta` utility — replace flat gradient with radial-enhanced version)*
5. **Hero grid pattern** ✓ *(`.hero-grid` utility — subtle depth for homepage hero)*
6. **App icon consistency** — Unify app icons into a coherent system: rounded-square container, consistent padding, same illustration style. Not yet implemented.
7. **Scroll entrance animations** — Intersection Observer + `.animate-fade-up` on cards as they enter viewport. Currently `.animate-fade-up` fires on load only.
8. **Animated stat counters** — Count-up animation on the stats strip numbers. Requires a Client Component.
