// Token-gesteuerte Beispiel-Komponenten für die Live-Preview. Alle Styles
// kommen aus den --ds-* Custom Properties (siehe preview-vars.ts), sodass
// jede Token-Änderung sofort sichtbar wird.

import type { CSSProperties, ReactNode } from "react";
import type { ColorKey, SemanticColorKey } from "@/lib/design-system/types";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "accent" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

const BUTTON_SIZES: Record<ButtonSize, CSSProperties> = {
  sm: { padding: "6px 12px", fontSize: 13 },
  md: { padding: "9px 18px", fontSize: 14 },
  lg: { padding: "12px 24px", fontSize: 16 },
};

export function PButton({
  variant = "primary",
  size = "md",
  disabled,
  children,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  children: ReactNode;
}) {
  const styles: CSSProperties = { ...BUTTON_SIZES[size] };
  if (variant === "primary" || variant === "secondary" || variant === "accent") {
    styles.backgroundColor = `var(--ds-${variant})`;
    styles.color = `var(--ds-${variant}-contrast)`;
  } else if (variant === "outline") {
    styles.backgroundColor = "transparent";
    styles.color = "var(--ds-text)";
    styles.border = "var(--ds-border-w) solid var(--ds-border)";
  } else {
    styles.backgroundColor = "transparent";
    styles.color = "var(--ds-primary)";
  }

  return (
    <button
      type="button"
      disabled={disabled}
      className={cn("ds-btn ds-focus", variant === "ghost" && "ds-ghost")}
      style={{
        borderRadius: "var(--ds-radius-md)",
        fontFamily: "var(--ds-font-body)",
        fontWeight: 500,
        ...styles,
      }}
    >
      {children}
    </button>
  );
}

export function PBadge({ color, children }: { color: ColorKey; children: ReactNode }) {
  return (
    <span
      style={{
        backgroundColor: `var(--ds-${color}-100)`,
        color: `var(--ds-${color}-800)`,
        borderRadius: "var(--ds-radius-full)",
        fontFamily: "var(--ds-font-body)",
        padding: "3px 10px",
        fontSize: 12,
        fontWeight: 600,
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
      }}
    >
      {children}
    </span>
  );
}

export function PAlert({
  kind,
  title,
  children,
}: {
  kind: SemanticColorKey;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div
      role="alert"
      style={{
        backgroundColor: `var(--ds-${kind}-50)`,
        border: `var(--ds-border-w) solid var(--ds-${kind}-300)`,
        borderRadius: "var(--ds-radius-lg)",
        color: `var(--ds-${kind}-900)`,
        fontFamily: "var(--ds-font-body)",
        padding: "12px 16px",
      }}
    >
      <p style={{ fontWeight: 600, fontSize: 14 }}>{title}</p>
      {children && <p style={{ fontSize: 13, marginTop: 2, opacity: 0.85 }}>{children}</p>}
    </div>
  );
}

export function PLink({ children }: { children: ReactNode }) {
  return (
    <a
      href="#"
      onClick={(e) => e.preventDefault()}
      className="ds-focus"
      style={{
        color: "var(--ds-primary)",
        fontFamily: "var(--ds-font-body)",
        textDecoration: "underline",
        textUnderlineOffset: 3,
      }}
    >
      {children}
    </a>
  );
}

export function PCard({
  children,
  style,
}: {
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        backgroundColor: "var(--ds-bg)",
        border: "var(--ds-border-w) solid var(--ds-border)",
        borderRadius: "var(--ds-radius-lg)",
        boxShadow: "var(--ds-shadow-sm)",
        overflow: "hidden",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/** Überschrift innerhalb der Preview, gesteuert durch die Typografie-Tokens. */
export function PHeading({
  level,
  size,
  lineHeight,
  letterSpacing,
  weight,
  children,
}: {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  size: number;
  lineHeight: number;
  letterSpacing: number;
  weight: number;
  children: ReactNode;
}) {
  const Tag = `h${level}` as const;
  return (
    <Tag
      style={{
        fontFamily: "var(--ds-font-heading)",
        fontSize: size,
        lineHeight,
        letterSpacing: `${letterSpacing}em`,
        fontWeight: weight,
        color: "var(--ds-text)",
      }}
    >
      {children}
    </Tag>
  );
}
