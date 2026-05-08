import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/portfolio',  // ← Додайте це - назва вашого репозиторію
  assetPrefix: '/portfolio',  // ← Додайте це для статичних ассетів
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