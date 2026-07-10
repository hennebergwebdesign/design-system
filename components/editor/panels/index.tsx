"use client";

import type { SectionKey } from "@/lib/design-system/types";
import { PanelShell } from "./panel-shell";
import { ColorsPanel } from "./colors-panel";
import { TypographyPanel } from "./typography-panel";
import { LogoPanel } from "./logo-panel";
import { SpacingPanel } from "./spacing-panel";
import { EffectsPanel } from "./effects-panel";
import { ComponentsPanel } from "./components-panel";
import { ExportPanel } from "./export-panel";

export function renderPanel(section: SectionKey): React.ReactNode {
  switch (section) {
    case "colors":
      return <ColorsPanel />;
    case "typography":
      return <TypographyPanel />;
    case "logo":
      return <LogoPanel />;
    case "spacing":
      return <SpacingPanel />;
    case "effects":
      return <EffectsPanel />;
    case "components":
      return <ComponentsPanel />;
    case "export":
      return <ExportPanel />;
  }
}
