import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Helpful Dev",
  description: "Free, privacy-focused tools for everyday problems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <head>
        <script async
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7388329784955167"
                crossOrigin="anonymous"></script>
        <title>The Helpful Dev</title>
    </head>
    <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
    {children}
    <Analytics/>
    <SpeedInsights/>
      </body>
    </html>
  );
}
