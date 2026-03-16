# SEO Optimisation Plan — The Helpful Dev

---

## Audit Summary (Current State)

| Area | Status |
|---|---|
| Title / Description | Minimal — no keywords, no template |
| Open Graph / Twitter Cards | Missing entirely |
| Structured Data (JSON-LD) | Missing entirely |
| `robots.txt` | Missing |
| `sitemap.xml` | Missing |
| Canonical URLs | Missing |
| Image optimisation | Icons are 1–1.3 MB uncompressed |
| Per-app landing pages | None — one route only |
| `<title>` in `<head>` | Duplicates the Metadata API (conflict) |
| `/fasting` redirect | `permanent: false` — incorrect for SEO |
| Hero logo `alt` text | Wrong — reads `"Fasting Tracker"` instead of `"The Helpful Dev"` |
| AdSense script placement | Parser-blocking in `<head>` — suppresses LCP |

---

## Phase 1 — Critical Technical Fixes

**Goal:** Eliminate indexing errors and duplicate signals. Zero new content required.

### 1.1 Fix the duplicate `<title>` tag

`app/layout.tsx` exports a `metadata` object **and** manually renders `<title>The Helpful Dev</title>` inside `<head>` (line 36). Next.js's Metadata API already injects the title tag. The manual `<title>` overrides it and confuses crawlers.

**Fix:** Remove the manual `<title>` from the `<head>` JSX block. Keep only the `metadata` export.

### 1.2 Fix the `/fasting` redirect to `permanent: true`

A temporary redirect (HTTP 302) does not pass PageRank to the destination. The fasting app has a stable URL and should use a permanent redirect (HTTP 301).

**Fix:** In `next.config.ts`, change `permanent: false` → `permanent: true`.

### 1.3 Fix wrong `alt` text on the hero logo

`page.tsx:133` renders the main site logo with `alt="Fasting Tracker"`. This is factually wrong — the image is the The Helpful Dev wordmark. Google uses `alt` text as a keyword signal for image search and as a relevance input.

**Fix:** Change to `alt="The Helpful Dev"`.

### 1.4 Move AdSense script to `next/script` with `strategy="lazyOnload"`

`layout.tsx:31–35` loads the AdSense script as a raw `<script async>` inside a manually rendered `<head>` block. Despite `async`, this is still parser-blocking in practice and will suppress LCP scores — a direct Core Web Vitals penalty and an AdSense RPM drag.

**Fix:** Remove the raw `<script>` from `<head>` and replace with Next.js's `<Script>` component in the `<body>`:

```tsx
import Script from "next/script";

// Inside <body>, after <Navbar />:
<Script
  async
  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7388329784955167"
  strategy="lazyOnload"
  crossOrigin="anonymous"
/>
```

### 1.5 Set `metadataBase`

Without `metadataBase`, Next.js cannot resolve relative URLs in the metadata object — including the favicon auto-generated from `app/icon.png`. This silently breaks favicon resolution and will also be required for the Open Graph image URL in Phase 2.

**Fix:** Add to the `metadata` export in `layout.tsx`:

```ts
metadataBase: new URL("https://thehelpfuldev.com"),
```

### 1.6 Add `robots.ts`

No `robots.txt` exists. Crawlers are operating without guidance.

**Create:** `app/robots.ts` using Next.js's `MetadataRoute.Robots` API:

```ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://thehelpfuldev.com/sitemap.xml",
  };
}
```

### 1.7 Add `sitemap.ts`

No sitemap exists. The homepage is the only current route.

**Create:** `app/sitemap.ts`:

```ts
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://thehelpfuldev.com",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
  ];
}
```

Update this file when Phase 4 app pages are added (see §4.2).

### 1.8 Compress public images

`public/f-icon.png` (~1.3 MB), `public/pp-icon.png`, and `app/icon.png` (~1.2 MB) are oversized. Next.js `<Image>` handles resizing at render time, but the source files bloat the build and LCP metrics.

**Fix:** Run all three through lossless compression (e.g. Squoosh or `sharp`) targeting < 100 KB each before commit. No code changes required.

---

## Phase 2 — Metadata & Social Graph

**Goal:** Ensure every share, link preview, and SERP result shows correct, keyword-rich information.

