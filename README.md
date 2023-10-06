# **MultiversX dApp based on Next.js and @multiversx/sdk-dapp**

See [Template dApp Next.js](https://template-dapp-nextjs.multiversx.com/) for live demo.

### Important steps in order to make it working:
1. Use ``next-transpile-modules`` in ``next.config.js`` file. Thanks, [Mihai Daniel Eremia](https://github.com/mihaieremia), for your insights!
   - this will resolve the issue related to `"Cannot use import statement outside a module"`
   ```
   const withTM = require("next-transpile-modules")(["@multiversx/sdk-dapp"]);
   
   module.exports = (phase, defaultConfig) => {
    const plugins = [
        withTM,
        (config) => config,
    ];

    const config = plugins.reduce(
        (acc, plugin) => {
            const update = plugin(acc);
            return typeof update === "function"
                ? update(phase, defaultConfig)
                : update;
        },
        { ...nextConfig },
    );

    return config;
   };   
   ```


   **Important UPDATE**: according to nextjs [documentation](https://nextjs.org/docs/pages/api-reference/next-config-js/transpilePackages), the above code can be simplified to:
   ```
      /** @type {import('next').NextConfig} */
      const nextConfig = {
      transpilePackages: ['@multiversx/sdk-dapp']
      };
   
      module.exports = nextConfig;
   ```

2. In order to use the UI components you should use dynamic imports with `ssr: false`.
   - This will bypass the issue related to `'document is not defined'`.
   ```
   import dynamic from "next/dynamic";
      
   const ExtensionLoginButton = dynamic(
       async () => {
        return (await import("@multiversx/sdk-dapp/UI/extension/ExtensionLoginButton")).ExtensionLoginButton;
       },
       { ssr: false }
   );
   
    <ExtensionLoginButton
     loginButtonText='Extension'
     {...commonProps}
    />

-------------------------------------------------------------------------------

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/Index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
