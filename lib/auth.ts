import { PrismaAdapter } from '@auth/prisma-adapter';
import { compare } from 'bcryptjs';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/github';

import { AUTH_PAGE, ROLE_ADMIN } from '@/constants/auth';
import type { User } from '@/types/user';

import { prisma } from './prisma';

const ADMIN_PROTECTED_PATHS_EXACT = ['/api/admin/user/create'];

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  providers: [
    GitHubProvider,
    GoogleProvider,
    CredentialsProvider({
      name: 'Username/Password',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'example@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        if (
          typeof credentials.email !== 'string' ||
          typeof credentials.password !== 'string'
        ) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          return null;
        }

        if (typeof user.password !== 'string') {
          return null;
        }

        const pwCompare = await compare(credentials.password, user.password);
        if (!pwCompare) {
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
        } as User;
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        const u = user;
        return {
          ...token,
          id: u.id,
          role: u.role,
        };
      }
      return token;
    },
    session({ session, user }) {
      if (session.user) {
        session.user.role = user.role;
      }
      return session;
    },
    async authorized({ request, auth }) {
      // `/admin` requires admin role
      if (ADMIN_PROTECTED_PATHS_EXACT.includes(request.nextUrl.pathname)) {
        return auth?.user?.role === ROLE_ADMIN;
      }

      return !!auth?.user;
    },
  },
  pages: {
    signIn: `/${AUTH_PAGE}`,
    signOut: `/${AUTH_PAGE}`,
    error: `/${AUTH_PAGE}`,
    newUser: '/',
  },
});
