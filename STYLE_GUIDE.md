# STYLE_GUIDE.md — The Helpful Dev Design System

---

## 1. CORE TOKENS

### Colors

```json
{
  "color": {
    "brand": {
      "primary":       { "hex": "#0F4C75", "var": "--brand-primary" },
      "primary-dark":  { "hex": "#1B262C", "var": "--brand-primary-dark" },
      "accent":        { "hex": "#3282B8", "var": "--brand-accent" },
      "light":         { "hex": "#BBE1FA", "var": "--brand-light" },
      "gradient-from": { "hex": "#0F4C75", "var": "--brand-gradient-from" },
      "gradient-to":   { "hex": "#3282B8", "var": "--brand-gradient-to" }
    },
    "background": {
      "base":   { "hex": "#ffffff", "var": "--bg-base" },
      "subtle": { "hex": "#f8fafc", "var": "--bg-subtle", "tailwind": "slate-50" },
      "muted":  { "hex": "#f1f5f9", "var": "--bg-muted",  "tailwind": "slate-100" }
    },
    "text": {
      "primary":   { "hex": "#0f172a", "var": "--text-primary",   "tailwind": "slate-900" },
      "secondary": { "hex": "#475569", "var": "--text-secondary",  "tailwind": "slate-600" },
      "muted":     { "hex": "#94a3b8", "var": "--text-muted",      "tailwind": "slate-400" }
    },
    "border": {
      "subtle":  { "hex": "#e2e8f0", "var": "--border-subtle",  "tailwind": "slate-200" },
      "default": { "hex": "#cbd5e1", "var": "--border-default", "tailwind": "slate-300" }
    },
    "status": {
      "live-bg":       { "tailwind": "green-100",  "hex": "#dcfce7" },
      "live-text":     { "tailwind": "green-700",  "hex": "#15803d" },
      "coming-bg":     { "tailwind": "slate-100",  "hex": "#f1f5f9" },
      "coming-text":   { "tailwind": "slate-500",  "hex": "#64748b" }
    },
    "interactive": {
      "primary":       { "tailwind": "indigo-600", "hex": "#4f46e5" },
      "primary-hover": { "tailwind": "indigo-700", "hex": "#4338ca" },
      "primary-light": { "tailwind": "indigo-50",  "hex": "#eef2ff" },
      "primary-text":  { "tailwind": "indigo-600", "hex": "#4f46e5" },
      "secondary-cta": { "tailwind": "violet-600", "hex": "#7c3aed" }
    }
  }
}
```

> ⚠️ **COLOR CONFLICT — CRITICAL**
> The CSS custom properties define a navy/blue brand palette (`--brand-primary: #0F4C75`, `--brand-accent: #3282B8`, `.gradient-text`), but **no component actually uses these tokens**. All interactive elements (buttons, links, highlights, focus rings, CTA gradient) use Tailwind's `indigo-600` (`#4f46e5`) and `violet-600` (`#7c3aed`). The CSS tokens are defined but orphaned. Two distinct brand blues exist in parallel without cross-reference.

---

### Typography

```json
{
  "typography": {
    "family": {
      "sans": "Geist Sans (--font-geist-sans, fallback: Arial, sans-serif)",
      "mono": "Geist Mono (--font-geist-mono)"
    },
    "scale": {
      "xs":  { "tailwind": "text-xs",  "rem": "0.75rem",  "px": "12px" },
      "sm":  { "tailwind": "text-sm",  "rem": "0.875rem", "px": "14px" },
      "base":{ "tailwind": "text-base","rem": "1rem",     "px": "16px" },
      "lg":  { "tailwind": "text-lg",  "rem": "1.125rem", "px": "18px" },
      "xl":  { "tailwind": "text-xl",  "rem": "1.25rem",  "px": "20px" },
      "2xl": { "tailwind": "text-2xl", "rem": "1.5rem",   "px": "24px" },
      "3xl": { "tailwind": "text-3xl", "rem": "1.875rem", "px": "30px" },
      "4xl": { "tailwind": "text-4xl", "rem": "2.25rem",  "px": "36px" },
      "5xl": { "tailwind": "text-5xl", "rem": "3rem",     "px": "48px" },
      "6xl": { "tailwind": "text-6xl", "rem": "3.75rem",  "px": "60px" }
    },
    "weight": {
      "medium":   500,
      "semibold": 600,
      "bold":     700
    },
    "leading": {
      "tight":   "leading-tight",
      "relaxed": "leading-relaxed"
    },
    "tracking": {
      "tight":   "tracking-tight   (headlines)",
      "widest":  "tracking-widest  (uppercase labels/taglines)"
    },
    "rendering": "-webkit-font-smoothing: antialiased"
  }
}
```

