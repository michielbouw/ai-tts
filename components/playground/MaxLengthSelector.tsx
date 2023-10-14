'use client';

import * as React from 'react';

import {
  HoverCard,
  HoverCardContent,
  HoverCardPortal,
  HoverCardTrigger,
} from '@radix-ui/react-hover-card';
import { Label } from '@radix-ui/react-label';
import {
  Slider,
  SliderProps,
  SliderRange,
  SliderThumb,
  SliderTrack,
} from '@radix-ui/react-slider';

interface MaxLengthSelectorProps {
  defaultValue: SliderProps['defaultValue'];
}

export function MaxLengthSelector({ defaultValue }: MaxLengthSelectorProps) {
  const [value, setValue] = React.useState(defaultValue);

  return (
    <div className="grid gap-2 pt-2">
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="maxlength">Maximum Length</Label>
              <span className="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">
                {value}
              </span>
            </div>
            <Slider
              id="maxlength"
              max={4000}
              defaultValue={value}
              step={10}
              onValueChange={setValue}
              className="relative flex h-4 w-full touch-none select-none items-center"
              aria-label="Maximum Length"
            >
              <SliderTrack className="relative h-[3px] grow rounded-full bg-black">
                <SliderRange className="bg-grey absolute h-full rounded-full" />
              </SliderTrack>
              <SliderThumb
                className="shadow-blackA4 hover:bg-violet3 focus:shadow-blackA5 block h-5 w-5 rounded-[10px] bg-white shadow-[0_2px_10px] focus:shadow-[0_0_0_5px] focus:outline-none"
                aria-label="Maximum Length"
              />
            </Slider>
          </div>
        </HoverCardTrigger>
        <HoverCardPortal>
          <HoverCardContent
            align="start"
            className="w-[260px] rounded-md bg-white p-5 text-sm  shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px]"
            side="left"
          >
            The maximum number of tokens to generate. Requests can use up to
            2,048 or 4,000 tokens, shared between prompt and completion. The
            exact limit varies by model.
          </HoverCardContent>
        </HoverCardPortal>
      </HoverCard>
    </div>
  );
}
