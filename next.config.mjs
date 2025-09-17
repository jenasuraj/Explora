/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        pathname: '/**',
      },
    ],
    domains: ['images.unsplash.com'],
  },
    experimental: {
    optimizeCss: false, // prevents build errors with PostCSS + Tailwind
  },

};

export default nextConfig;
