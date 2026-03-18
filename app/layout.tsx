import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Navbar from "./components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
<link rel="preconnect" href="https://tpc.googlesyndication.com" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar />
        {children}
        <Analytics />
        <SpeedInsights />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7388329784955167"
          strategy="lazyOnload"
          crossOrigin="anonymous"
        />
      </body>
    </html>
  );
}
