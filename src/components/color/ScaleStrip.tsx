"use client";

import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SCALE_STEPS, generateScale } from "@/lib/color";

/** Renders the generated 50–950 scale of a base color; click copies the hex. */
export function ScaleStrip({ baseHex }: { baseHex: string }) {
  const scale = generateScale(baseHex);
  const [copied, setCopied] = useState<string | null>(null);

  const copy = (hex: string) => {
    navigator.clipboard?.writeText(hex);
    setCopied(hex);
    setTimeout(() => setCopied(null), 1200);
  };

  return (
    <div className="flex overflow-hidden rounded-md border">
      {SCALE_STEPS.map((step) => (
        <Tooltip key={step}>
          <TooltipTrigger asChild>
            <button
              onClick={() => copy(scale[step])}
              className="h-8 flex-1 transition-transform hover:scale-110"
              style={{ backgroundColor: scale[step] }}
              aria-label={`${step}: ${scale[step]}`}
            />
          </TooltipTrigger>
          <TooltipContent className="font-mono text-xs">
            {copied === scale[step] ? "Kopiert!" : `${step} · ${scale[step]}`}
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}
