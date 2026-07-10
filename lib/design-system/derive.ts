// Abgeleitete Werte aus den Design-Tokens.

import type { DesignSystem, TypeLevel, TypeLevelKey } from "./types";
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

export function computeTypeLevels(
  baseSize: number,
  scaleRatio: number,
): Record<TypeLevelKey, TypeLevel> {
  const scale = (steps: number) => Math.round(baseSize * Math.pow(scaleRatio, steps));
  return {
    h1: { size: scale(5), lineHeight: 1.1, letterSpacing: -0.02, weight: 700 },
    h2: { size: scale(4), lineHeight: 1.15, letterSpacing: -0.02, weight: 700 },
    h3: { size: scale(3), lineHeight: 1.2, letterSpacing: -0.01, weight: 600 },
    h4: { size: scale(2), lineHeight: 1.3, letterSpacing: -0.01, weight: 600 },
    h5: { size: scale(1), lineHeight: 1.4, letterSpacing: 0, weight: 600 },
    h6: { size: baseSize, lineHeight: 1.4, letterSpacing: 0, weight: 600 },
    body: { size: baseSize, lineHeight: 1.6, letterSpacing: 0, weight: 400 },
    small: { size: Math.round(baseSize * 0.875), lineHeight: 1.5, letterSpacing: 0, weight: 400 },
    caption: { size: Math.round(baseSize * 0.75), lineHeight: 1.4, letterSpacing: 0.02, weight: 400 },
  };
}
