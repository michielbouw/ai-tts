'use client';

import * as React from 'react';

import Link from 'next/link';

import { useSession } from 'next-auth/react';

import { clearChats } from '@/app/actions';
import { ClearHistory } from '@/components/chat/ClearHistory';
import { IconNextChat, IconSeparator } from '@/components/elements/Icons';
import { Sidebar } from '@/components/sidebar/Sidebar';
import { SidebarFooter } from '@/components/sidebar/SidebarFooter';
import { SidebarList } from '@/components/sidebar/SidebarList';

import { SignInButton } from './SignInButton';
import { UserMenu } from './UserMenu';

export function MainNav() {
  const { data: session } = useSession();

  return (
    <>
      {session?.user ? (
        <Sidebar>
          <React.Suspense fallback={<div className="flex-1 overflow-auto" />}>
            {/* @ts-ignore */}
            <SidebarList userId={session?.user?.id} />
          </React.Suspense>
          <SidebarFooter>
            <ClearHistory clearChats={clearChats} />
          </SidebarFooter>
        </Sidebar>
      ) : (
        <Link href="/" target="_blank" rel="nofollow">
          <IconNextChat className="w-6 h-6 mr-2 dark:hidden" inverted />
          <IconNextChat className="hidden w-6 h-6 mr-2 dark:block" />
        </Link>
      )}
      <div className="flex items-center">
        <IconSeparator className="w-6 h-6 text-muted-foreground/50" />
        {session?.user ? <UserMenu user={session.user} /> : <SignInButton />}
      </div>
    </>
  );
}
