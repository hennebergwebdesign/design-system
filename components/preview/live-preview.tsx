"use client";

// Live-Preview: rendert Beispiel-UI, die vollständig aus den Design-Tokens
// gespeist wird. Mit Light/Dark-Toggle, responsivem Device-Selector zum
// Durchprüfen aller Bildschirmgrößen und einem Button, der die Vorschau in
// einem neuen Fenster öffnet.

import { useState } from "react";
import Link from "next/link";
import { ExternalLink, Monitor, Moon, Smartphone, Sun, Tablet, Laptop } from "lucide-react";
import type { DesignSystem, SectionKey } from "@/lib/design-system/types";
import { systemCssVars, type PreviewMode } from "./preview-vars";
import { ColorsPreview } from "./sections/colors-preview";
import { TypographyPreview } from "./sections/typography-preview";
import { LogoPreview } from "./sections/logo-preview";
import { SpacingPreview } from "./sections/spacing-preview";
import { EffectsPreview } from "./sections/effects-preview";
import { ComponentsPreview } from "./sections/components-preview";
import { FontLoader } from "./font-loader";
import { cn } from "@/lib/utils";

export interface DevicePreset {
  id: string;
  label: string;
  width: number;
  icon: typeof Monitor;
}

export const DEVICE_PRESETS: DevicePreset[] = [
  { id: "mobile", label: "Mobile (375)", width: 375, icon: Smartphone },
  { id: "tablet", label: "Tablet (768)", width: 768, icon: Tablet },
  { id: "laptop", label: "Laptop (1280)", width: 1280, icon: Laptop },
  { id: "desktop", label: "Desktop (1440)", width: 1440, icon: Monitor },
  { id: "full", label: "Fluid", width: 0, icon: Monitor },
];

export function LivePreview({
  system,
  section,
  projectId,
  standalone = false,
}: {
  system: DesignSystem;
  section: SectionKey;
  projectId?: string;
  standalone?: boolean;
}) {
  const [mode, setMode] = useState<PreviewMode>("light");
  const [device, setDevice] = useState<DevicePreset>(DEVICE_PRESETS[4]);

  function openInNewWindow() {
    if (!projectId) return;
    const url = `/preview?project=${encodeURIComponent(projectId)}&section=${encodeURIComponent(section)}`;
    window.open(url, `ds-preview-${projectId}`, "width=1440,height=900,noopener");
  }

  return (
    <div className="flex h-full flex-col">
      <FontLoader
        families={[system.typography.heading.family, system.typography.body.family]}
      />
      <div className="flex flex-wrap items-center gap-2 border-b px-4 py-2">
        <span className="text-sm font-medium text-muted-foreground">Live-Vorschau</span>

        <div className="ml-auto flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-0.5 rounded-lg bg-muted p-0.5" role="radiogroup" aria-label="Geräte-Vorschau">
            {DEVICE_PRESETS.map((d) => {
              const Icon = d.icon;
              const active = device.id === d.id;
              return (
                <button
                  key={d.id}
                  onClick={() => setDevice(d)}
                  aria-pressed={active}
                  title={d.label}
                  className={cn(
                    "flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium transition-colors",
                    active ? "bg-background shadow-sm" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <Icon className="size-3.5" />
                  {d.width > 0 ? d.width : "Fluid"}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-1 rounded-lg bg-muted p-0.5">
            {(["light", "dark"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                aria-label={m === "light" ? "Light Mode" : "Dark Mode"}
                className={cn(
                  "flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
                  mode === m ? "bg-background shadow-sm" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {m === "light" ? <Sun className="size-3.5" /> : <Moon className="size-3.5" />}
                {m === "light" ? "Light" : "Dark"}
              </button>
            ))}
          </div>

          {!standalone && projectId && (
            <button
              onClick={openInNewWindow}
              title="Vorschau in neuem Fenster öffnen"
              className="flex items-center gap-1 rounded-lg border bg-background px-2 py-1 text-[11px] font-medium hover:bg-muted"
            >
              <ExternalLink className="size-3.5" />
              Neues Fenster
            </button>
          )}
          {standalone && (
            <Link
              href="/"
              className="flex items-center gap-1 rounded-lg border bg-background px-2 py-1 text-[11px] font-medium hover:bg-muted"
            >
              Zurück zur Übersicht
            </Link>
          )}
        </div>
      </div>
      <div className="flex-1 overflow-auto bg-muted/30">
        <DeviceFrame width={device.width}>
          <div
            style={{
              ...systemCssVars(system, mode),
              backgroundColor: "var(--ds-bg)",
              color: "var(--ds-text)",
              fontFamily: "var(--ds-font-body)",
            }}
            className="min-h-full"
          >
            <PreviewContent system={system} section={section} mode={mode} />
          </div>
        </DeviceFrame>
      </div>
    </div>
  );
}

function DeviceFrame({ width, children }: { width: number; children: React.ReactNode }) {
  if (width === 0) {
    return <div className="min-h-full">{children}</div>;
  }
  return (
    <div className="flex min-h-full justify-center p-4">
      <div
        style={{ width, maxWidth: "100%" }}
        className="overflow-hidden rounded-lg border bg-background shadow-lg"
      >
        {children}
      </div>
    </div>
  );
}

// Rendert je nach aktivem Sidebar-Abschnitt die passende Vorschau.
function PreviewContent({
  system,
  section,
  mode,
}: {
  system: DesignSystem;
  section: SectionKey;
  mode: PreviewMode;
}) {
  const padded = section !== "components" && section !== "mixer" && section !== "generate";
  const content = renderSection(system, section, mode);
  if (padded) {
    return (
      <div className="p-6">
        <div className="mx-auto max-w-3xl">{content}</div>
      </div>
    );
  }
  return <>{content}</>;
}

function renderSection(system: DesignSystem, section: SectionKey, mode: PreviewMode) {
  switch (section) {
    case "colors":
      return <ColorsPreview system={system} mode={mode} />;
    case "typography":
      return <TypographyPreview system={system} />;
    case "logo":
      return <LogoPreview system={system} mode={mode} />;
    case "spacing":
      return <SpacingPreview system={system} />;
    case "effects":
      return <EffectsPreview system={system} />;
    case "components":
    case "mixer":
    case "generate":
      return <ComponentsPreview system={system} />;
    default:
      return (
        <div
          className="flex h-64 items-center justify-center text-sm"
          style={{ color: "var(--ds-text-muted)" }}
        >
          Die Vorschau für diesen Abschnitt folgt mit dem nächsten Modul.
        </div>
      );
  }
}
