import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import UserAuth from '@/components/auth/UserAuth';
import { auth } from '@/lib/auth';

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign In using SSO or email',
};

export default async function SignInPage() {
  const session = await auth();

  if (session?.user) {
    redirect('/');
  }

  return (
    <>
      <div className="bg-white dark:hidden md:hidden" />
      <div className="bg-black dark:block md:hidden" />

      <div className="container relative hidden min-h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        {/* <Button
          variant="ghost"
          asChild
          className="absolute right-4 top-4 md:right-8 md:top-8"
        >
          <Link href="/">Support</Link>
        </Button> */}
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">&ldquo;Quote here...&rdquo;</p>
              <footer className="text-sm">by Me</footer>
            </blockquote>
          </div>
        </div>
        <div className="flex h-full bg-background lg:p-8">
          <UserAuth />
        </div>
      </div>
    </>
  );
}
