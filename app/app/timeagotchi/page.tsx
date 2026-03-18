import type { Metadata } from "next";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot } from "@fortawesome/free-solid-svg-icons";
import { timeagotchiAppJsonLd } from "@/lib/app-data";

export const metadata: Metadata = {
  title: "Timeagotchi — Make Time Tracking Fun with a Virtual Pet",
  description:
    "A free browser-based time tracking app that turns your timesheet into a Tamagotchi. Log hours by feeding your virtual pet. Weekly reports and CSV export included. No login required.",
  alternates: {
    canonical: "https://thehelpfuldev.com/app/timeagotchi",
  },
  openGraph: {
    title: "Timeagotchi — Make Time Tracking Fun with a Virtual Pet",
    description:
      "A free browser-based time tracking app that turns your timesheet into a Tamagotchi. Log hours by feeding your virtual pet. Weekly reports and CSV export included.",
    url: "https://thehelpfuldev.com/app/timeagotchi",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How does Timeagotchi work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You log time by 'feeding' your virtual pet. Each time entry represents a meal for the pet — keep logging consistently and your pet stays happy and healthy. Let your time tracking lapse and your pet suffers. At the end of the week you get a report of all logged entries which you can export to CSV.",
      },
    },
    {
      "@type": "Question",
      name: "Is Timeagotchi free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, Timeagotchi is completely free. No subscription, no premium tier, no payment required.",
      },
    },
    {
      "@type": "Question",
      name: "Can I export my time data?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Timeagotchi includes a CSV export function so you can take your logged hours into any timesheet system, spreadsheet, or project management tool that accepts CSV.",
      },
    },
    {
      "@type": "Question",
      name: "Does Timeagotchi work with my existing timesheet system?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Timeagotchi is not a replacement for your existing system — it is a front-end for capturing time in a way that actually feels tolerable. Log your hours in Timeagotchi throughout the day, then export to CSV and paste the data into whatever system your employer or client requires.",
      },
    },
    {
      "@type": "Question",
      name: "Is my time tracking data private?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "All data is stored in your browser's local storage. Nothing is sent to a server. Your work entries, project names, and hours are entirely private.",
      },
    },
  ],
};

export default function TimeagotchiPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900 font-sans">
      {/*
        WARNING: dangerouslySetInnerHTML is used here for JSON-LD script injection.
        Data is static — do NOT interpolate dynamic/user-supplied values without sanitising first.
      */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(timeagotchiAppJsonLd) }}
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
            <span className="text-sm text-slate-400">Timeagotchi</span>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center">
              <FontAwesomeIcon icon={faRobot} className="w-7 h-7 text-slate-400" />
            </div>
            <span className="text-xs font-bold px-2 py-1 rounded-full bg-green-100 text-green-700">
              LIVE
            </span>
          </div>

          <p className="text-sm font-semibold text-cyan-600 mb-3 uppercase tracking-widest">
            Productivity
          </p>
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-tight mb-6">
            Timeagotchi —{" "}
            <span className="text-cyan-600">Turn Your Timesheet Into a Virtual Pet</span>
          </h1>
          <p className="text-xl text-slate-500 leading-relaxed mb-8 max-w-2xl">
            Hate filling in timesheets? Timeagotchi turns your time tracking into an interactive
            Tamagotchi-style experience. Log hours by feeding your virtual pet. Weekly reports
            and CSV export included. No login required.
          </p>
          <a
            href="https://timeagotchi.thehelpfuldev.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-cyan-600 text-white font-semibold hover:bg-cyan-700 transition-colors"
          >
            Open Timeagotchi →
          </a>
        </div>
      </section>

      {/* THE PROBLEM */}
      <section className="py-16 border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-6">
            Why nobody fills in their timesheet on time
          </h2>
          <div className="space-y-4 text-slate-600 leading-relaxed">
            <p>
              Time tracking is one of those tasks that everyone agrees is important and almost
              nobody does well. The problem is not laziness — it is that logging time is
              cognitively disruptive. Switching from doing the work to recording the work breaks
              flow, and so it gets deferred. By Friday afternoon you are trying to reconstruct four
              days of context from a calendar that does not tell the full story.
            </p>
            <p>
              Most timesheet tools make this worse by being slow, over-engineered, or buried three
              clicks deep in a project management platform. The friction is too high for casual,
              frequent updates — which is exactly what good time tracking requires.
            </p>
            <p>
              Timeagotchi removes the friction by reframing the entire act. You are not filling in
              a form. You are feeding a pet. The gamification is not superficial — it creates a
              genuine behavioural incentive to log consistently throughout the day rather than
              reconstructing everything at the end of the week.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-16 border-b border-slate-100 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-8">
            What Timeagotchi includes
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                title: "Virtual pet time logging",
                desc: "Log a time entry and feed your pet. The pet's health reflects how consistently you are tracking. Irregular logging has visible consequences — in the best possible way.",
              },
              {
                title: "Weekly review report",
                desc: "At the end of each week, Timeagotchi generates a summary of all your logged entries. Review what you worked on, identify gaps, and plan the week ahead.",
              },
              {
                title: "CSV export",
                desc: "Export your time log to CSV at any point. Paste the data into your employer's system, a spreadsheet, or any tool that accepts CSV — no lock-in.",
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

      {/* HOW IT FITS YOUR WORKFLOW */}
      <section className="py-16 border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-6">
            How it fits into your existing workflow
          </h2>
          <div className="space-y-4 text-slate-600 leading-relaxed">
            <p>
              Timeagotchi is not trying to replace Jira, Harvest, or your company&apos;s approved
              timesheet system. It is the capture layer that makes those systems tolerable.
              Keep a Timeagotchi tab open all day. When you finish a task, log it — the interaction
              takes five seconds. At the end of the week, export to CSV and copy the data wherever
              it needs to go.
            </p>
            <p>
              The weekly report is particularly useful for client work and contracting, where you
              need to produce accurate invoices or status updates. Having a clean log of what you
              actually did — not what you think you did — removes the guesswork and protects you
              in any billing dispute.
            </p>
            <p>
              All data stays in your browser. Nothing is synced to a server, which means it is
              entirely private and works offline once loaded. Your client names, project codes, and
              hours are visible only to you.
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
            Make time tracking something you actually do
          </h2>
          <p className="text-slate-500 mb-8 max-w-xl mx-auto">
            Open in your browser — no download, no sign-up, no subscription.
          </p>
          <a
            href="https://timeagotchi.thehelpfuldev.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-cyan-600 text-white font-semibold hover:bg-cyan-700 transition-colors"
          >
            Open Timeagotchi →
          </a>
        </div>
      </section>
    </main>
  );
}
