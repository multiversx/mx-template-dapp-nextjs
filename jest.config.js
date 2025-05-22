module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/mocks/**'
  ],
  testEnvironment: 'jest-fixed-jsdom',
  modulePaths: ['<rootDir>/src'],
  transform: {
    '^.+\\.(ts|js|tsx|jsx)$': '@swc/jest'
  },
  transformIgnorePatterns: [
    'node_modules/(?!@multiversx/sdk-guardians-provider|@multiversx/sdk-dapp-form|@multiversx/sdk-dapp-nft|@multiversx/sdk-dapp|@multiversx/sdk-wallet-connect-provider|@multiversx/sdk-guardians-provider|react-redux|swiper|ssr-window|dom7|axios|react-tooltip|uuid|uint8arrays|multiformats|@stencil|@lit|lit|tslib|@lifeomic)'
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },

  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  moduleFileExtensions: [
    'tsx',
    'ts',
    'web.js',
    'js',
    'web.ts',
    'web.tsx',
    'json',
    'web.jsx',
    'jsx',
    'node'
  ],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname'
  ],
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true
};
