import { isWindowAvailable } from '@/helpers/isWindowAvailable';

const getFromSessionStorage = (key: string) => {
  if (!isWindowAvailable()) {
    return null;
  }
  return sessionStorage.getItem(key);
};

const setToSessionStorage = (key: string, value: string) => {
  if (!isWindowAvailable()) {
    return null;
  }
  sessionStorage.setItem(key, value);
};

const removeFromSessionStorage = (key: string) => {
  if (!isWindowAvailable()) {
    return null;
  }
  sessionStorage.removeItem(key);
};

export { getFromSessionStorage, setToSessionStorage, removeFromSessionStorage };
