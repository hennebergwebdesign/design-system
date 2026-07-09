"use client";

import { Moon, Sun, TriangleAlert } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { checkWcag, readableTextColor } from "@/lib/color";
import { useActiveProject, useDesignSystemStore } from "@/lib/store";
import type {
  BrandColorKey,
  ColorsConfig,
  PreviewMode,
  SemanticColorKey,
} from "@/lib/types";
import { ColorField } from "@/components/color/ColorField";
import { ScaleStrip } from "@/components/color/ScaleStrip";
import { ContrastChecker } from "./ContrastChecker";
import { PanelHeader } from "./PanelHeader";

const BRAND_COLORS: { key: BrandColorKey; label: string }[] = [
  { key: "primary", label: "Primärfarbe" },
  { key: "secondary", label: "Sekundärfarbe" },
  { key: "accent", label: "Akzentfarbe" },
  { key: "neutral", label: "Neutral / Graustufen" },
];

const SEMANTIC_COLORS: { key: SemanticColorKey; label: string }[] = [
  { key: "success", label: "Success" },
  { key: "warning", label: "Warning" },
  { key: "error", label: "Error" },
  { key: "info", label: "Info" },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
      {children}
    </h3>
  );
}

/** Lists colors whose auto-selected text color still fails WCAG AA. */
function AutoContrastWarnings({
  colors,
  mode,
}: {
  colors: ColorsConfig;
  mode: PreviewMode;
}) {
  const entries: { label: string; hex: string }[] = [
    ...BRAND_COLORS.filter((c) => c.key !== "neutral").map((c) => ({
      label: c.label,
      hex: colors[c.key][mode],
    })),
    ...SEMANTIC_COLORS.map((c) => ({
      label: c.label,
      hex: colors.semantic[c.key][mode],
    })),
  ];

  const failing = entries
    .map((entry) => {
      const text = readableTextColor(entry.hex);
      return { ...entry, result: checkWcag(text, entry.hex) };
    })
    .filter((entry) => !entry.result.aaNormal);

  if (failing.length === 0) return null;

  return (
    <div className="flex flex-col gap-2 rounded-lg border border-amber-300 bg-amber-50 p-3 dark:border-amber-700 dark:bg-amber-950">
      <div className="flex items-center gap-2 text-sm font-medium text-amber-800 dark:text-amber-200">
        <TriangleAlert className="size-4" />
        Kontrast-Warnungen ({mode === "light" ? "Light" : "Dark"} Mode)
      </div>
      {failing.map((entry) => (
        <p key={entry.label} className="text-xs text-amber-700 dark:text-amber-300">
          <strong>{entry.label}</strong> ({entry.hex}): Button-Text erreicht nur{" "}
          {entry.result.ratio.toFixed(2)}:1 — AA benötigt 4,5:1.
        </p>
      ))}
    </div>
  );
}

export function ColorsPanel() {
  const project = useActiveProject();
  const updateSystem = useDesignSystemStore((s) => s.updateSystem);
  const mode = useDesignSystemStore((s) => s.previewMode);
  const setPreviewMode = useDesignSystemStore((s) => s.setPreviewMode);

  if (!project) return null;
  const { colors } = project.system;

  const setBrandColor = (key: BrandColorKey, hex: string) =>
    updateSystem((system) => ({
      ...system,
      colors: {
        ...system.colors,
        [key]: { ...system.colors[key], [mode]: hex },
      },
    }));

  const setSemanticColor = (key: SemanticColorKey, hex: string) =>
    updateSystem((system) => ({
      ...system,
      colors: {
        ...system.colors,
        semantic: {
          ...system.colors.semantic,
          [key]: { ...system.colors.semantic[key], [mode]: hex },
        },
      },
    }));

  return (
    <div>
      <PanelHeader
        title="Colors"
        description="Farbpalette, Skalen und Kontrast-Checks"
        resetSection="colors"
      >
        <Tabs
          value={mode}
          onValueChange={(v) => setPreviewMode(v as PreviewMode)}
          className="mt-3"
        >
          <TabsList className="w-full">
            <TabsTrigger value="light" className="flex-1">
              <Sun className="size-3.5" /> Light
            </TabsTrigger>
            <TabsTrigger value="dark" className="flex-1">
              <Moon className="size-3.5" /> Dark
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </PanelHeader>

      <div className="flex flex-col gap-6 p-5">
        <div className="flex flex-col gap-5">
          <SectionLabel>Markenfarben</SectionLabel>
          {BRAND_COLORS.map(({ key, label }) => (
            <div key={key} className="flex flex-col gap-2">
              <ColorField
                label={label}
                value={colors[key][mode]}
                onChange={(hex) => setBrandColor(key, hex)}
              />
              <ScaleStrip baseHex={colors[key][mode]} />
            </div>
          ))}
        </div>

        <Separator />

        <div className="flex flex-col gap-4">
          <SectionLabel>Semantische Farben</SectionLabel>
          {SEMANTIC_COLORS.map(({ key, label }) => (
            <ColorField
              key={key}
              label={label}
              value={colors.semantic[key][mode]}
              onChange={(hex) => setSemanticColor(key, hex)}
            />
          ))}
        </div>

        <Separator />

        <AutoContrastWarnings colors={colors} mode={mode} />

        <div className="flex flex-col gap-4">
          <SectionLabel>Kontrast-Check (WCAG)</SectionLabel>
          <ContrastChecker colors={colors} mode={mode} />
        </div>
      </div>
    </div>
  );
}
