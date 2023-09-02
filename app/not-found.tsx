import Link from 'next/link';

import { auth } from '@/lib/auth';

export const runtime = 'edge';

export default async function NotFound() {
  const session = await auth();

  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      {!!session?.user ? <Link href="/dashboard">Back to Home</Link> : <Link href="/sign-in">Sign In</Link>}
    </div>
  );
}
