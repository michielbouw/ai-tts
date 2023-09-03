'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { buttonVariants } from '@/components/elements/Button';
import { IconMessage, IconUsers } from '@/components/elements/Icons';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/elements/Tooltip';
import { cn } from '@/lib/utils';
import type { Chat } from '@/types/chat';

interface SidebarItemProps {
  chat: Chat;
  children: React.ReactNode;
}

export function SidebarItem({ chat, children }: SidebarItemProps) {
  const pathname = usePathname();
  const isActive = pathname === chat.path;

  if (!chat?.id) return null;

  return (
    <div className="relative">
      <div className="absolute left-2 top-1 flex h-6 w-6 items-center justify-center">
        <IconMessage className="mr-2" />
      </div>
      <Link
        href={chat.path}
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'group w-full pl-8 pr-16',
          isActive && 'bg-accent',
        )}
      >
        <div
          className="relative max-h-5 flex-1 select-none overflow-hidden text-ellipsis break-all"
          title={chat.title}
        >
          <span className="whitespace-nowrap">{chat.title}</span>
        </div>
      </Link>
      {isActive && <div className="absolute right-2 top-1">{children}</div>}
    </div>
  );
}
