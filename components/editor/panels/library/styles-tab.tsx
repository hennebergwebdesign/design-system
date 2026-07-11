"use client";

import { useMemo, useState } from "react";
import { Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { STYLE_LIBRARY } from "@/lib/design-system/knowledge/style-library";
import { styleToEffects } from "@/lib/design-system/knowledge/adapters";
import { useDesignStore } from "@/lib/store/design-store";

const RESULT_LIMIT = 24;

export function StylesLibraryTab() {
  const update = useDesignStore((s) => s.update);
  const [query, setQuery] = useState("");
  const [applied, setApplied] = useState<string | null>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q
      ? STYLE_LIBRARY.filter(
          (s) =>
            s.name.toLowerCase().includes(q) ||
            s.keywords.toLowerCase().includes(q) ||
            s.bestFor.toLowerCase().includes(q),
        )
      : STYLE_LIBRARY;
    return filtered.slice(0, RESULT_LIMIT);
  }, [query]);

  function apply(styleId: string) {
    const style = STYLE_LIBRARY.find((s) => s.id === styleId);
    if (!style) return;
    const effects = styleToEffects(style);
    update((draft) => {
      draft.effects.radius = effects.radius;
      draft.effects.borderWidth = effects.borderWidth;
      draft.effects.iconStyle = effects.iconStyle;
    });
    setApplied(styleId);
    setTimeout(() => setApplied(null), 2000);
  }

  return (
    <div className="space-y-3">
      <Input
        placeholder="Suche nach Stil, z. B. „glassmorphism“, „brutalism“, „minimal“…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <p className="text-xs text-muted-foreground">
        {STYLE_LIBRARY.length} UI-Stile (ui-ux-pro-max) — zeige {results.length}. Wendet Radius/Border/Icon-Stil an.
      </p>
      <div className="space-y-2">
        {results.map((s) => (
          <button
            key={s.id}
            onClick={() => apply(s.id)}
            className={cn(
              "flex w-full items-start justify-between gap-3 rounded-lg border p-2.5 text-left transition-colors hover:bg-muted/50",
              applied === s.id && "border-green-500 bg-green-50 dark:bg-green-950/20",
            )}
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <p className="truncate text-xs font-medium">{s.name}</p>
                {applied === s.id && <Check className="size-3 shrink-0 text-green-600" />}
              </div>
              <p className="truncate text-[11px] text-muted-foreground">{s.bestFor}</p>
              <p className="mt-0.5 truncate text-[10px] text-muted-foreground/70">{s.accessibility} · {s.complexity}</p>
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
