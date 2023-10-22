import Link from 'next/link';

import { AUTH_PAGE } from '@/constants/auth';
import { auth } from '@/lib/auth';

export default async function NotFound() {
  const session = await auth();

  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      {session?.user ? (
        <Link href="/">Back to Home</Link>
      ) : (
        <Link href={`/${AUTH_PAGE}`}>Sign In</Link>
      )}
    </div>
  );
}
