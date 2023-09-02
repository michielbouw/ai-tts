import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { UserAuthForm } from '@/components/auth/UserAuthForm';
import { auth } from '@/lib/auth';

export const runtime = 'edge';

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign In using SSO or email',
};

export default async function SignInPage() {
  const session = await auth();

  if (!!session?.user) {
    redirect('/');
  }

  return (
    <>
      <div className="md:hidden dark:hidden bg-white" />
      <div className="md:hidden dark:block bg-black" />

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
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Sign In / Sign Up
              </h1>
              <p className="text-sm text-muted-foreground">
                Sign in to an existing or sign up to a new account
              </p>
            </div>
            <UserAuthForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our Terms of Service and
              Privacy Policy
              {/* {' '} */}
              {/* <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link> */}
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
