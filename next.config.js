/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: 'build',
  transpilePackages: ['@multiversx/sdk-dapp-ui'],
  // Next.js 16 defaults to Turbopack, but the MultiversX SDK pulls Node
  // built-ins (e.g. `fs` in sdk-core's wallet modules) into client bundles,
  // which Turbopack cannot stub the way webpack's `resolve.fallback` does.
  // The build/dev scripts therefore pass `--webpack` to use this config.
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    config.externals.push('pino-pretty', 'lokijs', 'encoding', {
      bufferutil: 'bufferutil',
      'utf-8-validate': 'utf-8-validate'
    });

    config.module.rules.push({
      test: /\.svg$/i,
      use: ['@svgr/webpack']
    });

    return config;
  }
};

module.exports = nextConfig;
