import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot } from "@fortawesome/free-solid-svg-icons";
import AppSpotlight from "./components/AppSpotlight";
import NewsletterForm from "./components/NewsletterForm";

function FastingPreview() {
  return (
    <div className="text-center py-4 space-y-3">
      <Image src="/f-icon.png" alt="" width={56} height={56} className="mx-auto object-contain" />
      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
          Active fast
        </p>
        <p className="text-5xl font-bold font-mono text-slate-900 mt-1">14:32:07</p>
      </div>
      <div className="h-2 rounded-full bg-slate-200 mx-4 overflow-hidden">
        <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500" />
      </div>
      <p className="text-xs text-slate-500">75% of 20-hour goal · Est. end 6:00 AM</p>
      <div className="flex justify-center gap-3 pt-2">
        <span className="px-3 py-1 rounded-full bg-red-100 text-red-600 text-xs font-semibold">
          Stop Fast
        </span>
        <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold">
          Change Goal
        </span>
      </div>
    </div>
  );
}

function PottyPreview() {
  const entries = [
    { time: "8:14 AM", type: "Success", emoji: "✅" },
    { time: "10:32 AM", type: "Accident", emoji: "💧" },
    { time: "1:05 PM", type: "Success", emoji: "✅" },
    { time: "3:48 PM", type: "Success", emoji: "✅" },
  ];

  return (
    <div className="space-y-3 py-2">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-slate-700">Today&apos;s Log</span>
        <span className="text-xs text-slate-400">Day 12 🐼</span>
      </div>
      {entries.map((entry) => (
        <div
          key={entry.time}
          className="flex items-center justify-between bg-white rounded-lg border border-slate-200 px-3 py-2"
        >
          <span className="text-xs text-slate-400">{entry.time}</span>
          <span className="text-sm font-medium text-slate-700">
            {entry.emoji} {entry.type}
          </span>
        </div>
      ))}
      <div className="flex items-center gap-2 bg-green-50 rounded-lg border border-green-200 px-3 py-2">
        <span className="text-green-600 text-sm font-semibold">3/4 successes today</span>
      </div>
    </div>
  );
}

function UnvailPreview() {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-slate-700">Today&apos;s Challenge</span>
        <span className="text-xs text-slate-400">#142</span>
      </div>
      <div className="rounded-xl bg-slate-200 h-36 flex items-center justify-center">
        <span className="text-slate-400 text-xs font-medium">📷 Image hidden until you guess</span>
      </div>
      <p className="text-sm text-slate-700 font-medium">
        Is this image <span className="text-indigo-600">Real</span> or{" "}
        <span className="text-violet-600">AI-Generated</span>?
      </p>
      <div className="grid grid-cols-2 gap-2">
        <div className="py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold text-center">
          Real 📷
        </div>
        <div className="py-2 rounded-lg bg-violet-600 text-white text-sm font-semibold text-center">
          AI 🤖
        </div>
      </div>
    </div>
  );
}

function TimeagotchiPreview() {
  const tasks = ["Design work", "Meetings", "Development"];

  return (
    <div className="text-center py-6 space-y-4">
      <div className="w-20 h-20 mx-auto rounded-2xl bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center">
        <span className="text-3xl">🥚</span>
      </div>
      <div>
        <p className="text-sm font-semibold text-slate-700">Your pet is waiting...</p>
        <p className="text-xs text-slate-400 mt-1">Start logging time to hatch your companion</p>
      </div>
      <div className="space-y-2 text-left">
        {tasks.map((task) => (
          <div
            key={task}
            className="flex items-center justify-between bg-white rounded-lg border border-slate-200 px-3 py-2"
          >
            <span className="text-xs text-slate-500">{task}</span>
            <span className="text-xs text-slate-300">0:00</span>
          </div>
        ))}
      </div>
      <span className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-400 text-xs font-semibold">
        Coming soon
      </span>
    </div>
  );
}

const footerApps = [
  { label: "Fasting Tracker", href: "https://fasting.thehelpfuldev.com/", disabled: false },
  { label: "Potty Panda", href: "https://pottypanda.thehelpfuldev.com/", disabled: false },
  { label: "unvAIl", href: "https://unvail.thehelpfuldev.com/", disabled: false },
  { label: "Timeagotchi", href: "#", disabled: true },
];

const connectLinks = [
  { label: "Newsletter", href: "#newsletter" },
  { label: "Ko-fi", href: "https://ko-fi.com/robogirl96" },
];

