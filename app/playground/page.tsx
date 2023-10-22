import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { Playground } from '@/components/playground/Playground';
import { AUTH_PAGE } from '@/constants/auth';
import { auth } from '@/lib/auth';
import { nanoid } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Playground (new)',
};

export default async function PlaygroundPage() {
  const session = await auth();

  if (!session?.user) {
    redirect(`/${AUTH_PAGE}?callbackUrl=/playground`);
  }

  const id = nanoid();

  return <Playground id={id} />;
}
