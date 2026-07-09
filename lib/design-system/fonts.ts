// Kuratierte Google-Fonts-Auswahl + Pairing-Vorschläge und Type-Scale-Presets.

import type { FontChoice, TypeLevelKey, Typography } from "./types";

export interface GoogleFont {
  family: string;
  category: FontChoice["category"];
}

export const GOOGLE_FONTS: GoogleFont[] = [
  // Sans-Serif
  { family: "Inter", category: "sans-serif" },
  { family: "Roboto", category: "sans-serif" },
  { family: "Open Sans", category: "sans-serif" },
  { family: "Lato", category: "sans-serif" },
  { family: "Montserrat", category: "sans-serif" },
  { family: "Poppins", category: "sans-serif" },
  { family: "Raleway", category: "sans-serif" },
  { family: "Work Sans", category: "sans-serif" },
  { family: "Nunito", category: "sans-serif" },
  { family: "Nunito Sans", category: "sans-serif" },
  { family: "Rubik", category: "sans-serif" },
  { family: "DM Sans", category: "sans-serif" },
  { family: "Manrope", category: "sans-serif" },
  { family: "Karla", category: "sans-serif" },
  { family: "Mulish", category: "sans-serif" },
  { family: "Barlow", category: "sans-serif" },
  { family: "Outfit", category: "sans-serif" },
  { family: "Sora", category: "sans-serif" },
  { family: "Plus Jakarta Sans", category: "sans-serif" },
  { family: "Figtree", category: "sans-serif" },
  { family: "Urbanist", category: "sans-serif" },
  { family: "Space Grotesk", category: "sans-serif" },
  { family: "Lexend", category: "sans-serif" },
  { family: "Archivo", category: "sans-serif" },
  { family: "IBM Plex Sans", category: "sans-serif" },
  { family: "Source Sans 3", category: "sans-serif" },
  { family: "Noto Sans", category: "sans-serif" },
  { family: "Quicksand", category: "sans-serif" },
  { family: "Josefin Sans", category: "sans-serif" },
  { family: "Cabin", category: "sans-serif" },
  // Serif
  { family: "Playfair Display", category: "serif" },
  { family: "Merriweather", category: "serif" },
  { family: "Lora", category: "serif" },
  { family: "PT Serif", category: "serif" },
  { family: "Libre Baskerville", category: "serif" },
  { family: "Cormorant Garamond", category: "serif" },
  { family: "EB Garamond", category: "serif" },
  { family: "Crimson Text", category: "serif" },
  { family: "Bitter", category: "serif" },
  { family: "Source Serif 4", category: "serif" },
  { family: "DM Serif Display", category: "serif" },
  { family: "Fraunces", category: "serif" },
  { family: "Spectral", category: "serif" },
  { family: "Literata", category: "serif" },
  { family: "Zilla Slab", category: "serif" },
  { family: "Roboto Slab", category: "serif" },
  { family: "Arvo", category: "serif" },
  // Monospace
  { family: "JetBrains Mono", category: "monospace" },
  { family: "Fira Code", category: "monospace" },
  { family: "IBM Plex Mono", category: "monospace" },
  { family: "Space Mono", category: "monospace" },
  { family: "Roboto Mono", category: "monospace" },
];

export function findFont(family: string): GoogleFont {
  return (
    GOOGLE_FONTS.find((f) => f.family === family) ?? {
      family,
      category: "sans-serif",
    }
  );
}

export interface FontPairing {
  name: string;
  heading: string;
  body: string;
}

export const FONT_PAIRINGS: FontPairing[] = [
  { name: "Neutral & Modern", heading: "Inter", body: "Inter" },
  { name: "Editorial", heading: "Playfair Display", body: "Lato" },
  { name: "Klassisch", heading: "Lora", body: "Open Sans" },
  { name: "Freundlich", heading: "Poppins", body: "Nunito Sans" },
  { name: "Tech / Startup", heading: "Space Grotesk", body: "Figtree" },
  { name: "Elegant", heading: "Cormorant Garamond", body: "Mulish" },
  { name: "Kraftvoll", heading: "Archivo", body: "Source Sans 3" },
  { name: "Verspielt Serif", heading: "Fraunces", body: "Work Sans" },
];

/** Google-Fonts-CSS-URL für eine Familie mit gängigen Gewichten. */
export function googleFontHref(family: string): string {
  const encoded = family.replaceAll(" ", "+");
  return `https://fonts.googleapis.com/css2?family=${encoded}:wght@300;400;500;600;700;800&display=swap`;
}

export interface ScalePreset {
  name: string;
  ratio: number;
}

export const SCALE_PRESETS: ScalePreset[] = [
  { name: "Minor Second (1.067)", ratio: 1.067 },
  { name: "Major Second (1.125)", ratio: 1.125 },
  { name: "Minor Third (1.2)", ratio: 1.2 },
  { name: "Major Third (1.25)", ratio: 1.25 },
  { name: "Perfect Fourth (1.333)", ratio: 1.333 },
  { name: "Augmented Fourth (1.414)", ratio: 1.414 },
  { name: "Perfect Fifth (1.5)", ratio: 1.5 },
  { name: "Golden Ratio (1.618)", ratio: 1.618 },
];

/** Berechnet die Schriftgrößen der Type-Scale aus Basisgröße und Ratio. */
export function computeScaleSizes(
  baseSize: number,
  ratio: number,
): Record<TypeLevelKey, number> {
  const pow = (n: number) => Math.round(baseSize * Math.pow(ratio, n));
  return {
    h1: pow(5),
    h2: pow(4),
    h3: pow(3),
    h4: pow(2),
    h5: pow(1),
    h6: pow(0),
    body: baseSize,
    small: Math.round(baseSize * 0.875),
    caption: Math.round(baseSize * 0.75),
  };
}

/** Wendet Basisgröße + Ratio auf alle Ebenen einer Typografie an. */
export function applyScale(typography: Typography, baseSize: number, ratio: number): void {
  const sizes = computeScaleSizes(baseSize, ratio);
  typography.baseSize = baseSize;
  typography.scaleRatio = ratio;
  for (const key of Object.keys(sizes) as TypeLevelKey[]) {
    typography.levels[key].size = sizes[key];
  }
}
