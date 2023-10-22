'use client';

import { useState } from 'react';

import { useSearchParams } from 'next/navigation';

import { InfoCircledIcon } from '@radix-ui/react-icons';
import { signIn } from 'next-auth/react';

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/elements/Alert';
import { Button } from '@/components/elements/Button';
import {
  IconGitHub,
  IconGoogle,
  IconSpinner,
} from '@/components/elements/Icons';
import { mapAuthCallbackErrorToReadableError } from '@/lib/helpers/auth';
import { cn } from '@/lib/utils';

import { UserAuthFormCredentials } from './UserAuthFormCredentials';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  isSignUp?: boolean;
}

export function UserAuthForm({
  isSignUp = false,
  className,
  ...props
}: UserAuthFormProps) {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') ?? '/';

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState(searchParams.get('error') ?? '');

  async function onSignInSSO(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    type: 'github' | 'google',
  ) {
    event.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await signIn(type, { callbackUrl });

      setIsLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setIsLoading(false);
      setError(error);
    }
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Button
        variant="outline"
        onClick={event => onSignInSSO(event, 'github')}
        disabled={isLoading}
        className={cn(className)}
      >
        {isLoading ? (
          <IconSpinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <IconGitHub className="mr-2 h-4 w-4" />
        )}{' '}
        Sign {isSignUp ? 'Up' : 'In'} with GitHub
      </Button>
      <Button
        variant="outline"
        onClick={event => onSignInSSO(event, 'google')}
        disabled={isLoading}
        className={cn(className)}
      >
        {isLoading ? (
          <IconSpinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <IconGoogle className="mr-2 h-4 w-4" />
        )}{' '}
        Sign {isSignUp ? 'Up' : 'In'} with Google
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

      <UserAuthFormCredentials
        callbackUrl={callbackUrl}
        isSignUp={isSignUp}
        setError={setError}
      />

      {!!error && (
        <Alert variant="destructive">
          <InfoCircledIcon className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {mapAuthCallbackErrorToReadableError(error)}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
