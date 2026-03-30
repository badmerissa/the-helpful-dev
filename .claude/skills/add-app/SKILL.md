# Skill: Add a New App

Use this skill whenever you need to add a new app to The Helpful Dev portfolio site. Follow every step in order — skipping steps will cause inconsistencies in SEO, navigation, and the sitemap.

---

## Step 1 — Gather requirements

Before touching any code, confirm:
- App name (e.g. "Habit Streak")
- Slug (e.g. `habit-streak`) — used in URLs and file names
- External URL (e.g. `https://habitstreak.thehelpfuldev.com/`) or `null` if rendered locally
- Category (Health & Wellness / Parenting Tools / Daily Game / Productivity / or new)
- One-line tagline
- Description (2–3 sentences, plain language, no jargon)
- 3 bullet points (feature highlights)
- Status: `"LIVE"` or `"COMING SOON"`
- Icon file name (e.g. `hs-icon.png`) — must be placed in `public/`

---

## Step 2 — Update `lib/app-data.ts`

This is the single source of truth. Add a new entry to the `appsJsonLd` array:

```ts
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Habit Streak",
  url: "https://habitstreak.thehelpfuldev.com/",
  applicationCategory: "LifestyleApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description: "Your description here.",
},
```

Also export a named constant for the individual app page to import:
```ts
export const habitStreakJsonLd = appsJsonLd[/* index */];
```

---

## Step 3 — Update `lib/nav.ts`

Add the app to the appropriate category's `links` array:
```ts
{ label: "Habit Streak", href: "/app/habit-streak" }
```

If this is a new category, add a new category object with a `label` and `href`.

---

## Step 4 — Create the app landing page

Create `app/app/habit-streak/page.tsx`. Use an existing app page (e.g. `app/app/potty-panda/page.tsx`) as a template:

```tsx
import type { Metadata } from "next";
import JsonLd from "@/app/components/JsonLd";
import { habitStreakJsonLd } from "@/lib/app-data";

export const metadata: Metadata = {
  title: "Habit Streak — The Helpful Dev",
  description: "Your description here.",
  openGraph: { /* ... */ },
};

export default function HabitStreakPage() {
  return (
    <>
      <JsonLd data={habitStreakJsonLd} />
      {/* page content */}
    </>
  );
}
```

---

## Step 5 — Create the Open Graph image

Create `app/app/habit-streak/opengraph-image.tsx`. Copy the pattern from an existing app's OG image file. Keep the brand gradient background (`#0092ae` → `#00637d`) and the app name in the centre.

---

## Step 6 — Add the `AppSpotlight` to the homepage

In `app/page.tsx`, add a new `<AppSpotlight>` block inside the `<div id="apps">` section. Alternate `reverse` on every other entry:

```tsx
<AppSpotlight
  icon={<Image src="/hs-icon.png" alt="" width={24} height={24} sizes="24px" className="object-contain" />}
  status="LIVE"
  title="Habit Streak"
  tagline="Health & Wellness"
  description="..."
  bullets={[
    "Bullet one",
    "Bullet two",
    "Bullet three",
  ]}
  href="https://habitstreak.thehelpfuldev.com/"
  ctaLabel="Open Habit Streak"
  previewContent={
    <AppPreview
      src="https://habitstreak.thehelpfuldev.com/"
      title="Habit Streak app preview"
      appName="Habit Streak"
      appHref="https://habitstreak.thehelpfuldev.com/"
    />
  }
/>
```

Also add the app to the `footerApps` array at the top of `app/page.tsx`.

---

## Step 7 — Handle routing (external apps)

If the app lives on an external subdomain, add a 308 redirect in `next.config.ts`:

```ts
{
  source: "/app/habit-streak",
  destination: "https://habitstreak.thehelpfuldev.com/",
  permanent: true,
}
```

---

## Step 8 — Add assets to `public/`

- Icon: `public/hs-icon.png` (24×24px or larger, square)
- Any other images referenced by the landing page

---

## Step 9 — Write tests

**Unit test** (`__tests__/HabitStreak.test.tsx`):
```tsx
import { render, screen } from "@testing-library/react";
import HabitStreakPage from "@/app/app/habit-streak/page";

test("renders page heading", () => {
  render(<HabitStreakPage />);
  expect(screen.getByRole("heading", { name: /Habit Streak/i })).toBeInTheDocument();
});
```

**E2E smoke spec** (`e2e/habit-streak.spec.ts`):
```ts
import { test, expect } from "@playwright/test";

test("habit streak page loads", async ({ page }) => {
  await page.goto("/app/habit-streak");
  await expect(page).toHaveTitle(/Habit Streak/);
});
```

---

## Step 10 — Checklist before committing

- [ ] `lib/app-data.ts` updated and exported
- [ ] `lib/nav.ts` updated
- [ ] `app/app/<slug>/page.tsx` created with `metadata` export
- [ ] `app/app/<slug>/opengraph-image.tsx` created
- [ ] `AppSpotlight` added to `app/page.tsx`
- [ ] `footerApps` array updated in `app/page.tsx`
- [ ] 308 redirect added to `next.config.ts` (if external)
- [ ] Icon/assets added to `public/`
- [ ] Unit test added
- [ ] E2E smoke spec added
- [ ] `npm run lint` passes
- [ ] `npm run test` passes
- [ ] `npm run build` succeeds
