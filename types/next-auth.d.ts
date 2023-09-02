import { DefaultJWT, JWT } from '@auth/core/jwt';
import { DefaultSession } from 'next-auth';

import type { User as InternalUser } from '@/types/user';

declare module 'next-auth' {
  interface User extends InternalUser {}

  interface Session extends DefaultSession {
    user?: InternalUser;
  }
}

declare module '@auth/core/jwt' {
  interface JWT extends DefaultJWT extends InternalUser {
    iat: number;
    exp: number;
    jti: string;
  }
}
