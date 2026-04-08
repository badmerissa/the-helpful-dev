"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "dark",
  toggleTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

/* Dark-mode CSS variable overrides.
   These are applied via JS instead of CSS because Tailwind v4's PostCSS plugin
   auto-converts any CSS dark-mode block into @media (prefers-color-scheme: dark),
   which breaks the manual toggle. */
/* Theme CSS variables for both modes.
   Applied via JS instead of CSS because Tailwind v4's PostCSS plugin
   auto-converts any CSS dark-mode block into @media (prefers-color-scheme: dark),
   which breaks the manual toggle. Both light AND dark must be set as inline
   styles to override Tailwind's generated media query. */
const themeVars: Record<Theme, Record<string, string>> = {
  dark: {
    "--bg-base": "#0d1117",
    "--bg-surface": "#161b22",
    "--bg-surface-2": "#1c2128",
    "--border-color": "#30363d",
    "--text-primary": "#e6edf3",
    "--text-secondary": "#8b949e",
    "--text-muted": "#6e7681",
    "--brand-gradient-from": "#22b8d4",
    "--brand-gradient-to": "#0092ae",
    "--terminal-cmd": "#22b8d4",
    "--terminal-output": "#8b949e",
    "--terminal-success": "#4ade80",
    "--terminal-error": "#f87171",
    "--terminal-comment": "#6e7681",
    "--terminal-prompt": "#22b8d4",
  },
  light: {
    "--bg-base": "#ffffff",
    "--bg-surface": "#f8fafc",
    "--bg-surface-2": "#f1f5f9",
    "--border-color": "#e2e8f0",
    "--text-primary": "#0f172a",
    "--text-secondary": "#64748b",
    "--text-muted": "#94a3b8",
    "--brand-gradient-from": "#0092ae",
    "--brand-gradient-to": "#00637d",
    "--terminal-cmd": "#0092ae",
    "--terminal-output": "#64748b",
    "--terminal-success": "#16a34a",
    "--terminal-error": "#dc2626",
    "--terminal-comment": "#94a3b8",
    "--terminal-prompt": "#0092ae",
  },
};

function applyTheme(theme: Theme) {
  const el = document.documentElement;
  if (theme === "dark") {
    el.setAttribute("data-theme", "dark");
  } else {
    el.removeAttribute("data-theme");
  }
  for (const [k, v] of Object.entries(themeVars[theme])) {
    el.style.setProperty(k, v);
  }
}

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  try {
    return (localStorage.getItem("theme") as Theme) ?? "dark";
  } catch {
    return "dark";
  }
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    try { localStorage.setItem("theme", next); } catch {}
    applyTheme(next);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
