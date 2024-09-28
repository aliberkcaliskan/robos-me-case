/*global module*/
/*eslint no-undef: "error"*/
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: 'standalone',
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {},
  async redirects() {
    return [
      {
        source: '/faq',
        destination: '/sikca-sorulan-sorular',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/sikca-sorulan-sorular',
        destination: '/faq',
      },
    ];
  },
};

module.exports = nextConfig;
