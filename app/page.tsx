import { redirect } from 'next/navigation';

import { auth } from '@/lib/auth';

export default async function HomePage() {
  const session = await auth();

  if (session?.user) {
    redirect('/playground');
  } else {
    redirect('/sign-in');
  }
}
