"use client";

import { useState } from "react";
import { Sparkles, Wand2, Check, Palette } from "lucide-react";
import { PanelShell, PanelGroup } from "./panel-shell";
import { Button } from "@/components/ui/button";
import { useDesignStore } from "@/lib/store/design-store";
import { useComponentStore } from "@/lib/store/component-store";
import { DESIGN_PRESETS, type DesignPreset } from "@/lib/design-system/presets";
import { computeTypeLevels } from "@/lib/design-system/derive";
import {
  MIXER_TEMPLATES,
  mixPage,
  getMixerTemplateStyle,
  type MixerTemplate,
} from "@/lib/design-system/mixer";
import { styleToEffects } from "@/lib/design-system/knowledge/adapters";
import { cn } from "@/lib/utils";

/**
 * Wählt anhand von Stichworten im Prompt eine passende Vorlage aus dem
 * Komponenten-Mixer. Nutzt denselben Katalog wie das Mixer-Panel, damit ein
 * generierter Vorschlag sofort in Live-Vorschau, Components- und
 * Export-Panel sichtbar ist (statt in einer separaten Sitemap-Struktur).
 */
function matchTemplate(query: string): MixerTemplate {
  if (query.includes("saas") || query.includes("software") || query.includes("app"))
    return MIXER_TEMPLATES.find((t) => t.id === "saas")!;
  if (query.includes("portfolio") || query.includes("personal"))
    return MIXER_TEMPLATES.find((t) => t.id === "portfolio")!;
  if (query.includes("agentur") || query.includes("agency") || query.includes("kreativ"))
    return MIXER_TEMPLATES.find((t) => t.id === "agency")!;
  if (query.includes("shop") || query.includes("ecommerce") || query.includes("store"))
    return MIXER_TEMPLATES.find((t) => t.id === "ecommerce")!;
  if (query.includes("unternehmen") || query.includes("corporate") || query.includes("firma"))
    return MIXER_TEMPLATES.find((t) => t.id === "corporate")!;
  return MIXER_TEMPLATES.find((t) => t.id === "landing")!;
}

function matchPreset(query: string): DesignPreset {
  for (const preset of DESIGN_PRESETS) {
    if (preset.tags.some((t) => query.includes(t)) || query.includes(preset.name.toLowerCase())) {
      return preset;
    }
  }
  if (query.includes("luxu") || query.includes("premium") || query.includes("elegant")) return DESIGN_PRESETS[1];
  if (query.includes("bold") || query.includes("kreativ") || query.includes("agentur")) return DESIGN_PRESETS[2];
  if (query.includes("minimal") || query.includes("schlicht") || query.includes("portfolio")) return DESIGN_PRESETS[3];
  if (query.includes("natur") || query.includes("organic") || query.includes("food") || query.includes("wellness"))
    return DESIGN_PRESETS[4];
  return DESIGN_PRESETS[0];
}

