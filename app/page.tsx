import { redirect } from 'next/navigation';

import { AUTH_PAGE } from '@/constants/auth';
import { auth } from '@/lib/auth';

export default async function HomePage() {
  const session = await auth();

  if (session?.user) {
    redirect('/playground');
  } else {
    redirect(`/${AUTH_PAGE}`);
  }
}
