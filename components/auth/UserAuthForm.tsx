'use client';

import { useState } from 'react';

import { useSearchParams } from 'next/navigation';

import { signIn } from 'next-auth/react';

import { Button } from '@/components/elements/Button';
import {
  IconGitHub,
  IconGoogle,
  IconSpinner,
} from '@/components/elements/Icons';
import { cn } from '@/lib/utils';

import { UserAuthFormCredentials } from './UserAuthFormCredentials';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') ?? '/';

  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function onSubmitSSO(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    type: 'github' | 'google',
  ) {
    event.preventDefault();
    setIsLoading(true);

    await signIn(type, { callbackUrl });

    setIsLoading(false);
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Button
        variant="outline"
        onClick={event => onSubmitSSO(event, 'github')}
        disabled={isLoading}
        className={cn(className)}
      >
        {isLoading ? (
          <IconSpinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <IconGitHub className="mr-2 h-4 w-4" />
        )}{' '}
        Sign In with GitHub
      </Button>
      {/* @TODO: setup Sign In with Google */}
      <Button
        variant="outline"
        onClick={event => onSubmitSSO(event, 'google')}
        disabled={isLoading}
        className={cn(className)}
      >
        {isLoading ? (
          <IconSpinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <IconGoogle className="mr-2 h-4 w-4" />
        )}{' '}
        Sign In with Google
      </Button>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <UserAuthFormCredentials callbackUrl={callbackUrl} />
    </div>
  );
}
