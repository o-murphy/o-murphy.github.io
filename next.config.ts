import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',  // Додайте для GitHub Pages
  allowedDevOrigins: ['192.168.6.162', 'localhost'],
  
  images: {
    unoptimized: true,  // Необхідно для статичного експорту
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