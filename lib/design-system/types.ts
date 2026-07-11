// Zentrale Typen für das Design System. Der Zustand-Store, die Live-Preview
// und alle Export-Funktionen arbeiten ausschließlich auf diesen Typen.

/** Eine Farbe mit Light- und Dark-Mode-Variante (jeweils Hex). */
export interface ColorToken {
  light: string;
  dark: string;
}

export type ScaleStep =
  | "50" | "100" | "200" | "300" | "400" | "500"
  | "600" | "700" | "800" | "900" | "950";

export const SCALE_STEPS: ScaleStep[] = [
  "50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950",
];

export type BrandColorKey = "primary" | "secondary" | "accent" | "neutral";
export type SemanticColorKey = "success" | "warning" | "error" | "info";
export type ColorKey = BrandColorKey | SemanticColorKey;

export const BRAND_COLOR_KEYS: BrandColorKey[] = [
  "primary", "secondary", "accent", "neutral",
];
export const SEMANTIC_COLOR_KEYS: SemanticColorKey[] = [
  "success", "warning", "error", "info",
];

export interface Colors {
  primary: ColorToken;
  secondary: ColorToken;
  accent: ColorToken;
  neutral: ColorToken;
  success: ColorToken;
  warning: ColorToken;
  error: ColorToken;
  info: ColorToken;
}

export type TypeLevelKey =
  | "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  | "body" | "small" | "caption";

export const TYPE_LEVEL_KEYS: TypeLevelKey[] = [
  "h1", "h2", "h3", "h4", "h5", "h6", "body", "small", "caption",
];

export interface TypeLevel {
  /** Schriftgröße in px */
  size: number;
  /** Zeilenhöhe als Faktor (z. B. 1.5) */
  lineHeight: number;
  /** Letter-Spacing in em (z. B. -0.02) */
  letterSpacing: number;
  /** Font-Weight (100–900) */
  weight: number;
}

export interface FontChoice {
  /** Google-Fonts-Familienname, z. B. "Inter" */
  family: string;
  /** CSS-Fallback-Kategorie */
  category: "serif" | "sans-serif" | "monospace" | "cursive";
}

export interface Typography {
  heading: FontChoice;
  body: FontChoice;
  /** Basisgröße für Body in px */
  baseSize: number;
  /** Skalierungsfaktor der Type-Scale (z. B. 1.25 = Major Third) */
  scaleRatio: number;
  levels: Record<TypeLevelKey, TypeLevel>;
}

export type LogoVariantKey = "main" | "icon" | "wordmark" | "inverted";

export const LOGO_VARIANT_KEYS: LogoVariantKey[] = [
  "main", "icon", "wordmark", "inverted",
];

export interface Logo {
  /** Data-URLs der hochgeladenen Dateien (SVG/PNG) */
  variants: Partial<Record<LogoVariantKey, string>>;
  /** Clearspace als Faktor der Logohöhe (z. B. 0.5 = halbe Logohöhe) */
  clearspace: number;
  /** Mindestbreite in px */
  minSize: number;
}

export interface Spacing {
  /** Basiseinheit in px (z. B. 4) */
  base: number;
  /** Multiplikatoren der Basiseinheit, aufsteigend */
  steps: number[];
}

export interface Breakpoints {
  mobile: number;
  tablet: number;
  desktop: number;
  wide: number;
}

export interface Grid {
  columns: number;
  /** Gutter in px */
  gutter: number;
  /** Maximale Container-Breite in px */
  maxWidth: number;
}

export type RadiusKey = "sm" | "md" | "lg" | "xl";
export type ShadowKey = "sm" | "md" | "lg" | "xl" | "2xl";

export const RADIUS_KEYS: RadiusKey[] = ["sm", "md", "lg", "xl"];
export const SHADOW_KEYS: ShadowKey[] = ["sm", "md", "lg", "xl", "2xl"];

export interface Effects {
  /** Border-Radius in px pro Stufe ("none" = 0 und "full" = 9999 sind implizit) */
  radius: Record<RadiusKey, number>;
  /** CSS box-shadow Werte pro Stufe */
  shadows: Record<ShadowKey, string>;
  /** Standard-Border-Breite in px */
  borderWidth: number;
  /** Neutral-Skalenstufe für Borders (z. B. "200") */
  borderColorStep: ScaleStep;
  /** Icon-Stil der angebundenen Icon-Library */
  iconStyle: "outline" | "filled";
  /** Stroke-Breite für Outline-Icons */
  iconStrokeWidth: number;
}

export interface DesignSystem {
  colors: Colors;
  typography: Typography;
  logo: Logo;
  spacing: Spacing;
  breakpoints: Breakpoints;
  grid: Grid;
  effects: Effects;
}

export interface Project {
  id: string;
  name: string;
  /** Unix-Timestamp (ms) der letzten Änderung */
  updatedAt: number;
  system: DesignSystem;
}

export type SectionKey =
  | "generate" | "colors" | "typography" | "logo" | "spacing" | "effects"
  | "components" | "mixer" | "export";
