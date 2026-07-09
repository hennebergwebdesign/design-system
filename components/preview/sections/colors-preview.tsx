"use client";

// Farb-Vorschau: generierte Skalen, Buttons, Badges, Alerts und Links
// in allen definierten Farben.

import type { DesignSystem, ColorKey } from "@/lib/design-system/types";
import { SCALE_STEPS, BRAND_COLOR_KEYS, SEMANTIC_COLOR_KEYS } from "@/lib/design-system/types";
import { generateScale, readableTextColor } from "@/lib/design-system/color";
import type { PreviewMode } from "../preview-vars";
import { PAlert, PBadge, PButton, PLink } from "../ui";

const LABELS: Record<ColorKey, string> = {
  primary: "Primary",
  secondary: "Secondary",
  accent: "Accent",
  neutral: "Neutral",
  success: "Success",
  warning: "Warning",
  error: "Error",
  info: "Info",
};

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

function ScaleRow({ label, baseHex }: { label: string; baseHex: string }) {
  const scale = generateScale(baseHex);
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between">
        <span className="text-sm font-medium" style={{ fontFamily: "var(--ds-font-body)" }}>
          {label}
        </span>
        <span className="font-mono text-xs" style={{ color: "var(--ds-text-muted)" }}>
          {baseHex}
        </span>
      </div>
      <div className="flex overflow-hidden" style={{ borderRadius: "var(--ds-radius-md)" }}>
        {SCALE_STEPS.map((step) => (
          <div
            key={step}
            className="group relative h-14 min-w-0 flex-1"
            style={{ backgroundColor: scale[step] }}
            title={`${step}: ${scale[step]}`}
          >
            <span
              className="absolute inset-x-0 bottom-1 text-center text-[10px] font-medium opacity-70"
              style={{ color: readableTextColor(scale[step]) }}
            >
              {step}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ColorsPreview({
  system,
  mode,
}: {
  system: DesignSystem;
  mode: PreviewMode;
}) {
  return (
    <div className="space-y-10">
      <section>
        <SectionTitle>Farbskalen</SectionTitle>
        <div className="space-y-5">
          {BRAND_COLOR_KEYS.map((key) => (
            <ScaleRow key={key} label={LABELS[key]} baseHex={system.colors[key][mode]} />
          ))}
        </div>
      </section>

      <section>
        <SectionTitle>Semantische Farben</SectionTitle>
        <div className="grid grid-cols-2 gap-5">
          {SEMANTIC_COLOR_KEYS.map((key) => (
            <ScaleRow key={key} label={LABELS[key]} baseHex={system.colors[key][mode]} />
          ))}
        </div>
      </section>

      <section>
        <SectionTitle>Buttons</SectionTitle>
        <div className="flex flex-wrap items-center gap-3">
          <PButton variant="primary">Primary</PButton>
          <PButton variant="secondary">Secondary</PButton>
          <PButton variant="accent">Accent</PButton>
          <PButton variant="outline">Outline</PButton>
          <PButton variant="ghost">Ghost</PButton>
          <PButton variant="primary" disabled>
            Disabled
          </PButton>
        </div>
      </section>

      <section>
        <SectionTitle>Badges</SectionTitle>
        <div className="flex flex-wrap items-center gap-2.5">
          {(["primary", "secondary", "accent", "neutral", ...SEMANTIC_COLOR_KEYS] as ColorKey[]).map(
            (key) => (
              <PBadge key={key} color={key}>
                {LABELS[key]}
              </PBadge>
            ),
          )}
        </div>
      </section>

      <section>
        <SectionTitle>Alerts</SectionTitle>
        <div className="space-y-3">
          <PAlert kind="success" title="Erfolgreich gespeichert">
            Deine Änderungen wurden übernommen.
          </PAlert>
          <PAlert kind="warning" title="Achtung">
            Dein Speicherplatz ist fast aufgebraucht.
          </PAlert>
          <PAlert kind="error" title="Fehler beim Senden">
            Bitte überprüfe deine Eingaben und versuche es erneut.
          </PAlert>
          <PAlert kind="info" title="Neue Version verfügbar">
            Version 2.4 steht zum Download bereit.
          </PAlert>
        </div>
      </section>

      <section>
        <SectionTitle>Links & Text</SectionTitle>
        <p style={{ fontFamily: "var(--ds-font-body)", fontSize: 15, lineHeight: 1.6 }}>
          Fließtext mit einem <PLink>Inline-Link in der Primärfarbe</PLink> sowie{" "}
          <span style={{ color: "var(--ds-text-muted)" }}>abgesetztem Muted-Text</span> für
          sekundäre Informationen.
        </p>
      </section>
    </div>
  );
}
