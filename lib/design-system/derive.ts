// Abgeleitete Oberflächenfarben (Hintergrund, Text, Border) aus der
// Neutral-Palette — gemeinsame Basis für Live-Preview, Kontrast-Check und Exporte.

import type { DesignSystem } from "./types";
import { generateScale } from "./color";

export interface Surfaces {
  bg: string;
  surface: string;
  text: string;
  textMuted: string;
  border: string;
}

export function deriveSurfaces(
  system: DesignSystem,
  mode: "light" | "dark",
): Surfaces {
  const neutral = generateScale(system.colors.neutral[mode]);
  if (mode === "light") {
    return {
      bg: "#ffffff",
      surface: neutral["50"],
      text: neutral["950"],
      textMuted: neutral["600"],
      border: neutral[system.effects.borderColorStep],
    };
  }
  return {
    bg: neutral["950"],
    surface: neutral["900"],
    text: neutral["50"],
    textMuted: neutral["400"],
    border: neutral["800"],
  };
}
