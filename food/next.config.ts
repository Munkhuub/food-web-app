import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    API_URL: process.env.API_URL,
    CLOUDINARY_URL: process.env.CLOUDINARY_URL,
    UNSPLASH_URL: process.env.UNSPLASH_URL,
  },
};

export default nextConfig;
