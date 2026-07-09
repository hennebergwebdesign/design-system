"use client";

// Color-focused preview blocks: buttons, badges, alerts and links that
// re-render live from the resolved design tokens.

import {
  CircleAlert,
  CircleCheck,
  CircleX,
  Info,
} from "lucide-react";
import { generateScale, readableTextColor } from "@/lib/color";
import type { ResolvedTokens } from "@/lib/tokens";
import type { DesignSystem } from "@/lib/types";

interface BlockProps {
  tokens: ResolvedTokens;
  system: DesignSystem;
}

export function PreviewSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-3">
      <h3 className="text-xs font-semibold tracking-wide uppercase opacity-60">
        {title}
      </h3>
      {children}
    </section>
  );
}

export function ButtonsPreview({ tokens, system }: BlockProps) {
  const radius = system.effects.radius.md;
  const base: React.CSSProperties = {
    borderRadius: radius,
    fontWeight: 500,
    fontSize: 14,
    padding: "8px 16px",
    border: "1px solid transparent",
    cursor: "pointer",
  };

  const solid = (bg: string): React.CSSProperties => ({
    ...base,
    backgroundColor: bg,
    color: readableTextColor(bg),
  });

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <button style={solid(tokens.primary)}>Primary</button>
        <button style={solid(tokens.secondary)}>Secondary</button>
        <button style={solid(tokens.accent)}>Accent</button>
        <button
          style={{
            ...base,
            backgroundColor: "transparent",
            color: tokens.primary,
            borderColor: tokens.primary,
          }}
        >
          Outline
        </button>
        <button
          style={{ ...base, backgroundColor: "transparent", color: tokens.primary }}
        >
          Ghost
        </button>
        <button style={{ ...solid(tokens.primary), opacity: 0.5, cursor: "not-allowed" }}>
          Disabled
        </button>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <button style={{ ...solid(tokens.primary), fontSize: 12, padding: "5px 10px" }}>
          Small
        </button>
        <button style={solid(tokens.primary)}>Medium</button>
        <button style={{ ...solid(tokens.primary), fontSize: 16, padding: "11px 22px" }}>
          Large
        </button>
      </div>
    </div>
  );
}

export function BadgesPreview({ tokens, system }: BlockProps) {
  const items = [
    ["Primary", tokens.primary],
    ["Secondary", tokens.secondary],
    ["Accent", tokens.accent],
    ["Success", tokens.success],
    ["Warning", tokens.warning],
    ["Error", tokens.error],
    ["Info", tokens.info],
  ] as const;

  return (
    <div className="flex flex-wrap gap-2">
      {items.map(([label, color]) => (
        <span
          key={label}
          style={{
            backgroundColor: color,
            color: readableTextColor(color),
            borderRadius: system.effects.radius.full,
            fontSize: 12,
            fontWeight: 500,
            padding: "3px 10px",
          }}
        >
          {label}
        </span>
      ))}
    </div>
  );
}

const ALERTS = [
  {
    key: "success",
    icon: CircleCheck,
    title: "Erfolgreich gespeichert",
    text: "Deine Änderungen wurden übernommen.",
  },
  {
    key: "warning",
    icon: CircleAlert,
    title: "Achtung",
    text: "Dein Speicherplatz ist fast aufgebraucht.",
  },
  {
    key: "error",
    icon: CircleX,
    title: "Fehler",
    text: "Die Verbindung zum Server ist fehlgeschlagen.",
  },
  {
    key: "info",
    icon: Info,
    title: "Hinweis",
    text: "Ein neues Update ist verfügbar.",
  },
] as const;

export function AlertsPreview({ tokens, system }: BlockProps) {
  const isDark = tokens.mode === "dark";

  return (
    <div className="flex flex-col gap-2">
      {ALERTS.map(({ key, icon: Icon, title, text }) => {
        const scale = generateScale(tokens[key]);
        const bg = isDark ? scale["950"] : scale["50"];
        const border = isDark ? scale["800"] : scale["200"];
        const fg = isDark ? scale["300"] : scale["700"];
        return (
          <div
            key={key}
            style={{
              backgroundColor: bg,
              border: `1px solid ${border}`,
              borderRadius: system.effects.radius.md,
              color: fg,
              display: "flex",
              gap: 10,
              padding: "12px 14px",
            }}
          >
            <Icon className="mt-0.5 size-4 shrink-0" />
            <div>
              <p style={{ fontWeight: 600, fontSize: 14 }}>{title}</p>
              <p style={{ fontSize: 13, opacity: 0.85 }}>{text}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function LinksPreview({ tokens }: BlockProps) {
  return (
    <p style={{ fontSize: 14, color: tokens.text, lineHeight: 1.7 }}>
      Fließtext mit einem{" "}
      <a href="#" style={{ color: tokens.primary, textDecoration: "underline" }}>
        primären Link
      </a>
      , einem{" "}
      <a href="#" style={{ color: tokens.secondary, textDecoration: "underline" }}>
        sekundären Link
      </a>{" "}
      und einem{" "}
      <a href="#" style={{ color: tokens.textMuted, textDecoration: "underline" }}>
        dezenten Link
      </a>{" "}
      im Kontext.
    </p>
  );
}
