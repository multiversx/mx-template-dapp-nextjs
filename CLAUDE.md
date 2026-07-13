# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

MultiversX dApp template built on Next.js 13 (App Router) and `@multiversx/sdk-dapp` v5. Demonstrates wallet authentication, native auth, transaction signing, batch transactions, message signing, and smart-contract interactions (a Ping-Pong contract) against MultiversX devnet/testnet/mainnet.

## Commands

Package manager is **pnpm 11** (pinned via `packageManager` in package.json); Node **24**. Run `pnpm install` first.

Development runs against a chosen network. The `start:*` scripts copy the matching `src/config/config.<network>.ts` over `src/config/index.ts`, then start Next dev behind an SSL proxy (dev app is served at `https://localhost:3002`, Next itself — plain HTTP — at `:3000`).

**Always open the app at `https://localhost:3002` — not `http://localhost:3000`.** Next dev has no TLS, so `:3000` is the plain-HTTP Next server; the `local-ssl-proxy` (in the `dev` script) provides HTTPS on `:3002` (`--source 3002 --target 3000`). The MultiversX DeFi Wallet extension gates its inpage-provider injection on `https://`-scoped `web_accessible_resources` matches, so on a plain `http://` origin it refuses to inject (`window.multiversx` is never set) and sdk-dapp reports the extension as not installed.

```bash
pnpm start:devnet      # dev server, devnet config
pnpm start:testnet     # dev server, testnet config
pnpm start:mainnet     # dev server, mainnet config

pnpm build:devnet      # production build (also :testnet / :mainnet); output goes to build/
pnpm preview           # serve the production build (next start)

pnpm lint              # eslint (flat config, eslint.config.mjs)
pnpm test              # jest unit tests
pnpm test path/to/file.test.ts        # single file
pnpm test -t "test name substring"    # single test by name
pnpm cy:run            # cypress e2e (baseUrl http://localhost:3000, the raw Next server); generates mochawesome report
```

Next.js 16 defaults to Turbopack, but the `dev`/`build:*` scripts pass `--webpack`: the MultiversX SDK pulls Node built-ins (e.g. `fs` in sdk-core wallet modules) into client bundles that only webpack's `resolve.fallback` can stub. See `next.config.js`.

Cypress specs live in `cypress/e2e/`. `testIsolation: false` — specs share login state, so ordering within a spec matters. A test keystore is in `cypress/assets/`.

## Config & network switching

- `src/config/index.ts` is **generated** — never edit it by hand; it is overwritten by the `copy-*-config` scripts. Edit `config.devnet.ts` / `config.testnet.ts` / `config.mainnet.ts` and `sharedConfig.ts` instead.
- `src/initConfig.ts` holds the `InitAppType` config passed to the sdk-dapp init (environment, nativeAuth, theme, walletConnect project id, custom providers, storage). Note the hardcoded `environment: EnvironmentsEnum.devnet` and `theme` here — this is separate from the per-network config files.

## Architecture

### SDK abstraction layer (`src/lib`) — important convention

All imports from MultiversX SDK packages are funneled through `src/lib` rather than imported directly in app code. Each sub-module (`sdkCore`, `sdkDapp`, `sdkDappUI`, `sdkDappUtils`) re-exports the components, hooks, types, constants, and helpers the app uses. **Always import SDK symbols from `@/lib`** (e.g. `import { useGetIsLoggedIn, ExplorerLink } from '@/lib'`) instead of from `@multiversx/*`. Some `sdkDapp/components` (CopyButton, ExplorerLink, FormatAmount) are thin local wrappers. When you need a new SDK symbol, add it to the relevant `src/lib/*` re-export.

### App bootstrap chain

`src/app/layout.tsx` (server) wraps the tree in:
`InitAppWrapper` → `App` (`src/app/index.tsx`) → `Layout` → page.

- `InitAppWrapper` calls `initAppSingleton(config)` in a `useEffect` and renders nothing until sdk-dapp init resolves. All client-side dApp state depends on this having run.
- `App` adds `AxiosInterceptors` (native-auth headers) and `BatchTransactionsContextProvider`.
- `AuthRedirectWrapper` (`src/wrappers`) gates routes: `requireAuth` redirects logged-out users to home; passing `requireAuth={false}` redirects logged-in users to the dashboard.

### Path alias

`@/*` → `./src/*` (tsconfig + jest moduleNameMapper). Prefer it over relative imports.

### Routes (`src/app`)

App Router pages: `/` (home), `/dashboard`, `/unlock`, `/logout`, `/disclaimer`. Route name constants live in `src/localConstants/routes`.

### Dashboard widgets (`src/app/dashboard/widgets`)

Each feature is a self-contained widget (PingPongAbi, PingPongRaw, PingPongService, Transactions, SignMessage, NativeAuth, BatchTransactions). Widgets follow a folder pattern: `Widget.tsx` + local `hooks/`, `types/`, `helpers/`, each with its own `index.ts` barrel and colocated `tests/`. The three PingPong widgets demonstrate three ways to call the same contract (raw data, ABI via sdk-core, service abstraction).

### Custom provider

`src/provider/inMemoryProvider.ts` is an example custom login provider (private-key based, with `LoginModal`) registered in `initConfig.ts` via `window.multiversx.providers`.

### Contracts

`src/contracts/ping-pong.abi.json` is the ABI. Contract addresses and batch-transaction payloads are in `src/config/sharedConfig.ts`.

## Stack notes

- **Next.js 16** on the App Router, built with **webpack** (`--webpack` flag on dev/build — see Commands). React 18.3, TypeScript 5.9.
- **ESLint 9 flat config** in `eslint.config.mjs` (spreads `eslint-config-next` 16's native flat configs + `eslint-config-prettier`). The react-hooks v7 rules `set-state-in-effect` and `immutability` are relaxed to warnings there for legacy template code.
- **MultiversX SDK majors**: sdk-core 15, sdk-dapp 5.6, sdk-dapp-utils 3. Note sdk-core 15's transaction factory methods (`createTransactionForExecute`, `createTransactionForNativeTokenTransfer`) are **async** (return `Promise<Transaction>`), and `Transaction`/`Address` reject empty/legacy plain-object shapes — the blast radius is the `src/lib/*` re-export layer.
- **Tailwind v4** (see `MigrateNewDesign.md`). Global styles: `src/styles/globals.css` + `src/styles/tailwind.css`, both imported from `initConfig.ts`.
- **SVGs** are imported as React components via `@svgr/webpack` (configured in `next.config.js`).
- Jest uses **`@swc/jest`** (not ts-jest) and `jest-fixed-jsdom`. `transformIgnorePatterns` matches package names anywhere in the path (works with pnpm's `.pnpm/` layout); `moduleFileExtensions` includes `cjs`/`mjs` for sdk-dapp's deep imports; the `@ledgerhq/hw-transport-*` browser transports are stubbed via `src/mocks/ledgerTransport.ts` (they import wildcard `@ledgerhq/devices` subpaths jest can't resolve).
- **pnpm specifics**: build-script allowlist (`allowBuilds`) and security `overrides` for transitive deps (protobufjs/ws/qs/postcss) live in `pnpm-workspace.yaml`. `.npmrc` sets `shamefully-hoist=true` for SDK compatibility.
- Build output dir is `build/` (not `.next/`), set in `next.config.js`.
- `@multiversx/sdk-dapp-ui` must stay in `transpilePackages`.
