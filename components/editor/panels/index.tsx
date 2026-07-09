"use client";

import type { SectionKey } from "@/lib/design-system/types";
import { PanelShell } from "./panel-shell";
import { ColorsPanel } from "./colors-panel";
import { TypographyPanel } from "./typography-panel";
import { LogoPanel } from "./logo-panel";

// Die einzelnen Panels werden Modul für Modul ergänzt.
function PlaceholderPanel({ title }: { title: string }) {
  return (
    <PanelShell title={title} description="Dieses Modul folgt in Kürze.">
      <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
        Noch nicht implementiert
      </div>
    </PanelShell>
  );
}

export function renderPanel(section: SectionKey): React.ReactNode {
  switch (section) {
    case "colors":
      return <ColorsPanel />;
    case "typography":
      return <TypographyPanel />;
    case "logo":
      return <LogoPanel />;
    case "spacing":
      return <PlaceholderPanel title="Spacing & Layout" />;
    case "effects":
      return <PlaceholderPanel title="Effects" />;
    case "components":
      return <PlaceholderPanel title="Components" />;
    case "export":
      return <PlaceholderPanel title="Export" />;
  }
}
