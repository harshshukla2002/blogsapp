import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "cdn-icons-png.flaticon.com",
      "cdn.vectorstock.com",
      "localhost",
      "upload.wikimedia.org",
    ],
  },
  devIndicators: false,
};

export default nextConfig;
