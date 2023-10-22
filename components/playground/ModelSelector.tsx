'use client';

import * as React from 'react';

import {
  HoverCard,
  HoverCardContent,
  HoverCardPortal,
  HoverCardTrigger,
} from '@radix-ui/react-hover-card';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import { Label } from '@radix-ui/react-label';
import {
  Popover,
  PopoverContent,
  PopoverPortal,
  PopoverTrigger,
} from '@radix-ui/react-popover';
import { PopoverProps } from '@radix-ui/react-popover';

import { Button } from '@/components/elements/Button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/elements/Command';
import { useMutationObserver } from '@/lib/hooks/useMutationObserver';
import { cn } from '@/lib/utils';
import { Model, ModelType } from '@/types/model';

interface ModelSelectorProps extends PopoverProps {
  types: readonly ModelType[];
  models: Model[];
}

export function ModelSelector({ models, types, ...props }: ModelSelectorProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedModel, setSelectedModel] = React.useState<Model>(models[0]);
  const [peekedModel, setPeekedModel] = React.useState<Model>(models[0]);

  return (
    <div className="grid gap-2">
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <Label htmlFor="model">Model</Label>
        </HoverCardTrigger>
        <HoverCardPortal>
          <HoverCardContent
            align="start"
            className="w-[260px] rounded-md bg-white p-5 text-sm  shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px]"
            side="left"
          >
            The model which will generate the completion. Some models are
            suitable for natural language tasks, others specialize in code.
            Learn more.
          </HoverCardContent>
        </HoverCardPortal>
      </HoverCard>
      <Popover open={open} onOpenChange={setOpen} {...props}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a model"
            className="w-full justify-between"
          >
            {selectedModel ? selectedModel.name : 'Select a model...'}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverPortal>
          <PopoverContent
            align="end"
            className="w-[250px] rounded bg-white p-0"
          >
            <HoverCard open>
              <HoverCardPortal>
                <HoverCardContent
                  side="left"
                  align="start"
                  forceMount
                  className="min-h-[280px] rounded-md bg-white p-5"
                >
                  <div className="grid gap-2">
                    <h4 className="font-medium leading-none">
                      {peekedModel.name}
                    </h4>
                    <div className="text-sm text-muted-foreground">
                      {peekedModel.description}
                    </div>
                    {peekedModel.strengths ? (
                      <div className="mt-4 grid gap-2">
                        <h5 className="text-sm font-medium leading-none">
                          Strengths
                        </h5>
                        <ul className="text-sm text-muted-foreground">
                          {peekedModel.strengths}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                </HoverCardContent>
              </HoverCardPortal>
              <Command loop>
                <CommandList className="h-[var(--cmdk-list-height)] max-h-[400px]">
                  <CommandInput placeholder="Search Models..." />
                  <CommandEmpty>No Models found.</CommandEmpty>
                  <HoverCardTrigger />
                  {types.map(type => (
                    <CommandGroup key={type} heading={type}>
                      {models
                        .filter(model => model.type === type)
                        .map(model => (
                          <ModelItem
                            key={model.id}
                            model={model}
                            isSelected={selectedModel?.id === model.id}
                            onPeek={model => setPeekedModel(model)}
                            onSelect={() => {
                              setSelectedModel(model);
                              setOpen(false);
                            }}
                          />
                        ))}
                    </CommandGroup>
                  ))}
                </CommandList>
              </Command>
            </HoverCard>
          </PopoverContent>
        </PopoverPortal>
      </Popover>
    </div>
  );
}

interface ModelItemProps {
  model: Model;
  isSelected: boolean;
  onSelect: () => void;
  onPeek: (model: Model) => void;
}

function ModelItem({ model, isSelected, onSelect, onPeek }: ModelItemProps) {
  const ref = React.useRef<HTMLDivElement>(null);

  useMutationObserver(ref, mutations => {
    for (const mutation of mutations) {
      if (mutation.type === 'attributes') {
        if (mutation.attributeName === 'aria-selected') {
          onPeek(model);
        }
      }
    }
  });

  return (
    <CommandItem
      key={model.id}
      onSelect={onSelect}
      ref={ref}
      className="aria-selected:bg-primary aria-selected:text-primary-foreground"
    >
      {model.name}
      <CheckIcon
        className={cn(
          'ml-auto h-4 w-4',
          isSelected ? 'opacity-100' : 'opacity-0',
        )}
      />
    </CommandItem>
  );
}
