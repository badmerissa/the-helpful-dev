import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { fastingAppJsonLd } from "@/lib/app-data";
import JsonLd from "@/app/components/JsonLd";

export const metadata: Metadata = {
  title: "Intermittent Fasting Tracker — Free, No Login Required",
  description:
    "A free browser-based intermittent fasting tracker. Supports 16:8, 20:4, OMAD, and 5:2 protocols. No account, no data collection — your fasting data stays on your device.",
  alternates: {
    canonical: "https://thehelpfuldev.com/app/fasting",
  },
  openGraph: {
    title: "Intermittent Fasting Tracker — Free, No Login Required",
    description:
      "A free browser-based intermittent fasting tracker. Supports 16:8, 20:4, OMAD, and 5:2 protocols. No account, no data collection.",
    url: "https://thehelpfuldev.com/app/fasting",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Does the fasting tracker save my data?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Your fasting data is stored locally in your browser. Nothing is sent to any server. If you clear your browser storage, the data is gone — no account, no cloud sync.",
      },
    },
    {
      "@type": "Question",
      name: "Which fasting protocols does the tracker support?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The tracker supports the most popular intermittent fasting protocols: 16:8 (fast 16 hours, eat within an 8-hour window), 20:4 (fast 20 hours, eat within a 4-hour window), OMAD (One Meal A Day, a 23:1 protocol), and 5:2 (eat normally five days a week, restrict calories on two non-consecutive days).",
      },
    },
    {
      "@type": "Question",
      name: "Do I need to create an account?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No account is required. Open the app and start tracking immediately. There is no sign-up, no email, and no password.",
      },
    },
    {
      "@type": "Question",
      name: "Does it work on mobile?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The app runs entirely in your browser and is fully responsive. It works on any device with a modern browser — phone, tablet, or desktop.",
      },
    },
    {
      "@type": "Question",
      name: "Is the fasting tracker free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Completely free. There are no paid tiers, no premium features, and no subscription.",
      },
    },
  ],
};

export default function FastingPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900 font-sans">
      <JsonLd data={fastingAppJsonLd} />
      <JsonLd data={faqJsonLd} />

      {/* HERO */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-6 py-16 lg:py-24">
          <div className="flex items-center gap-3 mb-6">
            <Link href="/" className="text-sm text-slate-400 hover:text-cyan-600 transition-colors">
              ← The Helpful Dev
            </Link>
            <span className="text-slate-200">/</span>
            <span className="text-sm text-slate-400">Fasting Tracker</span>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-cyan-50 flex items-center justify-center">
              <Image src="/f-icon.png" alt="" width={32} height={32} sizes="32px" className="object-contain" />
            </div>
            <span className="text-xs font-bold px-2 py-1 rounded-full bg-green-100 text-green-700">
              LIVE
            </span>
          </div>

          <p className="text-sm font-semibold text-cyan-600 mb-3 uppercase tracking-widest">
            Health &amp; Wellness
          </p>
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-tight mb-6">
            Intermittent Fasting Tracker —{" "}
            <span className="text-cyan-600">Free, No Login Required</span>
          </h1>
          <p className="text-xl text-slate-500 leading-relaxed mb-8 max-w-2xl">
            A distraction-free timer that tracks your fasting windows, keeps your streak going,
            and stays entirely in your browser. No account. No subscription. No data ever leaves
            your device.
          </p>
          <a
            href="https://fasting.thehelpfuldev.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Fasting Tracker (opens in new tab)"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-cyan-600 text-white font-semibold hover:bg-cyan-700 transition-colors"
          >
            Open Fasting Tracker →
          </a>
        </div>
      </section>

      {/* WHAT IS IF */}
      <section className="py-16 border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-6">
            What is intermittent fasting?
          </h2>
          <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-4">
            <p>
              Intermittent fasting (IF) is an eating pattern that cycles between periods of fasting
              and eating. Unlike traditional diets that tell you <em>what</em> to eat, intermittent
              fasting focuses entirely on <em>when</em> you eat. During the fasting window you
              consume no calories — water, black coffee, and plain tea are typically fine.
            </p>
            <p>
              The most popular approach is the <strong>16:8 protocol</strong>: fast for 16 hours,
              then eat all your meals within an 8-hour window. Many people find this maps naturally
              to skipping breakfast and eating between noon and 8 pm. The science behind it centres
              on insulin sensitivity, metabolic flexibility, and the cellular repair process called
              autophagy that kicks in during extended fasting periods.
            </p>
            <p>
              The challenge is not the hunger — most people adapt within a week or two — it is the
              tracking. Without a timer you will find yourself constantly checking the clock,
              uncertain whether you are in your window, and losing track of your streak. That is
              exactly the problem this tracker solves.
            </p>
          </div>
        </div>
      </section>

      {/* PROTOCOLS */}
      <section className="py-16 border-b border-slate-100 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-8">
            Supported fasting protocols
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                name: "16:8",
                title: "16:8 — The Daily Fast",
                desc: "Fast for 16 hours, eat within an 8-hour window. The most widely followed protocol and the easiest to sustain long-term. A noon–8 pm eating window fits most schedules without skipping dinner.",
              },
              {
                name: "20:4",
                title: "20:4 — The Warrior Diet",
                desc: "Fast for 20 hours, compress eating into a 4-hour window. Popular with people who prefer one large meal per day plus a small eating window, without committing to OMAD.",
              },
              {
                name: "OMAD",
                title: "OMAD — One Meal A Day",
                desc: "A 23:1 fasting protocol: one meal, one hour window, the rest is fasting. The most aggressive daily fasting approach. Best suited to experienced fasters who have already adapted to 16:8.",
              },
              {
                name: "5:2",
                title: "5:2 — The Weekly Fast",
                desc: "Eat normally on five days. On two non-consecutive days, restrict intake to around 500 calories. A good option if daily time-restricted eating does not suit your lifestyle.",
              },
            ].map((p) => (
              <div key={p.name} className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-2">{p.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16 border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-6">
            How the tracker works
          </h2>
          <div className="space-y-4 text-slate-600 leading-relaxed">
            <p>
              Open the app, choose your protocol, and press start. A countdown timer shows exactly
              how long you have left in your fasting window. When you break your fast, press stop —
              the app logs the completed fast against your streak. That is the entire workflow.
            </p>
            <p>
              Everything is stored in your browser&apos;s local storage. There is no database, no
              server, and no account. Close the tab, reopen it, and your timer resumes exactly where
              it left off. Your fasting history is private by design — it never travels across a
              network.
            </p>
            <p>
              The app is built to work on any device. Whether you open it on your phone at the
              dinner table or your desktop at work, the responsive layout adapts and the timer
              persists. No installation, no download, no app store.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 border-b border-slate-100 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-8">
            Frequently asked questions
          </h2>
          <div className="space-y-6">
            {faqJsonLd.mainEntity.map((item) => (
              <div key={item.name} className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="font-semibold text-slate-900 mb-2">{item.name}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4">
            Ready to start your fast?
          </h2>
          <p className="text-slate-500 mb-8 max-w-xl mx-auto">
            No sign-up. No download. Open in your browser and start tracking in seconds.
          </p>
          <a
            href="https://fasting.thehelpfuldev.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Fasting Tracker (opens in new tab)"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-cyan-600 text-white font-semibold hover:bg-cyan-700 transition-colors"
          >
            Open Fasting Tracker →
          </a>
        </div>
      </section>
    </main>
  );
}
