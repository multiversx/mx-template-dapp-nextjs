/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

const withTM = require("next-transpile-modules")([
    "@multiversx/sdk-dapp",
]);

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
