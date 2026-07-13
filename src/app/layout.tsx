import { Suspense } from 'react';
import type { ReactNode } from 'react';
import { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { Layout } from '@/components/Layout';
import App from './index';
import { InitAppWrapper } from '@/wrappers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Template dApp Next.js',
  description:
    'A basic implementation of MultiversX dApp providing the basics for MultiversX authentication and TX signing.',
  icons: {
    icon: '/favicon.ico'
  }
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en' className={inter.className}>
      <body>
        <InitAppWrapper>
          <App>
            <Suspense>
              <Layout>{children}</Layout>
            </Suspense>
          </App>
        </InitAppWrapper>
      </body>
    </html>
  );
}
