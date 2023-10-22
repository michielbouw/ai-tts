export type AccountState = 'new' | 'active' | 'expired' | 'inactive';

export interface Account {
  id: string;
  state: AccountState;
  userId: string;
  type: string;
  provider: string;
}
