import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    domains: ["api.dicebear.com"],
  },
};

export default nextConfig;
