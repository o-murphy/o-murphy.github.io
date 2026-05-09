import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export',
  ...(isProd && {
    basePath: '/portfolio',
    assetPrefix: '/portfolio/',
  }),
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