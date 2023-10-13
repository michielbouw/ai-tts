import { type UseChatHelpers } from 'ai/react';

import { Button } from '@/components/elements/Button';
import { ButtonScrollToBottom } from '@/components/elements/ButtonScrollToBottom';
import { IconRefresh, IconStop } from '@/components/elements/Icons';
import { PromptForm } from '@/components/elements/PromptForm';

export interface ChatPanelProps
  extends Pick<
    UseChatHelpers,
    | 'append'
    | 'isLoading'
    | 'reload'
    | 'messages'
    | 'stop'
    | 'input'
    | 'setInput'
  > {
  id?: string;
}

export function ChatPanel({
  id,
  isLoading,
  stop,
  append,
  reload,
  input,
  setInput,
  messages,
}: ChatPanelProps) {
  return (
    <div className="fixed inset-x-4 bottom-16 bg-gradient-to-b from-muted/10 from-10% to-muted/30 to-50% md:inset-x-0 md:bottom-[100px]">
      <ButtonScrollToBottom />
      <div className="mx-auto sm:max-w-2xl sm:px-4">
        <div className="flex h-10 items-center justify-center">
          {isLoading ? (
            <Button
              variant="outline"
              onClick={() => stop()}
              className="bg-background"
            >
              <IconStop className="mr-2" />
              Stop generating
            </Button>
          ) : (
            messages?.length > 0 && (
              <Button
                variant="outline"
                onClick={() => reload()}
                className="bg-background"
              >
                <IconRefresh className="mr-2" />
                Regenerate response
              </Button>
            )
          )}
        </div>
        <div className="space-y-4 rounded-xl border bg-background px-4 py-2 shadow-md md:py-4">
          <PromptForm
            onSubmit={async value => {
              await append({
                id,
                content: value,
                role: 'user',
              });
            }}
            input={input}
            setInput={setInput}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
