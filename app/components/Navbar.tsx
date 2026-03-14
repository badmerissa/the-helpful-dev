"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const apps = [
  { label: "Fasting Tracker", href: "https://fasting.thehelpfuldev.com/" },
  { label: "Potty Panda", href: "https://pottypanda.thehelpfuldev.com/" },
  { label: "unvAIl", href: "https://unvail.thehelpfuldev.com/" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-8">

        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <Image src="/logo3.svg" alt="The Helpful Dev" width={32} height={32} />
          <span className="font-bold text-slate-900 text-lg tracking-tight">
            The Helpful Dev
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-6">
          {apps.map((app) => (
            <li key={app.href}>
              <a
                href={app.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-slate-600 hover:text-cyan-600 transition-colors"
              >
                {app.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href="#newsletter"
            className="hidden sm:inline-flex items-center px-4 py-2 rounded-lg bg-cyan-600 text-white text-sm font-semibold hover:bg-cyan-700 transition-colors"
          >
            Stay in the loop
          </a>
          <button
            className="md:hidden p-2 rounded-md text-slate-600 hover:bg-slate-100"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        <div className="md:hidden border-t border-slate-200 bg-white px-6 py-4 flex flex-col gap-3">
          {apps.map((app) => (
            <a
              key={app.href}
              href={app.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-slate-700 hover:text-cyan-600"
              onClick={() => setMenuOpen(false)}
            >
              {app.label}
            </a>
          ))}
          <a
            href="#newsletter"
            className="mt-2 text-center px-4 py-2 rounded-lg bg-cyan-600 text-white text-sm font-semibold"
            onClick={() => setMenuOpen(false)}
          >
            Stay in the loop
          </a>
        </div>
      )}
    </nav>
  );
}
