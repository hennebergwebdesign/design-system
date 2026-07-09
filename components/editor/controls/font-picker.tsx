"use client";

// Font-Auswahl mit Suche/Filter über die kuratierte Google-Fonts-Liste.

import { useMemo, useState } from "react";
import { Check, ChevronsUpDown, Search } from "lucide-react";
import { GOOGLE_FONTS, type GoogleFont } from "@/lib/design-system/fonts";
import { loadGoogleFont } from "@/components/preview/font-loader";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const CATEGORY_LABELS: Record<string, string> = {
  "sans-serif": "Sans",
  serif: "Serif",
  monospace: "Mono",
  cursive: "Cursive",
};

export function FontPicker({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (font: GoogleFont) => void;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return GOOGLE_FONTS.filter(
      (font) =>
        (!q || font.family.toLowerCase().includes(q)) &&
        (!category || font.category === category),
    );
  }, [query, category]);

  return (
    <div>
      <p className="mb-1.5 text-sm font-medium">{label}</p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          render={
            <button
              type="button"
              className="flex h-9 w-full items-center justify-between rounded-lg border bg-background px-3 text-sm shadow-xs hover:bg-muted/50"
            >
              <span>{value}</span>
              <ChevronsUpDown className="size-3.5 text-muted-foreground" />
            </button>
          }
        />
        <PopoverContent className="w-72 p-0" align="start">
          <div className="border-b p-2">
            <div className="relative">
              <Search className="absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input
                autoFocus
                className="h-8 pl-8 text-sm"
                placeholder="Schriftart suchen …"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div className="mt-2 flex gap-1">
              {[null, "sans-serif", "serif", "monospace"].map((cat) => (
                <button
                  key={cat ?? "all"}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={cn(
                    "rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
                    category === cat
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:text-foreground",
                  )}
                >
                  {cat ? CATEGORY_LABELS[cat] : "Alle"}
                </button>
              ))}
            </div>
          </div>
          <div className="max-h-64 overflow-y-auto p-1">
            {filtered.length === 0 && (
              <p className="p-3 text-center text-sm text-muted-foreground">
                Keine Treffer
              </p>
            )}
            {filtered.map((font) => (
              <button
                key={font.family}
                type="button"
                onClick={() => {
                  loadGoogleFont(font.family);
                  onChange(font);
                  setOpen(false);
                }}
                className="flex w-full items-center justify-between rounded-md px-2.5 py-1.5 text-left text-sm hover:bg-muted"
              >
                <span className="flex items-center gap-2">
                  {font.family}
                  {font.family === value && <Check className="size-3.5 text-primary" />}
                </span>
                <span className="text-xs text-muted-foreground">
                  {CATEGORY_LABELS[font.category]}
                </span>
              </button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
