// Default design system used for new projects and for "reset to defaults".

import type {
  DesignSystem,
  TypeLevel,
  TypeLevelKey,
} from "./types";

/** Computes a full type scale from base size and ratio. */
export function generateTypeScale(
  baseSize: number,
  ratio: number
): Record<TypeLevelKey, TypeLevel> {
  const size = (power: number) =>
    Math.round(baseSize * Math.pow(ratio, power) * 10) / 10;
  return {
    h1: { size: size(5), lineHeight: 1.1, letterSpacing: -0.02, fontWeight: 700 },
    h2: { size: size(4), lineHeight: 1.15, letterSpacing: -0.015, fontWeight: 700 },
    h3: { size: size(3), lineHeight: 1.2, letterSpacing: -0.01, fontWeight: 600 },
    h4: { size: size(2), lineHeight: 1.25, letterSpacing: -0.005, fontWeight: 600 },
    h5: { size: size(1), lineHeight: 1.3, letterSpacing: 0, fontWeight: 600 },
    h6: { size: baseSize, lineHeight: 1.4, letterSpacing: 0, fontWeight: 600 },
    body: { size: baseSize, lineHeight: 1.6, letterSpacing: 0, fontWeight: 400 },
    small: { size: Math.round((baseSize / ratio) * 10) / 10, lineHeight: 1.5, letterSpacing: 0, fontWeight: 400 },
    caption: { size: Math.round((baseSize / (ratio * ratio)) * 10) / 10, lineHeight: 1.4, letterSpacing: 0.01, fontWeight: 400 },
  };
}

export function createDefaultSystem(): DesignSystem {
  return {
    colors: {
      primary: { light: "#4f46e5", dark: "#818cf8" },
      secondary: { light: "#0d9488", dark: "#2dd4bf" },
      accent: { light: "#f59e0b", dark: "#fbbf24" },
      neutral: { light: "#737373", dark: "#a3a3a3" },
      semantic: {
        success: { light: "#16a34a", dark: "#4ade80" },
        warning: { light: "#d97706", dark: "#fbbf24" },
        error: { light: "#dc2626", dark: "#f87171" },
        info: { light: "#2563eb", dark: "#60a5fa" },
      },
    },
    typography: {
      headingFont: "Inter",
      bodyFont: "Inter",
      baseSize: 16,
      scaleRatio: 1.25,
      levels: generateTypeScale(16, 1.25),
    },
    logo: {
      variants: { main: null, icon: null, wordmark: null, inverted: null },
      clearspace: 0.5,
      minSize: 24,
    },
    spacing: {
      base: 4,
      multipliers: [1, 2, 3, 4, 6, 8, 12, 16, 24],
      breakpoints: { mobile: 640, tablet: 768, desktop: 1024, wide: 1440 },
      grid: { columns: 12, gutter: 24 },
    },
    effects: {
      radius: { none: 0, sm: 4, md: 8, lg: 12, xl: 16, full: 9999 },
      shadows: {
        sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
        xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
        "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
      },
      borderWidth: 1,
      iconStyle: "outline",
    },
  };
}
