import type { Metadata } from "next";
import Link from "next/link";
import { unvailAppJsonLd } from "@/lib/app-data";
import JsonLd from "@/app/components/JsonLd";

export const metadata: Metadata = {
  title: "unvAIl — Daily Real vs. AI Image Detection Game",
  description:
    "A free daily game that challenges you to tell real photos from AI-generated images. New challenge every day. Shareable results. No sign-up required.",
  alternates: {
    canonical: "https://thehelpfuldev.com/app/unvail",
  },
  openGraph: {
    title: "unvAIl — Daily Real vs. AI Image Detection Game",
    description:
      "A free daily game that challenges you to tell real photos from AI-generated images. New challenge every day. Shareable results. No sign-up required.",
    url: "https://thehelpfuldev.com/app/unvail",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How does unvAIl work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Each day you are shown a set of images and asked to identify which are real photographs and which are AI-generated. After submitting your answers you get an instant reveal with an explanation. Your score resets each day with a new challenge.",
      },
    },
    {
      "@type": "Question",
      name: "Is unvAIl free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, unvAIl is completely free. There are no paid tiers, no subscriptions, and no in-app purchases.",
      },
    },
    {
      "@type": "Question",
      name: "How do I share my results?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "After completing the daily challenge, unvAIl generates a shareable results card in a Wordle-style emoji format. Copy it and paste it anywhere — social media, group chats, or wherever you like.",
      },
    },
    {
      "@type": "Question",
      name: "Does unvAIl require an account?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No account is required. Open the app in your browser and play immediately.",
      },
    },
    {
      "@type": "Question",
      name: "Why does being able to spot AI images matter?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "AI-generated images are increasingly used in misinformation, fake reviews, scam profiles, and fabricated news. Training your eye to notice the subtle artefacts in AI images — unusual hands, inconsistent lighting, uncanny textures — is a practical media literacy skill. unvAIl makes that training a daily habit through play.",
      },
    },
  ],
};

export default function UnvailPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900 font-sans">
      <JsonLd data={unvailAppJsonLd} />
      <JsonLd data={faqJsonLd} />

      {/* HERO */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-6 py-16 lg:py-24">
          <div className="flex items-center gap-3 mb-6">
            <Link href="/" className="text-sm text-slate-400 hover:text-cyan-600 transition-colors">
              ← The Helpful Dev
            </Link>
            <span className="text-slate-200">/</span>
            <span className="text-sm text-slate-400">unvAIl</span>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-cyan-50 flex items-center justify-center">
              <svg className="w-7 h-7 text-cyan-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="11" width="18" height="10" rx="2" /><rect x="8" y="15" width="2" height="2" rx="0.5" /><rect x="14" y="15" width="2" height="2" rx="0.5" /><path d="M12 11V7" /><circle cx="12" cy="5" r="2" /><path d="M8 11V9a4 4 0 018 0v2" />
              </svg>
            </div>
            <span className="text-xs font-bold px-2 py-1 rounded-full bg-green-100 text-green-700">
              LIVE
            </span>
          </div>

          <p className="text-sm font-semibold text-cyan-600 mb-3 uppercase tracking-widest">
            Daily Game
          </p>
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-tight mb-6">
            unvAIl —{" "}
            <span className="text-cyan-600">Can You Tell Real from AI?</span>
          </h1>
          <p className="text-xl text-slate-500 leading-relaxed mb-8 max-w-2xl">
            A daily reality check game: is the image Real or AI? Train your eye to spot
            AI-generated content before it fools you. New challenge every day. Shareable
            results. No sign-up, no account, no data collected.
          </p>
          <a
            href="https://unvail.thehelpfuldev.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-cyan-600 text-white font-semibold hover:bg-cyan-700 transition-colors"
          >
            Play Today&apos;s Round →
          </a>
        </div>
      </section>

      {/* WHY IT MATTERS */}
      <section className="py-16 border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-6">
            Why spotting AI images is a real skill
          </h2>
          <div className="space-y-4 text-slate-600 leading-relaxed">
            <p>
              In 2024, AI image generation crossed a threshold. Tools like Midjourney, DALL-E, and
              Stable Diffusion can now produce photorealistic images that fool most people on first
              glance. These images are appearing in news articles, product reviews, social media
              profiles, and political campaigns — often without disclosure.
            </p>
            <p>
              The ability to notice the tells — the plasticky skin, the wrong number of fingers, the
              background that doesn&apos;t quite cohere — is no longer a party trick. It is a
              practical media literacy skill. Like learning to spot a phishing email, training your
              eye to catch AI imagery makes you a harder target for misinformation.
            </p>
            <p>
              The research on this is clear: repeated exposure to examples of AI images, combined
              with corrective feedback, measurably improves detection accuracy. unvAIl is built on
              exactly that principle — a daily short session with an instant reveal so you can
              calibrate your intuition over time.
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16 border-b border-slate-100 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-8">
            How the daily challenge works
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                step: "1",
                title: "View the images",
                desc: "Each day you are shown a set of images. Some are real photographs. Some are AI-generated. Look carefully — the differences can be subtle.",
              },
              {
                step: "2",
                title: "Make your calls",
                desc: "For each image, decide: Real or AI? Submit your answers when you are confident. You only get one attempt per day per challenge.",
              },
              {
                step: "3",
                title: "Get the reveal",
                desc: "See the answer for every image with an explanation of the tells. Share your emoji score card with friends and compare results.",
              },
            ].map((s) => (
              <div key={s.step} className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="w-8 h-8 rounded-full bg-cyan-600 text-white text-sm font-bold flex items-center justify-center mb-4">
                  {s.step}
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WORDLE COMPARISON */}
      <section className="py-16 border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-6">
            A daily habit, like Wordle for visual literacy
          </h2>
          <div className="space-y-4 text-slate-600 leading-relaxed">
            <p>
              The game is designed around the same mechanic that makes Wordle so sticky: one
              challenge per day, a shared experience, and a shareable result. Everyone is on the
              same images each day, which makes comparing notes with friends and colleagues
              genuinely meaningful.
            </p>
            <p>
              Unlike endless-scroll media literacy exercises, the daily constraint keeps it
              achievable. A two-minute session while you wait for coffee is enough to stay sharp.
              The cumulative effect of playing regularly — seeing hundreds of examples over months —
              builds a pattern recognition that sticks.
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
            Play today&apos;s challenge
          </h2>
          <p className="text-slate-500 mb-8 max-w-xl mx-auto">
            No account. No download. Opens in your browser. New images every day.
          </p>
          <a
            href="https://unvail.thehelpfuldev.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-cyan-600 text-white font-semibold hover:bg-cyan-700 transition-colors"
          >
            Play Today&apos;s Round →
          </a>
        </div>
      </section>
    </main>
  );
}
