"use client";

// Spacing-Vorschau: Skala als Balken, Grid-Visualisierung und Breakpoints.

import type { DesignSystem } from "@/lib/design-system/types";

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

export function SpacingPreview({ system }: { system: DesignSystem }) {
  const { spacing, grid, breakpoints } = system;
  const maxBreakpoint = Math.max(...Object.values(breakpoints));

  return (
    <div className="space-y-10" style={{ fontFamily: "var(--ds-font-body)" }}>
      <section>
        <SectionTitle>Spacing-Skala ({spacing.base}px-Basis)</SectionTitle>
        <div className="space-y-2">
          {spacing.steps.map((step, index) => {
            const px = step * spacing.base;
            return (
              <div key={index} className="flex items-center gap-3">
                <span className="w-16 font-mono text-xs" style={{ color: "var(--ds-text-muted)" }}>
                  space-{index + 1}
                </span>
                <div
                  className="h-5"
                  style={{
                    width: px,
                    backgroundColor: "var(--ds-primary-400)",
                    borderRadius: "var(--ds-radius-sm)",
                  }}
                />
                <span className="font-mono text-xs" style={{ color: "var(--ds-text-muted)" }}>
                  {px}px
                </span>
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <SectionTitle>
          Grid — {grid.columns} Spalten · {grid.gutter}px Gutter · max {grid.maxWidth}px
        </SectionTitle>
        <div
          className="rounded-lg p-4"
          style={{ backgroundColor: "var(--ds-surface)", border: "var(--ds-border-w) solid var(--ds-border)" }}
        >
          <div className="flex" style={{ gap: grid.gutter / 2 }}>
            {Array.from({ length: grid.columns }, (_, i) => (
              <div
                key={i}
                className="flex h-24 flex-1 items-center justify-center font-mono text-[10px]"
                style={{
                  backgroundColor: "var(--ds-primary-100)",
                  color: "var(--ds-primary-700)",
                  borderRadius: "var(--ds-radius-sm)",
                }}
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <SectionTitle>Breakpoints</SectionTitle>
        <div className="space-y-2">
          {(Object.entries(breakpoints) as [string, number][]).map(([key, value]) => (
            <div key={key} className="flex items-center gap-3">
              <span className="w-16 text-xs font-medium capitalize" style={{ color: "var(--ds-text)" }}>
                {key}
              </span>
              <div className="h-6 flex-1 overflow-hidden rounded" style={{ backgroundColor: "var(--ds-surface)" }}>
                <div
                  className="flex h-full items-center justify-end pr-2 font-mono text-[10px]"
                  style={{
                    width: `${(value / maxBreakpoint) * 100}%`,
                    backgroundColor: "var(--ds-secondary)",
                    color: "var(--ds-secondary-contrast)",
                    borderRadius: "var(--ds-radius-sm)",
                  }}
                >
                  {value}px
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
