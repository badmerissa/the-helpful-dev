import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  alternates: {
    canonical: "https://thehelpfuldev.com/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900 font-sans">
      <section className="max-w-3xl mx-auto px-6 py-16 lg:py-24">
        <div className="mb-8">
          <Link href="/" className="text-sm text-slate-400 hover:text-cyan-600 transition-colors">
            ← The Helpful Dev
          </Link>
        </div>

        <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-4">Privacy Policy</h1>
        <p className="text-sm text-slate-400 mb-10">Last updated: March 2026</p>

        <div className="space-y-10 text-slate-600 leading-relaxed">

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">Overview</h2>
            <p>
              The Helpful Dev is a collection of free, privacy-first browser applications. Our
              core principle is simple: <strong>your data stays on your device</strong>. None of
              the apps we build collect, transmit, or store personal data on our servers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">App Data</h2>
            <p>
              All data created within our apps (fasting logs, potty training records, time
              entries, game scores) is stored exclusively in your browser&apos;s local storage.
              It is never sent to any server. If you clear your browser data, it is gone — we
              have no copy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">Newsletter</h2>
            <p>
              If you subscribe to our newsletter, your email address is stored and processed by{" "}
              <a
                href="https://convertkit.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-600 underline underline-offset-2 hover:text-cyan-700"
              >
                ConvertKit
              </a>{" "}
              (now Kit). By subscribing you consent to receiving occasional product update emails.
              You can unsubscribe at any time via the link in any email we send. We do not sell or
              share your email address with third parties. ConvertKit&apos;s own privacy policy
              governs how they handle your data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">Analytics</h2>
            <p>
              This marketing site uses{" "}
              <a
                href="https://vercel.com/analytics"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-600 underline underline-offset-2 hover:text-cyan-700"
              >
                Vercel Analytics
              </a>
              , which collects anonymous, aggregated page-view data (page URL, referrer, country)
              with no cookies and no cross-site tracking. No personally identifiable information
              is collected.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">Advertising</h2>
            <p>
              This site displays ads served by Google AdSense. Google may use cookies to serve
              ads based on your prior visits to this or other websites. You can opt out of
              personalised advertising by visiting{" "}
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-600 underline underline-offset-2 hover:text-cyan-700"
              >
                Google Ad Settings
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">Your Rights</h2>
            <p>
              If you are in the EU, UK, or California, you have rights regarding your personal
              data under GDPR, UK GDPR, and CCPA respectively. The only personal data we hold
              is your email address if you subscribed to the newsletter. To request deletion,
              simply unsubscribe from any email we send, or contact us directly.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">Contact</h2>
            <p>
              Questions about this policy? Reach out via{" "}
              <a
                href="https://ko-fi.com/robogirl96"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-600 underline underline-offset-2 hover:text-cyan-700"
              >
                Ko-fi
              </a>
              .
            </p>
          </section>

        </div>
      </section>
    </main>
  );
}
