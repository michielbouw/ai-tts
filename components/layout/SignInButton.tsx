'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from '@/components/elements/Button';
import { AUTH_PAGE } from '@/constants/auth';

export function SignInButton() {
  const pathname = usePathname();

  return (
    <Button variant="link" asChild className="-ml-2">
      <Link href={`/${AUTH_PAGE}?next=${pathname}`}>Login</Link>
    </Button>
  );
}
