import { useEffect } from 'react';
// import { getWindowLocation } from '@/utils/sdkDappUtils';

export const useScrollToElement = () => {
  const { hash } = window?.location;

  useEffect(() => {
    if (!hash) {
      return;
    }

    const [, anchor] = hash.split('#');

    if (!anchor) {
      return;
    }

    const element = document.getElementById(anchor);

    if (!element) {
      return;
    }

    element.scrollIntoView();
  }, [hash]);
};
