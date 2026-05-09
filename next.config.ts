import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';
const basePath = isProd ? '/portfolio' : '';

const nextConfig: NextConfig = {
  output: 'export',

  basePath,
  assetPrefix: basePath ? `${basePath}/` : '',

  trailingSlash: true,

  allowedDevOrigins: ['192.168.6.162', 'localhost'],

  images: {
    unoptimized: true,
  },

  webpack: (config) => {
    config.module.rules.push({
      test: /\.json$/,
      type: 'json',
    });
    return config;
  },
};

export default nextConfig;