"use client";

// Typografie-Vorschau: kompletter Type-Stack mit Beispieltext,
// Fließtext, Liste und Zitat.

import type { DesignSystem, TypeLevelKey } from "@/lib/design-system/types";
import { PHeading } from "../ui";

const HEADING_LEVELS: { key: TypeLevelKey; level: 1 | 2 | 3 | 4 | 5 | 6 }[] = [
  { key: "h1", level: 1 },
  { key: "h2", level: 2 },
  { key: "h3", level: 3 },
  { key: "h4", level: 4 },
  { key: "h5", level: 5 },
  { key: "h6", level: 6 },
];

const SAMPLE_HEADLINES: Record<string, string> = {
  h1: "Gestaltung beginnt mit System",
  h2: "Konsistenz auf jeder Seite",
  h3: "Farben, Schrift und Raum",
  h4: "Komponenten im Zusammenspiel",
  h5: "Details machen den Unterschied",
  h6: "Kleinste Überschrift",
};

function LevelMeta({ system, levelKey }: { system: DesignSystem; levelKey: TypeLevelKey }) {
  const level = system.typography.levels[levelKey];
  return (
    <p className="mb-1 font-mono text-[11px]" style={{ color: "var(--ds-text-muted)" }}>
      {levelKey.toUpperCase()} · {level.size}px / {level.lineHeight} · {level.weight}
      {level.letterSpacing !== 0 && ` · ${level.letterSpacing}em`}
    </p>
  );
}

export function TypographyPreview({ system }: { system: DesignSystem }) {
  const { typography } = system;
  const bodyLevel = typography.levels.body;
  const smallLevel = typography.levels.small;
  const captionLevel = typography.levels.caption;

  const bodyStyle = {
    fontFamily: "var(--ds-font-body)",
    fontSize: bodyLevel.size,
    lineHeight: bodyLevel.lineHeight,
    letterSpacing: `${bodyLevel.letterSpacing}em`,
    fontWeight: bodyLevel.weight,
  };

  return (
    <div className="space-y-10">
      <div
        className="rounded-lg border px-4 py-3 text-sm"
        style={{ borderColor: "var(--ds-border)", color: "var(--ds-text-muted)", fontFamily: "var(--ds-font-body)" }}
      >
        Headings: <strong style={{ color: "var(--ds-text)" }}>{typography.heading.family}</strong>
        {" · "}
        Body: <strong style={{ color: "var(--ds-text)" }}>{typography.body.family}</strong>
        {" · "}
        Scale: <strong style={{ color: "var(--ds-text)" }}>{typography.scaleRatio}</strong>
      </div>

      <section className="space-y-6">
        {HEADING_LEVELS.map(({ key, level }) => {
          const levelSettings = typography.levels[key];
          return (
            <div key={key}>
              <LevelMeta system={system} levelKey={key} />
              <PHeading
                level={level}
                size={levelSettings.size}
                lineHeight={levelSettings.lineHeight}
                letterSpacing={levelSettings.letterSpacing}
                weight={levelSettings.weight}
              >
                {SAMPLE_HEADLINES[key]}
              </PHeading>
            </div>
          );
        })}
      </section>

      <section>
        <LevelMeta system={system} levelKey="body" />
        <p style={bodyStyle}>
          Ein gutes Design System macht Gestaltungsentscheidungen wiederholbar.
          Statt jede Seite neu zu erfinden, greifen Teams auf definierte Farben,
          Schriftgrößen und Abstände zurück — und gewinnen damit Tempo und
          Konsistenz. Dieser Absatz zeigt den Fließtext mit der eingestellten
          Zeilenhöhe und Laufweite im realistischen Umfeld.
        </p>
        <p className="mt-4" style={bodyStyle}>
          Auch längere Textpassagen bleiben angenehm lesbar, wenn Zeilenhöhe und
          Kontrast stimmen. <strong>Hervorhebungen</strong> und{" "}
          <em>Betonungen</em> fügen sich nahtlos ein.
        </p>
      </section>

      <section>
        <p className="mb-2 font-mono text-[11px]" style={{ color: "var(--ds-text-muted)" }}>
          LISTE
        </p>
        <ul className="list-disc space-y-1 pl-6" style={bodyStyle}>
          <li>Definierte Farbskalen von 50 bis 950</li>
          <li>Typografie mit konsistenter Type-Scale</li>
          <li>Wiederverwendbare Komponenten</li>
        </ul>
        <ol className="mt-4 list-decimal space-y-1 pl-6" style={bodyStyle}>
          <li>Basisfarben festlegen</li>
          <li>Schriften wählen</li>
          <li>Exportieren und loslegen</li>
        </ol>
      </section>

      <section>
        <p className="mb-2 font-mono text-[11px]" style={{ color: "var(--ds-text-muted)" }}>
          ZITAT
        </p>
        <blockquote
          className="border-l-4 pl-4 italic"
          style={{
            ...bodyStyle,
            fontSize: bodyLevel.size * 1.15,
            borderColor: "var(--ds-primary)",
            color: "var(--ds-text-muted)",
          }}
        >
          „Design ist nicht nur, wie etwas aussieht und sich anfühlt. Design
          ist, wie es funktioniert.“
        </blockquote>
      </section>

      <section className="space-y-3">
        <div>
          <LevelMeta system={system} levelKey="small" />
          <p
            style={{
              fontFamily: "var(--ds-font-body)",
              fontSize: smallLevel.size,
              lineHeight: smallLevel.lineHeight,
              letterSpacing: `${smallLevel.letterSpacing}em`,
              fontWeight: smallLevel.weight,
            }}
          >
            Small — für sekundäre Angaben wie Metadaten oder Hilfetexte.
          </p>
        </div>
        <div>
          <LevelMeta system={system} levelKey="caption" />
          <p
            style={{
              fontFamily: "var(--ds-font-body)",
              fontSize: captionLevel.size,
              lineHeight: captionLevel.lineHeight,
              letterSpacing: `${captionLevel.letterSpacing}em`,
              fontWeight: captionLevel.weight,
              color: "var(--ds-text-muted)",
            }}
          >
            Caption — Bildunterschriften und Fußnoten.
          </p>
        </div>
      </section>
    </div>
  );
}
