"use client";

import { useState } from "react";
import { Check, Layers, Shuffle } from "lucide-react";
import { PanelShell, PanelGroup } from "./panel-shell";
import { Button } from "@/components/ui/button";
import { useComponentStore } from "@/lib/store/component-store";
import { getComponentById } from "@/lib/design-system/conversion-components";
import { MIXER_TEMPLATES, mixPage, type MixerTemplate } from "@/lib/design-system/mixer";
import { cn } from "@/lib/utils";

export function MixerPanel() {
  const setSelection = useComponentStore((s) => s.setSelection);
  const selectedIds = useComponentStore((s) => s.selectedIds);
  const [activeTemplate, setActiveTemplate] = useState<MixerTemplate | null>(null);
  const [justMixed, setJustMixed] = useState(false);

  function mix(template: MixerTemplate) {
    const ids = mixPage(template);
    setSelection(ids);
    setActiveTemplate(template);
    setJustMixed(true);
    setTimeout(() => setJustMixed(false), 1500);
  }

  return (
    <PanelShell
      title="Komponenten-Mixer"
      description="Wählen Sie einen Seitentyp – der Mixer stellt sofort eine passende, vollständige Seite aus dem Komponenten-Katalog zusammen."
    >
      <PanelGroup label="Seitentyp">
        <div className="space-y-2">
          {MIXER_TEMPLATES.map((template) => (
            <button
              key={template.id}
              onClick={() => mix(template)}
              className={cn(
                "flex w-full items-start gap-3 rounded-lg border p-3 text-left transition-colors hover:bg-muted/50",
                activeTemplate?.id === template.id && justMixed &&
                  "border-green-500 bg-green-50 dark:bg-green-950/20",
              )}
            >
              <Layers className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <p className="text-xs font-medium">{template.name}</p>
                  {activeTemplate?.id === template.id && justMixed && (
                    <Check className="size-3 text-green-600" />
                  )}
                </div>
                <p className="text-[11px] text-muted-foreground">{template.description}</p>
              </div>
            </button>
          ))}
        </div>
      </PanelGroup>

      {activeTemplate && (
        <PanelGroup label="Ergebnis">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => mix(activeTemplate)}
          >
            <Shuffle className="size-3.5" />
            Neu mischen
          </Button>
          <MixedList selectedIds={selectedIds} />
        </PanelGroup>
      )}
    </PanelShell>
  );
}

function MixedList({ selectedIds }: { selectedIds: string[] }) {
  if (selectedIds.length === 0) return null;
  return (
    <div className="space-y-1">
      {selectedIds.map((id, index) => {
        const comp = getComponentById(id);
        if (!comp) return null;
        return (
          <div
            key={`${id}-${index}`}
            className="rounded-lg border bg-background px-2.5 py-1.5 text-sm"
          >
            <span className="font-medium">{comp.name}</span>
          </div>
        );
      })}
    </div>
  );
}
