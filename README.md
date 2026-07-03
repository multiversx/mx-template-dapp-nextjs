# **MultiversX dApp based on Next.js and @multiversx/sdk-dapp**

See [Template dApp Next.js](https://mx-template-dapp-nextjs-tawny.vercel.app/) for live demo.

### Setup next.config.js.

See [documentation](https://nextjs.org/docs/pages/api-reference/next-config-js/transpilePackages)

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@multiversx/sdk-dapp-ui']
};

module.exports = nextConfig;
```

---

## Requirements

- [Node.js](https://nodejs.org/) 24
- [pnpm](https://pnpm.io/) 11 (`corepack enable` will provision the version pinned in `package.json`)

Install dependencies:

```bash
pnpm install
```

## Getting Started

Run the development server on the desired network:

```bash
pnpm start:testnet
```

or

```bash
pnpm start:devnet
```

or

```bash
pnpm start:mainnet
```

The dev server runs behind a local SSL proxy — open [https://localhost:3002](https://localhost:3002) with your browser to see the result.

Run a production build:

```bash
pnpm build:testnet
```

or

```bash
pnpm build:devnet
```

or

```bash
pnpm build:mainnet
```

and then

```bash
pnpm preview
```
