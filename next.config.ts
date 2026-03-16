import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/fasting',
        destination: 'https://fasting.thehelpfuldev.com/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;