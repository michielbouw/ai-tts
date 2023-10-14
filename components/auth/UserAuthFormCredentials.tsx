'use client';

import { useState } from 'react';

import { redirect } from 'next/navigation';

import { signIn } from 'next-auth/react';

import { Input } from '@/components/auth/Input';
import { Label } from '@/components/auth/Label';
import { Button } from '@/components/elements/Button';
import { IconSpinner } from '@/components/elements/Icons';

interface UserAuthFormCredentialsProps {
  callbackUrl: string;
}

export function UserAuthFormCredentials({
  callbackUrl,
}: UserAuthFormCredentialsProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  async function onSubmitPassword(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    const username = usernameInput;
    const password = passwordInput;

    if (!username || !password) {
      setIsLoading(false);
      redirect('/');
    }

    const csrfToken = await fetch('/api/auth/csrf');

    await signIn('credentials', {
      csrfToken,
      username,
      password,
      callbackUrl,
    });

    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }

  return (
    <form onSubmit={onSubmitPassword}>
      <div className="grid gap-2">
        <div className="grid gap-1">
          <Label className="sr-only" htmlFor="email">
            Username
          </Label>
          <Input
            value={usernameInput}
            onChange={e => setUsernameInput(e.target.value)}
            id="username"
            placeholder="username"
            type="text"
            autoCapitalize="none"
            autoCorrect="off"
            disabled={isLoading}
          />
        </div>
        <div className="grid gap-1">
          <Label className="sr-only" htmlFor="email">
            Password
          </Label>
          <Input
            value={passwordInput}
            onChange={e => setPasswordInput(e.target.value)}
            id="password"
            placeholder="password"
            type="password"
            disabled={isLoading}
          />
        </div>
        <Button disabled={isLoading}>
          {isLoading && <IconSpinner className="mr-2 h-4 w-4 animate-spin" />}
          Sign In
        </Button>
      </div>
    </form>
  );
}
