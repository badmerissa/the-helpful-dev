import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Navbar from "./components/Navbar";
import CookieConsent from "./components/CookieConsent";
import { headers } from "next/headers";

// GeistSans and GeistMono are loaded from the local `geist` npm package,
// eliminating the Google Fonts network dependency at build time.

export const metadata: Metadata = {
  metadataBase: new URL("https://thehelpfuldev.com"),
  title: {
    default: "The Helpful Dev | Free Privacy-First Web Apps",
    template: "%s | The Helpful Dev",
  },
  description:
    "Free browser-based tools for intermittent fasting, potty training, and daily games. No login. No data collected. Built by an indie dev.",
  keywords: [
    "fasting tracker",
    "potty training app",
    "AI image game",
    "privacy tools",
    "free web apps",
  ],
  alternates: {
    canonical: "https://thehelpfuldev.com",
  },
  openGraph: {
    type: "website",
    url: "https://thehelpfuldev.com",
    siteName: "The Helpful Dev",
    title: "The Helpful Dev | Free Privacy-First Web Apps",
    description:
      "Free browser-based tools for intermittent fasting, potty training, and daily games. No login. No data collected. Built by an indie dev.",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "The Helpful Dev — free privacy-first web apps",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Helpful Dev | Free Privacy-First Web Apps",
    description:
      "Free browser-based tools for intermittent fasting, potty training, and daily games. No login. No data collected. Built by an indie dev.",
    images: ["/og-image.svg"],
  },
};

const ADSENSE_SRC =
  "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7388329784955167";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Read the nonce injected by middleware.ts so we can pass it to client
  // components that load third-party scripts (AdSense via CookieConsent).
  // Reading headers() here makes this layout dynamically rendered per request.
  const nonce = (await headers()).get("x-nonce") ?? undefined;

  return (
    <html lang="en">
      <head>
        {/* Fonts are now served locally via the `geist` npm package — no Google Fonts CDN needed */}
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        <link rel="preconnect" href="https://tpc.googlesyndication.com" />
      </head>
      <body className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        {/* Skip-to-content link for keyboard/screen-reader users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-4 focus:left-4 focus:px-4 focus:py-2 focus:bg-white focus:text-cyan-700 focus:font-semibold focus:rounded-lg focus:border focus:border-cyan-300 focus:shadow"
        >
          Skip to main content
        </a>

        <Navbar />
        <div id="main-content">{children}</div>

        <Analytics />
        <SpeedInsights />

        {/* AdSense loads only after cookie consent (GDPR compliance).
            Nonce forwarded from middleware for CSP compliance. */}
        <CookieConsent nonce={nonce} adsenseSrc={ADSENSE_SRC} />
      </body>
    </html>
  );
}
