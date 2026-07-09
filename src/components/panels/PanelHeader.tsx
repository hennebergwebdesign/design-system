"use client";

import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useDesignSystemStore } from "@/lib/store";
import type { SectionKey } from "@/lib/types";

interface PanelHeaderProps {
  title: string;
  description: string;
  /** Design-system section that the reset button restores. */
  resetSection?: SectionKey;
  children?: React.ReactNode;
}

export function PanelHeader({ title, description, resetSection, children }: PanelHeaderProps) {
  const resetSectionAction = useDesignSystemStore((s) => s.resetSection);

  return (
    <div className="bg-background sticky top-0 z-10 border-b px-5 py-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h2 className="font-semibold">{title}</h2>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
        {resetSection && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => resetSectionAction(resetSection)}
              >
                <RotateCcw />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Auf Standardwerte zurücksetzen</TooltipContent>
          </Tooltip>
        )}
      </div>
      {children}
    </div>
  );
}
