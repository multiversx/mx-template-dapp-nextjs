import { InitAppType, initApp } from '@/lib';

let initialized = false;

export const initAppSingleton = async (config: InitAppType) => {
  if (initialized) return;
  await initApp(config);
  initialized = true;
};
