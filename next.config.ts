import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  eslint: {
    // Allow production builds to complete even if there are ESLint warnings
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Allow production builds to complete even if there are TypeScript errors
    ignoreBuildErrors: true,
  },
  images: {
    // Enable image optimization
    domains: [],
    unoptimized: false,
  },
};

export default nextConfig;
