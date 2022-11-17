/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    runtime: "experimental-edge",
  },
  // i18n: {
  //   locales: ["en"],
  //   defaultLocale: "en",
  // },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["customer-ldcl3cff16n8d346.cloudflarestream.com"],
  },
};

module.exports = nextConfig;
