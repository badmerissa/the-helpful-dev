import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              // Scripts: self + AdSense + Vercel analytics
              "script-src 'self' 'unsafe-inline' https://pagead2.googlesyndication.com https://va.vercel-scripts.com",
              // Styles: self + inline styles from Tailwind/Next.js
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              // Fonts
              "font-src 'self' https://fonts.gstatic.com",
              // Images: self + data URIs + AdSense + app subdomains
              "img-src 'self' data: https://pagead2.googlesyndication.com",
              // Frames: only own subdomains (for app preview iframes)
              "frame-src https://fasting.thehelpfuldev.com https://pottypanda.thehelpfuldev.com https://unvail.thehelpfuldev.com https://timeagotchi.thehelpfuldev.com",
              // Connections: self + ConvertKit + AdSense + Vercel
              "connect-src 'self' https://app.convertkit.com https://pagead2.googlesyndication.com https://vitals.vercel-insights.com",
            ].join("; "),
          },
        ],
      },
    ];
  },

  async redirects() {
    return [
      {
        source: "/fasting",
        destination: "https://fasting.thehelpfuldev.com/",
        // Using temporary (307) redirect until URL structure is confirmed stable.
        // Promote to permanent: true only after thorough testing, as 301s are
        // cached indefinitely by browsers and CDNs and are difficult to reverse.
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
