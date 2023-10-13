import { type Message } from 'ai';

import { Separator } from '@/components/elements/Separator';

import { ChatMessage } from './ChatMessage';

export interface Props {
  messages: Message[];
}

export function ChatList({ messages }: Props) {
  if (!messages.length) {
    return null;
  }

  return (
    <div className="relative mx-auto max-w-2xl px-4">
      {messages.map((message, index) => (
        <div key={index}>
          <ChatMessage message={message} />
          {index < messages.length - 1 && (
            <Separator className="my-4 md:my-8" />
          )}
        </div>
      ))}
    </div>
  );
}
