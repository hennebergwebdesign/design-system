// AI-style presets: pre-built design token sets that users can apply as starting points.
// In a real Relume-like product this would come from an LLM; here we ship curated presets.

import type { Colors, Typography, Effects, Spacing } from "./types";

export interface DesignPreset {
  id: string;
  name: string;
  description: string;
  tags: string[];
  colors: Colors;
  typography: Pick<Typography, "heading" | "body" | "baseSize" | "scaleRatio">;
  effects: Pick<Effects, "radius" | "borderWidth" | "iconStyle">;
  spacing: Pick<Spacing, "base">;
}

const techStartup: DesignPreset = {
  id: "tech-startup",
  name: "Tech Startup",
  description: "Modern, clean, tech-forward. Dunkles Blau mit Electric-Akzent.",
  tags: ["modern", "saas", "tech", "clean"],
  colors: {
    primary: { light: "#1e40af", dark: "#60a5fa" },
    secondary: { light: "#334155", dark: "#cbd5e1" },
    accent: { light: "#7c3aed", dark: "#a78bfa" },
    neutral: { light: "#64748b", dark: "#94a3b8" },
    success: { light: "#16a34a", dark: "#4ade80" },
    warning: { light: "#d97706", dark: "#fbbf24" },
    error: { light: "#dc2626", dark: "#f87171" },
    info: { light: "#0284c7", dark: "#38bdf8" },
  },
  typography: {
    heading: { family: "Inter", category: "sans-serif" },
    body: { family: "Inter", category: "sans-serif" },
    baseSize: 16,
    scaleRatio: 1.25,
  },
  effects: {
    radius: { sm: 4, md: 8, lg: 12, xl: 16 },
    borderWidth: 1,
    iconStyle: "outline",
  },
  spacing: { base: 4 },
};

const elegantBrand: DesignPreset = {
  id: "elegant-brand",
  name: "Elegant Brand",
  description: "Luxuriös, Serif-betont, warme Töne. Für Premium-Marken.",
  tags: ["luxury", "elegant", "serif", "premium"],
  colors: {
    primary: { light: "#1c1917", dark: "#fafaf9" },
    secondary: { light: "#78716c", dark: "#d6d3d1" },
    accent: { light: "#b45309", dark: "#fbbf24" },
    neutral: { light: "#a8a29e", dark: "#78716c" },
    success: { light: "#166534", dark: "#86efac" },
    warning: { light: "#92400e", dark: "#fde68a" },
    error: { light: "#991b1b", dark: "#fca5a5" },
    info: { light: "#1e40af", dark: "#93c5fd" },
  },
  typography: {
    heading: { family: "Playfair Display", category: "serif" },
    body: { family: "Source Sans 3", category: "sans-serif" },
    baseSize: 17,
    scaleRatio: 1.333,
  },
  effects: {
    radius: { sm: 2, md: 4, lg: 6, xl: 8 },
    borderWidth: 1,
    iconStyle: "outline",
  },
  spacing: { base: 4 },
};

const boldCreative: DesignPreset = {
  id: "bold-creative",
  name: "Bold Creative",
  description: "Kräftige Farben, große Radien, energetisch. Für Agenturen.",
  tags: ["bold", "creative", "colorful", "agency"],
  colors: {
    primary: { light: "#7c3aed", dark: "#a78bfa" },
    secondary: { light: "#db2777", dark: "#f472b6" },
    accent: { light: "#f59e0b", dark: "#fbbf24" },
    neutral: { light: "#6b7280", dark: "#9ca3af" },
    success: { light: "#059669", dark: "#34d399" },
    warning: { light: "#d97706", dark: "#fbbf24" },
    error: { light: "#e11d48", dark: "#fb7185" },
    info: { light: "#2563eb", dark: "#60a5fa" },
  },
  typography: {
    heading: { family: "Space Grotesk", category: "sans-serif" },
    body: { family: "DM Sans", category: "sans-serif" },
    baseSize: 16,
    scaleRatio: 1.25,
  },
  effects: {
    radius: { sm: 8, md: 16, lg: 24, xl: 32 },
    borderWidth: 2,
    iconStyle: "filled",
  },
  spacing: { base: 4 },
};

const minimalClean: DesignPreset = {
  id: "minimal-clean",
  name: "Minimal Clean",
  description: "Schwarz/Weiß, maximaler Weißraum. Für Portfolios.",
  tags: ["minimal", "clean", "portfolio", "monochrome"],
  colors: {
    primary: { light: "#18181b", dark: "#fafafa" },
    secondary: { light: "#52525b", dark: "#a1a1aa" },
    accent: { light: "#18181b", dark: "#e4e4e7" },
    neutral: { light: "#a1a1aa", dark: "#52525b" },
    success: { light: "#166534", dark: "#86efac" },
    warning: { light: "#854d0e", dark: "#fde047" },
    error: { light: "#991b1b", dark: "#fca5a5" },
    info: { light: "#1d4ed8", dark: "#93c5fd" },
  },
  typography: {
    heading: { family: "Outfit", category: "sans-serif" },
    body: { family: "Outfit", category: "sans-serif" },
    baseSize: 16,
    scaleRatio: 1.2,
  },
  effects: {
    radius: { sm: 0, md: 0, lg: 0, xl: 0 },
    borderWidth: 1,
    iconStyle: "outline",
  },
  spacing: { base: 8 },
};

const warmOrganic: DesignPreset = {
  id: "warm-organic",
  name: "Warm Organic",
  description: "Erdige Töne, abgerundete Formen. Für Wellness & Food.",
  tags: ["organic", "warm", "natural", "wellness", "food"],
  colors: {
    primary: { light: "#365314", dark: "#a3e635" },
    secondary: { light: "#78350f", dark: "#fbbf24" },
    accent: { light: "#c2410c", dark: "#fb923c" },
    neutral: { light: "#737373", dark: "#a3a3a3" },
    success: { light: "#15803d", dark: "#86efac" },
    warning: { light: "#a16207", dark: "#fde047" },
    error: { light: "#b91c1c", dark: "#fca5a5" },
    info: { light: "#0e7490", dark: "#67e8f9" },
  },
  typography: {
    heading: { family: "Fraunces", category: "serif" },
    body: { family: "Nunito", category: "sans-serif" },
    baseSize: 17,
    scaleRatio: 1.25,
  },
  effects: {
    radius: { sm: 8, md: 12, lg: 20, xl: 28 },
    borderWidth: 1,
    iconStyle: "outline",
  },
  spacing: { base: 4 },
};

export const DESIGN_PRESETS: DesignPreset[] = [
  techStartup,
  elegantBrand,
  boldCreative,
  minimalClean,
  warmOrganic,
];
