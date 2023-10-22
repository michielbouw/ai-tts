'use client';

import { useState } from 'react';

import { redirect } from 'next/navigation';

import { signIn } from 'next-auth/react';

import { Input } from '@/components/auth/Input';
import { Label } from '@/components/auth/Label';
import { Button } from '@/components/elements/Button';
import { IconSpinner } from '@/components/elements/Icons';
import { SIGN_UP_API_ROUTE } from '@/constants/auth';

interface UserAuthFormCredentialsProps {
  callbackUrl: string;
  isSignUp?: boolean;
  setError: (error: string) => void;
}

export function UserAuthFormCredentials({
  callbackUrl,
  isSignUp = false,
  setError,
}: UserAuthFormCredentialsProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [password2Input, setPassword2Input] = useState('');

  async function onSignIn(event?: React.SyntheticEvent) {
    event?.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const email = emailInput;
      const password = passwordInput;

      if (!email || !password) {
        setIsLoading(false);
        redirect('/');
      }

      const csrfToken = await fetch('/api/auth/csrf');

      await signIn('credentials', {
        csrfToken,
        email,
        password,
        callbackUrl,
      });

      setIsLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setIsLoading(false);
      setError(error);
    }
  }

  async function onSignUp(event?: React.SyntheticEvent) {
    event?.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const email = emailInput;
      const password = passwordInput;
      const password2 = password2Input;

      if (!email || !password) {
        setIsLoading(false);
        setError('Missing email or password');
        return;
      }

      if (password !== password2) {
        setIsLoading(false);
        setError('Passwords do not match');
        return;
      }

      const res = await fetch(SIGN_UP_API_ROUTE, {
        method: 'POST',
        body: JSON.stringify({ name: email, email, password }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        setIsLoading(false);
        setError((await res.json()).message);
        return;
      }

      onSignIn();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setIsLoading(false);
      setError(error);
    }
  }

  return (
    <form onSubmit={isSignUp ? onSignUp : onSignIn}>
      <div className="grid gap-2">
        <div className="grid gap-1">
          <Label className="sr-only" htmlFor="newemail">
            Email
          </Label>
          <Input
            value={emailInput}
            onChange={e => setEmailInput(e.target.value)}
            id="newemail"
            placeholder="example@example.com"
            type="email"
            autoCapitalize="none"
            autoCorrect="off"
            disabled={isLoading}
          />
        </div>
        <div className="grid gap-1">
          <Label className="sr-only" htmlFor="newpassword">
            Password
          </Label>
          <Input
            value={passwordInput}
            onChange={e => setPasswordInput(e.target.value)}
            id="newpassword"
            placeholder="password"
            type="password"
            disabled={isLoading}
          />
        </div>
        {!!isSignUp && (
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="newpassword2">
              Repeat Password
            </Label>
            <Input
              value={password2Input}
              onChange={e => setPassword2Input(e.target.value)}
              id="newpassword2"
              placeholder="repeat password"
              type="password"
              disabled={isLoading}
            />
          </div>
        )}
        <Button disabled={isLoading}>
          {isLoading && <IconSpinner className="mr-2 h-4 w-4 animate-spin" />}
          Sign {isSignUp ? 'Up' : 'In'}
        </Button>
      </div>
    </form>
  );
}
