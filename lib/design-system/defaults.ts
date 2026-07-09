import type { DesignSystem, Colors, Typography, Logo, Spacing, Breakpoints, Grid, Effects } from "./types";

export const defaultColors: Colors = {
  primary: { light: "#4f46e5", dark: "#818cf8" },
  secondary: { light: "#0f766e", dark: "#2dd4bf" },
  accent: { light: "#e11d48", dark: "#fb7185" },
  neutral: { light: "#64748b", dark: "#64748b" },
  success: { light: "#16a34a", dark: "#4ade80" },
  warning: { light: "#d97706", dark: "#fbbf24" },
  error: { light: "#dc2626", dark: "#f87171" },
  info: { light: "#0284c7", dark: "#38bdf8" },
};

export const defaultTypography: Typography = {
  heading: { family: "Inter", category: "sans-serif" },
  body: { family: "Inter", category: "sans-serif" },
  baseSize: 16,
  scaleRatio: 1.25,
  levels: {
    h1: { size: 49, lineHeight: 1.1, letterSpacing: -0.02, weight: 700 },
    h2: { size: 39, lineHeight: 1.15, letterSpacing: -0.02, weight: 700 },
    h3: { size: 31, lineHeight: 1.2, letterSpacing: -0.01, weight: 600 },
    h4: { size: 25, lineHeight: 1.3, letterSpacing: -0.01, weight: 600 },
    h5: { size: 20, lineHeight: 1.4, letterSpacing: 0, weight: 600 },
    h6: { size: 16, lineHeight: 1.4, letterSpacing: 0, weight: 600 },
    body: { size: 16, lineHeight: 1.6, letterSpacing: 0, weight: 400 },
    small: { size: 14, lineHeight: 1.5, letterSpacing: 0, weight: 400 },
    caption: { size: 12, lineHeight: 1.4, letterSpacing: 0.02, weight: 400 },
  },
};

export const defaultLogo: Logo = {
  variants: {},
  clearspace: 0.5,
  minSize: 24,
};

export const defaultSpacing: Spacing = {
  base: 4,
  steps: [1, 2, 3, 4, 6, 8, 12, 16, 24],
};

export const defaultBreakpoints: Breakpoints = {
  mobile: 480,
  tablet: 768,
  desktop: 1280,
  wide: 1536,
};

export const defaultGrid: Grid = {
  columns: 12,
  gutter: 24,
  maxWidth: 1280,
};

export const defaultEffects: Effects = {
  radius: { sm: 4, md: 8, lg: 12, xl: 16 },
  shadows: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
    "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
  },
  borderWidth: 1,
  borderColorStep: "200",
  iconStyle: "outline",
  iconStrokeWidth: 2,
};

export function createDefaultSystem(): DesignSystem {
  // Tiefe Kopie, damit Projekte sich keine Objekte teilen
  return structuredClone({
    colors: defaultColors,
    typography: defaultTypography,
    logo: defaultLogo,
    spacing: defaultSpacing,
    breakpoints: defaultBreakpoints,
    grid: defaultGrid,
    effects: defaultEffects,
  });
}
