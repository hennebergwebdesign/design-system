"use client";

// Logo-Panel: Varianten-Uploads, Clearspace- und Mindestgrößen-Regeln.

import type { LogoVariantKey } from "@/lib/design-system/types";
import { useDesignStore, useDesignSystem } from "@/lib/store/design-store";
import { LogoUpload } from "@/components/editor/controls/logo-upload";
import { NumField } from "@/components/editor/controls/num-field";
import { PanelGroup, PanelShell } from "./panel-shell";
import { Slider } from "@/components/ui/slider";

const VARIANTS: { key: LogoVariantKey; label: string; hint?: string }[] = [
  { key: "main", label: "Hauptlogo", hint: "wird überall verwendet" },
  { key: "icon", label: "Icon-only", hint: "Favicon, App-Icon" },
  { key: "wordmark", label: "Wortmarke", hint: "optional" },
  { key: "inverted", label: "Invertiert", hint: "für dunkle Hintergründe" },
];

export function LogoPanel() {
  const system = useDesignSystem();
  const update = useDesignStore((s) => s.update);

  if (!system) return null;
  const { logo } = system;

  return (
    <PanelShell
      title="Logo & Branding"
      description="Logo-Varianten hochladen und Verwendungsregeln festlegen."
    >
      <PanelGroup label="Logo-Varianten">
        <div className="space-y-4">
          {VARIANTS.map(({ key, label, hint }) => (
            <LogoUpload
              key={key}
              label={label}
              hint={hint}
              value={logo.variants[key]}
              onChange={(dataUrl) =>
                update((draft) => {
                  if (dataUrl) draft.logo.variants[key] = dataUrl;
                  else delete draft.logo.variants[key];
                })
              }
            />
          ))}
        </div>
      </PanelGroup>

      <PanelGroup label="Clearspace / Mindestabstand">
        <div className="flex items-center gap-3">
          <Slider
            value={logo.clearspace}
            min={0}
            max={1}
            step={0.05}
            onValueChange={(v) =>
              update((draft) => {
                draft.logo.clearspace = Array.isArray(v) ? v[0] : v;
              })
            }
            className="flex-1"
          />
          <span className="w-14 text-right font-mono text-xs text-muted-foreground">
            {logo.clearspace.toFixed(2)}×
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          Freiraum um das Logo als Faktor der Logohöhe — z. B. 0,5 = halbe
          Logohöhe Abstand auf allen Seiten.
        </p>
      </PanelGroup>

      <PanelGroup label="Mindestgröße">
        <NumField
          label="Minimale Darstellungsbreite"
          value={logo.minSize}
          min={8}
          max={200}
          suffix="px"
          onChange={(v) =>
            update((draft) => {
              draft.logo.minSize = v;
            })
          }
        />
        <p className="text-xs text-muted-foreground">
          Unterhalb dieser Breite darf das Logo nicht eingesetzt werden
          (Lesbarkeit).
        </p>
      </PanelGroup>
    </PanelShell>
  );
}
