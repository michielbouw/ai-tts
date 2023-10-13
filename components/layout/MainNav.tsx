import * as React from 'react';

import { clearChats } from '@/app/actions';
import { ClearHistory } from '@/components/chat/ClearHistory';
import { IconSeparator } from '@/components/elements/Icons';
import { Sidebar } from '@/components/sidebar/Sidebar';
import { SidebarFooter } from '@/components/sidebar/SidebarFooter';
import { SidebarList } from '@/components/sidebar/SidebarList';
import { auth } from '@/lib/auth';

import { SignInButton } from './SignInButton';
import { UserMenu } from './UserMenu';

export async function MainNav() {
  const session = await auth();

  return (
    <>
      {!!session?.user && (
        <Sidebar>
          <React.Suspense fallback={<div className="flex-1 overflow-auto" />}>
            <SidebarList userId={session?.user?.id} />
          </React.Suspense>
          <SidebarFooter>
            <ClearHistory clearChats={clearChats} />
          </SidebarFooter>
        </Sidebar>
      )}
      <div className="flex items-center">
        <IconSeparator className="h-6 w-6 text-muted-foreground/50" />
        {session?.user ? <UserMenu user={session.user} /> : <SignInButton />}
      </div>
    </>
  );
}
