/** @type {import('next').NextConfig} */
import path from 'path';

const nextConfig = {
  images: {
    domains: ['images.unsplash.com'], // Allow images from Unsplash
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Ensure that all imports of 'yjs' resolve to the same instance
      config.resolve.alias['yjs'] = path.resolve(__dirname, 'node_modules/yjs');
    }
    return config;
  },
};

export default nextConfig;
