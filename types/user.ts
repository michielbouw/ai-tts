export type UserRole = 'user' | 'admin';

export interface User {
  id: string;
  role?: UserRole;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}
