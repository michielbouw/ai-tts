import * as React from 'react';

import { MainNav } from './MainNav';
import { ThemeToggle } from './ThemeToggle';

export function Header() {
  return (
    <header className="sticky top-0 z-50 flex h-16 w-full shrink-0 items-center justify-between border-b bg-gradient-to-b from-background/10 via-background/50 to-background/80 px-4 backdrop-blur-xl">
      <div className="flex items-center">
        <MainNav />
      </div>
      <div className="flex items-center justify-end space-x-2">
        <ThemeToggle />
      </div>
    </header>
  );
}
