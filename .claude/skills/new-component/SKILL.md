# Skill: New Shared Component — The Helpful Dev

Follow this skill when creating a new reusable component in `app/components/`.

---

## Step 1: Decide Server vs Client

Before writing a single line, answer these questions:

| Does the component need... | Use |
|---|---|
| `useState`, `useEffect`, `useRef`, event handlers | `"use client"` |
| Browser APIs (`window`, `document`, `localStorage`) | `"use client"` |
| `useRouter`, `usePathname`, `useSearchParams` | `"use client"` |
| Only props + rendering (no interactivity) | Server Component (default) |
| To pass the CSP nonce to a script | Server Component (nonce only available server-side) |

**Default to Server Component.** Only add `"use client"` when the above criteria are met.

---

## Step 2: File setup

Create the file at: `app/components/ComponentName.tsx`

**Server Component template:**
```tsx
// No "use client" directive

interface ComponentNameProps {
  // All props listed here with JSDoc if the prop is non-obvious
  title: string;
  /** Optional: displayed below the title */
  subtitle?: string;
}

export default function ComponentName({ title, subtitle }: ComponentNameProps) {
  return (
    <div className="...">
      <h2 className="text-3xl lg:text-4xl font-bold">{title}</h2>
      {subtitle && (
        <p className="text-lg text-slate-500 mt-2">{subtitle}</p>
      )}
    </div>
  );
}
```

**Client Component template:**
```tsx
"use client";

import { useState } from "react";

interface ComponentNameProps {
  initialValue?: string;
}

export default function ComponentName({ initialValue = "" }: ComponentNameProps) {
  const [value, setValue] = useState(initialValue);

  return (
    <div className="...">
      {/* component content */}
    </div>
  );
}
```

---

## Step 3: Styling rules

Always reference `.claude/skills/brand/SKILL.md` before choosing classes. Quick reminders:

- Use only the approved colour palette: `cyan-*`, `slate-*`, and the per-app accent colours
- Do **not** add new colours without updating `globals.css`
- This is **Tailwind v4** — no `tailwind.config.ts`. Custom tokens go in `globals.css` under `@theme`
- Use the brand utility classes from `globals.css`:
  - `.gradient-text` — for gradient emphasis in headings
  - `.card-hover` — for interactive card lift effect
  - `.texture-dots` — for subtle dot-grid backgrounds
  - `.animate-fade-up` — for entrance animations
- Prefer `rounded-2xl` for cards/panels, `rounded-lg` for buttons and small elements
- Use `shadow-xl` for elevated cards; avoid custom shadow values

---

## Step 4: Props best practices

- Name boolean props positively: `isLoading` not `notLoaded`
- Use `ReactNode` for slot-style children: `children: React.ReactNode`
- Provide sensible defaults for optional props
- Document non-obvious props with JSDoc comments
- If a prop is only for layout (e.g., `reverse` in `AppSpotlight`), name it clearly

**Shared props interface** — if the interface needs to be used in multiple files, move it to `lib/types.ts` (create if it doesn't exist).

---

## Step 5: Write the unit test

Create `__tests__/ComponentName.test.tsx`. Vitest globals (`describe`, `it`, `expect`) don't need to be imported.

```tsx
import { render, screen } from "@testing-library/react";
import ComponentName from "@/app/components/ComponentName";

describe("ComponentName", () => {
  it("renders the title", () => {
    render(<ComponentName title="Hello" />);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("renders subtitle when provided", () => {
    render(<ComponentName title="Hello" subtitle="World" />);
    expect(screen.getByText("World")).toBeInTheDocument();
  });

  it("does not render subtitle when omitted", () => {
    render(<ComponentName title="Hello" />);
    expect(screen.queryByText(/world/i)).not.toBeInTheDocument();
  });
});
```

**Required test coverage:**
- Renders without crashing (smoke test)
- Props are reflected in the output
- Conditional rendering branches (if prop present / if prop absent)
- For interactive components: test user events with `@testing-library/user-event`

Run the test to verify it passes:
```bash
npx vitest run __tests__/ComponentName.test.tsx
```

---

## Step 6: Export and usage

Components use default exports. Import with the `@/*` path alias:

```tsx
import ComponentName from "@/app/components/ComponentName";
```

If the component is used in many places, document it in `CLAUDE.md` under "Component Patterns".

---

## Step 7: Accessibility checklist

- [ ] Interactive elements (`button`, `a`) have accessible labels
- [ ] Images have meaningful `alt` text (empty string `""` for decorative images)
- [ ] Colour contrast passes WCAG AA (slate-900 on white = fine; cyan-600 on white = borderline, check)
- [ ] Keyboard navigability: can the user Tab to interactive elements?
- [ ] ARIA roles only where semantic HTML isn't sufficient

---

## Common mistakes to avoid

| Mistake | Fix |
|---|---|
| Reading `headers()` in a Client Component | Move nonce-reading to Server Component parent |
| Inline styles for brand colours | Use Tailwind classes or CSS variables from `globals.css` |
| `any` type for event handlers | Use `React.ChangeEvent<HTMLInputElement>` etc. |
| Skipping the unit test | Write the test — CI will catch you if you don't |
| Using `font-black` or very thin weights | Off-brand; stick to `font-semibold` or `font-bold` max |
| Adding dark mode styles without using CSS variables | Always use the dark-mode CSS variables defined in globals.css, never hardcode dark hex values |
