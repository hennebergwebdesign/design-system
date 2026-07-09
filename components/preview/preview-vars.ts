// Übersetzt das Design System in CSS Custom Properties für die Live-Preview.
// Alle Preview-Komponenten stylen sich ausschließlich über diese Variablen,
// dadurch wirkt jede Token-Änderung sofort überall.

import type { CSSProperties } from "react";
import type { DesignSystem, ColorKey } from "@/lib/design-system/types";
import { SCALE_STEPS, BRAND_COLOR_KEYS, SEMANTIC_COLOR_KEYS } from "@/lib/design-system/types";
import { generateScale, readableTextColor } from "@/lib/design-system/color";
import { deriveSurfaces } from "@/lib/design-system/derive";

export type PreviewMode = "light" | "dark";

export function fontStack(family: string, category: string): string {
  return `"${family}", ${category}`;
}

export function systemCssVars(system: DesignSystem, mode: PreviewMode): CSSProperties {
  const vars: Record<string, string> = {};
  const { colors, typography, effects, spacing } = system;

  const allKeys: ColorKey[] = [...BRAND_COLOR_KEYS, ...SEMANTIC_COLOR_KEYS];
  for (const key of allKeys) {
    const base = colors[key][mode];
    const scale = generateScale(base);
    vars[`--ds-${key}`] = base;
    vars[`--ds-${key}-contrast`] = readableTextColor(base);
    for (const step of SCALE_STEPS) {
      vars[`--ds-${key}-${step}`] = scale[step];
    }
  }

  // Neutral-abgeleitete Oberflächen für den jeweiligen Modus
  const surfaces = deriveSurfaces(system, mode);
  vars["--ds-bg"] = surfaces.bg;
  vars["--ds-surface"] = surfaces.surface;
  vars["--ds-text"] = surfaces.text;
  vars["--ds-text-muted"] = surfaces.textMuted;
  vars["--ds-border"] = surfaces.border;

  vars["--ds-font-heading"] = fontStack(typography.heading.family, typography.heading.category);
  vars["--ds-font-body"] = fontStack(typography.body.family, typography.body.category);

  vars["--ds-radius-none"] = "0px";
  for (const key of ["sm", "md", "lg", "xl"] as const) {
    vars[`--ds-radius-${key}`] = `${effects.radius[key]}px`;
  }
  vars["--ds-radius-full"] = "9999px";

  for (const key of ["sm", "md", "lg", "xl", "2xl"] as const) {
    vars[`--ds-shadow-${key}`] = effects.shadows[key];
  }

  vars["--ds-border-w"] = `${effects.borderWidth}px`;

  spacing.steps.forEach((multiplier, index) => {
    vars[`--ds-space-${index + 1}`] = `${multiplier * spacing.base}px`;
  });

  return vars as CSSProperties;
}
