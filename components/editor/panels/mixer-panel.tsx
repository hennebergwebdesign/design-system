"use client";

import { useMemo, useState } from "react";
import { Check, CircleAlert, CircleCheck, Info, Layers, Shuffle, Palette } from "lucide-react";
import { PanelShell, PanelGroup } from "./panel-shell";
import { Button } from "@/components/ui/button";
import { useComponentStore } from "@/lib/store/component-store";
import { getComponentById } from "@/lib/design-system/conversion-components";
import { useDesignStore, useDesignSystem } from "@/lib/store/design-store";
import { styleToEffects } from "@/lib/design-system/knowledge/adapters";
import {
  CONVERSION_FRAME,
  MIXER_TEMPLATES,
  mixPageDetailed,
  evaluateMix,
  getMixerTemplateStyle,
  type ConversionSlotId,
  type MixedSlot,
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
  const [lastMix, setLastMix] = useState<MixedSlot[]>([]);
  const [justMixed, setJustMixed] = useState(false);

  function mix(template: MixerTemplate) {
    const detailed = mixPageDetailed(template);
    setSelection(detailed.map((d) => d.componentId));
    setLastMix(detailed);
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
      description="Jede Seite folgt derselben Conversion-Struktur – Nav → Hero → Trust → Nutzen → Beweis → CTA → Kontakt → Footer. Je nach Seitentyp werden einzelne Slots ergänzt oder ausgelassen, die Grundstruktur bleibt immer erhalten."
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
          <Button variant="outline" className="w-full" onClick={() => mix(activeTemplate)}>
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
          <ConversionStructureList mix={lastMix} template={activeTemplate} />
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

const ROLE_COLOR: Record<string, string> = {
  structure: "bg-slate-400",
  attention: "bg-amber-500",
  trust: "bg-sky-500",
  value: "bg-emerald-500",
  proof: "bg-violet-500",
  conversion: "bg-rose-500",
  close: "bg-slate-500",
};

function ConversionStructureList({
  mix,
  template,
}: {
  mix: MixedSlot[];
  template: MixerTemplate;
}) {
  const bySlot = useMemo(() => {
    const m = new Map<ConversionSlotId, MixedSlot>();
    for (const item of mix) m.set(item.slotId, item);
    return m;
  }, [mix]);

  return (
    <div className="space-y-1">
      {CONVERSION_FRAME.map((slot, index) => {
        const filled = bySlot.get(slot.id);
        const comp = filled ? getComponentById(filled.componentId) : null;
        const isSkipped = !filled;
        const explicitlyOff = template.slots[slot.id] === false;

        return (
          <div
            key={slot.id}
            className={cn(
              "flex items-start gap-2 rounded-lg border px-2.5 py-1.5",
              isSkipped && "border-dashed bg-muted/30 opacity-60",
            )}
          >
            <span className="mt-1.5 text-[10px] tabular-nums text-muted-foreground w-4 shrink-0">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span
              className={cn("mt-1.5 size-1.5 shrink-0 rounded-full", ROLE_COLOR[slot.role])}
              aria-hidden
            />
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-medium leading-tight">
                {slot.label}
                {slot.required && (
                  <span className="ml-1 text-[9px] uppercase tracking-wide text-muted-foreground">
                    Pflicht
                  </span>
                )}
              </p>
              {comp ? (
                <p className="text-[11px] text-muted-foreground truncate">{comp.name}</p>
              ) : (
                <p className="text-[10px] italic text-muted-foreground">
                  {explicitlyOff
                    ? "vom Seitentyp ausgelassen"
                    : slot.required
                      ? "wird aufgefüllt"
                      : "optional – für diesen Seitentyp nicht benötigt"}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