const categories = ["Health & Wellness", "Parenting", "Daily Games", "Productivity"];

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900 font-sans">

      {/* HERO */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-20 lg:py-28 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
              4 apps · all free · open source
            </div>

            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-slate-900 leading-tight mb-6">
              Apps built to{" "}
              <span className="gradient-text">actually help</span>
              <br />
              everyday life.
            </h1>

            <p className="text-lg lg:text-xl text-slate-500 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
              Simple, focused tools for health tracking, parenting, and fun.
              No logins. No data collected. Just stuff that works.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <a
                href="#apps"
                className="px-6 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors text-sm"
              >
                Browse the apps →
              </a>
              <a
                href="#newsletter"
                className="px-6 py-3 rounded-lg border border-slate-300 text-slate-700 font-semibold hover:border-indigo-400 hover:text-indigo-600 transition-colors text-sm"
              >
                Get notified of new apps
              </a>
            </div>
          </div>

          <div className="flex-1 w-full max-w-md lg:max-w-none">
            <div className="bg-slate-50 rounded-2xl border border-slate-200 shadow-xl p-6 space-y-4">
              <div className="flex items-center gap-1.5 mb-2">
                <span className="w-3 h-3 rounded-full bg-red-400" />
                <span className="w-3 h-3 rounded-full bg-yellow-400" />
                <span className="w-3 h-3 rounded-full bg-green-400" />
                <span className="flex-1 mx-3 h-6 rounded-md bg-slate-200 text-xs text-slate-400 flex items-center px-3">
                  fasting.thehelpfuldev.com
                </span>
              </div>
              <div className="text-center py-6">
                <Image
                  src="/f-icon.png"
                  alt="Fasting Tracker"
                  width={64}
                  height={64}
                  className="mx-auto mb-4 object-contain"
                />
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">
                  Fasting Window
                </p>
                <p className="text-4xl font-bold text-slate-900 font-mono">14:32:07</p>
                <p className="text-sm text-slate-500 mt-2">You&apos;re in the zone. Keep going!</p>
                <div className="mt-4 h-2 rounded-full bg-slate-200 overflow-hidden mx-4">
                  <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500" />
                </div>
                <p className="text-xs text-slate-400 mt-1">75% of your 20-hour goal</p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-400 font-medium">unvAIl — Daily Challenge</p>
                  <p className="text-sm font-semibold text-slate-800 mt-0.5">
                    Is this photo AI or real?
                  </p>
                </div>
                <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold">
                  LIVE
                </span>
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
              { value: "0 bytes", label: "Data Collected" },
              { value: "100%", label: "Runs in Browser" },
              { value: "Open Source", label: "Always" },
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
            <Image src="/f-icon.png" alt="" width={24} height={24} className="object-contain" />
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
            <Image src="/pp-icon.png" alt="" width={24} height={24} className="object-contain" />
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
          icon={<FontAwesomeIcon icon={faRobot} className="w-5 h-5 text-indigo-600" />}
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
          status="COMING SOON"
          title="Timeagotchi"
          tagline="Productivity"
          description="Hate filling in timesheets? Timeagotchi turns your time tracking into an interactive tamagotchi-style experience. Your virtual pet lives or dies by your productivity."
          bullets={[
            "Log time by feeding your virtual pet",
            "Weekly review report included",
            "Export to CSV for any time tracking system",
          ]}
          href="#"
          ctaLabel="Notify Me"
          previewContent={<TimeagotchiPreview />}
        />
      </div>

      {/* CTA BAND */}
      <section
        id="newsletter"
        className="bg-gradient-to-br from-indigo-600 to-violet-600 scroll-mt-20"
      >
        <div className="max-w-4xl mx-auto px-6 py-20 text-center text-white">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">More apps are on the way.</h2>
          <p className="text-indigo-100 text-lg mb-8 max-w-xl mx-auto leading-relaxed">
            Subscribe to hear about new tools first. No spam — just a note when something ships.
          </p>
          <NewsletterForm variant="dark" />
          <p className="mt-8 text-indigo-200 text-sm">
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
              <Image src="/icon.png" alt="The Helpful Dev" width={28} height={28} />
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
              className="inline-flex items-center gap-1.5 mt-4 text-sm text-slate-500 hover:text-indigo-600 transition-colors"
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
                        : "text-slate-500 hover:text-indigo-600"
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
              {categories.map((cat) => (
                <li key={cat}>{cat}</li>
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
                    className="text-sm text-slate-500 hover:text-indigo-600 transition-colors"
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