---

### Spacing Scale (used values)

```json
{
  "spacing": {
    "component-gap":   { "tailwind": "gap-3",  "rem": "0.75rem" },
    "element-gap":     { "tailwind": "gap-6",  "rem": "1.5rem"  },
    "section-gap":     { "tailwind": "gap-8",  "rem": "2rem"    },
    "layout-gap":      { "tailwind": "gap-12", "rem": "3rem"    },
    "layout-gap-lg":   { "tailwind": "gap-16", "rem": "4rem"    },
    "section-y":       { "tailwind": "py-20",  "rem": "5rem"    },
    "section-y-lg":    { "tailwind": "py-28",  "rem": "7rem"    },
    "page-x":          { "tailwind": "px-6",   "rem": "1.5rem"  },
    "max-width-page":  { "tailwind": "max-w-6xl", "rem": "72rem" },
    "max-width-prose": { "tailwind": "max-w-xl",  "rem": "36rem" },
    "max-width-form":  { "tailwind": "max-w-md",  "rem": "28rem" }
  }
}
```

---

### Border Radius

```json
{
  "radius": {
    "button":  { "var": "--radius-btn",  "value": "0.5rem",  "tailwind": "rounded-lg" },
    "card":    { "var": "--radius-card", "value": "1rem",    "tailwind": "rounded-2xl" },
    "pill":    { "var": "--radius-pill", "value": "9999px",  "tailwind": "rounded-full" },
    "icon-bg": {                         "value": "0.75rem", "tailwind": "rounded-xl"  },
    "inner-card": {                      "value": "0.5rem",  "tailwind": "rounded-lg"  }
  }
}
```

---

## 2. COMPONENT PATTERNS

### Buttons

**Primary (light background)**
```
px-6 py-3 rounded-lg bg-indigo-600 text-white text-sm font-semibold
hover:bg-indigo-700 transition-colors
```

**Primary (dark/gradient background)**
```
px-5 py-2.5 rounded-lg bg-white text-indigo-600 text-sm font-semibold
hover:bg-indigo-50 transition-colors
```

**Secondary / Ghost**
```
px-6 py-3 rounded-lg border border-slate-300 text-slate-700 text-sm font-semibold
hover:border-indigo-400 hover:text-indigo-600 transition-colors
```

**Disabled / Coming Soon**
```
px-5 py-2.5 rounded-lg bg-slate-100 text-slate-400 text-sm font-semibold
cursor-not-allowed  [no hover state]
```

**Pill / Badge CTA**
```
px-3 py-1 rounded-full bg-{color}-100 text-{color}-600 text-xs font-semibold
```

Rules:
- All buttons: `text-sm`, `font-semibold`, `rounded-lg`, `transition-colors`
- Destructive/stop action only: `bg-red-100 text-red-600`
- No `font-medium` on buttons — always `font-semibold`

---

### Inputs

**Light variant**
```
px-4 py-3 rounded-lg border border-slate-300
focus:ring-2 focus:ring-indigo-500 outline-none
text-slate-900 text-sm
```

**Dark variant (on gradient background)**
```
px-4 py-2.5 rounded-lg bg-white/20 border border-white/30
text-white placeholder:text-indigo-200
focus:outline-none focus:ring-2 focus:ring-white/50
text-sm
```

Rules:
- Focus ring color: `indigo-500` (light), `white/50` (dark)
- Always `outline-none` + explicit `focus:ring-2`
- Disabled state: `disabled:opacity-50`
- `min-w-0` required inside flex containers to prevent overflow

---

### Containers

**Page layout wrapper**
```
max-w-6xl mx-auto px-6
```

**Section**
```
py-20 lg:py-28 border-b border-slate-100 last:border-0
```

**Card (preview / spotlight)**
```
rounded-2xl border border-slate-200 bg-slate-50 shadow-lg overflow-hidden p-6
```

