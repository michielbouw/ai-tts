import React from 'react';

import { ExternalLink } from '@/components/elements/ExternalLink';
import { cn } from '@/lib/utils';

import { TailwindIndicator } from './TailwindIndicator';

function FooterText({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      className={cn(
        'px-2 text-center text-xs leading-normal text-muted-foreground',
        className,
      )}
    >
      Michiel Bouw &copy; {new Date().getFullYear()}{' '}
      <ExternalLink href="https://michielbouw.nl/">michielbouw.nl</ExternalLink>
    </p>
  );
}

export function Footer() {
  return (
    <>
      <TailwindIndicator />
      <div className="space-y-4 px-4 py-2 md:py-4">
        <FooterText className="hidden sm:block" />
      </div>
    </>
  );
}
