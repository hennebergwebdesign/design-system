"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { UX_GUIDELINES, UX_PRIORITY_CATEGORIES } from "@/lib/design-system/knowledge/ux-guidelines";

const RESULT_LIMIT = 30;

const SEVERITY_VARIANT: Record<string, "destructive" | "secondary" | "outline"> = {
  High: "destructive",
  Medium: "secondary",
  Low: "outline",
};

export function GuidelinesLibraryTab() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q
      ? UX_GUIDELINES.filter(
          (g) =>
            g.category.toLowerCase().includes(q) ||
            g.issue.toLowerCase().includes(q) ||
            g.description.toLowerCase().includes(q),
        )
      : UX_GUIDELINES;
    return filtered.slice(0, RESULT_LIMIT);
  }, [query]);

  return (
    <div className="space-y-4">
      <section className="space-y-2">
        <h3 className="text-[13px] font-medium tracking-wide text-muted-foreground uppercase">
          Regel-Kategorien nach Priorität
        </h3>
        <div className="space-y-1.5">
          {UX_PRIORITY_CATEGORIES.map((c) => (
            <div key={c.priority} className="rounded-lg border p-2.5">
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-medium">
                  {c.priority}. {c.category}
                </p>
                <Badge variant={c.impact === "CRITICAL" ? "destructive" : c.impact === "HIGH" ? "secondary" : "outline"}>
                  {c.impact}
                </Badge>
              </div>
              <p className="mt-1 text-[11px] text-muted-foreground">Muss: {c.mustHave}</p>
              <p className="text-[11px] text-muted-foreground/70">Vermeiden: {c.avoid}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-2">
        <h3 className="text-[13px] font-medium tracking-wide text-muted-foreground uppercase">
          Einzelregeln ({UX_GUIDELINES.length})
        </h3>
        <Input
          placeholder="Suche, z. B. „contrast“, „navigation“, „form“…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="space-y-2">
          {results.map((g) => (
            <div key={g.id} className="rounded-lg border p-2.5">
              <div className="flex items-start justify-between gap-2">
                <p className="text-xs font-medium">{g.issue}</p>
                <Badge variant={SEVERITY_VARIANT[g.severity] ?? "outline"}>{g.severity}</Badge>
              </div>
              <p className="mt-1 text-[11px] text-muted-foreground">{g.description}</p>
              <div className="mt-1.5 grid grid-cols-1 gap-1 text-[11px] sm:grid-cols-2">
                <p className="text-emerald-700 dark:text-emerald-400">✓ {g.doText}</p>
                <p className="text-red-700 dark:text-red-400">✗ {g.dontText}</p>
              </div>
            </div>
          ))}
          {results.length === 0 && (
            <p className="py-6 text-center text-xs text-muted-foreground">Keine Treffer.</p>
          )}
        </div>
      </section>
    </div>
  );
}
