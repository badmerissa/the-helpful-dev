# Quality Improvements Plan

Generated from the site audit conducted on 2026-03-18. Goal: move every category from its current rating to **High**.

---

## Categories Currently Below High

| Category | Current | Target |
|---|---|---|
| Security | Medium-High | High |
| SEO | Medium-High | High |
| Performance | Medium | High |
| Accessibility | Medium | High |
| Robustness | Medium-High | High |
| Testing | Low | High |
| Privacy & Compliance | High | Maintain |
| Code Quality | High | Maintain |
| Maintainability | High | Maintain |
| UX / Design | Medium-High | High |

---

## 1. Performance → High

### 1.1 Fix AdSense render-blocking script (CRITICAL)

**File:** `app/layout.tsx`

Move the Google AdSense `<script async>` out of `<head>` and replace it with
`next/script`:

```tsx
// Before (in <head> via metadata or direct JSX):
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js" />

// After (inside layout body, below <Navbar>):
import Script from "next/script";

<Script
  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXX"
  strategy="lazyOnload"
  crossOrigin="anonymous"
/>
```

This moves AdSense off the critical rendering path and eliminates its LCP impact.

### 1.2 Add bundle analysis

Install and configure `@next/bundle-analyzer`:

```bash
npm install --save-dev @next/bundle-analyzer
```

**File:** `next.config.ts`

```ts
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default withBundleAnalyzer(nextConfig);
```

Add script to `package.json`:

```json
"analyze": "ANALYZE=true npm run build"
```

### 1.3 Replace FontAwesome with inline SVGs

FontAwesome pulls ~30 kB of JS for icons used in only 1–2 places. Replace with
inline SVGs or a zero-JS alternative (e.g. `lucide-react` which is fully
tree-shakeable, or hand-rolled `<svg>` elements):

```bash
npm uninstall @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome
```

Replace the single robot icon (`faRobot`) used in `unvail/page.tsx` with an
inline `<svg>` or a single PNG/SVG file in `/public`.

### 1.4 Set explicit cache headers for static assets

**File:** `next.config.ts` — add `headers()` entries for `/public` assets:

```ts
{
  source: "/(:path*.(png|svg|ico|webp|woff2))",
  headers: [
    { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
  ],
},
```

---

## 2. SEO → High

### 2.1 Change /fasting redirect to permanent (301)

**File:** `next.config.ts`

```ts
// Before:
{ source: "/fasting", destination: "https://fasting.thehelpfuldev.com/", permanent: false }

// After:
{ source: "/fasting", destination: "https://fasting.thehelpfuldev.com/", permanent: true }
```

### 2.2 Add /privacy to sitemap

**File:** `app/sitemap.ts`

```ts
{
  url: "https://thehelpfuldev.com/privacy",
  lastModified: new Date(),
  changeFrequency: "yearly",
  priority: 0.3,
},
```

### 2.3 Create per-app Open Graph images

Replace the shared `/og-image.svg` with app-specific OG images. Options:

- **Option A (static):** Create `/public/og-fasting.png`, `/public/og-potty-panda.png`, etc. at 1200×630.
- **Option B (dynamic):** Use `next/og` (`ImageResponse`) to generate OG images per app at build time via `app/app/[app]/opengraph-image.tsx`.

Update each app's `metadata` export:

```ts
openGraph: {
  images: [{ url: "/og-fasting.png", width: 1200, height: 630 }],
},
```

### 2.4 Add structured data for Privacy page

**File:** `app/privacy/page.tsx` — add a `WebPage` JSON-LD schema:

```json
{
  "@type": "WebPage",
  "name": "Privacy Policy",
  "url": "https://thehelpfuldev.com/privacy",
  "description": "How The Helpful Dev handles your data."
}
```

---

## 3. Security → High

### 3.1 Remove unsafe-inline from script-src using nonces

Next.js 13+ supports CSP nonces via middleware. Replace `unsafe-inline` with a
per-request nonce:

**New file:** `middleware.ts`

```ts
import { NextResponse } from "next/server";
import crypto from "crypto";

export function middleware(request: Request) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const cspHeader = [
    `script-src 'self' 'nonce-${nonce}' https://pagead2.googlesyndication.com https://va.vercel-scripts.com`,
    // ... rest of directives (no unsafe-inline)
  ].join("; ");

  const response = NextResponse.next();
  response.headers.set("Content-Security-Policy", cspHeader);
  response.headers.set("x-nonce", nonce);
  return response;
}
```

Pass the nonce through to layout via `headers()` from `next/headers`, then
apply to `next/script` components.

### 3.2 Add Subresource Integrity (SRI) hashes to third-party scripts

For any third-party script loaded with a stable URL, generate and add an
`integrity` attribute:

```tsx
<Script
  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
  integrity="sha384-GENERATED_HASH_HERE"
  crossOrigin="anonymous"
  strategy="lazyOnload"
