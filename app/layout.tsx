import { Metadata } from 'next';

import { Toaster } from 'react-hot-toast';

import '@/app/globals.css';
import { AuthProviders } from '@/components/providers/AuthProviders';
import { ThemeProviders } from '@/components/providers/ThemeProviders';
import { auth } from '@/lib/auth';
import { fontMono, fontSans } from '@/lib/fonts';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: {
    default: 'AI TTS',
    template: `AI TTS - %s`,
  },
  description: '...',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

async function RootLayout({ children }: RootLayoutProps) {
  const session = await auth();

  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          'font-sans antialiased',
          fontSans.variable,
          fontMono.variable,
        )}
      >
        <Toaster />
        <AuthProviders session={session}>
          <ThemeProviders attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProviders>
        </AuthProviders>
      </body>
    </html>
  );
}

export default RootLayout;
