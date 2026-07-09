// Central type definitions for the design system state.
// Every panel, preview and export function works off these types.

export type ScaleStep =
  | "50" | "100" | "200" | "300" | "400" | "500"
  | "600" | "700" | "800" | "900" | "950";

export type PreviewMode = "light" | "dark";

/** A color with separate values for light and dark mode. */
export interface ColorModes {
  light: string;
  dark: string;
}

export type BrandColorKey = "primary" | "secondary" | "accent" | "neutral";
export type SemanticColorKey = "success" | "warning" | "error" | "info";

export interface ColorsConfig {
  primary: ColorModes;
  secondary: ColorModes;
  accent: ColorModes;
  neutral: ColorModes;
  semantic: Record<SemanticColorKey, ColorModes>;
}

export type TypeLevelKey =
  | "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  | "body" | "small" | "caption";

export interface TypeLevel {
  /** Font size in px */
  size: number;
  /** Unitless line-height */
  lineHeight: number;
  /** Letter-spacing in em */
  letterSpacing: number;
  fontWeight: number;
}

export interface TypographyConfig {
  headingFont: string;
  bodyFont: string;
  /** Base size in px used by the scale generator */
  baseSize: number;
  /** Scale ratio, e.g. 1.25 = Major Third */
  scaleRatio: number;
  levels: Record<TypeLevelKey, TypeLevel>;
}

export type LogoVariantKey = "main" | "icon" | "wordmark" | "inverted";

export interface LogoConfig {
  /** Data URLs of uploaded logo files (SVG/PNG) */
  variants: Record<LogoVariantKey, string | null>;
  /** Clearspace around the logo, as a multiple of the logo height */
  clearspace: number;
  /** Minimum display size in px (width) */
  minSize: number;
}

export interface SpacingConfig {
  /** Base unit in px */
  base: number;
  /** Multipliers of the base unit, e.g. [1, 2, 3, 4, 6, 8, 12, 16, 24] */
  multipliers: number[];
  breakpoints: {
    mobile: number;
    tablet: number;
    desktop: number;
    wide: number;
  };
  grid: {
    columns: number;
    /** Gutter in px */
    gutter: number;
  };
}

export type RadiusKey = "none" | "sm" | "md" | "lg" | "xl" | "full";
export type ShadowKey = "sm" | "md" | "lg" | "xl" | "2xl";

export interface EffectsConfig {
  /** Radius values in px; "full" is stored as 9999 */
  radius: Record<RadiusKey, number>;
  /** CSS box-shadow values */
  shadows: Record<ShadowKey, string>;
  /** Default border width in px */
  borderWidth: number;
  iconStyle: "outline" | "filled";
}

export interface DesignSystem {
  colors: ColorsConfig;
  typography: TypographyConfig;
  logo: LogoConfig;
  spacing: SpacingConfig;
  effects: EffectsConfig;
}

export type SectionKey = keyof DesignSystem;

export interface Project {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
  system: DesignSystem;
}

export type EditorSection =
  | "colors" | "typography" | "logo" | "spacing"
  | "effects" | "components" | "export";