/>
```

Note: AdSense dynamically updates its bundle, making SRI difficult. The
pragmatic fix is to scope the CSP script allowlist tightly (already done) and
rely on the nonce approach from 3.1 rather than SRI for AdSense.

### 3.3 Add HSTS header

**File:** `next.config.ts` — add to the headers array:

```ts
{
  key: "Strict-Transport-Security",
  value: "max-age=63072000; includeSubDomains; preload",
},
```

---

## 4. Accessibility → High

### 4.1 Add <label> to newsletter form input (CRITICAL)

**File:** `app/components/NewsletterForm.tsx`

```tsx
// Before:
<input type="email" placeholder="Enter your email..." />

// After:
<label htmlFor="newsletter-email" className="sr-only">
  Email address
</label>
<input
  id="newsletter-email"
  type="email"
  placeholder="Enter your email..."
/>
```

The `sr-only` class (Tailwind utility) hides the label visually while keeping
it accessible to screen readers.

### 4.2 Add title attributes to all iframes

**File:** `app/page.tsx` and all app landing pages — locate each `<iframe>` and add:

```tsx
<iframe
  title="Fasting Tracker app preview"
  loading="lazy"
  // ...
/>
```

### 4.3 Add a skip-to-content link

**File:** `app/layout.tsx` — add as the very first element inside `<body>`:

```tsx
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-white focus:text-cyan-700"
>
  Skip to main content
</a>
```

Add `id="main-content"` to the `<main>` element in each page.

### 4.4 Add visual cursor feedback for disabled/coming-soon links

**File:** Tailwind class on disabled `<a>` elements:

```tsx
<a
  aria-disabled="true"
  className="cursor-not-allowed opacity-60 pointer-events-none"
>
  Coming Soon
</a>
```

### 4.5 Add "opens in new tab" notices on external links

**File:** All pages with `target="_blank"` links — add `aria-label`:

```tsx
<a
  href="https://ko-fi.com/..."
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Support us on Ko-fi (opens in new tab)"
>
  Ko-fi
</a>
```

---

## 5. Robustness → High

### 5.1 Replace console.error with a proper error logger

**File:** `app/error.tsx`

```tsx
// Before:
useEffect(() => { console.error(error); }, [error]);

// After:
useEffect(() => {
  // Replace with your logging service (e.g. Sentry, Vercel Log Drains)
  if (process.env.NODE_ENV === "production") {
    // logError(error); // integrate logging service here
  } else {
    console.error(error);
  }
}, [error]);
```

For production-grade logging, integrate Sentry:

```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

### 5.2 Add retry logic to NewsletterForm

**File:** `app/components/NewsletterForm.tsx`

```tsx
async function fetchWithRetry(url: string, options: RequestInit, retries = 2): Promise<Response> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url, options);
      if (response.ok || attempt === retries) return response;
    } catch (err) {
      if (attempt === retries) throw err;
      await new Promise((r) => setTimeout(r, 1000 * (attempt + 1)));
    }
  }
  throw new Error("Max retries exceeded");
}
```

### 5.3 Validate ConvertKit response shape

Currently, any `response.ok` is treated as success. Add response body validation:

```tsx
const json = await response.json();
if (response.ok && json.subscription?.state === "active") {
  setStatus("success");
} else {
  setStatus("error");
}
```

---

## 6. Testing → High

### 6.1 Install Vitest + React Testing Library

```bash
npm install --save-dev vitest @vitejs/plugin-react @testing-library/react @testing-library/user-event jsdom
```

**New file:** `vitest.config.ts`

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./vitest.setup.ts",
  },
});
```

Add script to `package.json`:

```json
"test": "vitest",
"test:coverage": "vitest --coverage"
```

### 6.2 Unit tests to write

| Test file | What to cover |
|---|---|
| `components/NewsletterForm.test.tsx` | Renders form; submits email; shows loading state; shows success; shows error; respects cooldown; handles network timeout |
| `components/Navbar.test.tsx` | Renders logo; toggles mobile menu open/close; all nav links render |
| `components/AppSpotlight.test.tsx` | Renders title/tagline/CTA; `reverse` prop flips layout; disabled state |
| `app/sitemap.test.ts` | All 6 routes present; correct priorities; correct changeFrequency |
| `app/robots.test.ts` | Allows all crawlers; sitemap URL correct |
| `lib/app-data.test.ts` | JSON-LD schemas are valid (required fields present, no undefined values) |

### 6.3 Install Playwright for end-to-end tests

```bash
npm init playwright@latest
```

**New file:** `e2e/smoke.spec.ts`

```ts
import { test, expect } from "@playwright/test";

