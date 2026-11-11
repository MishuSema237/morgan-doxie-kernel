/** @type {import('next').NextConfig} */
const nextConfig = {
  // Vercel's image optimizer bills one transformation per image width per
  // deployment. Every photo here is already sized, so serve it from the CDN.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;


