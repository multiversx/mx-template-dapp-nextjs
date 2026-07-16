import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier';

// Flat config (ESLint 9). eslint-config-next 16 ships native flat-config
// arrays, so they are spread directly. `prettier` goes last to disable
// stylistic rules that conflict with Prettier.
const eslintConfig = [
  {
    ignores: [
      'build/**',
      'node_modules/**',
      'cypress/**',
      'scripts/**',
      'playwright-report/**',
      'test-results/**'
    ]
  },
  ...nextCoreWebVitals,
  ...nextTypescript,
  prettier,
  {
    // eslint-config-next 16 enables react-hooks v7 (React Compiler era) rules.
    // These flag pre-existing template patterns (setState in effects, calling a
    // hook-defined function before its declaration) that would require
    // behavioral refactors to satisfy. Relaxed to warnings so they remain
    // visible without failing lint/CI on legacy code.
    rules: {
      'react-hooks/set-state-in-effect': 'warn',
      'react-hooks/immutability': 'warn'
    }
  }
];

export default eslintConfig;
