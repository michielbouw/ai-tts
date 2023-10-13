import { JWT } from '@auth/core/jwt';
import { nanoid } from 'nanoid';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GitHub from 'next-auth/providers/github';
import { Session } from 'next-auth/types';

import type { User } from '@/types/user';

// const ADMIN_PROTECTED_PATHS_EXACT = ['/api/admin', '/admin'];

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  providers: [
    GitHub,
    // Google,
    CredentialsProvider({
      name: 'Username/Password',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'username' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (credentials) {
          // @TODO: Add logic here to look up the user from the credentials supplied
          const user: User = {
            id: '1',
            name: 'Admin',
            email: 'admin@michielbouw.nl',
          };

          if (user) {
            // Any object returned will be saved in `user` property of the JWT
            return user;
          }
          // If you return null then an error will be displayed advising the user to check their details.
          return null;
        }
        return null;
      },
    }),
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ trigger, token, user, profile }) {
      if (['signIn', 'signUp'].includes(trigger ?? '')) {
        // When trigger is "signIn" or "signUp", `token` will be a subset of JWT, `name`, `email` and `image` will be included.
        // signIn: user sign-in: First time the callback is invoked, user, profile and account will be present.
        // signUp: user sign-up: a user is created for the first time in the database (when AuthConfig.session .strategy is set to "database")

        const userRole = user?.role ?? 'user'; // Default role // @TODO: expand roles
        const userId = user?.id ?? profile?.id ?? nanoid();
        const userName = user?.name ?? profile?.name ?? token.name ?? undefined;
        const userEmail =
          user?.email ?? profile?.email ?? token.email ?? undefined;
        const userImage =
          user?.image ??
          profile?.avatar_url ??
          profile?.picture ??
          profile?.image ??
          token.image ??
          undefined;
        const userJwt = {
          role: userRole,
          id: userId,
          name: userName,
          email: userEmail,
          image: userImage,
          iat: token.iat,
          exp: token.exp,
          jti: token.jti,
        } as JWT;

        return userJwt;
      }

      return token as JWT;
    },
    async session({ session, user, token }) {
      return {
        expires: session.expires,
        user: user ?? token,
      } as Session;
    },
    async signIn() {
      const isAllowedToSignIn = true;
      if (isAllowedToSignIn) {
        return true;
      }
      // Return false to display a default error message
      return false;
      // Or you can return a URL to redirect to:
      // return '/unauthorized'
    },
    async authorized({ auth }) {
      // `/admin` requires admin role
      // if (ADMIN_PROTECTED_PATHS_EXACT.includes(request.nextUrl.pathname)) {
      //   return auth?.user?.role === 'admin';
      // }

      return !!auth?.user;
    },
  },
  pages: {
    signIn: '/sign-in',
    signOut: '/sign-in',
    error: '/sign-in',
    newUser: '/',
  },
});
