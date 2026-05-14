import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'media.licdn.com' },
      { hostname: 'github.com' },
      { hostname: 'capsule-render.vercel.app' },
      { hostname: 'skillicons.dev' },
      { hostname: 'streak-stats.demolab.com' },
      { hostname: 'komarev.com' },
      { hostname: 'img.shields.io' },
      { hostname: 'raw.githubusercontent.com' },
    ],
    dangerouslyAllowSVG: true,
  },
};

export default nextConfig;
