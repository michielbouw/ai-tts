'use client';

import { SessionProvider, SessionProviderProps } from 'next-auth/react';

export function AuthProviders({ children, ...props }: SessionProviderProps) {
  return <SessionProvider {...props}>{children}</SessionProvider>;
}
