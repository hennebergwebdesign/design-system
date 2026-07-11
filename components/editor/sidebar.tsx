"use client";

import {
  Download,
  Grid3x3,
  ImageIcon,
  LayoutTemplate,
  Palette,
  Shuffle,
  Sparkles,
  Type,
  Wand2,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { SectionKey } from "@/lib/design-system/types";

const SECTIONS: { key: SectionKey; label: string; icon: LucideIcon; separator?: boolean }[] = [
  { key: "generate", label: "Generate", icon: Wand2 },
  { key: "colors", label: "Colors", icon: Palette, separator: true },
  { key: "typography", label: "Typography", icon: Type },
  { key: "logo", label: "Logo", icon: ImageIcon },
  { key: "spacing", label: "Spacing", icon: Grid3x3 },
  { key: "effects", label: "Effects", icon: Sparkles },
  { key: "components", label: "Components", icon: LayoutTemplate, separator: true },
  { key: "mixer", label: "Mixer", icon: Shuffle },
  { key: "export", label: "Export", icon: Download },
];

export function Sidebar({
  active,
  onSelect,
}: {
  active: SectionKey;
  onSelect: (section: SectionKey) => void;
}) {
  return (
    <nav className="flex w-48 shrink-0 flex-col gap-0.5 border-r bg-muted/30 p-3">
      {SECTIONS.map(({ key, label, icon: Icon, separator }) => (
        <div key={key}>
          {separator && <div className="my-1.5 border-t" />}
          <button
            onClick={() => onSelect(key)}
            className={cn(
              "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              active === key
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:bg-background/60 hover:text-foreground",
            )}
          >
            <Icon className="size-4" />
            {label}
          </button>
        </div>
      ))}
    </nav>
  );
}
