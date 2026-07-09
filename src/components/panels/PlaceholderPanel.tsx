"use client";

import { Construction } from "lucide-react";
import type { EditorSection } from "@/lib/types";

const LABELS: Record<EditorSection, string> = {
  colors: "Colors",
  typography: "Typography",
  logo: "Logo & Branding",
  spacing: "Spacing & Layout",
  effects: "Effects",
  components: "Components",
  export: "Export",
};

/** Temporary stand-in for sections that are built in a later step. */
export function PlaceholderPanel({ section }: { section: EditorSection }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 p-8 text-center">
      <Construction className="text-muted-foreground size-8" />
      <p className="font-medium">{LABELS[section]}</p>
      <p className="text-muted-foreground text-sm">
        Dieser Abschnitt folgt im nächsten Ausbauschritt.
      </p>
    </div>
  );
}
