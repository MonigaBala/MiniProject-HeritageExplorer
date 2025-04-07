const { i18n } = require('./next-i18next.config');

module.exports = {
  reactStrictMode: true,
  i18n, // Enables i18n config for multilingual routes
  images: {
    domains: [], // Add image domains here if needed
  },
  experimental: {
    serverActions: true, // Optional: only if you're using server actions
  },
};