### 2.1 Upgrade root `metadata` in `layout.tsx`

The current description is 46 characters and keyword-free. Rewrite to:

- **Title:** Use the `{ default, template }` object form — this is required for the brand suffix to apply to child pages (Phase 4) without the root page becoming self-referential:

```ts
title: {
  default: "The Helpful Dev | Free Privacy-First Web Apps",
  template: "%s | The Helpful Dev",
},
```

- **Description:** ~155 chars covering the value prop + key apps + privacy angle, e.g. _"Free browser-based tools for intermittent fasting, potty training, and daily games. No login. No data collected. Built by an indie dev."_

- **Keywords:** `fasting tracker, potty training app, AI image game, privacy tools, free web apps` — note: Google has ignored `<meta name="keywords">` since 2009. This field carries no Google ranking weight. It has minimal value on Bing. Include it for completeness but do not weight it as an SEO lever.

### 2.2 Add Open Graph tags

Without OG tags, every shared link shows a blank preview.

**Dependency:** A 1200×630 `/public/og-image.png` (site logo + tagline on brand background) must be created before this phase can be deployed. This is a design task — treat it as a gate.

```ts
openGraph: {
  type: "website",
  url: "https://thehelpfuldev.com",
  siteName: "The Helpful Dev",
  title: "The Helpful Dev | Free Privacy-First Web Apps",
  description: "...",
  images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "The Helpful Dev — free privacy-first web apps" }],
},
```

### 2.3 Add Twitter Card tags

```ts
twitter: {
  card: "summary_large_image",
  title: "The Helpful Dev | Free Privacy-First Web Apps",
  description: "...",
  images: ["/og-image.png"],
},
```

### 2.4 Add canonical URL

```ts
alternates: {
  canonical: "https://thehelpfuldev.com",
},
```

Prevents duplicate content issues if the site is ever accessible at both `www.` and non-`www.` variants.

---

## Phase 3 — Structured Data (JSON-LD)

**Goal:** Earn rich results in Google Search and establish entity relationships between the hub and each app.

### 3.1 `WebSite` schema on the homepage

Signals to Google that this is the canonical home of the "The Helpful Dev" entity.

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "The Helpful Dev",
  "url": "https://thehelpfuldev.com",
  "description": "Free browser-based tools for intermittent fasting, potty training, and daily games. No login. No data collected."
}
```

> **Note:** Do not include `potentialAction: { "@type": "SearchAction" }` unless the site has a functional search endpoint. A `SearchAction` without a valid `target` URL template is invalid structured data and will fail Google's Rich Results Test, which is worse than omitting it.

### 3.2 `SoftwareApplication` schema per app

Each `AppSpotlight` section covers a distinct app. Add inline JSON-LD for all four:

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Intermittent Fasting Tracker",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Web",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "url": "https://fasting.thehelpfuldev.com/",
  "description": "..."
}
```

Apply the same structure to **Potty Panda**, **unvAIl**, and **Timeagotchi** — all four are live apps and all four should have schema entries.

> **Note:** Star ratings in search results require an `aggregateRating` property. Without it, Google will not render stars for these entries. Pricing and category signals will still be present.

**Implementation:** Add a `<Script id="json-ld" type="application/ld+json">` block inside `page.tsx`, or create a reusable `JsonLd` component that `AppSpotlight` accepts as a prop.

### 3.3 `Organization` schema