export function GeneratePanel() {
  const activeProjectId = useDesignStore((s) => s.activeProjectId);
  const update = useDesignStore((s) => s.update);
  const setSelection = useComponentStore((s) => s.setSelection);
  const [promptText, setPromptText] = useState("");
  const [appliedPreset, setAppliedPreset] = useState<string | null>(null);
  const [appliedTemplate, setAppliedTemplate] = useState<string | null>(null);

  if (!activeProjectId) return null;

  function applyPreset(preset: DesignPreset) {
    update((draft) => {
      draft.colors = {
        primary: preset.colors.primary,
        secondary: preset.colors.secondary,
        accent: preset.colors.accent,
        neutral: preset.colors.neutral,
        success: preset.colors.success,
        warning: preset.colors.warning,
        error: preset.colors.error,
        info: preset.colors.info,
      };
      draft.typography.heading = preset.typography.heading;
      draft.typography.body = preset.typography.body;
      draft.typography.baseSize = preset.typography.baseSize;
      draft.typography.scaleRatio = preset.typography.scaleRatio;
      draft.typography.levels = computeTypeLevels(preset.typography.baseSize, preset.typography.scaleRatio);
      draft.effects.radius = { ...preset.effects.radius };
      draft.effects.borderWidth = preset.effects.borderWidth;
      draft.effects.iconStyle = preset.effects.iconStyle;
      draft.spacing.base = preset.spacing.base;
    });
    setAppliedPreset(preset.id);
    setTimeout(() => setAppliedPreset(null), 2000);
  }

  /** Mischt eine vollständige Seite über den Komponenten-Mixer und wendet dessen Stil an. */
  function applyTemplate(template: MixerTemplate) {
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
    setAppliedTemplate(template.id);
    setTimeout(() => setAppliedTemplate(null), 2000);
  }

  function handlePromptGenerate() {
    if (!promptText.trim()) return;
    const q = promptText.toLowerCase();
    applyPreset(matchPreset(q));
    applyTemplate(matchTemplate(q));
    setPromptText("");
  }

  return (
    <PanelShell title="Generate" description="Beschreibe deine Marke – wir generieren Design & eine vollständige Seite aus dem Komponenten-Mixer.">
      <PanelGroup label="AI Prompt">
        <div className="space-y-2">
          <div className="relative">
            <textarea
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              placeholder="z.B. 'Moderne SaaS-App für Projektmanagement, professionell aber freundlich, blaue Töne'"
              className="w-full resize-none rounded-lg border bg-background px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              rows={3}
            />
          </div>
          <Button className="w-full" onClick={handlePromptGenerate} disabled={!promptText.trim()}>
            <Wand2 className="size-3.5" />
            Design & Seite generieren
          </Button>
          <p className="text-[11px] text-muted-foreground">
            Wendet ein passendes Farb-/Typografie-Preset an und mischt direkt eine vollständige Seite
            aus dem Conversion-Komponenten-Katalog (Mixer) inkl. passendem Stil.
          </p>
        </div>
      </PanelGroup>

      <PanelGroup label="Style Presets">
        <div className="space-y-2">
          {DESIGN_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => applyPreset(preset)}
              className={cn(
                "flex w-full items-start gap-3 rounded-lg border p-3 text-left transition-colors hover:bg-muted/50",
                appliedPreset === preset.id && "border-green-500 bg-green-50 dark:bg-green-950/20",
              )}
            >
              <div className="flex shrink-0 gap-0.5 pt-0.5">
                {[preset.colors.primary.light, preset.colors.secondary.light, preset.colors.accent.light].map(
                  (col, i) => (
                    <div
                      key={i}
                      className="size-4 rounded-full border border-black/10"
                      style={{ backgroundColor: col }}
                    />
                  ),
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <p className="text-xs font-medium">{preset.name}</p>
                  {appliedPreset === preset.id && <Check className="size-3 text-green-600" />}
                </div>
                <p className="text-[11px] text-muted-foreground">{preset.description}</p>
              </div>
            </button>
          ))}
        </div>
      </PanelGroup>

      <PanelGroup label="Seiten-Vorlagen (Mixer)">
        <div className="space-y-2">
          {MIXER_TEMPLATES.map((tmpl) => {
            const style = getMixerTemplateStyle(tmpl);
            return (
              <button
                key={tmpl.id}
                onClick={() => applyTemplate(tmpl)}
                className={cn(
                  "flex w-full items-start gap-3 rounded-lg border p-3 text-left transition-colors hover:bg-muted/50",
                  appliedTemplate === tmpl.id && "border-green-500 bg-green-50 dark:bg-green-950/20",
                )}
              >
                <Sparkles className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs font-medium">{tmpl.name}</p>
                    {appliedTemplate === tmpl.id && <Check className="size-3 text-green-600" />}
                  </div>
                  <p className="text-[11px] text-muted-foreground">{tmpl.description}</p>
                  {style && (
                    <p className="mt-0.5 flex items-center gap-1 text-[10px] text-muted-foreground/70">
                      <Palette className="size-2.5" /> Stil: {style.name}
                    </p>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </PanelGroup>
    </PanelShell>
  );
}
