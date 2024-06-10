/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata } from 'next';

import StyledComponentsRegistry from './lib/registry';
import ReactQueryProvider from './lib/react-query-provider';

import { MockProvider } from './mocks/provider';

import './styles/globals.css';

export const metadata: Metadata = {
  title: 'Metrics Dashboard',
  description: 'Metrics Dashboard for the best metrics in the world!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          <StyledComponentsRegistry>
            <MockProvider>{children}</MockProvider>
          </StyledComponentsRegistry>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
