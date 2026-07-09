"use client";

// Spacing-Panel: Spacing-Skala, Breakpoints und Grid-Einstellungen.

import { Plus, X } from "lucide-react";
import { useDesignStore, useDesignSystem } from "@/lib/store/design-store";
import { NumField } from "@/components/editor/controls/num-field";
import { PanelGroup, PanelShell } from "./panel-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const BREAKPOINT_LABELS = {
  mobile: "Mobile",
  tablet: "Tablet",
  desktop: "Desktop",
  wide: "Wide",
} as const;

export function SpacingPanel() {
  const system = useDesignSystem();
  const update = useDesignStore((s) => s.update);

  if (!system) return null;
  const { spacing, breakpoints, grid } = system;

  return (
    <PanelShell
      title="Spacing & Layout"
      description="Abstände, Container-Breakpoints und Grid definieren."
    >
      <PanelGroup label="Spacing-Skala">
        <NumField
          label="Basiseinheit"
          value={spacing.base}
          min={1}
          max={16}
          suffix="px"
          onChange={(v) =>
            update((draft) => {
              draft.spacing.base = v;
            })
          }
        />
        <div className="space-y-1.5">
          <span className="block text-xs font-medium text-muted-foreground">
            Multiplikatoren
          </span>
          {spacing.steps.map((step, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="w-14 font-mono text-xs text-muted-foreground">
                space-{index + 1}
              </span>
              <Input
                type="number"
                min={0.5}
                step={0.5}
                value={step}
                onChange={(e) => {
                  const parsed = parseFloat(e.target.value);
                  if (Number.isNaN(parsed)) return;
                  update((draft) => {
                    draft.spacing.steps[index] = parsed;
                  });
                }}
                className="h-8 w-20 text-sm tabular-nums"
              />
              <span className="flex-1 font-mono text-xs text-muted-foreground">
                = {step * spacing.base}px
              </span>
              <Button
                variant="ghost"
                size="icon-xs"
                aria-label={`Stufe ${index + 1} entfernen`}
                disabled={spacing.steps.length <= 2}
                onClick={() =>
                  update((draft) => {
                    draft.spacing.steps.splice(index, 1);
                  })
                }
              >
                <X />
              </Button>
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            className="mt-1"
            onClick={() =>
              update((draft) => {
                const last = draft.spacing.steps[draft.spacing.steps.length - 1] ?? 1;
                draft.spacing.steps.push(Math.round(last * 1.5));
              })
            }
          >
            <Plus /> Stufe hinzufügen
          </Button>
        </div>
      </PanelGroup>

      <PanelGroup label="Breakpoints">
        <div className="grid grid-cols-2 gap-3">
          {(Object.keys(BREAKPOINT_LABELS) as (keyof typeof BREAKPOINT_LABELS)[]).map(
            (key) => (
              <NumField
                key={key}
                label={BREAKPOINT_LABELS[key]}
                value={breakpoints[key]}
                min={240}
                max={3840}
                step={10}
                suffix="px"
                onChange={(v) =>
                  update((draft) => {
                    draft.breakpoints[key] = v;
                  })
                }
              />
            ),
          )}
        </div>
      </PanelGroup>

      <PanelGroup label="Grid-System">
        <div className="grid grid-cols-3 gap-3">
          <NumField
            label="Spalten"
            value={grid.columns}
            min={1}
            max={24}
            onChange={(v) =>
              update((draft) => {
                draft.grid.columns = Math.round(v);
              })
            }
          />
          <NumField
            label="Gutter"
            value={grid.gutter}
            min={0}
            max={80}
            suffix="px"
            onChange={(v) =>
              update((draft) => {
                draft.grid.gutter = v;
              })
            }
          />
          <NumField
            label="Max-Breite"
            value={grid.maxWidth}
            min={480}
            max={2400}
            step={10}
            suffix="px"
            onChange={(v) =>
              update((draft) => {
                draft.grid.maxWidth = v;
              })
            }
          />
        </div>
      </PanelGroup>
    </PanelShell>
  );
}
