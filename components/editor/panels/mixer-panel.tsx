"use client";

import { useState } from "react";
import { Check, CircleAlert, CircleCheck, Info, Layers, Shuffle, Palette } from "lucide-react";
import { PanelShell, PanelGroup } from "./panel-shell";
import { Button } from "@/components/ui/button";
import { useComponentStore } from "@/lib/store/component-store";
import { getComponentById } from "@/lib/design-system/conversion-components";
import { useDesignStore, useDesignSystem } from "@/lib/store/design-store";
import { styleToEffects } from "@/lib/design-system/knowledge/adapters";
import {
  MIXER_TEMPLATES,
  mixPage,
  evaluateMix,
  getMixerTemplateStyle,
  type MixerTemplate,
  type MixCheckItem,
} from "@/lib/design-system/mixer";
import { cn } from "@/lib/utils";

const STATUS_ICON: Record<MixCheckItem["status"], typeof CircleCheck> = {
  pass: CircleCheck,
  warn: CircleAlert,
  info: Info,
};

const STATUS_CLASS: Record<MixCheckItem["status"], string> = {
  pass: "text-emerald-600 dark:text-emerald-400",
  warn: "text-amber-600 dark:text-amber-400",
  info: "text-muted-foreground",
};

export function MixerPanel() {
  const setSelection = useComponentStore((s) => s.setSelection);
  const selectedIds = useComponentStore((s) => s.selectedIds);
  const update = useDesignStore((s) => s.update);
  const system = useDesignSystem();
  const [activeTemplate, setActiveTemplate] = useState<MixerTemplate | null>(null);
  const [justMixed, setJustMixed] = useState(false);

  function mix(template: MixerTemplate) {
    const ids = mixPage(template);
    setSelection(ids);
    const style = getMixerTemplateStyle(template);
    if (style) {
      const effects = styleToEffects(style);
      update((draft) => {
        draft.effects.radius = effects.radius;
        draft.effects.borderWidth = effects.borderWidth;
        draft.effects.iconStyle = effects.iconStyle;
      });
    }
    setActiveTemplate(template);
    setJustMixed(true);
    setTimeout(() => setJustMixed(false), 1500);
  }

  const activeStyle = activeTemplate ? getMixerTemplateStyle(activeTemplate) : undefined;
  const checks = activeTemplate && system ? evaluateMix(selectedIds, system) : null;

  return (
    <PanelShell
      title="Komponenten-Mixer"
      description="Wählen Sie einen Seitentyp – der Mixer stellt sofort eine passende, vollständige Seite aus dem Komponenten-Katalog zusammen und wendet einen dazu passenden Stil aus der Design-Wissensdatenbank an."
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
          {activeStyle && (
            <div className="flex items-start gap-2 rounded-lg border bg-muted/30 p-2.5 text-[11px] text-muted-foreground">
              <Palette className="mt-0.5 size-3.5 shrink-0" />
              <p>
                Stil angewendet: <span className="font-medium text-foreground">{activeStyle.name}</span> —
                Radius, Rahmen und Icon-Stil wurden übernommen.
              </p>
            </div>
          )}
          <MixedList selectedIds={selectedIds} />
        </PanelGroup>
      )}

      {checks && (
        <PanelGroup label="Conversion-Check (Playbook)">
          <div className="space-y-1.5">
            {checks.map((item) => {
              const Icon = STATUS_ICON[item.status];
              return (
                <div key={item.id} className="flex items-start gap-2 rounded-lg border p-2.5">
                  <Icon className={cn("mt-0.5 size-3.5 shrink-0", STATUS_CLASS[item.status])} />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium">{item.label}</p>
                    <p className="mt-0.5 text-[11px] text-muted-foreground">{item.detail}</p>
                  </div>
                </div>
              );
            })}
          </div>
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
