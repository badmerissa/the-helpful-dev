# Skill: SEO Checklist — The Helpful Dev

Run through this checklist before shipping any new page. Missing any one of these items will result in incomplete SEO coverage.

---

## Before You Start

Identify the page type:
- **App landing page** (`app/app/<slug>/page.tsx`) — full checklist applies
- **Static content page** (privacy, about, etc.) — metadata + sitemap required, JSON-LD optional
- **Homepage** (`app/page.tsx`) — already set up; check only if you're modifying it

---

## Checklist

### 1. Metadata export

Every page file must export a `metadata` object:

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "App Name — Free, No Login Required | The Helpful Dev",
  description: "One sentence. Lead with user benefit. Under 160 chars. No hype words.",
  alternates: {
    canonical: "https://thehelpfuldev.com/app/<slug>",
  },
  openGraph: {
    title: "App Name — Free, No Login Required",
    description: "Same as above or a tighter version.",
    url: "https://thehelpfuldev.com/app/<slug>",
    siteName: "The Helpful Dev",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "App Name — Free, No Login Required",
    description: "Same as above.",
  },
};
```

**Checklist:**
- [ ] Title: unique per page, under 60 chars, includes app name + "Free" + "The Helpful Dev"
- [ ] Description: under 160 chars, benefit-first, no hype words
- [ ] `canonical` URL is correct (matches the actual page URL, not the app URL)
- [ ] OpenGraph title/description filled in
- [ ] Twitter card type is `"summary_large_image"`

---

### 2. JSON-LD structured data

App pages need at minimum a `SoftwareApplication` schema. Add it from `lib/app-data.ts`:

```tsx
import JsonLd from "@/app/components/JsonLd";
import { myAppJsonLd } from "@/lib/app-data";

// In the page component:
<JsonLd data={myAppJsonLd} />
```

If the page has an FAQ section, add a `FAQPage` schema too:

```tsx
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Question text here?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Answer text here.",
      },
    },
    // ... more Q&As
  ],
};

<JsonLd data={faqJsonLd} />
```

**Checklist:**
- [ ] `SoftwareApplication` schema included via `lib/app-data.ts`
- [ ] Schema has `name`, `description`, `url`, `applicationCategory`, `operatingSystem: "Web"`, `offers.price: "0"`
- [ ] FAQ schema added if the page has an FAQ section
- [ ] **No user-controlled data passed to `JsonLd`** (static objects only — this is a security rule)

---

### 3. lib/app-data.ts updated

If this is a new app, its schema must live in `lib/app-data.ts` — not defined inline on the page:

```typescript
export const myAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "My App Name",
  applicationCategory: "UtilitiesApplication", // use schema.org categories
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  url: "https://myapp.thehelpfuldev.com/",
  description: "Short description matching the metadata description.",
};

// Add to the appsJsonLd array at the bottom of the file:
export const appsJsonLd = [
  fastingAppJsonLd,
  pottyAppJsonLd,
  unvailAppJsonLd,
  timeagotchiAppJsonLd,
  myAppJsonLd, // ← add here
];
```

**Checklist:**
- [ ] Schema exported from `lib/app-data.ts`
- [ ] Added to the `appsJsonLd` export array
- [ ] `description` matches (or is consistent with) the page `metadata.description`

---

### 4. Sitemap

The sitemap auto-generates from `lib/app-data.ts`. Verify `app/sitemap.ts` pulls in `appsJsonLd` and that your new app's URL will appear.

For non-app pages (privacy, about, etc.), add a manual entry to `app/sitemap.ts`:

```typescript
{ url: "https://thehelpfuldev.com/privacy", lastModified: new Date() },
```

**Checklist:**
- [ ] New app page will appear in sitemap via `lib/app-data.ts`
- [ ] OR manual entry added to `app/sitemap.ts` for non-app pages

---

### 5. OpenGraph image

App pages need an OG image for social sharing. Create `app/app/<slug>/opengraph-image.tsx`:

```tsx
import { ImageResponse } from "next/og";

export const alt = "My App — Free, No Login Required";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0092ae, #00637d)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          color: "white",
          padding: "60px",
        }}
      >
        <div style={{ fontSize: 64, fontWeight: 700, marginBottom: 16 }}>
          My App Name
        </div>
        <div style={{ fontSize: 28, opacity: 0.85 }}>
          Free · No Login · Works in Your Browser
        </div>
        <div style={{ fontSize: 18, opacity: 0.6, marginTop: 32 }}>
          thehelpfuldev.com
        </div>
      </div>
    ),
    size,
  );
}
```

**Checklist:**
- [ ] `opengraph-image.tsx` exists at the app page route level
- [ ] Gradient background uses brand colors (`#0092ae` → `#00637d`)
- [ ] `alt` text is descriptive (used by screen readers and some social platforms)
- [ ] Size is 1200×630px

---

### 6. Privacy copy

Every app landing page must contain the privacy line:

```
No login. No data collected. [App name] works entirely in your browser.
```

Or a close variation. This is both a brand requirement and a conversion signal for privacy-conscious users.

**Checklist:**
- [ ] Privacy line appears above the fold or within the first scroll on the app page

---

### 7. Final verification

```bash
npm run build   # Catches metadata type errors and missing exports
npm run lint    # Catches obvious issues
```

After build, check the page in a browser and verify:
- [ ] Page title in browser tab is correct
- [ ] No console errors related to JSON-LD or metadata
- [ ] Page appears in `/_next/...` correctly
- [ ] Social preview (use opengraph.xyz or similar) shows the OG image

---

## Common schema.org `applicationCategory` values

| Category | Use for |
|---|---|
| `HealthApplication` | Fasting tracker, wellness apps |
| `LifestyleApplication` | Habit tracking, parenting tools |
| `GameApplication` | Daily games, puzzles |
| `UtilitiesApplication` | Productivity tools, timers |
| `EntertainmentApplication` | Fun/casual apps |

Reference: https://schema.org/SoftwareApplication
