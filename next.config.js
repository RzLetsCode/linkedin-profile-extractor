/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['media.licdn.com', 'static.licdn.com'],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
},
  output: 'export',
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
