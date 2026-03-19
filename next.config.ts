import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  experimental: {
    // Allow Next.js font preloading to use system TLS certificates.
    // Required in some sandboxed/CI environments where Google Fonts CDN
    // certificates are not in the default trust store.
    turbopackUseSystemTlsCerts: true,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          // HSTS: tell browsers to always use HTTPS for 2 years (includeSubDomains + preload)
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          // CSP is handled dynamically by middleware.ts (nonce-based, per-request).
          // The static fallback below applies only if middleware is bypassed (e.g. direct
          // static-file requests that skip the middleware matcher).
        ],
      },
      // Long-lived cache for immutable hashed static assets
      {
        source: "/_next/static/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      // Versioned public assets (icons, OG images, fonts)
      {
        source: "/:path*.(png|svg|ico|webp|woff2)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },

  async redirects() {
    return [
      {
        source: "/fasting",
        destination: "https://fasting.thehelpfuldev.com/",
        // permanent: true emits a 308 (Next.js) / 301 — safe now that the
        // destination URL is confirmed stable.
        permanent: true,
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
