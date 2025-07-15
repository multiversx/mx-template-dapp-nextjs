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

## Getting Started

Run the development server on the desired network:

```bash
yarn start-testnet
```

or

```bash
yarn start-devnet
```

or

```bash
yarn start-mainnet
```

Run a production build:

```bash
yarn build-testnet
```

or

```bash
yarn build-devnet
```

or

```bash
yarn build-mainnet
```

and then

```bash
yarn start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
