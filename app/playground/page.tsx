import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { Playground } from '@/components/playground/Playground';
import { auth } from '@/lib/auth';
import { nanoid } from '@/lib/utils';

export const runtime = 'edge';

export const metadata: Metadata = {
  title: 'Playground (new)',
};

export default async function PlaygroundPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/sign-in?callbackUrl=/playground');
  }

  const id = nanoid();

  return <Playground id={id} />;
}
