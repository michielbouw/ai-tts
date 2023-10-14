'use client';

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@radix-ui/react-hover-card';
import {
  CursorTextIcon,
  FileTextIcon,
  Pencil2Icon,
} from '@radix-ui/react-icons';
import { Label } from '@radix-ui/react-label';
import { Separator } from '@radix-ui/react-separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { type Message, useChat } from 'ai/react';
import { toast } from 'react-hot-toast';
import Textarea from 'react-textarea-autosize';

import { Button } from '@/components/elements/Button';
import {
  IconRefresh,
  IconSpinner,
  IconStop,
} from '@/components/elements/Icons';
import { MaxLengthSelector } from '@/components/playground/MaxLengthSelector';
import { models } from '@/constants/models';
import { useEnterSubmit } from '@/lib/hooks/useEnterSubmit';
import { types } from '@/types/model';

import { ModelSelector } from './ModelSelector';
import { TemperatureSelector } from './TemperatureSelector';
import { TopPSelector } from './TopPSelector';

export interface PlaygroundProps extends React.ComponentProps<'div'> {
  id?: string;
  initialMessages?: Message[];
}

export function Playground({ id, initialMessages }: PlaygroundProps) {
  // TODO: split different AI means into different forms with their own hook! (see: https://sdk.vercel.ai/docs/api-reference)
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

  const { formRef, onKeyDown } = useEnterSubmit();

  const onSubmit = async (value: string) => {
    await append({
      id,
      content: value,
      role: 'user',
    });
  };

  return (
    <div className="hidden h-full flex-col md:flex">
      <div className="container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
        <h2 className="text-lg font-semibold">Playground</h2>
        {/* Actions */}
        {/* <div className="ml-auto flex w-full space-x-2 sm:justify-end">
        </div> */}
      </div>
      <Separator />
      <Tabs defaultValue="complete" className="flex-1">
        <div className="container h-full py-6">
          <div className="grid h-full items-stretch gap-6 md:grid-cols-[1fr_200px]">
            <div className="hidden flex-col space-y-4 sm:flex md:order-2">
              <div className="grid gap-2">
                <HoverCard openDelay={200}>
                  <HoverCardTrigger asChild>
                    <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Mode
                    </span>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-[320px] text-sm" side="left">
                    Choose the interface that best suits your task. You can
                    provide: a simple prompt to complete, starting and ending
                    text to insert a completion within, or some text with
                    instructions to edit it.
                  </HoverCardContent>
                </HoverCard>
                <TabsList className="grid grid-cols-3 border p-1">
                  <TabsTrigger
                    className="flex items-center justify-center"
                    value="complete"
                  >
                    <span className="sr-only">Complete</span>
                    <FileTextIcon className="h-5 w-5" />
                  </TabsTrigger>
                  <TabsTrigger
                    className="flex items-center justify-center"
                    value="insert"
                  >
                    <span className="sr-only">Insert</span>
                    <CursorTextIcon className="h-5 w-5" />
                  </TabsTrigger>
                  <TabsTrigger
                    className="flex items-center justify-center"
                    value="edit"
                  >
                    <span className="sr-only">Adjust</span>
                    <Pencil2Icon className="h-5 w-5" />
                  </TabsTrigger>
                </TabsList>
              </div>
              <ModelSelector types={types} models={models} />
              <TemperatureSelector defaultValue={[0.56]} />
              <MaxLengthSelector defaultValue={[256]} />
              <TopPSelector defaultValue={[0.9]} />
            </div>
            <div className="md:order-1">
              <form
                onSubmit={async e => {
                  e.preventDefault();
                  if (!input?.trim()) {
                    return;
                  }
                  setInput('');
                  await onSubmit(input);
                }}
                ref={formRef}
              >
                {/* >> HERE different forms */}
                <TabsContent value="complete" className="mt-0 border-0 p-0">
                  <div className="flex h-full flex-col space-y-4">
                    <Textarea
                      placeholder="Write a tagline for an ice cream shop"
                      className="p-4"
                      value={input}
                      onChange={e => setInput(e.target.value)}
                      onKeyDown={onKeyDown}
                      tabIndex={0}
                      minRows={6}
                      spellCheck={false}
                    />
                    <div className="flex items-center space-x-2">
                      <Button disabled={isLoading}>
                        {isLoading && (
                          <IconSpinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Submit
                      </Button>
                      {messages?.length > 0 && (
                        <Button
                          variant="outline"
                          onClick={() => reload()}
                          className="bg-background"
                        >
                          <IconRefresh className="mr-2" />
                          Regenerate response
                        </Button>
                      )}
                      {isLoading && (
                        <Button
                          variant="outline"
                          onClick={() => stop()}
                          className="bg-background"
                        >
                          <IconStop className="mr-2" />
                          Stop generating
                        </Button>
                      )}
                      <Button variant="secondary">
                        <span className="sr-only">Show history</span>
                        <IconRefresh className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="insert" className="mt-0 border-0 p-0">
                  <div className="flex flex-col space-y-4">
                    <div className="grid h-full grid-rows-2 gap-6 lg:grid-cols-2 lg:grid-rows-1">
                      <Textarea
                        placeholder="We're writing to [inset]. Congrats from OpenAI!"
                        className="p-4"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={onKeyDown}
                        tabIndex={0}
                        minRows={6}
                        spellCheck={false}
                      />
                      <div className="rounded-md border bg-muted"></div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button disabled={isLoading}>
                        {isLoading && (
                          <IconSpinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Submit
                      </Button>
                      {messages?.length > 0 && (
                        <Button
                          variant="outline"
                          onClick={() => reload()}
                          className="bg-background"
                        >
                          <IconRefresh className="mr-2" />
                          Regenerate response
                        </Button>
                      )}
                      {isLoading && (
                        <Button
                          variant="outline"
                          onClick={() => stop()}
                          className="bg-background"
                        >
                          <IconStop className="mr-2" />
                          Stop generating
                        </Button>
                      )}
                      <Button variant="secondary">
                        <span className="sr-only">Show history</span>
                        <IconRefresh className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="edit" className="mt-0 border-0 p-0">
                  <div className="flex flex-col space-y-4">
                    <div className="grid h-full gap-6 lg:grid-cols-2">
                      <div className="flex flex-col space-y-4">
                        <div className="flex flex-col space-y-2">
                          <Label htmlFor="input">Input</Label>
                          <Textarea
                            id="input"
                            placeholder="We is going to the market."
                            className="p-4"
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={onKeyDown}
                            tabIndex={0}
                            minRows={6}
                            spellCheck={false}
                          />
                        </div>
                        <div className="flex flex-col space-y-2">
                          <Label htmlFor="instructions">Instructions</Label>
                          <Textarea
                            id="instructions"
                            placeholder="Fix the grammar."
                            className="p-4"
                            // value={input2}
                            // onChange={e => setInput2(e.target.value)}
                            // onKeyDown={onKeyDown}
                            // minRows={2}
                            // tabIndex={0}
                            // spellCheck={false}
                          />
                        </div>
                      </div>
                      <div className="mt-[21px] min-h-[400px] rounded-md border bg-muted lg:min-h-[700px]" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button disabled={isLoading}>
                        {isLoading && (
                          <IconSpinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Submit
                      </Button>
                      {messages?.length > 0 && (
                        <Button
                          variant="outline"
                          onClick={() => reload()}
                          className="bg-background"
                        >
                          <IconRefresh className="mr-2" />
                          Regenerate response
                        </Button>
                      )}
                      {isLoading && (
                        <Button
                          variant="outline"
                          onClick={() => stop()}
                          className="bg-background"
                        >
                          <IconStop className="mr-2" />
                          Stop generating
                        </Button>
                      )}
                      <Button variant="secondary">
                        <span className="sr-only">Show history</span>
                        <IconRefresh className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </form>
            </div>
          </div>
        </div>
      </Tabs>
    </div>
  );
}
