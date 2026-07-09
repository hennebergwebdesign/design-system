// Resolves the raw design system into concrete values for the given
// preview mode. Used by the live preview (and later by exports).

import { generateScale } from "./color";
import type { DesignSystem, PreviewMode, ScaleStep } from "./types";

export interface ResolvedTokens {
  mode: PreviewMode;
  primary: string;
  secondary: string;
  accent: string;
  primaryScale: Record<ScaleStep, string>;
  secondaryScale: Record<ScaleStep, string>;
  accentScale: Record<ScaleStep, string>;
  neutralScale: Record<ScaleStep, string>;
  success: string;
  warning: string;
  error: string;
  info: string;
  /** Page background / raised surface / text colors for the current mode */
  background: string;
  surface: string;
  text: string;
  textMuted: string;
  border: string;
}

export function resolveTokens(
  system: DesignSystem,
  mode: PreviewMode
): ResolvedTokens {
  const { colors } = system;
  const neutralScale = generateScale(colors.neutral[mode]);
  const isDark = mode === "dark";

  return {
    mode,
    primary: colors.primary[mode],
    secondary: colors.secondary[mode],
    accent: colors.accent[mode],
    primaryScale: generateScale(colors.primary[mode]),
    secondaryScale: generateScale(colors.secondary[mode]),
    accentScale: generateScale(colors.accent[mode]),
    neutralScale,
    success: colors.semantic.success[mode],
    warning: colors.semantic.warning[mode],
    error: colors.semantic.error[mode],
    info: colors.semantic.info[mode],
    background: isDark ? neutralScale["950"] : "#ffffff",
    surface: isDark ? neutralScale["900"] : neutralScale["50"],
    text: isDark ? neutralScale["50"] : neutralScale["950"],
    textMuted: isDark ? neutralScale["400"] : neutralScale["600"],
    border: isDark ? neutralScale["800"] : neutralScale["200"],
  };
}
