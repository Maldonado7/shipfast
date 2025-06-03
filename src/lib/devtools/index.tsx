'use client';

import React from 'react';
import { DevToolsProvider } from './provider';
import { DevToolsWidget } from './widget';
import { CommandPalette } from './command-palette';
import { env } from '@/lib/env';

export function DevTools({ children }: { children: React.ReactNode }) {
  // Only render DevTools in development
  if (env.NODE_ENV !== 'development') {
    return <>{children}</>;
  }

  return (
    <DevToolsProvider>
      {children}
      <DevToolsWidget />
      <CommandPalette />
    </DevToolsProvider>
  );
}