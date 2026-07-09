// Farb-Utilities: Konvertierung, Skalen-Generierung (50–950) und WCAG-Kontrast.

import { SCALE_STEPS, type ScaleStep } from "./types";

export interface Rgb {
  r: number;
  g: number;
  b: number;
}

export function hexToRgb(hex: string): Rgb | null {
  const match = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if (!match) return null;
  const value = parseInt(match[1], 16);
  return { r: (value >> 16) & 255, g: (value >> 8) & 255, b: value & 255 };
}

export function rgbToHex({ r, g, b }: Rgb): string {
  const to2 = (n: number) => Math.round(Math.min(255, Math.max(0, n))).toString(16).padStart(2, "0");
  return `#${to2(r)}${to2(g)}${to2(b)}`;
}

export function isValidHex(hex: string): boolean {
  return hexToRgb(hex) !== null;
}

/** Mischt eine Farbe mit Weiß (amount 0–1). */
function tint(rgb: Rgb, amount: number): Rgb {
  return {
    r: rgb.r + (255 - rgb.r) * amount,
    g: rgb.g + (255 - rgb.g) * amount,
    b: rgb.b + (255 - rgb.b) * amount,
  };
}

/** Mischt eine Farbe mit Schwarz (amount 0–1). */
function shade(rgb: Rgb, amount: number): Rgb {
  return {
    r: rgb.r * (1 - amount),
    g: rgb.g * (1 - amount),
    b: rgb.b * (1 - amount),
  };
}

// Mischanteile pro Skalenstufe: positive Werte = Tint (heller),
// negative Werte = Shade (dunkler). 500 entspricht der Basisfarbe.
const SCALE_MIX: Record<ScaleStep, number> = {
  "50": 0.95,
  "100": 0.88,
  "200": 0.75,
  "300": 0.58,
  "400": 0.32,
  "500": 0,
  "600": -0.14,
  "700": -0.32,
  "800": -0.48,
  "900": -0.62,
  "950": -0.75,
};

export type ColorScale = Record<ScaleStep, string>;

/** Erzeugt aus einer Basisfarbe eine Tailwind-artige Skala von 50 bis 950. */
export function generateScale(baseHex: string): ColorScale {
  const rgb = hexToRgb(baseHex) ?? { r: 128, g: 128, b: 128 };
  const scale = {} as ColorScale;
  for (const step of SCALE_STEPS) {
    const mix = SCALE_MIX[step];
    scale[step] = rgbToHex(mix >= 0 ? tint(rgb, mix) : shade(rgb, -mix));
  }
  return scale;
}

/** Relative Luminanz nach WCAG 2.x. */
export function relativeLuminance(hex: string): number {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0;
  const channel = (v: number) => {
    const s = v / 255;
    return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * channel(rgb.r) + 0.7152 * channel(rgb.g) + 0.0722 * channel(rgb.b);
}

/** WCAG-Kontrastverhältnis zwischen zwei Farben (1–21). */
export function contrastRatio(hexA: string, hexB: string): number {
  const la = relativeLuminance(hexA);
  const lb = relativeLuminance(hexB);
  const [light, dark] = la > lb ? [la, lb] : [lb, la];
  return (light + 0.05) / (dark + 0.05);
}

export type WcagLevel = "AAA" | "AA" | "AA Large" | "Fail";

/** Bewertet ein Kontrastverhältnis für normalen Text. */
export function wcagLevel(ratio: number): WcagLevel {
  if (ratio >= 7) return "AAA";
  if (ratio >= 4.5) return "AA";
  if (ratio >= 3) return "AA Large";
  return "Fail";
}

/** Wählt Schwarz oder Weiß als lesbare Textfarbe auf dem gegebenen Hintergrund. */
export function readableTextColor(bgHex: string): string {
  return contrastRatio(bgHex, "#ffffff") >= contrastRatio(bgHex, "#000000")
    ? "#ffffff"
    : "#000000";
}

export function hexToRgbString(hex: string): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return "";
  return `rgb(${Math.round(rgb.r)}, ${Math.round(rgb.g)}, ${Math.round(rgb.b)})`;
}
