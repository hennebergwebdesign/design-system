"use client";

// Logo-Vorschau: Kontexte (heller/dunkler Hintergrund, Header, Favicon),
// Clearspace-Visualisierung und Mindestgröße.

import type { DesignSystem } from "@/lib/design-system/types";
import { generateScale } from "@/lib/design-system/color";
import type { PreviewMode } from "../preview-vars";
import { PButton } from "../ui";

/* eslint-disable @next/next/no-img-element */

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

function EmptyHint() {
  return (
    <div
      className="flex h-48 items-center justify-center rounded-lg border border-dashed text-sm"
      style={{ borderColor: "var(--ds-border)", color: "var(--ds-text-muted)" }}
    >
      Lade im Panel links ein Logo hoch, um die Kontexte zu sehen.
    </div>
  );
}

export function LogoPreview({
  system,
  mode,
}: {
  system: DesignSystem;
  mode: PreviewMode;
}) {
  const { logo } = system;
  const main = logo.variants.main ?? logo.variants.wordmark;
  const icon = logo.variants.icon ?? main;
  const darkVariant = logo.variants.inverted ?? main;
  const neutral = generateScale(system.colors.neutral[mode]);

  if (!main) return <EmptyHint />;

  return (
    <div className="space-y-10">
      <section>
        <SectionTitle>Hintergrund-Kontexte</SectionTitle>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex h-36 items-center justify-center rounded-lg border bg-white" style={{ borderColor: "var(--ds-border)" }}>
            <img src={main} alt="Logo auf hellem Hintergrund" className="max-h-14 max-w-[70%] object-contain" />
          </div>
          <div className="flex h-36 items-center justify-center rounded-lg" style={{ backgroundColor: neutral["950"] }}>
            <img src={darkVariant} alt="Logo auf dunklem Hintergrund" className="max-h-14 max-w-[70%] object-contain" />
          </div>
          <div className="flex h-36 items-center justify-center rounded-lg" style={{ backgroundColor: "var(--ds-primary)" }}>
            <img src={darkVariant} alt="Logo auf Primärfarbe" className="max-h-14 max-w-[70%] object-contain" />
          </div>
          <div className="flex h-36 items-center justify-center rounded-lg" style={{ backgroundColor: "var(--ds-surface)", border: "var(--ds-border-w) solid var(--ds-border)" }}>
            <img src={main} alt="Logo auf Surface" className="max-h-14 max-w-[70%] object-contain" />
          </div>
        </div>
      </section>

      <section>
        <SectionTitle>Header-Kontext</SectionTitle>
        <div
          className="flex items-center justify-between rounded-lg px-5 py-3.5"
          style={{
            backgroundColor: "var(--ds-bg)",
            border: "var(--ds-border-w) solid var(--ds-border)",
            boxShadow: "var(--ds-shadow-sm)",
          }}
        >
          <img src={main} alt="Logo im Header" className="h-8 object-contain" />
          <nav className="flex items-center gap-5 text-sm" style={{ fontFamily: "var(--ds-font-body)", color: "var(--ds-text-muted)" }}>
            <span>Produkt</span>
            <span>Preise</span>
            <span>Kontakt</span>
          </nav>
          <PButton size="sm">Loslegen</PButton>
        </div>
      </section>

      <section>
        <SectionTitle>Favicon-Größen</SectionTitle>
        <div className="flex items-end gap-6">
          {[48, 32, 16].map((size) => (
            <div key={size} className="text-center">
              <div
                className="flex items-center justify-center rounded-md"
                style={{
                  width: size + 12,
                  height: size + 12,
                  backgroundColor: "var(--ds-surface)",
                  border: "var(--ds-border-w) solid var(--ds-border)",
                }}
              >
                <img src={icon} alt={`Favicon ${size}px`} style={{ width: size, height: size, objectFit: "contain" }} />
              </div>
              <p className="mt-1.5 font-mono text-[11px]" style={{ color: "var(--ds-text-muted)" }}>
                {size}px
              </p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionTitle>Clearspace ({logo.clearspace.toFixed(2)}× Logohöhe)</SectionTitle>
        <div className="flex justify-center rounded-lg py-10" style={{ backgroundColor: "var(--ds-surface)" }}>
          <div
            className="border border-dashed"
            style={{
              borderColor: "var(--ds-primary)",
              padding: `calc(56px * ${logo.clearspace})`,
            }}
          >
            <img src={main} alt="Logo mit Clearspace" style={{ height: 56, objectFit: "contain" }} />
          </div>
        </div>
        <p className="mt-2 text-xs" style={{ color: "var(--ds-text-muted)", fontFamily: "var(--ds-font-body)" }}>
          Innerhalb der gestrichelten Zone dürfen keine anderen Elemente platziert werden.
        </p>
      </section>

      <section>
        <SectionTitle>Mindestgröße ({logo.minSize}px)</SectionTitle>
        <div className="flex items-end gap-8">
          <div>
            <img src={main} alt="Logo in Mindestgröße" style={{ width: logo.minSize, objectFit: "contain" }} />
            <p className="mt-1.5 font-mono text-[11px]" style={{ color: "var(--ds-success)" }}>
              ✓ {logo.minSize}px — erlaubt
            </p>
          </div>
          <div style={{ opacity: 0.6 }}>
            <img src={main} alt="Logo unter Mindestgröße" style={{ width: Math.max(8, Math.round(logo.minSize * 0.5)), objectFit: "contain" }} />
            <p className="mt-1.5 font-mono text-[11px]" style={{ color: "var(--ds-error)" }}>
              ✕ {Math.round(logo.minSize * 0.5)}px — zu klein
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
