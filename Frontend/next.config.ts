import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['i.makeagif.com', 'images.pexels.com'], // Add the domains here
  },
  /* config options here */
};

export default nextConfig;
