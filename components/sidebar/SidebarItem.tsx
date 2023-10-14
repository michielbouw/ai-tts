'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { buttonVariants } from '@/components/elements/Button';
import { IconMessage } from '@/components/elements/Icons';
import { cn } from '@/lib/utils';
import type { Command } from '@/types/command';

interface SidebarItemProps {
  command: Command;
  children: React.ReactNode;
}

export function SidebarItem({ command, children }: SidebarItemProps) {
  const pathname = usePathname();
  const isActive = pathname === command.path;

  if (!command?.id) return null;

  return (
    <div className="relative">
      <div className="absolute left-2 top-1 flex h-6 w-6 items-center justify-center">
        <IconMessage className="mr-2" />
      </div>
      <Link
        href={command.path}
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'group w-full pl-8 pr-16',
          isActive && 'bg-accent',
        )}
      >
        <div
          className="relative max-h-5 flex-1 select-none overflow-hidden text-ellipsis break-all"
          title={command.title}
        >
          <span className="whitespace-nowrap">{command.title}</span>
        </div>
      </Link>
      {isActive && <div className="absolute right-2 top-1">{children}</div>}
    </div>
  );
}
