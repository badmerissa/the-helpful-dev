"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { categories } from "@/lib/nav";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  // Close mobile menu when clicking outside the nav
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  // Close mobile menu on Escape key
  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    if (menuOpen) {
      document.addEventListener("keydown", handleEscape);
    }
    return () => document.removeEventListener("keydown", handleEscape);
  }, [menuOpen]);

  return (
    <nav
      ref={navRef}
      className="sticky top-0 z-50 bg-white/80 dark:bg-[#0d1117]/80 backdrop-blur-md border-b border-slate-200 dark:border-[#30363d]"
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-8">

        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <Image src="/logo.svg" alt="The Helpful Dev" width={32} height={32} />
          <span className="font-bold text-slate-900 dark:text-[#e6edf3] text-lg tracking-tight">
            The Helpful Dev
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-6">
          {categories.map((cat) => (
            <li key={cat.href}>
              <Link
                href={cat.href}
                className="text-sm font-medium text-slate-600 dark:text-[#8b949e] hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors nav-link-slide"
              >
                {cat.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Link
            href="/#newsletter"
            className="hidden sm:inline-flex items-center px-4 py-2 rounded-lg bg-cyan-600 text-white text-sm font-semibold hover:bg-cyan-700 transition-colors"
          >
            Follow the journey
          </Link>
          <button
            className="md:hidden p-2 rounded-md text-slate-600 dark:text-[#8b949e] hover:bg-slate-100 dark:hover:bg-[#1c2128]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden border-t border-slate-200 dark:border-[#30363d] bg-white dark:bg-[#0d1117] px-6 py-4 flex flex-col gap-3"
        >
          {categories.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className="text-sm font-medium text-slate-700 dark:text-[#8b949e] hover:text-cyan-600 dark:hover:text-cyan-400"
              onClick={() => setMenuOpen(false)}
            >
              {cat.label}
            </Link>
          ))}
          <Link
            href="/#newsletter"
            className="mt-2 text-center px-4 py-2 rounded-lg bg-cyan-600 text-white text-sm font-semibold"
            onClick={() => setMenuOpen(false)}
          >
            Follow the journey
          </Link>
        </div>
      )}
    </nav>
  );
}
