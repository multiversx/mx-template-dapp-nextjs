// Empty stub for @ledgerhq/hw-transport-* browser transports.
//
// These hardware-wallet transports are pulled into the module graph
// transitively via the @multiversx/sdk-dapp providers barrel, but are never
// exercised in jsdom unit tests. They import wildcard subpaths of
// @ledgerhq/devices (e.g. `@ledgerhq/devices/ble/sendAPDU`) that Jest's
// resolver cannot resolve through that package's wildcard `exports` map, so we
// map the transports to this no-op stub in jest.config.js.
export default class EmptyTransport {}
