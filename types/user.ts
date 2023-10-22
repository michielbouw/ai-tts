import { Account } from './account';

export type UserRole = 'user' | 'admin' | 'inactive';

export interface User {
  id: string;
  role: UserRole;
  createdAt: Date;
  name?: string | null;
  email?: string | null;
  emailVerified?: Date;
  image?: string | null;
  accounts?: Account[];
}
