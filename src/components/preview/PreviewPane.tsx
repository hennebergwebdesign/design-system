"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SCALE_STEPS } from "@/lib/color";
import { useActiveProject, useDesignSystemStore } from "@/lib/store";
import { resolveTokens } from "@/lib/tokens";
import {
  AlertsPreview,
  BadgesPreview,
  ButtonsPreview,
  LinksPreview,
  PreviewSection,
} from "./ColorPreview";

function ScaleRow({
  label,
  scale,
}: {
  label: string;
  scale: Record<(typeof SCALE_STEPS)[number], string>;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-24 shrink-0 text-xs font-medium opacity-70">{label}</span>
      <div className="flex flex-1 overflow-hidden rounded-md">
        {SCALE_STEPS.map((step) => (
          <div
            key={step}
            className="h-7 flex-1"
            style={{ backgroundColor: scale[step] }}
            title={`${label}-${step}: ${scale[step]}`}
          />
        ))}
      </div>
    </div>
  );
}

export function PreviewPane() {
  const project = useActiveProject();
  const mode = useDesignSystemStore((s) => s.previewMode);
  const setPreviewMode = useDesignSystemStore((s) => s.setPreviewMode);

  if (!project) return null;
  const system = project.system;
  const tokens = resolveTokens(system, mode);

  return (
    <div className="flex min-h-full flex-col">
      {/* Sticky preview header */}
      <div className="bg-background/80 sticky top-0 z-10 flex items-center justify-between border-b px-6 py-3 backdrop-blur">
        <div>
          <h2 className="text-sm font-semibold">Live Preview</h2>
          <p className="text-muted-foreground text-xs">
            Aktualisiert sich in Echtzeit mit deinen Tokens
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPreviewMode(mode === "light" ? "dark" : "light")}
        >
          {mode === "light" ? <Sun /> : <Moon />}
          {mode === "light" ? "Light Mode" : "Dark Mode"}
        </Button>
      </div>

      {/* Themed preview canvas */}
      <div
        className="flex-1 transition-colors"
        style={{ backgroundColor: tokens.background, color: tokens.text }}
      >
        <div className="mx-auto flex max-w-3xl flex-col gap-10 px-8 py-10">
          <PreviewSection title="Farbskalen">
            <div className="flex flex-col gap-2">
              <ScaleRow label="Primary" scale={tokens.primaryScale} />
              <ScaleRow label="Secondary" scale={tokens.secondaryScale} />
              <ScaleRow label="Accent" scale={tokens.accentScale} />
              <ScaleRow label="Neutral" scale={tokens.neutralScale} />
            </div>
          </PreviewSection>

          <PreviewSection title="Buttons">
            <ButtonsPreview tokens={tokens} system={system} />
          </PreviewSection>

          <PreviewSection title="Badges">
            <BadgesPreview tokens={tokens} system={system} />
          </PreviewSection>

          <PreviewSection title="Alerts">
            <AlertsPreview tokens={tokens} system={system} />
          </PreviewSection>

          <PreviewSection title="Links">
            <LinksPreview tokens={tokens} system={system} />
          </PreviewSection>
        </div>
      </div>
    </div>
  );
}
