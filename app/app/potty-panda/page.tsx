import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { pottyAppJsonLd } from "@/lib/app-data";

export const metadata: Metadata = {
  title: "Potty Panda — Free Potty Training App for Toddlers",
  description:
    "A free browser-based potty training app for parents. Log successes and accidents, set potty timers, and track streaks — no account, no data collection.",
  alternates: {
    canonical: "https://thehelpfuldev.com/app/potty-panda",
  },
  openGraph: {
    title: "Potty Panda — Free Potty Training App for Toddlers",
    description:
      "A free browser-based potty training app for parents. Log successes and accidents, set potty timers, and track streaks — no account, no data collection.",
    url: "https://thehelpfuldev.com/app/potty-panda",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is Potty Panda free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, Potty Panda is completely free. There are no paid tiers, no premium features locked behind a subscription, and no in-app purchases.",
      },
    },
    {
      "@type": "Question",
      name: "Does Potty Panda store my child's data?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "All data is stored locally in your browser. Nothing is sent to a server. Your child's potty training records never leave your device.",
      },
    },
    {
      "@type": "Question",
      name: "What age is Potty Panda designed for?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Potty Panda is designed to support toddlers typically between 18 months and 4 years old who are beginning or progressing through potty training. The app is used by parents or caregivers, not the child directly.",
      },
    },
    {
      "@type": "Question",
      name: "How does the potty timer work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The built-in sit-on-potty timer lets you set a countdown for how long your child sits on the potty during a training session. It provides a consistent structure that many potty training methods recommend, reducing negotiation and uncertainty for both parent and child.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use Potty Panda on my phone?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Potty Panda is a web app that works in any modern browser on any device. Open it on your phone and log from wherever you are — no download or installation required.",
      },
    },
  ],
};

export default function PottyPandaPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900 font-sans">
      {/*
        WARNING: dangerouslySetInnerHTML is used here for JSON-LD script injection.
        Data is static — do NOT interpolate dynamic/user-supplied values without sanitising first.
      */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pottyAppJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* HERO */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-6 py-16 lg:py-24">
          <div className="flex items-center gap-3 mb-6">
            <Link href="/" className="text-sm text-slate-400 hover:text-cyan-600 transition-colors">
              ← The Helpful Dev
            </Link>
            <span className="text-slate-200">/</span>
            <span className="text-sm text-slate-400">Potty Panda</span>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-cyan-50 flex items-center justify-center">
              <Image src="/pp-icon.png" alt="" width={32} height={32} sizes="32px" className="object-contain" />
            </div>
            <span className="text-xs font-bold px-2 py-1 rounded-full bg-green-100 text-green-700">
              LIVE
            </span>
          </div>

          <p className="text-sm font-semibold text-cyan-600 mb-3 uppercase tracking-widest">
            Parenting Tools
          </p>
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-tight mb-6">
            Potty Panda —{" "}
            <span className="text-cyan-600">Free Potty Training App for Toddlers</span>
          </h1>
          <p className="text-xl text-slate-500 leading-relaxed mb-8 max-w-2xl">
            Logging and timer tools to guide parents through the potty training journey — with a
            friendly panda cheering you on. No sign-up. No data collected. Just a simple tool
            that makes a stressful milestone a little easier.
          </p>
          <a
            href="https://pottypanda.thehelpfuldev.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-cyan-600 text-white font-semibold hover:bg-cyan-700 transition-colors"
          >
            Open Potty Panda →
          </a>
        </div>
      </section>

      {/* THE CHALLENGE */}
      <section className="py-16 border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-6">
            Why potty training is hard to track
          </h2>
          <div className="space-y-4 text-slate-600 leading-relaxed">
            <p>
              Potty training is one of the more exhausting early parenting milestones. Progress is
              non-linear: a great day of dry pants is followed by three accidents and a meltdown.
              Without a consistent log, it is almost impossible to spot patterns — whether your
              toddler tends to need the potty 20 minutes after eating, or whether afternoons are
              consistently harder than mornings.
            </p>
            <p>
              Most parents resort to sticky notes, mental tallies, or blurry photos of a
              whiteboard. These methods fall apart when you are sleep-deprived, when the
              childminder is handling the day, or when you want to report progress to a
              health visitor. A simple, portable, one-tap log solves all of that.
            </p>
            <p>
              Potty Panda gives you the essentials — success/accident logging, a sit-on-potty
              timer, and streak tracking — in a clean interface you can open from any phone or
              browser in a few seconds.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-16 border-b border-slate-100 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-8">
            What Potty Panda includes
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                title: "One-tap logging",
                desc: "Log a success or an accident with a single tap. No forms, no dropdowns — just instant capture while you are in the middle of handling a toddler.",
              },
              {
                title: "Sit-on-potty timer",
                desc: "Set a countdown for how long your child sits on the potty. Structured sit times reduce anxiety for children and make sessions more consistent.",
              },
              {
                title: "Streak tracking",
                desc: "Celebrate progress with streak counters. Keeping a visual record of accident-free days gives children something to be proud of and parents a clear sense of direction.",
              },
            ].map((f) => (
              <div key={f.title} className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="font-bold text-slate-900 mb-2">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRIVACY */}
      <section className="py-16 border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-6">
            Your child&apos;s data stays on your device
          </h2>
          <div className="space-y-4 text-slate-600 leading-relaxed">
            <p>
              Potty Panda stores all log entries in your browser&apos;s local storage. There is no
              account, no cloud sync, and no server. When you close and reopen the app, your history
              is there. When you clear your browser data, it is gone — entirely under your control.
            </p>
            <p>
              This matters for a parenting app. You should not need to hand over your child&apos;s
              health and behaviour data to a company to get a simple timer and log. Potty Panda was
              built on the principle that the simplest tool is often the most trustworthy one.
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
            Start tracking potty training today
          </h2>
          <p className="text-slate-500 mb-8 max-w-xl mx-auto">
            Open in your browser — no download, no sign-up, no fuss.
          </p>
          <a
            href="https://pottypanda.thehelpfuldev.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-cyan-600 text-white font-semibold hover:bg-cyan-700 transition-colors"
          >
            Open Potty Panda →
          </a>
        </div>
      </section>
    </main>
  );
}
