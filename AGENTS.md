# AGENTS.md — mx-template-dapp-nextjs

Guidance for AI agents (and humans) working with code in this repository.

## Overview

MultiversX dApp template built on Next.js 16 (App Router) and `@multiversx/sdk-dapp` v5. Demonstrates wallet authentication, native auth, transaction signing, batch transactions, message signing, and smart-contract interactions (a Ping-Pong contract) against MultiversX devnet/testnet/mainnet.

## Commands

Package manager is **pnpm 11** (there is a `pnpm-lock.yaml` — use pnpm, not npm/yarn); Node **24**. Run `pnpm install` first.

Development runs against a chosen network. The `start:*` scripts copy the matching `src/config/config.<network>.ts` over `src/config/index.ts`, then start Next dev behind an SSL proxy (dev app is served at `https://localhost:3002`, Next itself — plain HTTP — at `:3000`).

**Always open the app at `https://localhost:3002` — not `http://localhost:3000`.** Next dev has no TLS, so `:3000` is the plain-HTTP Next server; the `local-ssl-proxy` (in the `dev` script) provides HTTPS on `:3002` (`--source 3002 --target 3000`). The MultiversX DeFi Wallet extension gates its inpage-provider injection on `https://`-scoped `web_accessible_resources` matches, so on a plain `http://` origin it refuses to inject (`window.multiversx` is never set) and sdk-dapp reports the extension as not installed.

```bash
pnpm start:devnet      # dev server, devnet config
pnpm start:testnet     # dev server, testnet config
pnpm start:mainnet     # dev server, mainnet config

pnpm build:devnet      # production build (also :testnet / :mainnet); output goes to build/
pnpm preview           # serve the production build (next start)

pnpm lint              # eslint (flat config, eslint.config.mjs)
pnpm test              # jest unit tests (copies devnet config first)
pnpm test path/to/file.test.ts        # single file
pnpm test -t "test name substring"    # single test by name

pnpm run-playwright-test              # Playwright e2e suite (tests/)
pnpm run-playwright-test-ui           # Playwright interactive UI mode
pnpm exec cypress run                 # Cypress e2e (no npm script; baseUrl http://localhost:3000)
```

Next.js 16 defaults to Turbopack, but the `dev`/`build:*` scripts pass `--webpack`: the MultiversX SDK pulls Node built-ins (e.g. `fs` in sdk-core wallet modules) into client bundles that only webpack's `resolve.fallback` can stub. See `next.config.js`.

## Config & network switching

- `src/config/index.ts` is **generated** — never edit it by hand; it is overwritten by the `copy-*-config` scripts. Edit `config.devnet.ts` / `config.testnet.ts` / `config.mainnet.ts` and `sharedConfig.ts` instead.
- `src/initConfig.ts` holds the `InitAppType` config passed to the sdk-dapp init (nativeAuth, theme, walletConnect project id, custom providers, storage). It imports `environment` from `./config`, so the copy mechanism is the single source of truth for the network.

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
- **MultiversX SDK majors**: sdk-core 15, sdk-dapp 5.7, sdk-dapp-utils 3. Note sdk-core 15's transaction factory methods (`createTransactionForExecute`, `createTransactionForNativeTokenTransfer`) are **async** (return `Promise<Transaction>`), and `Transaction`/`Address` reject empty/legacy plain-object shapes — the blast radius is the `src/lib/*` re-export layer.
- **Tailwind v4**. Global styles: `src/styles/globals.css` + `src/styles/tailwind.css`, both imported from `initConfig.ts`.
- **SVGs** are imported as React components via `@svgr/webpack` (configured in `next.config.js`).
- Jest uses **`@swc/jest`** (not ts-jest) and `jest-fixed-jsdom`. `transformIgnorePatterns` matches package names anywhere in the path (works with pnpm's `.pnpm/` layout); `moduleFileExtensions` includes `cjs`/`mjs` for sdk-dapp's deep imports; the `@ledgerhq/hw-transport-*` browser transports are stubbed via `src/mocks/ledgerTransport.ts` (they import wildcard `@ledgerhq/devices` subpaths jest can't resolve).
- **pnpm specifics**: build-script allowlist (`allowBuilds`) and security `overrides` for transitive deps (protobufjs/ws/qs/postcss) live in `pnpm-workspace.yaml`. `.npmrc` sets `shamefully-hoist=true` for SDK compatibility.
- Build output dir is `build/` (not `.next/`), set in `next.config.js`.
- `@multiversx/sdk-dapp-ui` must stay in `transpilePackages`.

## Testing

- **Jest** unit tests are colocated in widget `tests/` dirs — `pnpm test`.
- **Playwright** e2e specs live in `tests/` (connect-wallet flows: memory provider, MetaMask, web wallet; template actions). Fixture credentials come from `.env.test.local` — devnet keystore passwords are provided; the MetaMask mnemonic/address/password fields must be filled in manually before running the MetaMask specs. Run with `pnpm run-playwright-test`.
- **Cypress** specs live in `cypress/e2e/` with a test keystore in `cypress/assets/`; there is no npm script — run `pnpm exec cypress run`. `testIsolation: false` — specs share login state, so ordering within a spec matters.

## Verification

To prove a change works, run in order:

```bash
pnpm lint                # must pass
pnpm test                # Jest unit suite
pnpm build:devnet        # production build must succeed
```

For login/transaction-flow changes, also run `pnpm run-playwright-test`, or start `pnpm start:devnet` and exercise the flow at `https://localhost:3002` (the In Memory Provider allows login without an external wallet). After `build:testnet`/`build:mainnet` runs, run `pnpm copy-devnet-config` so the committed `src/config/index.ts` shows no diff.

## Other templates

The same template dApp exists for other frameworks — useful when a task actually targets a different stack:

| Template | Stack | Repository |
| --- | --- | --- |
| React (TypeScript) | React 18 · TypeScript · Vite | [mx-template-dapp](https://github.com/multiversx/mx-template-dapp) |
| React (JavaScript) | React 19 · JSX · Vite | [mx-template-dapp-reactjs](https://github.com/multiversx/mx-template-dapp-reactjs) |
| Next.js **← this repo** | Next.js 16 (App Router) · TypeScript | [mx-template-dapp-nextjs](https://github.com/multiversx/mx-template-dapp-nextjs) |
| SolidJS | SolidJS · TypeScript · Vite | [mx-template-dapp-solidjs](https://github.com/multiversx/mx-template-dapp-solidjs) |
| Vue | Vue 3 · TypeScript · Vite | [mx-template-dapp-vue](https://github.com/multiversx/mx-template-dapp-vue) |
| Angular | Angular 20 · TypeScript | [mx-template-dapp-angular](https://github.com/multiversx/mx-template-dapp-angular) |
| React Native | React Native | [mx-template-dapp-react-native](https://github.com/multiversx/mx-template-dapp-react-native) |
