import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot } from "@fortawesome/free-solid-svg-icons";
import AppSpotlight from "./components/AppSpotlight";
import NewsletterForm from "./components/NewsletterForm";

function FastingPreview() {
  return (
      <div className="relative w-full h-150 rounded-lg overflow-hidden border border-slate-200">
          {/* The Shield */}
          <div className="absolute inset-0 z-10 bg-transparent cursor-default overflow-hidden"></div>

          {/* The Iframe */}
          <iframe
              src="https://fasting.thehelpfuldev.com/"
              className="w-full h-full border-0 overflow-hidden"
              loading="lazy"
          ></iframe>
      </div>
  );
}

function PottyPreview()
{
  return (
      <div className="relative w-full h-150 rounded-lg overflow-hidden border border-slate-200">
          {/* The Shield */}
          <div className="absolute inset-0 z-10 bg-transparent cursor-default overflow-hidden"></div>

          {/* The Iframe */}
          <iframe
              src="https://pottypanda.thehelpfuldev.com/"
              className="w-full h-full border-0 overflow-hidden"
              loading="lazy"
          ></iframe>
      </div>
  );
}

function UnvailPreview() {
  return (
      <div className="relative w-full h-150 rounded-lg overflow-hidden border border-slate-200">
          {/* The Shield */}
          <div className="absolute inset-0 z-10 bg-transparent cursor-default overflow-hidden"></div>

          {/* The Iframe */}
          <iframe
              src="https://unvail.thehelpfuldev.com/"
              className="w-full h-full border-0 overflow-hidden"
              loading="lazy"
          ></iframe>
      </div>
  );
}

function TimeagotchiPreview() {
    return (
        <div className="relative w-full h-150 rounded-lg overflow-hidden border border-slate-200">
            {/* The Shield */}
            <div className="absolute inset-0 z-10 bg-transparent cursor-default overflow-hidden"></div>

            {/* The Iframe */}
            <iframe
                src="https://timeagotchi.thehelpfuldev.com/"
                className="w-full h-full border-0 overflow-hidden"
                loading="lazy"
            ></iframe>
        </div>
    );
}

const footerApps = [
  { label: "Fasting Tracker", href: "https://fasting.thehelpfuldev.com/", disabled: false },
  { label: "Potty Panda", href: "https://pottypanda.thehelpfuldev.com/", disabled: false },
  { label: "unvAIl", href: "https://unvail.thehelpfuldev.com/", disabled: false },
  { label: "Timeagotchi", href: "https://timeagotchi.thehelpfuldev.com/", disabled: false },
];

const connectLinks = [
  { label: "Newsletter", href: "#newsletter" },
  { label: "Ko-fi", href: "https://ko-fi.com/robogirl96" },
];

const categories = [
  { label: "Health & Wellness", href: "/app/fasting" },
  { label: "Parenting", href: "/app/potty-panda" },
  { label: "Daily Games", href: "/app/unvail" },
  { label: "Productivity", href: "/app/timeagotchi" },
];

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "The Helpful Dev",
  url: "https://thehelpfuldev.com",
  description:
    "Free browser-based tools for intermittent fasting, potty training, and daily games. No login. No data collected. Built by an indie dev.",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "The Helpful Dev",
  url: "https://thehelpfuldev.com",
  logo: "https://thehelpfuldev.com/icon.png",
  sameAs: ["https://ko-fi.com/robogirl96"],
};

const appsJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Intermittent Fasting Tracker",
    applicationCategory: "HealthApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    url: "https://fasting.thehelpfuldev.com/",
    description:
      "A distraction-free browser-based timer to track your fasting windows. Supports 16:8, 20:4, and OMAD protocols. No account needed.",
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Potty Panda",
    applicationCategory: "LifestyleApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    url: "https://pottypanda.thehelpfuldev.com/",
    description:
      "Logging and timer tools to guide parents through the potty training journey. Track successes, accidents, and streaks with one tap.",
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "unvAIl",
    applicationCategory: "GameApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    url: "https://unvail.thehelpfuldev.com/",
    description:
      "A daily reality check game: is the image Real or AI? Train your eye to spot AI-generated content before it fools you.",
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Timeagotchi",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    url: "https://timeagotchi.thehelpfuldev.com/",
    description:
      "Tamagotchi-style time tracking that turns timesheets into a virtual pet experience. Includes weekly reports and CSV export.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900 font-sans">

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      {appsJsonLd.map((app) => (
        <script
          key={app.name}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(app) }}
        />
      ))}

      {/* HERO */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-20 lg:py-28 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-100 text-cyan-700 text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
              4 apps · all free · open source
            </div>

            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-slate-900 leading-tight mb-6">
              Apps built to{" "}
              <span className="gradient-text">actually help</span>
              <br />
              everyday life.
            </h1>

            <p className="text-lg lg:text-xl text-slate-500 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
              Simple, focused tools for life.
              No logins. No data collected. Just stuff that works.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <a
                href="#apps"
                className="px-6 py-3 rounded-lg bg-cyan-600 text-white font-semibold hover:bg-cyan-700 transition-colors text-sm"
              >
                Browse the apps →
              </a>
              <a
                href="#newsletter"
                className="px-6 py-3 rounded-lg border border-slate-300 text-slate-700 font-semibold hover:border-cyan-400 hover:text-cyan-600 transition-colors text-sm"
              >
                Get notified of new apps
              </a>
            </div>
          </div>

          <div className="flex-1 w-full max-w-md lg:max-w-none">
            <div className="bg-slate-50 rounded-2xl border border-slate-200 shadow-xl p-6 space-y-4">
              <div className="text-center py-6">
                <Image
                  src="/logo3.svg"
                  alt="The Helpful Dev"
                  width={500}
                  height={150}
                  sizes="(max-width: 768px) 300px, 500px"
                  className="mx-auto mb-4 object-contain"
                />

              </div>
            </div>
          </div>

        </div>
      </section>


      {/* STATS STRIP */}
      <section className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <dl className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "4", label: "Free Apps" },
              { value: "100%", label: "Runs in Browser" },
              { value: "Open Source", label: "Always" },
              { value: "Utility Apps", label: "That Work" }
            ].map(({ value, label }) => (
              <div key={label}>
                <dt className="text-2xl lg:text-3xl font-bold text-slate-900">{value}</dt>
                <dd className="text-sm text-slate-500 mt-1">{label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* APP SPOTLIGHTS */}
      <div id="apps" className="scroll-mt-20">
        <AppSpotlight
          icon={
            <Image src="/f-icon.png" alt="" width={24} height={24} sizes="24px" className="object-contain" />
          }
          status="LIVE"
          title="Intermittent Fasting Tracker"
          tagline="Health & Wellness"
          description="A distraction-free timer to track your fasting windows. Start a fast, see your progress, and hit your goals — no account needed."
          bullets={[
            "Works entirely in your browser",
            "Tracks multiple fasting protocols (16:8, 20:4, OMAD)",
            "No data ever leaves your device",
          ]}
          href="https://fasting.thehelpfuldev.com/"
          ctaLabel="Open Fasting Tracker"
          previewContent={<FastingPreview />}
        />

        <AppSpotlight
          reverse
          icon={
            <Image src="/pp-icon.png" alt="" width={24} height={24} sizes="24px" className="object-contain" />
          }
          status="LIVE"
          title="Potty Panda"
          tagline="Parenting Tools"
          description="Logging and timer tools to guide parents through the potty training journey — with a friendly panda cheering you on."
          bullets={[
            "Log successes and accidents with one tap",
            "Built-in sit-on-potty timer",
            "Track streaks to celebrate progress",
          ]}
          href="https://pottypanda.thehelpfuldev.com/"
          ctaLabel="Open Potty Panda"
          previewContent={<PottyPreview />}
        />

        <AppSpotlight
          icon={<FontAwesomeIcon icon={faRobot} className="w-5 h-5 text-cyan-600" />}
          status="LIVE"
          title="unvAIl"
          tagline="Daily Game"
          description="A daily reality check game: is the image Real or AI? Train your eye to spot AI-generated content before it fools you."
          bullets={[
            "New challenge every day",
            "Shareable results (Wordle-style)",
            "Instant reveal with explanation",
          ]}
          href="https://unvail.thehelpfuldev.com/"
          ctaLabel="Play Today's Round"
          previewContent={<UnvailPreview />}
        />

        <AppSpotlight
          reverse
          icon={<FontAwesomeIcon icon={faRobot} className="w-5 h-5 text-slate-400" />}
          status="LIVE"
          title="Timeagotchi"
          tagline="Productivity"
          description="Hate filling in timesheets? Timeagotchi turns your time tracking into an interactive tamagotchi-style experience. Your virtual pet lives or dies by your productivity."
          bullets={[
            "Log time by feeding your virtual pet",
            "Weekly review report included",
            "Export to CSV for any time tracking system",
          ]}
          href="https://timeagotchi.thehelpfuldev.com/"
          ctaLabel="Open Timeagotchi"
          previewContent={<TimeagotchiPreview />}
        />
      </div>

      {/* CTA BAND */}
      <section
        id="newsletter"
        className="bg-gradient-to-br from-cyan-400 to-cyan-800 scroll-mt-20"
      >
        <div className="max-w-4xl mx-auto px-6 py-20 text-center text-white">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">More apps are on the way.</h2>
          <p className="text-cyan-100 text-lg mb-8 max-w-xl mx-auto leading-relaxed">
            Subscribe to hear about new tools first. No spam — just a note when something ships.
          </p>
          <NewsletterForm variant="dark" />
          <p className="mt-8 text-cyan-200 text-sm">
            Or{" "}
            <a
              href="https://ko-fi.com/robogirl96"
              target="_blank"
              rel="noopener noreferrer"
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
              <Image src="/logo3.svg" alt="The Helpful Dev" width={28} height={28} sizes="28px" />
              <span className="font-bold text-slate-900">The Helpful Dev</span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">
              Free, privacy-focused tools for everyday problems. Open source and community
              supported.
            </p>
            <a
              href="https://ko-fi.com/robogirl96"
              target="_blank"
              rel="noopener noreferrer"
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
              {footerApps.map(({ label, href, disabled }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={disabled ? undefined : "_blank"}
                    rel={disabled ? undefined : "noopener noreferrer"}
                    aria-disabled={disabled}
                    className={`text-sm transition-colors ${
                      disabled
                        ? "text-slate-300 cursor-not-allowed pointer-events-none"
                        : "text-slate-500 hover:text-cyan-600"
                    }`}
                  >
                    {label}
                    {disabled && (
                      <span className="ml-1.5 text-xs text-slate-300">(soon)</span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-3 uppercase tracking-wider">
              Categories
            </h3>
            <ul className="space-y-2 text-sm text-slate-500">
              {categories.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="hover:text-cyan-600 transition-colors">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-3 uppercase tracking-wider">
              Connect
            </h3>
            <ul className="space-y-2">
              {connectLinks.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-sm text-slate-500 hover:text-cyan-600 transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        <div className="border-t border-slate-100">
          <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-xs text-slate-400">
              © {new Date().getFullYear()} The Helpful Dev. Built with care.
            </p>
            <p className="text-xs text-slate-400">
              Privacy-first · No sign-up required · Your data stays local
            </p>
          </div>
        </div>
      </footer>

    </main>
  );
}
