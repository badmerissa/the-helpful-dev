import type { TerminalLine } from "@/app/components/TerminalCard";

// ─── Carousel / directory app metadata ───────────────────────────────────────
// Single source of truth consumed by AppsCarousel, page.tsx, and /apps page.

export interface CarouselApp {
  icon: string | null;
  name: string;
  tagline: string;
  description: string;
  href: string | null;
  month: number;
  accentClass: string;
  accentColor?: string;
  comingSoon?: boolean;
  /** Short terminal lines for carousel cards */
  terminalLines?: TerminalLine[];
  /** Full terminal lines for the spotlight view on /apps */
  spotlightTerminalLines?: TerminalLine[];
  /** Bullet points for the spotlight view on /apps */
  bullets?: string[];
  /** CTA label for the spotlight view */
  ctaLabel?: string;
  /** Command users can type to open the app */
  terminalCommand?: string;
}

export const carouselApps: CarouselApp[] = [
  {
    icon: "/f-icon.png",
    name: "Fasting Tracker",
    tagline: "Health & Wellness",
    description: "Distraction-free intermittent fasting timer. 16:8, 20:4, OMAD — all in your browser.",
    href: "https://fasting.thehelpfuldev.com/",
    month: 1,
    accentClass: "text-green-600 bg-green-50 border-green-100",
    accentColor: "#22c55e",
    terminalCommand: "npm run fasting-app",
    terminalLines: [
      { type: "cmd",     text: "open fasting-tracker" },
      { type: "output",  text: "Protocol: 16:8" },
      { type: "success", text: "14h 32m elapsed" },
    ],
    spotlightTerminalLines: [
      { type: "cmd",     text: "open fasting-tracker" },
      { type: "output",  text: "Protocol: 16:8" },
      { type: "output",  text: "Fast started: 22:00 last night" },
      { type: "success", text: "14h 32m elapsed — keep going" },
      { type: "success", text: "No login required" },
      { type: "success", text: "No data collected" },
      { type: "comment", text: "your body, your data" },
    ],
    bullets: ["Multiple fasting protocols", "Visual countdown timer", "Works entirely offline", "No account required"],
    ctaLabel: "Start Fasting Free",
  },
  {
    icon: "/pp-icon.png",
    name: "Potty Panda",
    tagline: "Parenting",
    description: "Log, time, and celebrate potty training milestones with a friendly panda.",
    href: "https://pottypanda.thehelpfuldev.com/",
    month: 2,
    accentClass: "text-amber-600 bg-amber-50 border-amber-100",
    accentColor: "#f59e0b",
    terminalCommand: "npm run potty-panda",
    terminalLines: [
      { type: "cmd",     text: "open potty-panda" },
      { type: "output",  text: "Loading Panda... 🐼" },
      { type: "success", text: "3-day streak!" },
    ],
    spotlightTerminalLines: [
      { type: "cmd",     text: "open potty-panda" },
      { type: "output",  text: "Loading Panda... 🐼" },
      { type: "success", text: "3-day streak! Great work" },
      { type: "output",  text: "Last success: 25 mins ago" },
      { type: "success", text: "Milestone unlocked: Panda Pro" },
      { type: "comment", text: "no account, no cloud, just wins" },
    ],
    bullets: ["Track successes and accidents", "Sit-on-potty timer", "Streak tracking with celebrations", "No account required"],
    ctaLabel: "Try Potty Panda",
  },
  {
    icon: null,
    name: "unvAIl",
    tagline: "Daily Game",
    description: "Real or AI? A daily challenge to train your eye before it's too late.",
    href: "https://unvail.thehelpfuldev.com/",
    month: 3,
    accentClass: "text-violet-600 bg-violet-50 border-violet-100",
    accentColor: "#8b5cf6",
    terminalCommand: "npm run unvail",
    terminalLines: [
      { type: "cmd",     text: "open unvail" },
      { type: "success", text: "Correct — AI-generated" },
      { type: "output",  text: "Score: 4/5" },
    ],
    spotlightTerminalLines: [
      { type: "cmd",     text: "open unvail --challenge=today" },
      { type: "output",  text: "Loading daily challenge..." },
      { type: "output",  text: "Round 1 of 5: analysing..." },
      { type: "success", text: "Correct — that was AI-generated" },
      { type: "output",  text: "Score: 4/5  Streak: 🔥 7 days" },
      { type: "comment", text: "can you tell the difference?" },
    ],
    bullets: ["5 rounds per daily challenge", "Shareable Wordle-style results", "Streak tracking", "No account required"],
    ctaLabel: "Play Today's Challenge",
  },
  {
    icon: null,
    name: "Timeagotchi",
    tagline: "Productivity",
    description: "Time tracking disguised as a tamagotchi. Your pet lives by your productivity.",
    href: "https://timeagotchi.thehelpfuldev.com/",
    month: 3,
    accentClass: "text-orange-600 bg-orange-50 border-orange-100",
    accentColor: "#f97316",
    terminalCommand: "npm run timeagotchi",
    terminalLines: [
      { type: "cmd",     text: "open timeagotchi" },
      { type: "success", text: "Pixel is happy 😊" },
      { type: "output",  text: "Today: 4h 12m" },
    ],
    spotlightTerminalLines: [
      { type: "cmd",     text: "open timeagotchi" },
      { type: "output",  text: "Fetching your pet..." },
      { type: "success", text: "Pixel is happy 😊 (fed: 6h ago)" },
      { type: "output",  text: "Today: 4h 12m tracked" },
      { type: "success", text: "Weekly report ready — export CSV" },
      { type: "comment", text: "track time. keep your pet alive." },
    ],
    bullets: ["Virtual pet powered by your timesheet", "Weekly reports and CSV export", "Fun gamified tracking", "No account required"],
    ctaLabel: "Meet Your Pet",
  },
  {
    icon: null,
    name: "Loamy",
    tagline: "Gardening",
    description: "A gardening companion for tracking your plants, watering schedules, and hydroponics setups — all offline.",
    href: null,
    month: 4,
    accentClass: "text-emerald-600 bg-emerald-50 border-emerald-100",
    comingSoon: true,
  },
];

// ─── JSON-LD schemas ──────────────────────────────────────────────────────────
// Canonical SoftwareApplication JSON-LD schemas for each app.
// Used on both the homepage and each app's landing page to prevent drift.
export const fastingAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Intermittent Fasting Tracker",
  applicationCategory: "HealthApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  url: "https://fasting.thehelpfuldev.com/",
  description:
    "A free browser-based intermittent fasting tracker supporting 16:8, 20:4, OMAD, and 5:2 protocols. No account or data collection required.",
};

export const pottyAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Potty Panda",
  applicationCategory: "LifestyleApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  url: "https://pottypanda.thehelpfuldev.com/",
  description:
    "A free browser-based potty training app. Log successes and accidents, run a sit-on-potty timer, and track streaks. No account required.",
};

export const unvailAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "unvAIl",
  applicationCategory: "GameApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  url: "https://unvail.thehelpfuldev.com/",
  description:
    "A free daily game challenging players to identify which images are real and which are AI-generated. New challenge every day with shareable Wordle-style results.",
};

export const timeagotchiAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Timeagotchi",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  url: "https://timeagotchi.thehelpfuldev.com/",
  description:
    "A free browser-based time tracking app that gamifies timesheet logging through a Tamagotchi-style virtual pet. Includes weekly reports and CSV export.",
};

export const appsJsonLd = [
  fastingAppJsonLd,
  pottyAppJsonLd,
  unvailAppJsonLd,
  timeagotchiAppJsonLd,
];
