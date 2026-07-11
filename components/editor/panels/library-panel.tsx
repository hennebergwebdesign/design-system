"use client";

import { useState } from "react";
import { PanelShell } from "./panel-shell";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ColorsLibraryTab } from "./library/colors-tab";
import { TypographyLibraryTab } from "./library/typography-tab";
import { StylesLibraryTab } from "./library/styles-tab";
import { GuidelinesLibraryTab } from "./library/guidelines-tab";
import { BrandLibraryTab } from "./library/brand-tab";

type LibraryTab = "colors" | "typography" | "styles" | "guidelines" | "brand";

export function LibraryPanel() {
  const [tab, setTab] = useState<LibraryTab>("colors");

  return (
    <PanelShell
      title="Library"
      description="Kuratierte Design-Wissensdatenbank (ui-ux-pro-max Skill) — Farbpaletten, Font-Pairings, Stile und UX-Guidelines direkt anwendbar."
    >
      <Tabs value={tab} onValueChange={(v) => setTab(v as LibraryTab)}>
        <TabsList className="w-full flex-wrap">
          <TabsTrigger value="colors" className="flex-1">Farben</TabsTrigger>
          <TabsTrigger value="typography" className="flex-1">Typografie</TabsTrigger>
          <TabsTrigger value="styles" className="flex-1">Stile</TabsTrigger>
          <TabsTrigger value="guidelines" className="flex-1">UX</TabsTrigger>
          <TabsTrigger value="brand" className="flex-1">Marke</TabsTrigger>
        </TabsList>
      </Tabs>

      {tab === "colors" && <ColorsLibraryTab />}
      {tab === "typography" && <TypographyLibraryTab />}
      {tab === "styles" && <StylesLibraryTab />}
      {tab === "guidelines" && <GuidelinesLibraryTab />}
      {tab === "brand" && <BrandLibraryTab />}
    </PanelShell>
  );
}
