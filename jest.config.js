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
  // Match the package name anywhere in the path so this works with pnpm's
  // nested `.pnpm/<pkg>@<ver>/node_modules/<pkg>` layout as well as a flat
  // node_modules. These ESM/TS packages must be transformed by @swc/jest.
  transformIgnorePatterns: [
    'node_modules/(?!.*(?:@multiversx/|react-redux/|swiper/|ssr-window/|dom7/|axios/|react-tooltip/|uuid/|uint8arrays/|multiformats/|@stencil/|@lit/|lit/|tslib/|@lifeomic/))'
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    // The @ledgerhq/hw-transport-* browser transports are dragged in
    // transitively via the sdk-dapp providers barrel but never used in tests.
    // They import wildcard subpaths of @ledgerhq/devices that Jest cannot
    // resolve through that package's `exports` map, so stub them out.
    '^@ledgerhq/hw-transport-(web-ble|webusb|webhid)$':
      '<rootDir>/src/mocks/ledgerTransport.ts'
  },

  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  moduleFileExtensions: [
    'tsx',
    'ts',
    'web.js',
    'js',
    // @multiversx/sdk-dapp ships extension-suffixed builds (.cjs/.mjs) and has
    // no `exports` map, so jest must try these to resolve its deep imports.
    'cjs',
    'mjs',
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
