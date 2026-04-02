import Image from "next/image";
import Link from "next/link";
import NewsletterForm from "./components/NewsletterForm";
import JsonLd from "./components/JsonLd";
import AppsCarousel from "./components/AppsCarousel";
import { appsJsonLd } from "@/lib/app-data";
import { posts } from "@/lib/blog-data";

// Challenge config — update these each month
const CHALLENGE = {
  currentMonth: 4,
  totalMonths: 12,
  appsShipped: 4,
  year: 2026,
};

const footerApps = [
  { label: "Fasting Tracker", href: "https://fasting.thehelpfuldev.com/" },
  { label: "Potty Panda", href: "https://pottypanda.thehelpfuldev.com/" },
  { label: "unvAIl", href: "https://unvail.thehelpfuldev.com/" },
  { label: "Timeagotchi", href: "https://timeagotchi.thehelpfuldev.com/" },
];

const apps = [
  {
    icon: "/f-icon.png",
    name: "Fasting Tracker",
    tagline: "Health & Wellness",
    description: "Distraction-free intermittent fasting timer. 16:8, 20:4, OMAD — all in your browser.",
    href: "https://fasting.thehelpfuldev.com/",
    month: 1,
    accentClass: "text-green-600 bg-green-50 border-green-100",
  },
  {
    icon: "/pp-icon.png",
    name: "Potty Panda",
    tagline: "Parenting",
    description: "Log, time, and celebrate potty training milestones with a friendly panda.",
    href: "https://pottypanda.thehelpfuldev.com/",
    month: 2,
    accentClass: "text-amber-600 bg-amber-50 border-amber-100",
  },
  {
    icon: null,
    name: "unvAIl",
    tagline: "Daily Game",
    description: "Real or AI? A daily challenge to train your eye before it's too late.",
    href: "https://unvail.thehelpfuldev.com/",
    month: 3,
    accentClass: "text-violet-600 bg-violet-50 border-violet-100",
  },
  {
    icon: null,
    name: "Timeagotchi",
    tagline: "Productivity",
    description: "Time tracking disguised as a tamagotchi. Your pet lives by your productivity.",
    href: "https://timeagotchi.thehelpfuldev.com/",
    month: 3,
    accentClass: "text-orange-600 bg-orange-50 border-orange-100",
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

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "The Helpful Dev",
  url: "https://thehelpfuldev.com",
  description:
    "One developer. 12 months. 12 AI-built apps. Shipping in public and writing about every lesson learned.",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "The Helpful Dev",
  url: "https://thehelpfuldev.com",
  logo: "https://thehelpfuldev.com/icon.png",
  sameAs: ["https://ko-fi.com/robogirl96"],
};

const progressPct = Math.round((CHALLENGE.currentMonth / CHALLENGE.totalMonths) * 100);

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900 font-sans">

      <JsonLd data={websiteJsonLd} />
      <JsonLd data={organizationJsonLd} />
      {appsJsonLd.map((app) => (
        <JsonLd key={(app as { name: string }).name} data={app} />
      ))}

      {/* HERO */}
      <section className="hero-grid bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-20 lg:py-28 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-100 text-cyan-700 text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" aria-hidden="true" />
              Month {CHALLENGE.currentMonth} of {CHALLENGE.totalMonths} · Building in public
            </div>

            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-slate-900 leading-tight mb-6">
              One dev.{" "}
              <span className="gradient-text">12 months.</span>
              <br />
              12 AI&#8209;built apps.
            </h1>

            <p className="text-lg lg:text-xl text-slate-500 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
              I&apos;m shipping one app a month using AI tools — and writing honestly about what worked,
              what broke, and what I actually learned. No hype. Just the journey.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Link
                href="/blog"
                className="px-6 py-3 rounded-lg bg-cyan-600 text-white font-semibold hover:bg-cyan-700 transition-colors text-sm"
              >
                Read the blog →
              </Link>
              <a
                href="#apps"
                className="px-6 py-3 rounded-lg border border-slate-300 text-slate-700 font-semibold hover:border-cyan-400 hover:text-cyan-600 transition-colors text-sm"
              >
                See the apps
              </a>
            </div>
          </div>

          {/* Challenge progress card */}
          <div className="flex-shrink-0 w-full max-w-sm lg:max-w-xs">
            <div className="bg-slate-50 rounded-2xl border border-slate-200 shadow-xl p-6 space-y-5">
              <div className="flex items-center justify-between">
                <Image
                  src="/logo.svg"
                  alt="The Helpful Dev"
                  width={120}
                  height={36}
                  className="object-contain"
                />
                <span className="text-xs font-semibold text-cyan-700 bg-cyan-50 border border-cyan-100 px-2.5 py-1 rounded-full">
                  {CHALLENGE.year} Challenge
                </span>
              </div>

              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="font-medium text-slate-700">Progress</span>
                  <span className="text-slate-500">Month {CHALLENGE.currentMonth} / {CHALLENGE.totalMonths}</span>
                </div>
                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-teal-600 transition-all"
                    style={{ width: `${progressPct}%` }}
                    role="progressbar"
                    aria-valuenow={progressPct}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${progressPct}% through the challenge`}
                  />
                </div>
              </div>

              <dl className="grid grid-cols-3 gap-3 text-center">
                {[
                  { value: String(CHALLENGE.appsShipped), label: "Apps shipped" },
                  { value: String(posts.length), label: "Blog posts" },
                  { value: `${CHALLENGE.totalMonths - CHALLENGE.currentMonth}`, label: "Months left" },
                ].map(({ value, label }) => (
                  <div key={label} className="bg-white rounded-xl border border-slate-100 py-3">
                    <dd className="text-xl font-bold text-slate-900">{value}</dd>
                    <dt className="text-xs text-slate-500 mt-0.5 leading-tight">{label}</dt>
                  </div>
                ))}
              </dl>

              <p className="text-xs text-slate-400 text-center leading-relaxed">
                All apps are free, open source, and run entirely in your browser.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* LATEST FROM THE BLOG */}
      <section className="border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-slate-900">
                Latest from the <span className="gradient-text">blog</span>
              </h2>
              <p className="text-slate-500 mt-1 text-sm">
                Honest write-ups on building with AI — tools, failures, and lessons.
              </p>
            </div>
            <Link
              href="/blog"
              className="hidden sm:inline-flex text-sm font-medium text-cyan-600 hover:text-cyan-700 transition-colors shrink-0"
            >
              All posts →
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-white border border-slate-200 rounded-2xl p-5 card-hover block"
              >
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-cyan-50 border border-cyan-100 text-cyan-700 text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-base font-semibold text-slate-900 mb-2 group-hover:text-cyan-700 transition-colors leading-snug line-clamp-3">
                  {post.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-2">
                  {post.description}
                </p>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  <span>·</span>
                  <span>{post.readTime}</span>
                </div>
              </Link>
            ))}

            {/* Teaser card for future posts */}
            <div className="bg-slate-50 border border-dashed border-slate-200 rounded-2xl p-5 flex flex-col items-center justify-center text-center gap-3 min-h-[180px]">
              <span className="text-2xl">✍️</span>
              <p className="text-sm text-slate-400 leading-relaxed">
                More posts coming each month as new apps ship.
              </p>
              <a
                href="#newsletter"
                className="text-xs font-semibold text-cyan-600 hover:text-cyan-700 transition-colors"
              >
                Get notified →
              </a>
            </div>
          </div>

          <Link
            href="/blog"
            className="sm:hidden mt-6 inline-flex text-sm font-medium text-cyan-600 hover:text-cyan-700 transition-colors"
          >
            All posts →
          </Link>
        </div>
      </section>

      {/* APPS SHIPPED */}
      <section id="apps" className="scroll-mt-20 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900">
              Apps shipped so far
            </h2>
            <p className="text-slate-500 mt-1 text-sm">
              {CHALLENGE.appsShipped} of 12 · No login. No data collected. Everything runs in your browser.
            </p>
          </div>

          <AppsCarousel apps={apps} />
        </div>
      </section>

      {/* NEWSLETTER */}
      <section id="newsletter" className="gradient-cta scroll-mt-20">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center text-white">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Follow the journey.</h2>
          <p className="text-cyan-100 text-lg mb-8 max-w-xl mx-auto leading-relaxed">
            Get a note when a new app ships or a new post goes up. No spam — just an indie dev
            building in public, one month at a time.
          </p>
          <NewsletterForm variant="dark" />
          <p className="mt-8 text-cyan-200 text-sm">
            Or{" "}
            <a
              href="https://ko-fi.com/robogirl96"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Buy me a coffee on Ko-fi (opens in new tab)"
              className="underline underline-offset-2 hover:text-white transition-colors"
            >
              buy me a coffee ☕
            </a>{" "}
            if a tool made your day easier.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <Image src="/logo.svg" alt="The Helpful Dev" width={28} height={28} sizes="28px" />
              <span className="font-bold text-slate-900">The Helpful Dev</span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">
              Shipping 12 AI-built apps in {CHALLENGE.year} and writing about every lesson. Open source and privacy-first.
            </p>
            <a
              href="https://ko-fi.com/robogirl96"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Support on Ko-fi (opens in new tab)"
              className="inline-flex items-center gap-1.5 mt-4 text-sm text-slate-500 hover:text-cyan-600 transition-colors"
            >
              ☕ Support on Ko-fi
            </a>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-3 uppercase tracking-wider">
              Apps
            </h3>
            <ul className="space-y-2">
              {footerApps.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${label} (opens in new tab)`}
                    className="text-sm text-slate-500 hover:text-cyan-600 transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-3 uppercase tracking-wider">
              Read
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/blog" className="text-slate-500 hover:text-cyan-600 transition-colors">
                  Blog
                </Link>
              </li>
              {posts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-slate-500 hover:text-cyan-600 transition-colors line-clamp-1"
                  >
                    {post.title.split(":")[0]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-3 uppercase tracking-wider">
              Connect
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#newsletter"
                  className="text-sm text-slate-500 hover:text-cyan-600 transition-colors"
                >
                  Newsletter
                </a>
              </li>
              <li>
                <a
                  href="https://ko-fi.com/robogirl96"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Ko-fi (opens in new tab)"
                  className="text-sm text-slate-500 hover:text-cyan-600 transition-colors"
                >
                  Ko-fi
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-slate-100">
          <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-xs text-slate-400">
              © {new Date().getFullYear()} The Helpful Dev. Built with care (and a lot of AI).
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="/privacy"
                className="text-xs text-slate-400 hover:text-cyan-600 transition-colors underline underline-offset-2"
              >
                Privacy Policy
              </Link>
              <p className="text-xs text-slate-400">
                Privacy-first · No sign-up required · Your data stays local
              </p>
            </div>
          </div>
        </div>
      </footer>

    </main>
  );
}
