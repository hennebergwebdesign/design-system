"use client";

// Effects-Panel: Border-Radius, Schatten, Borders und Icon-Stil.

import type { RadiusKey, ScaleStep, ShadowKey } from "@/lib/design-system/types";
import { RADIUS_KEYS, SHADOW_KEYS } from "@/lib/design-system/types";
import { useDesignStore, useDesignSystem } from "@/lib/store/design-store";
import { NumField } from "@/components/editor/controls/num-field";
import { PanelGroup, PanelShell } from "./panel-shell";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const BORDER_STEPS: ScaleStep[] = ["100", "200", "300", "400"];

export function EffectsPanel() {
  const system = useDesignSystem();
  const update = useDesignStore((s) => s.update);

  if (!system) return null;
  const { effects } = system;

  return (
    <PanelShell
      title="Effects"
      description="Rundungen, Schatten, Borders und Icon-Stil festlegen."
    >
      <PanelGroup label="Border-Radius">
        <div className="grid grid-cols-4 gap-2.5">
          {RADIUS_KEYS.map((key: RadiusKey) => (
            <NumField
              key={key}
              label={key}
              value={effects.radius[key]}
              min={0}
              max={48}
              suffix="px"
              onChange={(v) =>
                update((draft) => {
                  draft.effects.radius[key] = v;
                })
              }
            />
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          „none“ (0px) und „full“ (Pille) sind zusätzlich immer verfügbar.
        </p>
      </PanelGroup>

      <PanelGroup label="Schatten / Elevation">
        <div className="space-y-2">
          {SHADOW_KEYS.map((key: ShadowKey) => (
            <label key={key} className="block">
              <span className="mb-1 block font-mono text-xs text-muted-foreground">
                shadow-{key}
              </span>
              <Input
                value={effects.shadows[key]}
                onChange={(e) =>
                  update((draft) => {
                    draft.effects.shadows[key] = e.target.value;
                  })
                }
                className="h-8 font-mono text-xs"
              />
            </label>
          ))}
        </div>
      </PanelGroup>

      <PanelGroup label="Borders">
        <div className="grid grid-cols-2 gap-3">
          <NumField
            label="Border-Breite"
            value={effects.borderWidth}
            min={0}
            max={8}
            step={0.5}
            suffix="px"
            onChange={(v) =>
              update((draft) => {
                draft.effects.borderWidth = v;
              })
            }
          />
          <div>
            <span className="mb-1 block text-xs font-medium text-muted-foreground">
              Border-Farbe (Neutral-Stufe)
            </span>
            <Select
              value={effects.borderColorStep}
              onValueChange={(v) =>
                update((draft) => {
                  draft.effects.borderColorStep = v as ScaleStep;
                })
              }
            >
              <SelectTrigger className="h-8 w-full text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {BORDER_STEPS.map((step) => (
                  <SelectItem key={step} value={step}>
                    Neutral {step}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </PanelGroup>

      <PanelGroup label="Icon-Stil">
        <Tabs
          value={effects.iconStyle}
          onValueChange={(v) =>
            update((draft) => {
              draft.effects.iconStyle = v as "outline" | "filled";
            })
          }
        >
          <TabsList className="w-full">
            <TabsTrigger value="outline" className="flex-1">
              Outline
            </TabsTrigger>
            <TabsTrigger value="filled" className="flex-1">
              Filled
            </TabsTrigger>
          </TabsList>
        </Tabs>
        {effects.iconStyle === "outline" && (
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-muted-foreground">Stroke</span>
            <Slider
              value={effects.iconStrokeWidth}
              min={1}
              max={3}
              step={0.25}
              onValueChange={(v) =>
                update((draft) => {
                  draft.effects.iconStrokeWidth = Array.isArray(v) ? v[0] : v;
                })
              }
              className="flex-1"
            />
            <span className="w-10 text-right font-mono text-xs text-muted-foreground">
              {effects.iconStrokeWidth}
            </span>
          </div>
        )}
        <p className="text-xs text-muted-foreground">
          Basierend auf der Lucide-Icon-Library — „Filled“ füllt die Formen mit
          der aktuellen Farbe.
        </p>
      </PanelGroup>
    </PanelShell>
  );
}
