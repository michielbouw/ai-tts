'use client';

import { type Message, useChat } from 'ai/react';
import { toast } from 'react-hot-toast';

import { cn } from '@/lib/utils';

import { ChatEmpty } from './ChatEmpty';
import { ChatList } from './ChatList';
import { ChatPanel } from './ChatPanel';
import { ChatScrollAnchor } from './ChatScrollAnchor';

export interface ChatProps extends React.ComponentProps<'div'> {
  id?: string;
  initialMessages?: Message[];
}

export function Chat({ id, initialMessages, className }: ChatProps) {
  const { messages, append, reload, stop, isLoading, input, setInput } =
    useChat({
      initialMessages,
      id,
      body: {
        id,
      },
      onResponse(response) {
        if (response.status === 401) {
          toast.error(response.statusText);
        }
      },
    });

  return (
    <>
      <div className={cn('pb-[200px] pt-4 md:pt-10', className)}>
        {messages.length ? (
          <>
            <ChatList messages={messages} />
            <ChatScrollAnchor trackVisibility={isLoading} />
          </>
        ) : (
          <ChatEmpty setInput={setInput} />
        )}
      </div>

      <ChatPanel
        id={id}
        isLoading={isLoading}
        stop={stop}
        append={append}
        reload={reload}
        messages={messages}
        input={input}
        setInput={setInput}
      />
    </>
  );
}
