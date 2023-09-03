import React from 'react';

import { ExternalLink } from '@/components/elements/ExternalLink';

import { TailwindIndicator } from './TailwindIndicator';

export function Footer() {
  return (
    <>
      <TailwindIndicator />
      <div className="space-y-4 px-4 py-2 md:py-4">
        <p className="px-2 text-center text-xs leading-normal text-muted-foreground">
          Michiel Bouw &copy; {new Date().getFullYear()}{' '}
          <ExternalLink href="https://michielbouw.nl/">
            michielbouw.nl
          </ExternalLink>
        </p>
      </div>
    </>
  );
}
