"use client";

import {
  Download,
  Grid3x3,
  ImageIcon,
  LayoutTemplate,
  Palette,
  Sparkles,
  Type,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { SectionKey } from "@/lib/design-system/types";

const SECTIONS: { key: SectionKey; label: string; icon: LucideIcon }[] = [
  { key: "colors", label: "Colors", icon: Palette },
  { key: "typography", label: "Typography", icon: Type },
  { key: "logo", label: "Logo", icon: ImageIcon },
  { key: "spacing", label: "Spacing", icon: Grid3x3 },
  { key: "effects", label: "Effects", icon: Sparkles },
  { key: "components", label: "Components", icon: LayoutTemplate },
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
      {SECTIONS.map(({ key, label, icon: Icon }) => (
        <button
          key={key}
          onClick={() => onSelect(key)}
          className={cn(
            "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
            active === key
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:bg-background/60 hover:text-foreground",
          )}
        >
          <Icon className="size-4" />
          {label}
        </button>
      ))}
    </nav>
  );
}
