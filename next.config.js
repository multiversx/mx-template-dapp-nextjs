/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@multiversx/sdk-dapp'],
  webpack: (config) => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding');
    return config;
  }
};

module.exports = nextConfig;
