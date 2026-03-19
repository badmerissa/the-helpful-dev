import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Generates a per-request nonce and applies a Content Security Policy header.
 * The nonce is also forwarded as `x-nonce` in the request headers so that
 * Server Components (e.g. layout.tsx) can read it via `headers()` and pass it
 * to `<Script nonce={nonce}>` components.
 *
 * Next.js automatically picks up `x-nonce` from request headers and adds it to
 * its own inline hydration scripts, removing the need for `unsafe-inline` in
 * script-src.
 */
export function proxy(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");

  const isDev = process.env.NODE_ENV === "development";

  const scriptSrc = [
    "'self'",
    `'nonce-${nonce}'`,
    // Next.js Fast Refresh needs unsafe-eval in development only
    isDev ? "'unsafe-eval'" : "",
    "https://pagead2.googlesyndication.com",
    "https://va.vercel-scripts.com",
    "https://www.googletagservices.com",
    "https://partner.googleadservices.com",
    "https://tpc.googlesyndication.com",
  ]
    .filter(Boolean)
    .join(" ");

  const csp = [
    "default-src 'self'",
    `script-src ${scriptSrc}`,
    // Tailwind generates inline styles; unsafe-inline is required for style-src
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https://pagead2.googlesyndication.com https://www.google.com",
    // App subdomain iframes
    [
      "frame-src",
      "https://fasting.thehelpfuldev.com",
      "https://pottypanda.thehelpfuldev.com",
      "https://unvail.thehelpfuldev.com",
      "https://timeagotchi.thehelpfuldev.com",
      // AdSense ad frames
      "https://googleads.g.doubleclick.net",
      "https://tpc.googlesyndication.com",
    ].join(" "),
    "connect-src 'self' https://app.convertkit.com https://pagead2.googlesyndication.com https://vitals.vercel-insights.com https://www.google-analytics.com",
  ].join("; ");

  // Clone request headers and inject nonce for Server Components to read
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("content-security-policy", csp);

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });

  // Set CSP on the response so the browser enforces it
  response.headers.set("content-security-policy", csp);

  return response;
}

// Next.js 16 proxy uses the same matcher config format as middleware
export const config = {
  // Apply to all routes except static files and Next.js internals
  matcher: [
    {
      source: "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp|woff2?|css|js)).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
