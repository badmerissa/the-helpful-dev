import Image from "next/image";
import Link from "next/link";
import NewsletterForm from "./components/NewsletterForm";
import JsonLd from "./components/JsonLd";
import AppsCarousel from "./components/AppsCarousel";
import BlogSection from "./components/BlogSection";
import DarkModeToggle from "./components/DarkModeToggle";
import { appsJsonLd, carouselApps } from "@/lib/app-data";
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
    <main className="min-h-screen bg-white dark:bg-[#0d1117] text-slate-900 dark:text-[#e6edf3] font-sans">

      <JsonLd data={websiteJsonLd} />
      <JsonLd data={organizationJsonLd} />
      {appsJsonLd.map((app) => (
        <JsonLd key={(app as { name: string }).name} data={app} />
      ))}

      {/* HERO */}
      <section className="hero-grid bg-white dark:bg-[#0d1117] border-b border-slate-100 dark:border-[#30363d]">
        <div className="max-w-6xl mx-auto px-6 py-20 lg:py-28 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          <div className="flex-1 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-between mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-100 dark:border-cyan-800/50 text-cyan-700 dark:text-cyan-300 text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-cyan-500 badge-glow" aria-hidden="true" />
              Month {CHALLENGE.currentMonth} of {CHALLENGE.totalMonths} · Building in public
              </div>
              <DarkModeToggle />
            </div>

            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-slate-900 dark:text-[#e6edf3] leading-tight mb-6">
              One dev.{" "}
              <span className="gradient-text">12 months.</span>
              <br />
              12 AI&#8209;built apps.
            </h1>

            <p className="text-lg lg:text-xl text-slate-500 dark:text-[#8b949e] leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
              I&apos;m shipping one app a month using AI tools — and writing honestly about what worked,
              what broke, and what I actually learned. No hype. Just the journey.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Link
                href="/blog"
                className="px-6 py-3 rounded-lg bg-cyan-600 text-white font-semibold hover:bg-cyan-700 transition-colors text-sm btn-press btn-shimmer"
              >
                Read the blog →
              </Link>
              <Link
                href="/apps"
                className="px-6 py-3 rounded-lg border border-slate-300 dark:border-[#30363d] text-slate-700 dark:text-[#8b949e] font-semibold hover:border-cyan-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors text-sm"
              >
                See the apps
              </Link>
            </div>
          </div>

          {/* Challenge progress card */}
          <div className="flex-shrink-0 w-full max-w-sm lg:max-w-xs">
            <div className="bg-slate-50 dark:bg-[#161b22] rounded-2xl border border-slate-200 dark:border-[#30363d] shadow-xl dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] p-6 space-y-5">
              <div className="flex items-center justify-between">
                <Image
                  src="/logo.svg"
                  alt="The Helpful Dev"
                  width={120}
                  height={36}
                  className="object-contain"
                />
                <span className="text-xs font-semibold text-cyan-700 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-100 dark:border-cyan-800/50 px-2.5 py-1 rounded-full">
                  {CHALLENGE.year} Challenge
                </span>
              </div>

              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="font-medium text-slate-700 dark:text-[#e6edf3]">Progress</span>
                  <span className="text-slate-500 dark:text-[#8b949e]">Month {CHALLENGE.currentMonth} / {CHALLENGE.totalMonths}</span>
                </div>
                <div className="h-2 bg-slate-200 dark:bg-[#30363d] rounded-full overflow-hidden">
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
                  <div key={label} className="bg-white dark:bg-[#1c2128] rounded-xl border border-slate-100 dark:border-[#30363d] py-3">
                    <dd className="text-xl font-bold text-slate-900 dark:text-[#e6edf3]">{value}</dd>
                    <dt className="text-xs text-slate-500 dark:text-[#8b949e] mt-0.5 leading-tight">{label}</dt>
                  </div>
                ))}
              </dl>

              <p className="text-xs text-slate-400 dark:text-[#6e7681] text-center leading-relaxed">
                All apps are free, open source, and run entirely in your browser.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* LATEST FROM THE BLOG */}
      <section className="border-b border-slate-100 dark:border-[#30363d]">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-[#e6edf3]">
                Latest from the <span className="gradient-text">blog</span>
              </h2>
              <p className="text-slate-500 dark:text-[#8b949e] mt-1 text-sm">
                Honest write-ups on building with AI — tools, failures, and lessons.
              </p>
            </div>
            <Link
              href="/blog"
              className="hidden sm:inline-flex text-sm font-medium text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors shrink-0"
            >
              All posts →
            </Link>
          </div>

          <BlogSection posts={posts} />

          <Link
            href="/blog"
            className="sm:hidden mt-6 inline-flex text-sm font-medium text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors"
          >
            All posts →
          </Link>
        </div>
      </section>

      {/* APPS SHIPPED */}
      <section id="apps" className="scroll-mt-20 border-b border-slate-100 dark:border-[#30363d]">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-[#e6edf3]">
                Apps shipped so far
              </h2>
              <p className="text-slate-500 dark:text-[#8b949e] mt-1 text-sm">
                {CHALLENGE.appsShipped} of 12 · No login. No data collected. Everything runs in your browser.
              </p>
            </div>
            <Link
              href="/apps"
              className="hidden sm:inline-flex text-sm font-medium text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors shrink-0"
            >
              All apps →
            </Link>
          </div>

          <AppsCarousel apps={carouselApps} />

          <Link
            href="/apps"
            className="sm:hidden mt-6 inline-flex text-sm font-medium text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors"
          >
            All apps →
          </Link>
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
      <footer className="bg-white dark:bg-[#0d1117] border-t border-slate-200 dark:border-[#30363d]">
        <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <Image src="/logo.svg" alt="The Helpful Dev" width={28} height={28} sizes="28px" />
              <span className="font-bold text-slate-900 dark:text-[#e6edf3]">The Helpful Dev</span>
            </div>
            <p className="text-sm text-slate-500 dark:text-[#8b949e] leading-relaxed">
              Shipping 12 AI-built apps in {CHALLENGE.year} and writing about every lesson. Open source and privacy-first.
            </p>
            <a
              href="https://ko-fi.com/robogirl96"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Support on Ko-fi (opens in new tab)"
              className="inline-flex items-center gap-1.5 mt-4 text-sm text-slate-500 dark:text-[#8b949e] hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
            >
              ☕ Support on Ko-fi
            </a>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-[#e6edf3] mb-3 uppercase tracking-wider">
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
                    className="text-sm text-slate-500 dark:text-[#8b949e] hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-[#e6edf3] mb-3 uppercase tracking-wider">
              Read
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/blog" className="text-slate-500 dark:text-[#8b949e] hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  Blog
                </Link>
              </li>
              {posts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-slate-500 dark:text-[#8b949e] hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors line-clamp-1"
                  >
                    {post.title.split(":")[0]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-[#e6edf3] mb-3 uppercase tracking-wider">
              Connect
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#newsletter"
                  className="text-sm text-slate-500 dark:text-[#8b949e] hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
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
                  className="text-sm text-slate-500 dark:text-[#8b949e] hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                >
                  Ko-fi
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-slate-100 dark:border-[#30363d]">
          <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-xs text-slate-400 dark:text-[#6e7681]">
              © {new Date().getFullYear()} The Helpful Dev. Built with care (and a lot of AI).
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="/privacy"
                className="text-xs text-slate-400 dark:text-[#6e7681] hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors underline underline-offset-2"
              >
                Privacy Policy
              </Link>
              <p className="text-xs text-slate-400 dark:text-[#6e7681]">
                Privacy-first · No sign-up required · Your data stays local
              </p>
            </div>
          </div>
        </div>
      </footer>

    </main>
  );
}
