"use client";

// Live-Preview: rendert Beispiel-UI, die vollständig aus den Design-Tokens
// gespeist wird. Über den Toggle lässt sich zwischen Light & Dark wechseln.

import { useState } from "react";
import { Moon, Sun } from "lucide-react";
import type { DesignSystem, SectionKey } from "@/lib/design-system/types";
import { systemCssVars, type PreviewMode } from "./preview-vars";
import { ColorsPreview } from "./sections/colors-preview";
import { TypographyPreview } from "./sections/typography-preview";
import { LogoPreview } from "./sections/logo-preview";
import { SpacingPreview } from "./sections/spacing-preview";
import { EffectsPreview } from "./sections/effects-preview";
import { ComponentsPreview } from "./sections/components-preview";
import { FontLoader } from "./font-loader";
import { cn } from "@/lib/utils";

export function LivePreview({
  system,
  section,
}: {
  system: DesignSystem;
  section: SectionKey;
}) {
  const [mode, setMode] = useState<PreviewMode>("light");

  return (
    <div className="flex h-full flex-col">
      <FontLoader
        families={[system.typography.heading.family, system.typography.body.family]}
      />
      <div className="flex items-center justify-between border-b px-4 py-2">
        <span className="text-sm font-medium text-muted-foreground">Live-Vorschau</span>
        <div className="flex items-center gap-1 rounded-lg bg-muted p-0.5">
          {(["light", "dark"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              aria-label={m === "light" ? "Light Mode" : "Dark Mode"}
              className={cn(
                "flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
                mode === m
                  ? "bg-background shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {m === "light" ? <Sun className="size-3.5" /> : <Moon className="size-3.5" />}
              {m === "light" ? "Light" : "Dark"}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div
          style={{
            ...systemCssVars(system, mode),
            backgroundColor: "var(--ds-bg)",
            color: "var(--ds-text)",
            fontFamily: "var(--ds-font-body)",
          }}
          className="min-h-full p-6"
        >
          <div className="mx-auto max-w-3xl">
            <PreviewContent system={system} section={section} mode={mode} />
          </div>
        </div>
      </div>
    </div>
  );
}

// Rendert je nach aktivem Sidebar-Abschnitt die passende Vorschau.
function PreviewContent({
  system,
  section,
  mode,
}: {
  system: DesignSystem;
  section: SectionKey;
  mode: PreviewMode;
}) {
  switch (section) {
    case "colors":
      return <ColorsPreview system={system} mode={mode} />;
    case "typography":
      return <TypographyPreview system={system} />;
    case "logo":
      return <LogoPreview system={system} mode={mode} />;
    case "spacing":
      return <SpacingPreview system={system} />;
    case "effects":
      return <EffectsPreview system={system} />;
    case "components":
    case "mixer":
    case "generate":
      return <ComponentsPreview system={system} />;
    default:
      return (
        <div
          className="flex h-64 items-center justify-center text-sm"
          style={{ color: "var(--ds-text-muted)" }}
        >
          Die Vorschau für diesen Abschnitt folgt mit dem nächsten Modul.
        </div>
      );
  }
}
