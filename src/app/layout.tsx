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
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={metadata.description as string} />
        <title>{metadata.title as string}</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap"
          rel="stylesheet"
        />
      </head>
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
