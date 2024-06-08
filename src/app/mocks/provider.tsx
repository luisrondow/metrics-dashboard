'use client';
import { useEffect, useState } from 'react';

export function MockProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [mockingEnabled, enableMocking] = useState(false);

  useEffect(() => {
    async function enableApiMocking() {
      if (typeof window !== 'undefined') {
        const { mswWorker } = await import('./mswWorker');
        await mswWorker.start();

        enableMocking(true);
      }
    }

    enableApiMocking();
  }, []);

  if (!mockingEnabled) {
    return null;
  }

  return <>{children}</>;
}
