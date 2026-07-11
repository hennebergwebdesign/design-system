"use client";

import { useMemo, useState } from "react";
import { Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { COLOR_PALETTES } from "@/lib/design-system/knowledge/color-palettes";
import { paletteToColors } from "@/lib/design-system/knowledge/adapters";
import { useDesignStore } from "@/lib/store/design-store";

const RESULT_LIMIT = 24;

export function ColorsLibraryTab() {
  const update = useDesignStore((s) => s.update);
  const [query, setQuery] = useState("");
  const [applied, setApplied] = useState<string | null>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q
      ? COLOR_PALETTES.filter(
          (p) => p.productType.toLowerCase().includes(q) || p.notes.toLowerCase().includes(q),
        )
      : COLOR_PALETTES;
    return filtered.slice(0, RESULT_LIMIT);
  }, [query]);

  function apply(paletteId: string) {
    const palette = COLOR_PALETTES.find((p) => p.id === paletteId);
    if (!palette) return;
    const colors = paletteToColors(palette);
    update((draft) => {
      draft.colors = colors;
    });
    setApplied(paletteId);
    setTimeout(() => setApplied(null), 2000);
  }

  return (
    <div className="space-y-3">
      <Input
        placeholder="Suche nach Branche, z. B. „fintech“, „healthcare“, „e-commerce“…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <p className="text-xs text-muted-foreground">
        {COLOR_PALETTES.length} kuratierte Paletten (ui-ux-pro-max) — zeige {results.length}.
      </p>
      <div className="space-y-2">
        {results.map((p) => (
          <button
            key={p.id}
            onClick={() => apply(p.id)}
            className={cn(
              "flex w-full items-start gap-3 rounded-lg border p-2.5 text-left transition-colors hover:bg-muted/50",
              applied === p.id && "border-green-500 bg-green-50 dark:bg-green-950/20",
            )}
          >
            <div className="flex shrink-0 gap-0.5 pt-0.5">
              {[p.primary, p.secondary, p.accent, p.background].map((col, i) => (
                <div key={i} className="size-4 rounded-full border border-black/10" style={{ backgroundColor: col }} />
              ))}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <p className="truncate text-xs font-medium">{p.productType}</p>
                {applied === p.id && <Check className="size-3 shrink-0 text-green-600" />}
              </div>
              <p className="truncate text-[11px] text-muted-foreground">{p.notes}</p>
            </div>
          </button>
        ))}
        {results.length === 0 && (
          <p className="py-6 text-center text-xs text-muted-foreground">Keine Treffer.</p>
        )}
      </div>
    </div>
  );
}
