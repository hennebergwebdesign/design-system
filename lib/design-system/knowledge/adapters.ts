// Adapters: map the raw knowledge-base data (extracted from the ui-ux-pro-max
// skill's CSV databases) onto this app's own DesignSystem token types, so
// palettes/font-pairings/styles can be applied directly to a project.

import type { Colors, ColorToken, Effects, FontChoice, Typography } from "../types";
import { hexToRgb, rgbToHex, isValidHex } from "../color";
import type { KnowledgePalette } from "./color-palettes";
import type { KnowledgeFontPairing } from "./font-pairings";
import type { KnowledgeStyle } from "./style-library";

function tint(rgb: { r: number; g: number; b: number }, amount: number) {
  return {
    r: rgb.r + (255 - rgb.r) * amount,
    g: rgb.g + (255 - rgb.g) * amount,
    b: rgb.b + (255 - rgb.b) * amount,
  };
}

function shade(rgb: { r: number; g: number; b: number }, amount: number) {
  return { r: rgb.r * (1 - amount), g: rgb.g * (1 - amount), b: rgb.b * (1 - amount) };
}

function relLuminance(hex: string): number {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0.5;
  const c = (v: number) => {
    const s = v / 255;
    return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * c(rgb.r) + 0.7152 * c(rgb.g) + 0.0722 * c(rgb.b);
}

/**
 * Heuristic light→dark counterpart for a brand color, since the source
 * palettes only ship a single (light-mode) hex per role. Near-black colors
 * flip to near-white (monochrome brands), near-white colors flip to near-
 * black, everything else gets tinted ~38% (roughly a 600→400 Tailwind step).
 */
export function deriveDarkVariant(hex: string): string {
  const rgb = hexToRgb(hex);
  if (!rgb || !isValidHex(hex)) return hex;
  const lum = relLuminance(hex);
  if (lum < 0.08) return rgbToHex(tint(rgb, 0.92));
  if (lum > 0.85) return rgbToHex(shade(rgb, 0.85));
  return rgbToHex(tint(rgb, 0.38));
}

function token(light: string): ColorToken {
  return { light, dark: deriveDarkVariant(light) };
}

// Universal, pre-checked semantic colors used to fill in success/warning/info
// for palettes that only define primary/secondary/accent/destructive.
const UNIVERSAL_SEMANTIC = {
  success: { light: "#16a34a", dark: "#4ade80" },
  warning: { light: "#d97706", dark: "#fbbf24" },
  info: { light: "#0284c7", dark: "#38bdf8" },
} as const;

export function paletteToColors(p: KnowledgePalette): Colors {
  return {
    primary: token(p.primary),
    secondary: token(p.secondary),
    accent: token(p.accent),
    neutral: token(p.mutedForeground),
    success: { ...UNIVERSAL_SEMANTIC.success },
    warning: { ...UNIVERSAL_SEMANTIC.warning },
    error: token(p.destructive),
    info: { ...UNIVERSAL_SEMANTIC.info },
  };
}

const CATEGORY_MAP: Record<string, FontChoice["category"]> = {
  serif: "serif",
  "book serif": "serif",
  "display serif": "serif",
  script: "cursive",
  handwritten: "cursive",
  mono: "monospace",
  monospace: "monospace",
  sans: "sans-serif",
  "geometric sans": "sans-serif",
  "geometric sans (bold-only)": "sans-serif",
  "geometric sans (single dominant)": "sans-serif",
  "geometric sans (single family)": "sans-serif",
  "geometric sans (system fallback)": "sans-serif",
  "display rounded": "sans-serif",
  display: "sans-serif",
  "tech display": "sans-serif",
  "sans (system default)": "sans-serif",
};

function normalizeFontCategory(token: string): FontChoice["category"] {
  const key = token.trim().toLowerCase().replace(/\s*\(triple\)|\s*\(dual\)|\s*\(triple stack\)/g, "");
  return CATEGORY_MAP[key] ?? "sans-serif";
}

/** Parses the source "X + Y" category string into [headingCategory, bodyCategory]. */
function parsePairCategories(category: string): [FontChoice["category"], FontChoice["category"]] {
  const parts = category.split("+").map((s) => s.trim());
  const heading = normalizeFontCategory(parts[0] ?? "Sans");
  const body = normalizeFontCategory(parts[1] ?? parts[0] ?? "Sans");
  return [heading, body];
}

export function fontPairingToTypography(
  pairing: KnowledgeFontPairing,
): Pick<Typography, "heading" | "body"> {
  const [headingCategory, bodyCategory] = parsePairCategories(pairing.category);
  return {
    heading: { family: pairing.heading, category: headingCategory },
    body: { family: pairing.body, category: bodyCategory },
  };
}

/**
 * Best-effort extraction of a numeric radius scale from a style's free-text
 * "Design System Variables" / "CSS/Technical Keywords" columns (e.g.
 * "--border-radius: 14px" or "border-radius: 12-16px"). Falls back to the
 * app's own default radius scale when nothing usable is found.
 */
export function styleToEffects(
  style: KnowledgeStyle,
): Pick<Effects, "radius" | "borderWidth" | "iconStyle"> {
  const haystack = `${style.variables} ${style.cssKeywords}`;
  const match = haystack.match(/(?:border-)?radius[^:]*:\s*(\d+)(?:-(\d+))?px/i);
  const base = match ? Number(match[2] ?? match[1]) : 8;
  const sharp = /border-radius:\s*0px|sharp corners|no border-?radius/i.test(haystack);
  const md = sharp ? 0 : Math.round(base);
  const borderMatch = haystack.match(/border:\s*(?:visible\s*)?(\d)(?:-\d)?px/i);
  const borderWidth = borderMatch ? Number(borderMatch[1]) : 1;
  const iconStyle: Effects["iconStyle"] =
    /brutalis|bold typography|maximalis/i.test(style.name) ? "filled" : "outline";

  return {
    radius: {
      sm: Math.round(md * 0.5),
      md,
      lg: Math.round(md * 1.5),
      xl: Math.round(md * 2),
    },
    borderWidth,
    iconStyle,
  };
}