**Navbar**
```
sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200
h-16
```

**Hero browser mockup**
```
bg-slate-50 rounded-2xl border border-slate-200 shadow-xl p-6
```

**Stats strip**
```
bg-slate-50 border-b border-slate-200
grid grid-cols-2 md:grid-cols-4 gap-6 text-center py-8
```

**CTA band (gradient)**
```
bg-gradient-to-br from-indigo-600 to-violet-600
max-w-4xl mx-auto px-6 py-20 text-center text-white
```

**Footer**
```
bg-white border-t border-slate-200
grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-12
```

**Icon container**
```
w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center
```

**Status badge**
```
LIVE:        text-xs font-bold px-2 py-1 rounded-full bg-green-100 text-green-700
COMING SOON: text-xs font-bold px-2 py-1 rounded-full bg-slate-100 text-slate-500
```

**Announcement pill**
```
inline-flex items-center gap-2 px-3 py-1 rounded-full
bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-medium
```

**Checklist item**
```
flex items-center gap-2 text-slate-600 text-sm
[indigo-500 checkmark SVG, w-4 h-4, strokeWidth 2.5]
```

**Footer nav heading**
```
text-sm font-semibold text-slate-900 mb-3 uppercase tracking-wider
```

**Footer link (active)**
```
text-sm text-slate-500 hover:text-indigo-600 transition-colors
```

**Footer link (disabled)**
```
text-sm text-slate-300 cursor-not-allowed pointer-events-none
```

**Gradient text utility**
```css
background: linear-gradient(135deg, #0F4C75, #3282B8);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
```
> ⚠️ **COLOR CONFLICT**: `.gradient-text` uses the CSS token palette (`#0F4C75 → #3282B8`), but the CTA band section uses `from-indigo-600 to-violet-600` (`#4f46e5 → #7c3aed`). Two different gradient color pairs are in use with no shared token.

---

## 3. CLAUDE.md SNIPPET

```markdown
## Style Rules

### Colors
- Primary interactive color: Tailwind `indigo-600` (#4f46e5). Hover: `indigo-700`.
- Background hierarchy: `white` → `slate-50` → `slate-100`.
- Body text hierarchy: `slate-900` (primary) → `slate-600` (secondary) → `slate-400` (muted).
- Borders: `slate-200` (subtle), `slate-300` (default).
- Status badges: green-100/700 (live), slate-100/500 (coming soon).
- CTA gradient: `from-indigo-600 to-violet-600`.
- Gradient text: `from-[#0F4C75] to-[#3282B8]` via `.gradient-text` utility class.
- ⚠️ Do NOT mix the navy CSS token palette (#0F4C75) with Tailwind indigo in the same interactive element.

### Typography
- Font: Geist Sans (body), Geist Mono (numeric displays only).
- All text uses `text-sm` or `text-base`; hero headlines use `text-4xl` → `text-6xl` with `font-bold tracking-tight`.
- Uppercase labels: always paired with `tracking-widest text-xs font-semibold`.
- Taglines above headings: `text-sm font-semibold text-indigo-600 uppercase tracking-widest`.

### Spacing
- Page wrapper: `max-w-6xl mx-auto px-6`.
- Sections: `py-20 lg:py-28`.
- Two-column layouts: `flex flex-col lg:flex-row gap-12 lg:gap-16 items-center`.

### Buttons
- Primary: `px-6 py-3 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors`.
- Secondary: add `border border-slate-300 text-slate-700 hover:border-indigo-400 hover:text-indigo-600`.
- Disabled: `bg-slate-100 text-slate-400 cursor-not-allowed` — no hover state.
- Never use `font-medium` on buttons; always `font-semibold`.

### Inputs
- Light: `rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none text-sm`.
- Dark (on gradient bg): `bg-white/20 border-white/30 text-white placeholder:text-indigo-200 focus:ring-white/50`.

### Cards / Containers
- Standard card: `rounded-2xl border border-slate-200 bg-slate-50 shadow-lg p-6`.
- Navbar: `sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 h-16`.
- All `transition-colors` on interactive links/buttons — no other transition types.

### Responsive
- Mobile-first; `lg:` breakpoint for two-column layouts.
- Navbar collapses at `md:` breakpoint.
- Hero text scales: `text-4xl lg:text-5xl xl:text-6xl`.
```
