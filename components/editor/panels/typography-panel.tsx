"use client";

// Typography-Panel: Fonts (Google Fonts), Pairing-Vorschläge, Type-Scale
// und Feineinstellungen pro Ebene.

import type { TypeLevelKey } from "@/lib/design-system/types";
import { TYPE_LEVEL_KEYS } from "@/lib/design-system/types";
import {
  FONT_PAIRINGS,
  SCALE_PRESETS,
  applyScale,
  findFont,
} from "@/lib/design-system/fonts";
import { useDesignStore, useDesignSystem } from "@/lib/store/design-store";
import { loadGoogleFont } from "@/components/preview/font-loader";
import { FontPicker } from "@/components/editor/controls/font-picker";
import { NumField } from "@/components/editor/controls/num-field";
import { PanelGroup, PanelShell } from "./panel-shell";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const LEVEL_LABELS: Record<TypeLevelKey, string> = {
  h1: "H1",
  h2: "H2",
  h3: "H3",
  h4: "H4",
  h5: "H5",
  h6: "H6",
  body: "Body",
  small: "Small",
  caption: "Caption",
};

const WEIGHTS = [300, 400, 500, 600, 700, 800];

export function TypographyPanel() {
  const system = useDesignSystem();
  const update = useDesignStore((s) => s.update);

  if (!system) return null;
  const { typography } = system;

  const currentPairing = FONT_PAIRINGS.find(
    (p) => p.heading === typography.heading.family && p.body === typography.body.family,
  );

  return (
    <PanelShell
      title="Typography"
      description="Schriften wählen und die Type-Scale definieren."
    >
      <PanelGroup label="Font-Pairing-Vorschläge">
        <div className="grid grid-cols-2 gap-2">
          {FONT_PAIRINGS.map((pairing) => (
            <button
              key={pairing.name}
              type="button"
              onClick={() => {
                loadGoogleFont(pairing.heading);
                loadGoogleFont(pairing.body);
                update((draft) => {
                  draft.typography.heading = findFont(pairing.heading);
                  draft.typography.body = findFont(pairing.body);
                });
              }}
              className={cn(
                "rounded-lg border p-2.5 text-left transition-colors hover:bg-muted/50",
                currentPairing?.name === pairing.name && "border-primary bg-primary/5",
              )}
            >
              <p className="text-xs font-semibold">{pairing.name}</p>
              <p className="mt-0.5 truncate text-[11px] text-muted-foreground">
                {pairing.heading} + {pairing.body}
              </p>
            </button>
          ))}
        </div>
      </PanelGroup>

      <PanelGroup label="Schriftarten">
        <div className="space-y-3">
          <FontPicker
            label="Headings"
            value={typography.heading.family}
            onChange={(font) =>
              update((draft) => {
                draft.typography.heading = { family: font.family, category: font.category };
              })
            }
          />
          <FontPicker
            label="Body-Text"
            value={typography.body.family}
            onChange={(font) =>
              update((draft) => {
                draft.typography.body = { family: font.family, category: font.category };
              })
            }
          />
        </div>
      </PanelGroup>

      <PanelGroup label="Type-Scale">
        <div className="grid grid-cols-2 gap-3">
          <NumField
            label="Basisgröße"
            value={typography.baseSize}
            min={12}
            max={24}
            suffix="px"
            onChange={(baseSize) =>
              update((draft) => applyScale(draft.typography, baseSize, draft.typography.scaleRatio))
            }
          />
          <div>
            <span className="mb-1 block text-xs font-medium text-muted-foreground">
              Skalierungsfaktor
            </span>
            <Select
              value={String(typography.scaleRatio)}
              onValueChange={(v) =>
                update((draft) =>
                  applyScale(draft.typography, draft.typography.baseSize, parseFloat(v as string)),
                )
              }
            >
              <SelectTrigger className="h-8 w-full text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SCALE_PRESETS.map((preset) => (
                  <SelectItem key={preset.ratio} value={String(preset.ratio)}>
                    {preset.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          Basisgröße oder Faktor ändern berechnet alle Größen neu — einzelne
          Ebenen lassen sich darunter manuell übersteuern.
        </p>
      </PanelGroup>

      <PanelGroup label="Ebenen">
        <div className="space-y-2">
          {TYPE_LEVEL_KEYS.map((key) => {
            const level = typography.levels[key];
            return (
              <details key={key} className="group rounded-lg border">
                <summary className="flex cursor-pointer items-center justify-between px-3 py-2 text-sm font-medium select-none">
                  <span>{LEVEL_LABELS[key]}</span>
                  <span className="font-mono text-xs text-muted-foreground">
                    {level.size}px · {level.weight}
                  </span>
                </summary>
                <div className="grid grid-cols-2 gap-2.5 border-t p-3">
                  <NumField
                    label="Größe"
                    value={level.size}
                    min={8}
                    max={160}
                    suffix="px"
                    onChange={(v) =>
                      update((draft) => {
                        draft.typography.levels[key].size = v;
                      })
                    }
                  />
                  <NumField
                    label="Zeilenhöhe"
                    value={level.lineHeight}
                    min={0.8}
                    max={3}
                    step={0.05}
                    onChange={(v) =>
                      update((draft) => {
                        draft.typography.levels[key].lineHeight = v;
                      })
                    }
                  />
                  <NumField
                    label="Letter-Spacing"
                    value={level.letterSpacing}
                    min={-0.1}
                    max={0.3}
                    step={0.005}
                    suffix="em"
                    onChange={(v) =>
                      update((draft) => {
                        draft.typography.levels[key].letterSpacing = v;
                      })
                    }
                  />
                  <div>
                    <span className="mb-1 block text-xs font-medium text-muted-foreground">
                      Font-Weight
                    </span>
                    <Select
                      value={String(level.weight)}
                      onValueChange={(v) =>
                        update((draft) => {
                          draft.typography.levels[key].weight = parseInt(v as string, 10);
                        })
                      }
                    >
                      <SelectTrigger className="h-8 w-full text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {WEIGHTS.map((weight) => (
                          <SelectItem key={weight} value={String(weight)}>
                            {weight}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </details>
            );
          })}
        </div>
      </PanelGroup>
    </PanelShell>
  );
}
