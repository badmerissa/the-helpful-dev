import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Navbar from "./components/Navbar";
import CookieConsent from "./components/CookieConsent";
import ThemeProvider from "./components/ThemeProvider";
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
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        {/* Fonts are now served locally via the `geist` npm package — no Google Fonts CDN needed */}
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        <link rel="preconnect" href="https://tpc.googlesyndication.com" />
        {/* Prevent flash of wrong theme — runs before React hydrates.
            Sets CSS variables as inline styles because Tailwind v4 auto-generates
            @media (prefers-color-scheme: dark) from CSS dark blocks, and inline
            styles are the only way to reliably override media queries. */}
        <script
          suppressHydrationWarning
          nonce={nonce}
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var v={dark:{"--bg-base":"#0d1117","--bg-surface":"#161b22","--bg-surface-2":"#1c2128","--border-color":"#30363d","--text-primary":"#e6edf3","--text-secondary":"#8b949e","--text-muted":"#6e7681","--brand-gradient-from":"#22b8d4","--brand-gradient-to":"#0092ae","--terminal-cmd":"#22b8d4","--terminal-output":"#8b949e","--terminal-success":"#4ade80","--terminal-error":"#f87171","--terminal-comment":"#6e7681","--terminal-prompt":"#22b8d4"},light:{"--bg-base":"#ffffff","--bg-surface":"#f8fafc","--bg-surface-2":"#f1f5f9","--border-color":"#e2e8f0","--text-primary":"#0f172a","--text-secondary":"#64748b","--text-muted":"#94a3b8","--brand-gradient-from":"#0092ae","--brand-gradient-to":"#00637d","--terminal-cmd":"#0092ae","--terminal-output":"#64748b","--terminal-success":"#16a34a","--terminal-error":"#dc2626","--terminal-comment":"#94a3b8","--terminal-prompt":"#0092ae"}};var t=localStorage.getItem("theme")||"dark";var el=document.documentElement;if(t==="light")el.removeAttribute("data-theme");else el.setAttribute("data-theme","dark");var c=v[t];for(var k in c)el.style.setProperty(k,c[k])}catch(e){}})()`,
          }}
        />
      </head>
      <body className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <ThemeProvider>
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
        </ThemeProvider>
      </body>
    </html>
  );
}
