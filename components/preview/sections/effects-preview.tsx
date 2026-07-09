"use client";

// Effects-Vorschau: Radius an Buttons/Cards, Schatten-Karten, Borders, Icons.

import {
  Bell,
  Bookmark,
  Heart,
  Home,
  Mail,
  Settings,
  Star,
  User,
} from "lucide-react";
import type { DesignSystem } from "@/lib/design-system/types";
import { RADIUS_KEYS, SHADOW_KEYS } from "@/lib/design-system/types";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3
      className="mb-3 text-sm font-semibold tracking-wide uppercase"
      style={{ color: "var(--ds-text-muted)", fontFamily: "var(--ds-font-body)" }}
    >
      {children}
    </h3>
  );
}

const ICONS = [Home, Bell, Heart, Star, Mail, User, Settings, Bookmark];

export function EffectsPreview({ system }: { system: DesignSystem }) {
  const { effects } = system;
  const radiusEntries: { label: string; value: string }[] = [
    { label: "none", value: "0px" },
    ...RADIUS_KEYS.map((key) => ({ label: key, value: `${effects.radius[key]}px` })),
    { label: "full", value: "9999px" },
  ];

  return (
    <div className="space-y-10" style={{ fontFamily: "var(--ds-font-body)" }}>
      <section>
        <SectionTitle>Border-Radius</SectionTitle>
        <div className="flex flex-wrap gap-3">
          {radiusEntries.map(({ label, value }) => (
            <button
              key={label}
              type="button"
              className="ds-btn"
              style={{
                backgroundColor: "var(--ds-primary)",
                color: "var(--ds-primary-contrast)",
                borderRadius: value,
                padding: "9px 18px",
                fontSize: 13,
                fontWeight: 500,
              }}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-3 gap-4">
          {(["sm", "lg", "xl"] as const).map((key) => (
            <div
              key={key}
              className="flex h-24 items-center justify-center font-mono text-xs"
              style={{
                border: "var(--ds-border-w) solid var(--ds-border)",
                borderRadius: `${effects.radius[key]}px`,
                backgroundColor: "var(--ds-surface)",
                color: "var(--ds-text-muted)",
              }}
            >
              radius-{key} · {effects.radius[key]}px
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionTitle>Schatten / Elevation</SectionTitle>
        <div className="grid grid-cols-3 gap-6 rounded-lg p-6" style={{ backgroundColor: "var(--ds-surface)" }}>
          {SHADOW_KEYS.map((key) => (
            <div
              key={key}
              className="flex h-28 items-center justify-center font-mono text-xs"
              style={{
                backgroundColor: "var(--ds-bg)",
                borderRadius: "var(--ds-radius-lg)",
                boxShadow: effects.shadows[key],
                color: "var(--ds-text-muted)",
              }}
            >
              shadow-{key}
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionTitle>
          Borders — {effects.borderWidth}px · Neutral {effects.borderColorStep}
        </SectionTitle>
        <div className="grid grid-cols-2 gap-4">
          <div
            className="flex h-20 items-center justify-center text-sm"
            style={{
              border: "var(--ds-border-w) solid var(--ds-border)",
              borderRadius: "var(--ds-radius-md)",
              color: "var(--ds-text-muted)",
            }}
          >
            Standard-Border
          </div>
          <div
            className="flex h-20 items-center justify-center text-sm"
            style={{
              border: "var(--ds-border-w) solid var(--ds-primary)",
              borderRadius: "var(--ds-radius-md)",
              color: "var(--ds-primary)",
            }}
          >
            Fokus / Aktiv
          </div>
        </div>
      </section>

      <section>
        <SectionTitle>
          Icons — {effects.iconStyle === "outline" ? `Outline (Stroke ${effects.iconStrokeWidth})` : "Filled"}
        </SectionTitle>
        <div className="flex flex-wrap gap-4">
          {ICONS.map((Icon, index) => (
            <div
              key={index}
              className="flex size-12 items-center justify-center"
              style={{
                backgroundColor: "var(--ds-surface)",
                border: "var(--ds-border-w) solid var(--ds-border)",
                borderRadius: "var(--ds-radius-md)",
                color: "var(--ds-primary)",
              }}
            >
              <Icon
                className="size-5"
                strokeWidth={effects.iconStyle === "outline" ? effects.iconStrokeWidth : 1.5}
                fill={effects.iconStyle === "filled" ? "currentColor" : "none"}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
