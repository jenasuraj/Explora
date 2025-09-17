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
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // COMPLETELY DISABLE CSS PROCESSING
  webpack: (config, { isServer }) => {
    // Remove CSS-related loaders
    config.module.rules = config.module.rules.filter(rule => {
      if (rule.test && rule.test.toString().includes('css')) {
        return false;
      }
      return true;
    });
    
    // Remove CSS minimization
    config.optimization.minimizer = config.optimization.minimizer.filter(
      (minimizer) => minimizer.constructor.name !== 'CssMinimizerPlugin'
    );
    
    return config;
  },
  // Disable CSS extraction
  experimental: {
    optimizeCss: false,
  }
};

export default nextConfig;