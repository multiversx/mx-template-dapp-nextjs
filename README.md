# MultiversX Template dApp (Next.js)

The **MultiversX dApp Template** built with [Next.js](https://nextjs.org/) 16 (App Router) and TypeScript. It is a reference implementation of [@multiversx/sdk-dapp](https://www.npmjs.com/package/@multiversx/sdk-dapp) v5, demonstrating:

- wallet authentication (browser extension, xPortal / WalletConnect, web wallet, Ledger, and a custom in-memory provider)
- transaction signing, sending, and tracking (single + batch transactions)
- message signing and native auth
- smart-contract interaction — a Ping-Pong contract called three ways (raw payload, ABI, service abstraction)
- how to bridge the client-only sdk-dapp into Next.js server components (`'use client'` + `InitAppWrapper`)

See [Template dApp Next.js](https://mx-template-dapp-nextjs-tawny.vercel.app/) for a live demo.

> **Looking for another framework?** The same dApp exists for React (TS and JS), Vue, Angular, SolidJS, and React Native — see [Other templates](#other-templates).

## Requirements

- [Node.js](https://nodejs.org/) 24
- [pnpm](https://pnpm.io/) 11 (the repo ships a `pnpm-lock.yaml` — use pnpm, not npm or yarn)

## Getting started

### 1. Install dependencies

```bash
pnpm install
```

### 2. Start the dev server on the desired network

```bash
pnpm start:devnet     # or start:testnet / start:mainnet
```

**Open [https://localhost:3002](https://localhost:3002)** — not `http://localhost:3000`. Next dev has no TLS, so the scripts run a `local-ssl-proxy` that serves HTTPS on `:3002` in front of the plain-HTTP Next server on `:3000`. Wallet extensions only inject their provider on an `https://` origin, so on `:3000` login will not work.

### 3. Build and preview

```bash
pnpm build:devnet     # or build:testnet / build:mainnet — output goes to build/
pnpm preview          # serve the production build (next start)
```

## Available scripts

| Script | Description |
| --- | --- |
| `pnpm start:devnet` / `start:testnet` / `start:mainnet` | Copy the network config, then run Next dev (webpack) behind the SSL proxy on `https://localhost:3002` |
| `pnpm build:devnet` / `build:testnet` / `build:mainnet` | Copy the network config, then production build to `build/` |
| `pnpm preview` | Serve the production build (`next start`) |
| `pnpm copy-devnet-config` (also `testnet` / `mainnet`) | Copy `src/config/config.<network>.ts` over `src/config/index.ts` |
| `pnpm test` | Jest unit tests (devnet config is copied first) |
| `pnpm run-playwright-test` / `run-playwright-test-ui` | Playwright E2E suite (headless / interactive UI) |
| `pnpm lint` | ESLint (flat config) |

> The `dev`/`build` scripts pass `--webpack`: the MultiversX SDK pulls Node built-ins (e.g. `fs`) into client bundles that only webpack's `resolve.fallback` can stub — see `next.config.js`.

## Network configuration

There is **no `.env` file for network selection**. The active network (devnet / testnet / mainnet) is selected at dev/build time by copying one of the per-network config files over the generated index:

- `src/config/config.devnet.ts`, `config.testnet.ts`, `config.mainnet.ts` — per-network values (API URL, contract address, `environment`)
- `src/config/sharedConfig.ts` — values common to all networks (WalletConnect project ID, batch-transaction contracts, etc.)
- `src/config/index.ts` — **generated** by the `copy-*-config` scripts; never edit it by hand, it is overwritten on every `start:*` / `build:*`

The `environment` exported by the active config is passed to sdk-dapp's `initApp` in `src/initConfig.ts`, so the copy mechanism is the single source of truth for the network.

## Project structure

```
src/
├── app/             # App Router pages: (home), dashboard (+ widgets/), unlock, logout, disclaimer
├── components/      # shared presentational components
├── config/          # per-network configs (see Network configuration)
├── contracts/       # Ping-Pong contract ABI
├── helpers/         # generic utilities
├── hooks/           # shared React hooks
├── lib/             # SDK re-export layer — the only place with deep @multiversx/* imports
├── localConstants/  # route names, misc constants
├── mocks/           # Jest mocks (Ledger transport)
├── provider/        # custom InMemoryProvider (login without an external wallet)
├── styles/          # Tailwind v4 styles
├── wrappers/        # InitAppWrapper (sdk-dapp bootstrap), AuthRedirectWrapper
└── initConfig.ts    # the InitAppType config passed to sdk-dapp's initApp
```

## How sdk-dapp is used

1. **Bootstrap (the Next.js-specific part)** — sdk-dapp is client-only. The server component `src/app/layout.tsx` renders the client component `InitAppWrapper` (`src/wrappers/`), which calls `initAppSingleton(config)` in a `useEffect` and renders nothing until sdk-dapp init resolves. Interactive components carry `'use client'`.
2. **SDK import layer** — app code never imports `@multiversx/sdk-*` deep paths directly; everything is funneled through `src/lib/` (`sdkCore`, `sdkDapp`, `sdkDappUI`, `sdkDappUtils`). Import from `@/lib`.
3. **Login** — the Unlock page opens sdk-dapp's `UnlockPanelManager`, which lists all available providers (including the custom `InMemoryProvider` registered in `initConfig.ts`).
4. **Transactions** — the dashboard `widgets/` show the canonical flows; the three PingPong widgets (`PingPongRaw`, `PingPongAbi`, `PingPongService`) demonstrate three ways to call the same contract. Flow: build a `Transaction` → `getAccountProvider().signTransactions()` → `TransactionManager.getInstance().send()` → `.track()`.
5. **State** — account, network, and login data come from sdk-dapp's store via React hooks (`useGetAccount`, `useGetNetworkConfig`, `useGetIsLoggedIn`).

## Testing

- **Unit tests** — Jest (`@swc/jest`, `jest-fixed-jsdom`), colocated in widget `tests/` folders: `pnpm test`. Single file: `pnpm test path/to/file.test.ts`; by name: `pnpm test -t "name"`.
- **E2E tests (Playwright)** — specs in `tests/` covering connect-wallet flows (memory provider, MetaMask, web wallet) and template actions: `pnpm run-playwright-test`. Credentials/fixtures are read from `.env.test.local` (devnet keystore passwords; MetaMask fields must be filled in manually for the MetaMask specs).
- **E2E tests (Cypress)** — specs in `cypress/e2e/` (no npm script): `pnpm exec cypress run`. `testIsolation` is `false`, so ordering within a spec matters; a test keystore is in `cypress/assets/`.

## Other templates

The same template dApp is implemented across several frameworks. If another stack suits your project better, start from one of these instead:

| Template | Stack | Repository |
| --- | --- | --- |
| React (TypeScript) | React 18 · TypeScript · Vite | [mx-template-dapp](https://github.com/multiversx/mx-template-dapp) |
| React (JavaScript) | React 19 · JSX · Vite | [mx-template-dapp-reactjs](https://github.com/multiversx/mx-template-dapp-reactjs) |
| Next.js **← this repo** | Next.js 16 (App Router) · TypeScript | [mx-template-dapp-nextjs](https://github.com/multiversx/mx-template-dapp-nextjs) |
| SolidJS | SolidJS · TypeScript · Vite | [mx-template-dapp-solidjs](https://github.com/multiversx/mx-template-dapp-solidjs) |
| Vue | Vue 3 · TypeScript · Vite | [mx-template-dapp-vue](https://github.com/multiversx/mx-template-dapp-vue) |
| Angular | Angular 20 · TypeScript | [mx-template-dapp-angular](https://github.com/multiversx/mx-template-dapp-angular) |
| React Native | React Native | [mx-template-dapp-react-native](https://github.com/multiversx/mx-template-dapp-react-native) |

## Links

- [@multiversx/sdk-dapp on GitHub](https://github.com/multiversx/mx-sdk-dapp) · [on npm](https://www.npmjs.com/package/@multiversx/sdk-dapp)
- [MultiversX developer docs](https://docs.multiversx.com/)
