import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/fasting',
        destination: 'https://fasting-tracker-tau.vercel.app/',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;