'use client';

import * as React from 'react';

import { useTheme } from 'next-themes';

import { Button } from '@/components/elements/Button';
import { IconMoon, IconSun } from '@/components/elements/Icons';

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const [, startTransition] = React.useTransition();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => {
        startTransition(() => {
          setTheme(theme === 'light' ? 'dark' : 'light');
        });
      }}
    >
      {!theme ? null : theme === 'dark' ? (
        <IconMoon className="transition-all" />
      ) : (
        <IconSun className="transition-all" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
