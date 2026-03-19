"use client";

import Script from "next/script";
import { useState, useEffect } from "react";
import Link from "next/link";

const STORAGE_KEY = "cookie_consent";

type ConsentState = "accepted" | "rejected" | null;

interface Props {
  /** Nonce forwarded from middleware for CSP compliance. */
  nonce?: string;
  /** Google AdSense publisher script URL. */
  adsenseSrc: string;
}

export default function CookieConsent({ nonce, adsenseSrc }: Props) {
  const [consent, setConsent] = useState<ConsentState>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as ConsentState | null;
    if (stored) {
      setConsent(stored);
    } else {
      // Slight delay so banner doesn't flash on first paint
      const t = setTimeout(() => setVisible(true), 600);
      return () => clearTimeout(t);
    }
  }, []);

  function accept() {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setConsent("accepted");
    setVisible(false);
  }

  function reject() {
    localStorage.setItem(STORAGE_KEY, "rejected");
    setConsent("rejected");
    setVisible(false);
  }

  return (
    <>
      {/* Load AdSense only after user consents */}
      {consent === "accepted" && (
        <Script
          src={adsenseSrc}
          strategy="lazyOnload"
          crossOrigin="anonymous"
          nonce={nonce}
        />
      )}

      {/* Cookie banner */}
      {visible && (
        <div
          role="dialog"
          aria-modal="false"
          aria-label="Cookie consent"
          className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 shadow-lg"
        >
          <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center gap-4 justify-between">
            <p className="text-sm text-slate-600 text-center sm:text-left">
              We use cookies for personalised ads (Google AdSense) and anonymous analytics
              (Vercel). Read our{" "}
              <Link href="/privacy" className="underline underline-offset-2 hover:text-cyan-600">
                Privacy Policy
              </Link>{" "}
              for details.
            </p>
            <div className="flex gap-3 shrink-0">
              <button
                onClick={reject}
                className="px-4 py-2 text-sm font-semibold text-slate-600 border border-slate-300 rounded-lg hover:border-slate-400 transition-colors"
              >
                Reject non-essential
              </button>
              <button
                onClick={accept}
                className="px-4 py-2 text-sm font-semibold text-white bg-cyan-600 rounded-lg hover:bg-cyan-700 transition-colors"
              >
                Accept all
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
