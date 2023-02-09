/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "customer-ldcl3cff16n8d346.cloudflarestream.com",
      "cdn.discordapp.com",
    ],
  },
};

module.exports = nextConfig;
