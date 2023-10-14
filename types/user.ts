export type UserRole = 'user' | 'admin' | 'inactive';

export interface User {
  id: string;
  role?: UserRole;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}
