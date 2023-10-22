'use client';

import { useState } from 'react';

import { UserAuthForm } from '@/components/auth/UserAuthForm';
import { Tabs, TabsList, TabsTrigger } from '@/components/elements/Tabs';

enum AuthState {
  SIGN_IN = 'signin',
  SIGN_UP = 'signup',
}

export default function UserAuth() {
  const [state, setState] = useState<AuthState>(AuthState.SIGN_IN);

  return (
    <div className="align-center mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col gap-6 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Authenticate</h1>

        <Tabs
          value={state}
          onValueChange={value => setState(value as AuthState)}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value={AuthState.SIGN_IN}>Sign In</TabsTrigger>
            <TabsTrigger value={AuthState.SIGN_UP}>Sign Up</TabsTrigger>
          </TabsList>
        </Tabs>

        <UserAuthForm isSignUp={state === 'signup'} />

        <p className="px-8 text-center text-sm text-muted-foreground">
          By clicking continue, you agree to our Terms of Service and Privacy
          Policy
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
  );
}
