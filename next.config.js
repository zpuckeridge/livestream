/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["cdn.discordapp.com", "image.mux.com"],
  },
};

module.exports = nextConfig;
