import { type Message } from 'ai';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface Command extends Record<string, any> {
  id: string;
  title: string;
  createdAt: Date;
  userId: string;
  path: string;
  messages: Message[];
}
