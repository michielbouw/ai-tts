import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { Chat } from '@/components/chat/Chat';
import { auth } from '@/lib/auth';
import { nanoid } from '@/lib/utils';

export const runtime = 'edge';

export const metadata: Metadata = {
  title: 'Chat (new)',
};

export default async function ChatNewPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/sign-in?callbackUrl=/chat');
  }

  const id = nanoid();

  return <Chat id={id} />;
}
