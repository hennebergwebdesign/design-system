"use client";

import { useMemo, useState } from "react";
import { Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { FONT_PAIRINGS } from "@/lib/design-system/knowledge/font-pairings";
import { fontPairingToTypography } from "@/lib/design-system/knowledge/adapters";
import { useDesignStore, useDesignSystem } from "@/lib/store/design-store";
import { computeTypeLevels } from "@/lib/design-system/derive";

const RESULT_LIMIT = 24;

export function TypographyLibraryTab() {
  const system = useDesignSystem();
  const update = useDesignStore((s) => s.update);
  const [query, setQuery] = useState("");
  const [applied, setApplied] = useState<string | null>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q
      ? FONT_PAIRINGS.filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.mood.toLowerCase().includes(q) ||
            p.bestFor.toLowerCase().includes(q) ||
            p.heading.toLowerCase().includes(q) ||
            p.body.toLowerCase().includes(q),
        )
      : FONT_PAIRINGS;
    return filtered.slice(0, RESULT_LIMIT);
  }, [query]);

  if (!system) return null;

  function apply(pairingId: string) {
    const pairing = FONT_PAIRINGS.find((p) => p.id === pairingId);
    if (!pairing) return;
    const { heading, body } = fontPairingToTypography(pairing);
    update((draft) => {
      draft.typography.heading = heading;
      draft.typography.body = body;
      draft.typography.levels = computeTypeLevels(draft.typography.baseSize, draft.typography.scaleRatio);
    });
    setApplied(pairingId);
    setTimeout(() => setApplied(null), 2000);
  }

  return (
    <div className="space-y-3">
      <Input
        placeholder="Suche nach Stimmung/Einsatz, z. B. „luxury“, „playful“, „dashboard“…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <p className="text-xs text-muted-foreground">
        {FONT_PAIRINGS.length} kuratierte Font-Pairings (ui-ux-pro-max) — zeige {results.length}.
      </p>
      <div className="space-y-2">
        {results.map((p) => (
          <button
            key={p.id}
            onClick={() => apply(p.id)}
            className={cn(
              "flex w-full items-start justify-between gap-3 rounded-lg border p-2.5 text-left transition-colors hover:bg-muted/50",
              applied === p.id && "border-green-500 bg-green-50 dark:bg-green-950/20",
            )}
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <p className="truncate text-xs font-medium">{p.name}</p>
                {applied === p.id && <Check className="size-3 shrink-0 text-green-600" />}
              </div>
              <p className="truncate text-[11px] text-muted-foreground">
                {p.heading} / {p.body}
              </p>
              <p className="mt-0.5 truncate text-[10px] text-muted-foreground/70">{p.mood}</p>
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
