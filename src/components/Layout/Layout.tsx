import { PropsWithChildren } from 'react';

import { Footer, Header } from '@/components';

// prettier-ignore
const styles = {
  layoutContainer: 'layout-container flex min-h-screen flex-col bg-accent transition-all duration-200 ease-out',
  mainContainer: 'main-container flex flex-grow items-stretch justify-center'
} satisfies Record<string, string>;

export const Layout = ({ children }: PropsWithChildren) => (
  <div className={styles.layoutContainer}>
    <Header />

    <main className={styles.mainContainer}>{children}</main>
    <Footer />
  </div>
);