test("homepage loads", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

test("newsletter form accepts email and shows success", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("Email address").fill("test@example.com");
  await page.getByRole("button", { name: /get updates/i }).click();
  await expect(page.getByText(/you're in/i)).toBeVisible({ timeout: 5000 });
});

test("404 page renders", async ({ page }) => {
  const response = await page.goto("/this-page-does-not-exist");
  expect(response?.status()).toBe(404);
  await expect(page.getByText("404")).toBeVisible();
});
```

Add scripts to `package.json`:

```json
"e2e": "playwright test",
"e2e:ui": "playwright test --ui"
```

### 6.4 Add CI test pipeline

**New file:** `.github/workflows/ci.yml`

```yaml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - run: npm run lint
      - run: npm run test
      - run: npm run build
```

---

## 7. UX / Design → High

### 7.1 Add close-on-outside-click to mobile nav

**File:** `app/components/Navbar.tsx`

```tsx
const navRef = useRef<HTMLElement>(null);

useEffect(() => {
  function handleClickOutside(e: MouseEvent) {
    if (navRef.current && !navRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  }
  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);

// Attach navRef to the <nav> element
<nav ref={navRef} ...>
```

### 7.2 Add visual affordance for iframe previews

**File:** `app/page.tsx` — add an overlay badge to iframes:

```tsx
<div className="relative">
  <iframe ... className="pointer-events-none" />
  <div className="absolute bottom-2 right-2 text-xs bg-black/50 text-white px-2 py-1 rounded">
    Preview only — click the button above to open the app
  </div>
</div>
```

### 7.3 Add Privacy Policy link to footer

**File:** `app/page.tsx` — in the footer legal column, add:

```tsx
<li>
  <Link href="/privacy">Privacy Policy</Link>
</li>
```

### 7.4 Add GDPR cookie consent banner

Install a lightweight, accessible consent library:

```bash
npm install vanilla-cookieconsent
```

Or implement a minimal custom banner. Requirements:
- Must display before AdSense loads for EU visitors
- Must offer Accept / Reject options
- Must block AdSense script until consent is granted
- Must persist choice in `localStorage`

**File:** `app/components/CookieConsent.tsx` (new client component)

Conditionally load AdSense script only after consent:

```tsx
const [consented, setConsented] = useState(false);

return (
  <>
    {consented && (
      <Script src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js" strategy="lazyOnload" />
    )}
    {!hasDecided && <CookieBanner onAccept={() => setConsented(true)} onReject={() => setHasDecided(true)} />}
  </>
);
```

---

## 8. Code Quality — Maintain High / Address Gaps

### 8.1 Extract a reusable <JsonLd> component

**New file:** `app/components/JsonLd.tsx`

```tsx
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Safe: data is always a hardcoded static object, never user input
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
```

Replace all inline `dangerouslySetInnerHTML` JSON-LD blocks across 5+ pages
with `<JsonLd data={appSchema} />`.

### 8.2 Resolve dead CSS design tokens

**File:** `app/globals.css`

Either:
- **Use them:** Audit all Tailwind utility classes in components and replace
  hardcoded color values (e.g. `text-slate-900`) with token references
  (e.g. `text-foreground`), OR
- **Remove them:** Delete unused `@theme inline` token definitions to eliminate
  dead code.

Pick one approach and apply it consistently.

### 8.3 Fix NewsletterForm cooldown pattern

Replace the render-time `Date.now()` computation with proper state:

```tsx
// Before:
const isDisabled = status === "loading" || (cooldownUntil !== null && Date.now() < cooldownUntil);

// After:
const [isCoolingDown, setIsCoolingDown] = useState(false);

// In error handler:
setIsCoolingDown(true);
setTimeout(() => setIsCoolingDown(false), 5000);

const isDisabled = status === "loading" || isCoolingDown;
```

---

## Implementation Order (Priority)

Work in this order for maximum impact per effort:

1. **Performance:** Fix AdSense script placement (1.1) — single biggest LCP win
2. **Accessibility:** Add `<label>` to newsletter input (4.1) — WCAG blocker
3. **SEO:** Change /fasting redirect to 301 (2.1) — SEO equity loss fix
4. **SEO:** Add /privacy to sitemap (2.2) — 5-minute fix
5. **UX:** GDPR cookie consent banner (7.4) — legal compliance
6. **UX:** Close-on-outside-click nav (7.1) — quick win
7. **Accessibility:** Skip link + iframe titles (4.3, 4.2)
8. **Security:** HSTS header (3.3) — one-liner
9. **Robustness:** Error logger + retry logic (5.1, 5.2)
10. **Code Quality:** Extract `<JsonLd>` component (8.1)
11. **Code Quality:** Resolve dead CSS tokens (8.2)
12. **SEO:** Per-app OG images (2.3) — higher effort, high social impact
13. **Security:** Nonce-based CSP (3.1) — complex, do last
14. **Testing:** Unit tests with Vitest (6.1–6.2)
15. **Testing:** E2E tests with Playwright (6.3)
16. **Testing:** CI pipeline (6.4)
17. **Performance:** Replace FontAwesome with inline SVGs (1.3)
18. **Performance:** Bundle analysis (1.2)

---

## Estimated Effort

| Priority Group | Items | Effort |
|---|---|---|
| Quick wins (< 1 hour each) | 1.1, 4.1, 2.1, 2.2, 3.3, 7.1, 4.3, 4.2, 8.3 | ~4 hours total |
| Medium (half day each) | 7.4, 5.1, 5.2, 8.1, 8.2, 2.3 | ~1–2 days |
| Larger (full day each) | 6.1–6.4 (testing suite), 3.1 (nonce CSP), 1.3 (icon refactor) | ~3–4 days |

**Total estimated effort to reach High across all categories: ~6–8 days.**
