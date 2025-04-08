import { initApp } from '@/helpers';
import { InitAppType } from '@/lib';

let initialized = false;

export const initAppSingleton = async (config: InitAppType) => {
  if (initialized) return;
  await initApp(config);
  initialized = true;
};
