// This global setup materializes secret keystore files from environment variables
// so Playwright tests can reference stable file paths without committing secrets.
//
// Secrets source:
// - On CI (GitHub Actions): injected via repository/environment Secrets
//   (e.g. KEYSTORE1_JSON_B64, KEYSTORE{N}_PASSWORD, KEYSTORE{N}_ADDRESS).
// - Locally: provided via .env.test.local/.env and loaded here.
//
// Why base64?
// - JSON keystores are stored as KEYSTORE{N}_JSON_B64 to pass safely through
//   CI env vars and avoid accidental logging. We decode and write them to
//   WALLETS_DIR on startup. Passwords/addresses are read directly from env
//   by the tests and are never written to disk.

import path from 'path';
import { chromium, type FullConfig } from '@playwright/test';
import { loadLocalEnv } from './loadLocalEnv';
import { writeValueToFile } from '../fs/writeValueToFile';
import { type FileEncoding } from './types';

// Load environment variables for local runs; CI already has env set
loadLocalEnv('test');

// Write keystore files from environment variables
async function writeKeystoreFilesFromEnv(
  defaultEncoding: FileEncoding = 'base64',
  skipIfExists: boolean = false
) {
  // Resolve wallets directory without relying on process.cwd
  const walletsDir = process.env.WALLETS_DIR
    ? path.resolve(process.env.WALLETS_DIR)
    : path.resolve(__dirname, '..', 'wallets');

  const mappings: Array<{
    envKey: string;
    outPath: string;
    encoding?: FileEncoding;
  }> = [
    {
      envKey: 'KEYSTORE1_JSON_B64',
      outPath: `${walletsDir}/keystoreFile1.json`,
      encoding: 'base64'
    },
    {
      envKey: 'KEYSTORE2_JSON_B64',
      outPath: `${walletsDir}/keystoreFile2.json`,
      encoding: 'base64'
    },
    {
      envKey: 'KEYSTORE3_JSON_B64',
      outPath: `${walletsDir}/keystoreFile3.json`,
      encoding: 'base64'
    },
    {
      envKey: 'KEYSTORE4_JSON_B64',
      outPath: `${walletsDir}/keystoreFile4.json`,
      encoding: 'base64'
    },
    {
      envKey: 'KEYSTORE5_PEM_B64',
      outPath: `${walletsDir}/keystoreFile5.pem`,
      encoding: 'base64'
    },
    {
      envKey: 'KEYSTORE6_PRIVATE_KEY_UTF8',
      outPath: `${walletsDir}/keystoreFile6.key`,
      encoding: 'none'
    }
  ];

  // Write keystore files from environment variables
  for (const { envKey, outPath, encoding } of mappings) {
    const value = process.env[envKey];
    if (!value?.trim()) {
      console.warn(`[globalSetup] Missing or empty env var: ${envKey}`);
      continue;
    }

    try {
      writeValueToFile(
        value,
        outPath,
        encoding ?? defaultEncoding,
        skipIfExists
      );
      console.log(`[globalSetup] Wrote ${outPath}`);
    } catch (error) {
      console.error(`[globalSetup] Failed to write ${outPath}:`, error);
    }
  }
}

// Pre-compile the app routes before the tests run. With `next dev` (local),
// each route is compiled on first request, so the first test to hit a route can
// act while Next is still compiling and fail. Warming the routes once here (the
// webServer is already up at this point) moves that cost out of the tests. On CI
// the app is a production build with no on-demand compilation, so this is a
// cheap no-op.
async function warmUpRoutes(baseURL: string) {
  const routes = ['/', '/unlock', '/dashboard'];
  const browser = await chromium.launch();
  try {
    const context = await browser.newContext({ ignoreHTTPSErrors: true });
    const page = await context.newPage();
    for (const route of routes) {
      try {
        await page.goto(`${baseURL}${route}`, {
          waitUntil: 'load',
          timeout: 90_000
        });
      } catch (error) {
        console.warn(
          `[globalSetup] Warm-up failed for ${route}:`,
          error instanceof Error ? error.message : error
        );
      }
    }
  } finally {
    await browser.close();
  }
}

// Global setup function
export default async function globalSetup(config: FullConfig) {
  await writeKeystoreFilesFromEnv('base64', true);

  const baseURL = config.projects[0]?.use?.baseURL;
  if (baseURL) {
    console.log('[globalSetup] Warming up routes (pre-compiling for next dev)…');
    await warmUpRoutes(baseURL);
  }
}
