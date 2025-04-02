/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Ensure no image optimization issues
  images: {
    unoptimized: true,
  },
  // Prevent unnecessary CSS optimizations that might interfere with layout
  experimental: {
    optimizeCss: false,
  },
};

module.exports = nextConfig;
