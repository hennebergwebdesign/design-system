// Color utilities: conversions, Tailwind-style scale generation and WCAG contrast.

import type { ScaleStep } from "./types";

export const SCALE_STEPS: ScaleStep[] = [
  "50", "100", "200", "300", "400", "500",
  "600", "700", "800", "900", "950",
];

export interface RGB { r: number; g: number; b: number }
export interface HSL { h: number; s: number; l: number }

export function normalizeHex(hex: string): string | null {
  let value = hex.trim().replace(/^#/, "");
  if (/^[0-9a-fA-F]{3}$/.test(value)) {
    value = value.split("").map((c) => c + c).join("");
  }
  if (!/^[0-9a-fA-F]{6}$/.test(value)) return null;
  return `#${value.toLowerCase()}`;
}

export function hexToRgb(hex: string): RGB {
  const normalized = normalizeHex(hex) ?? "#000000";
  return {
    r: parseInt(normalized.slice(1, 3), 16),
    g: parseInt(normalized.slice(3, 5), 16),
    b: parseInt(normalized.slice(5, 7), 16),
  };
}

export function rgbToHex({ r, g, b }: RGB): string {
  const toHex = (v: number) =>
    Math.round(Math.min(255, Math.max(0, v))).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function rgbToHsl({ r, g, b }: RGB): HSL {
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  if (max === min) return { h: 0, s: 0, l };
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h: number;
  if (max === rn) h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6;
  else if (max === gn) h = ((bn - rn) / d + 2) / 6;
  else h = ((rn - gn) / d + 4) / 6;
  return { h: h * 360, s, l };
}

export function hslToRgb({ h, s, l }: HSL): RGB {
  const hn = ((h % 360) + 360) % 360 / 360;
  if (s === 0) {
    const v = l * 255;
    return { r: v, g: v, b: v };
  }
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const hue = (t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  return {
    r: hue(hn + 1 / 3) * 255,
    g: hue(hn) * 255,
    b: hue(hn - 1 / 3) * 255,
  };
}

export function hexToHsl(hex: string): HSL {
  return rgbToHsl(hexToRgb(hex));
}

export function hslToHex(hsl: HSL): string {
  return rgbToHex(hslToRgb(hsl));
}

// Lightness targets per step, tuned to match Tailwind's palettes.
const SCALE_LIGHTNESS: Record<ScaleStep, number> = {
  "50": 0.97, "100": 0.935, "200": 0.87, "300": 0.78, "400": 0.67,
  "500": 0.57, "600": 0.48, "700": 0.39, "800": 0.30, "900": 0.22,
  "950": 0.14,
};

/**
 * Generates a Tailwind-style 50–950 scale from a base color.
 * Hue and saturation are kept; the step whose lightness is closest
 * to the base color returns the base color unchanged.
 */
export function generateScale(baseHex: string): Record<ScaleStep, string> {
  const base = normalizeHex(baseHex) ?? "#737373";
  const { h, s, l } = hexToHsl(base);

  let closest: ScaleStep = "500";
  let minDiff = Infinity;
  for (const step of SCALE_STEPS) {
    const diff = Math.abs(SCALE_LIGHTNESS[step] - l);
    if (diff < minDiff) {
      minDiff = diff;
      closest = step;
    }
  }

  const scale = {} as Record<ScaleStep, string>;
  for (const step of SCALE_STEPS) {
    if (step === closest) {
      scale[step] = base;
      continue;
    }
    const targetL = SCALE_LIGHTNESS[step];
    // Slightly desaturate very light and very dark ends for natural results.
    const targetS = targetL > 0.9 || targetL < 0.2 ? s * 0.85 : s;
    scale[step] = hslToHex({ h, s: targetS, l: targetL });
  }
  return scale;
}

/** WCAG 2.x relative luminance. */
export function relativeLuminance(hex: string): number {
  const { r, g, b } = hexToRgb(hex);
  const channel = (v: number) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

/** WCAG contrast ratio between two colors, 1–21. */
export function contrastRatio(hexA: string, hexB: string): number {
  const la = relativeLuminance(hexA);
  const lb = relativeLuminance(hexB);
  const [lighter, darker] = la > lb ? [la, lb] : [lb, la];
  return (lighter + 0.05) / (darker + 0.05);
}

export interface WcagResult {
  ratio: number;
  aaNormal: boolean;
  aaLarge: boolean;
  aaaNormal: boolean;
  aaaLarge: boolean;
}

export function checkWcag(fg: string, bg: string): WcagResult {
  const ratio = contrastRatio(fg, bg);
  return {
    ratio,
    aaNormal: ratio >= 4.5,
    aaLarge: ratio >= 3,
    aaaNormal: ratio >= 7,
    aaaLarge: ratio >= 4.5,
  };
}

/** Returns black or white, whichever has more contrast on the given background. */
export function readableTextColor(bgHex: string): string {
  return contrastRatio("#ffffff", bgHex) >= contrastRatio("#111111", bgHex)
    ? "#ffffff"
    : "#111111";
}

export function hexToRgbString(hex: string): string {
  const { r, g, b } = hexToRgb(hex);
  return `${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}`;
}
