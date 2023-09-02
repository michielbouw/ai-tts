'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from '@/components/elements/Button';

export function SignInButton() {
  const pathname = usePathname();

  return (
    <Button variant="link" asChild className="-ml-2">
      <Link href={`/sign-in?next=${pathname}`}>Login</Link>
    </Button>
  );
}
