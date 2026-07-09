"use client";

// Colors-Panel: Marken-, Neutral- und semantische Farben mit Light/Dark-
// Varianten, plus WCAG-Kontrast-Check der wichtigsten Kombinationen.

import { useState } from "react";
import { AlertTriangle, Check } from "lucide-react";
import type { ColorKey } from "@/lib/design-system/types";
import { contrastRatio, readableTextColor, wcagLevel } from "@/lib/design-system/color";
import { deriveSurfaces } from "@/lib/design-system/derive";
import { useDesignStore, useDesignSystem } from "@/lib/store/design-store";
import { ColorField } from "@/components/editor/controls/color-field";
import { PanelGroup, PanelShell } from "./panel-shell";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const COLOR_LABELS: Record<ColorKey, string> = {
  primary: "Primärfarbe",
  secondary: "Sekundärfarbe",
  accent: "Akzentfarbe",
  neutral: "Neutral / Graustufen",
  success: "Success",
  warning: "Warning",
  error: "Error",
  info: "Info",
};

type Mode = "light" | "dark";

export function ColorsPanel() {
  const system = useDesignSystem();
  const update = useDesignStore((s) => s.update);
  const [mode, setMode] = useState<Mode>("light");

  if (!system) return null;

  const setColor = (key: ColorKey, hex: string) =>
    update((draft) => {
      draft.colors[key][mode] = hex;
    });

  const field = (key: ColorKey) => (
    <ColorField
      key={key}
      label={COLOR_LABELS[key]}
      value={system.colors[key][mode]}
      onChange={(hex) => setColor(key, hex)}
    />
  );

  const surfaces = deriveSurfaces(system, mode);
  const checks: { label: string; fg: string; bg: string }[] = [
    { label: "Text auf Hintergrund", fg: surfaces.text, bg: surfaces.bg },
    { label: "Muted Text auf Hintergrund", fg: surfaces.textMuted, bg: surfaces.bg },
    {
      label: "Button-Text auf Primärfarbe",
      fg: readableTextColor(system.colors.primary[mode]),
      bg: system.colors.primary[mode],
    },
    { label: "Primärfarbe als Link auf Hintergrund", fg: system.colors.primary[mode], bg: surfaces.bg },
    ...(["success", "warning", "error", "info"] as const).map((key) => ({
      label: `${COLOR_LABELS[key]} als Text auf Hintergrund`,
      fg: system.colors[key][mode],
      bg: surfaces.bg,
    })),
  ];

  return (
    <PanelShell
      title="Colors"
      description="Basisfarben festlegen — Skalen (50–950) werden automatisch generiert."
    >
      <Tabs value={mode} onValueChange={(v) => setMode(v as Mode)}>
        <TabsList className="w-full">
          <TabsTrigger value="light" className="flex-1">
            Light Mode
          </TabsTrigger>
          <TabsTrigger value="dark" className="flex-1">
            Dark Mode
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <PanelGroup label="Markenfarben">
        <div className="space-y-3">{(["primary", "secondary", "accent"] as const).map(field)}</div>
      </PanelGroup>

      <PanelGroup label="Neutral">
        {field("neutral")}
        <p className="text-xs text-muted-foreground">
          Basis für Text, Hintergründe und Borders — die Graustufen-Palette wird
          daraus abgeleitet.
        </p>
      </PanelGroup>

      <PanelGroup label="Semantische Farben">
        <div className="space-y-3">{(["success", "warning", "error", "info"] as const).map(field)}</div>
      </PanelGroup>

      <PanelGroup label="Kontrast-Check (WCAG)">
        <div className="space-y-1.5">
          {checks.map((check) => (
            <ContrastRow key={check.label} {...check} />
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          AA erfordert mind. 4,5:1 für normalen Text, AAA mind. 7:1. „AA Large“
          (3:1) gilt nur für große Schrift ab ca. 24 px.
        </p>
      </PanelGroup>
    </PanelShell>
  );
}

function ContrastRow({ label, fg, bg }: { label: string; fg: string; bg: string }) {
  const ratio = contrastRatio(fg, bg);
  const level = wcagLevel(ratio);
  const failed = level === "Fail";
  const large = level === "AA Large";

  return (
    <div className="flex items-center gap-2.5 rounded-lg border px-2.5 py-2">
      <span
        className="flex size-8 shrink-0 items-center justify-center rounded-md border text-xs font-semibold"
        style={{ backgroundColor: bg, color: fg }}
      >
        Aa
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-medium">{label}</p>
        <p className="text-xs text-muted-foreground">{ratio.toFixed(2)} : 1</p>
      </div>
      <span
        className={cn(
          "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold",
          failed && "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
          large && "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
          !failed && !large && "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
        )}
      >
        {failed ? <AlertTriangle className="size-3" /> : <Check className="size-3" />}
        {level}
      </span>
    </div>
  );
}