Establishes the publisher entity:

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "The Helpful Dev",
  "url": "https://thehelpfuldev.com",
  "logo": "https://thehelpfuldev.com/icon.png",
  "sameAs": ["https://ko-fi.com/robogirl96"]
}
```

---

## Phase 4 — Content & Internal Link Architecture

**Goal:** Give crawlers more to index and build topical authority around each app's niche.

### 4.1 Create individual app landing pages

Each app currently lives on an external subdomain with no crawlable route on the hub. Adding `/app/fasting`, `/app/potty-panda`, `/app/unvail`, and `/app/timeagotchi` routes creates:

- Indexable pages targeting long-tail keywords (e.g. _"intermittent fasting timer no login"_)
- Internal links from the homepage to these routes
- A place to add full JSON-LD, meta descriptions, and FAQ sections per app

Each page should match the existing `AppSpotlight` visual style and include:

- H1 with the app name + primary keyword
- Benefits copy (800–1,500 words — 300 words is a minimum floor, not a target, for competitive niches)
- FAQ section (targets featured snippet format)
- CTA linking to the live app

> **Note:** Timeagotchi is a live app and must be included alongside the other three. Omitting it from this phase would leave an inconsistent content structure.

### 4.2 Update `sitemap.ts` to include app pages

Once Phase 4.1 routes exist, add each to the sitemap:

```ts
{ url: "https://thehelpfuldev.com", priority: 1.0, changeFrequency: "monthly" },
{ url: "https://thehelpfuldev.com/app/fasting", priority: 0.8, changeFrequency: "monthly" },
{ url: "https://thehelpfuldev.com/app/potty-panda", priority: 0.8, changeFrequency: "monthly" },
{ url: "https://thehelpfuldev.com/app/unvail", priority: 0.8, changeFrequency: "monthly" },
{ url: "https://thehelpfuldev.com/app/timeagotchi", priority: 0.8, changeFrequency: "monthly" },
```

### 4.3 Convert footer category list to internal links

`page.tsx` renders a "Categories" footer column (Health & Wellness, Parenting, Daily Games, Productivity) as plain, unlinked text. Once app pages exist, these should link to the corresponding routes. This is a free internal linking win that the current code completely misses.

### 4.4 Add FAQ structured data to app pages

FAQ schema targets the "People Also Ask" SERP feature. Questions like _"Does the fasting tracker save my data?"_ or _"Is Potty Panda free?"_ map directly to the site's privacy-first value proposition.

> **Note:** Google significantly reduced FAQ rich result visibility in late 2023. They now surface primarily for government and health domains. The schema is still worth adding for potential future reinstatement, Bing compatibility, and AI overview citations — but set expectations accordingly. This is no longer a reliable SERP feature win on Google.

---

## Phase 5 — Remaining Performance & Core Web Vitals

**Goal:** Maintain high Lighthouse scores, which are a ranking factor and affect AdSense RPM.

> The highest-impact performance fix (AdSense script) has been moved to Phase 1.4 due to its direct effect on LCP.

### 5.1 Add `preconnect` hints for external origins

Add to `layout.tsx` `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="preconnect" href="https://pagead2.googlesyndication.com" />
<link rel="preconnect" href="https://googletagservices.com" />
<link rel="preconnect" href="https://tpc.googlesyndication.com" />
```

Both `fonts.googleapis.com` (the CSS endpoint) and `fonts.gstatic.com` (the font file CDN) are needed — not just the latter.

### 5.2 Add `sizes` prop to all `<Image>` components

Several `<Image>` usages in `page.tsx` lack `sizes`, causing Next.js to serve oversized images on mobile:

| Location | Image | Fix |
|---|---|---|
| `page.tsx:132` | `/logo3.svg` (hero) | `sizes="(max-width: 768px) 300px, 500px"` |
| `page.tsx:170` | `/f-icon.png` (app icon) | `sizes="24px"` |
| `page.tsx:189` | `/pp-icon.png` (app icon) | `sizes="24px"` |
| `page.tsx:271` | `/logo3.svg` (footer) | `sizes="28px"` |

---

## Implementation Order & Priority

| Phase | Effort | SEO Impact | Do First |
|---|---|---|---|
| 1 — Technical fixes + AdSense | Low | High (blocks indexing + LCP) | ✅ Yes |
| 2 — Metadata & OG | Low (+ design task for OG image) | High (SERP + sharing) | ✅ Yes — after OG image is ready |
| 3 — JSON-LD | Medium | Medium–High (rich results) | After Phase 2 |
| 5 — Remaining performance | Low | Medium (CWV signals) | Alongside Phase 3 |
| 4 — App pages | High | High (long-term organic) | After Phases 1–3 |

Phases 1 and 2 can be completed in a single session and will produce immediate improvements to how the site appears in search results and link previews. Phase 2 is gated on the OG image design asset. Phases 3 and 5 build on that foundation. Phase 4 is the largest investment but has the highest long-term ceiling — each app page can independently rank for its own keyword cluster.
