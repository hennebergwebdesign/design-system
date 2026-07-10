"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Lightbulb,
  Plus,
  Trash2,
  GripVertical,
} from "lucide-react";
import { PanelShell, PanelGroup } from "./panel-shell";
import {
  CATEGORIES_ORDERED,
  CATEGORY_META,
  CONVERSION_COMPONENTS,
  getComponentsByCategory,
  type ConversionCategory,
  type ConversionComponentDef,
} from "@/lib/design-system/conversion-components";
import { useComponentStore } from "@/lib/store/component-store";
import { cn } from "@/lib/utils";

export function ComponentsPanel() {
  const [expandedCat, setExpandedCat] = useState<ConversionCategory | null>("hero");
  const { selectedIds, addComponent, removeComponent } = useComponentStore();

  return (
    <PanelShell
      title="Conversion-Komponenten"
      description="Wählen Sie optimierte Sektionen für Ihre Seite. Jede Komponente enthält forschungsbasierte Conversion-Tipps."
    >
      <PanelGroup label="Seitenaufbau">
        <SelectedList />
      </PanelGroup>

      <PanelGroup label="Komponenten-Katalog">
        <div className="space-y-1">
          {CATEGORIES_ORDERED.map((cat) => {
            const meta = CATEGORY_META[cat];
            const items = getComponentsByCategory(cat);
            const open = expandedCat === cat;
            return (
              <div key={cat}>
                <button
                  onClick={() => setExpandedCat(open ? null : cat)}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors hover:bg-muted"
                >
                  {open ? (
                    <ChevronDown className="size-3.5 shrink-0" />
                  ) : (
                    <ChevronRight className="size-3.5 shrink-0" />
                  )}
                  <span className="flex-1">{meta.label}</span>
                  <span className="text-xs text-muted-foreground">
                    {items.length}
                  </span>
                </button>
                {open && (
                  <div className="ml-3 space-y-1 border-l pl-3 pt-1">
                    {items.map((comp) => (
                      <ComponentCard
                        key={comp.id}
                        comp={comp}
                        selected={selectedIds.includes(comp.id)}
                        onAdd={() => addComponent(comp.id)}
                        onRemove={() => removeComponent(comp.id)}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </PanelGroup>
    </PanelShell>
  );
}

function ComponentCard({
  comp,
  selected,
  onAdd,
  onRemove,
}: {
  comp: ConversionComponentDef;
  selected: boolean;
  onAdd: () => void;
  onRemove: () => void;
}) {
  const [showTip, setShowTip] = useState(false);

  return (
    <div
      className={cn(
        "rounded-lg border p-3 text-sm transition-colors",
        selected
          ? "border-primary/40 bg-primary/5"
          : "border-transparent hover:border-border hover:bg-muted/50",
      )}
    >
      <div className="flex items-start gap-2">
        <div className="flex-1 min-w-0">
          <p className="font-medium leading-tight">{comp.name}</p>
          <p className="mt-0.5 text-xs text-muted-foreground leading-snug">
            {comp.description}
          </p>
        </div>
        <button
          onClick={selected ? onRemove : onAdd}
          className={cn(
            "shrink-0 rounded-md p-1.5 transition-colors",
            selected
              ? "text-destructive hover:bg-destructive/10"
              : "text-primary hover:bg-primary/10",
          )}
          title={selected ? "Entfernen" : "Hinzufügen"}
        >
          {selected ? <Trash2 className="size-3.5" /> : <Plus className="size-3.5" />}
        </button>
      </div>
      <button
        onClick={() => setShowTip(!showTip)}
        className="mt-1.5 flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400 hover:underline"
      >
        <Lightbulb className="size-3" />
        Conversion-Tipp
      </button>
      {showTip && (
        <p className="mt-1 rounded-md bg-amber-50 dark:bg-amber-950/30 p-2 text-xs text-amber-800 dark:text-amber-200 leading-snug">
          {comp.conversionTip}
        </p>
      )}
    </div>
  );
}

function SelectedList() {
  const { selectedIds, removeComponent, moveComponent } = useComponentStore();

  if (selectedIds.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
        Noch keine Komponenten ausgewählt. Fügen Sie Sektionen aus dem Katalog
        unten hinzu, um Ihren Seitenaufbau zu definieren.
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {selectedIds.map((id, index) => {
        const comp = CONVERSION_COMPONENTS.find((c) => c.id === id);
        if (!comp) return null;
        const catMeta = CATEGORY_META[comp.category];
        return (
          <div
            key={`${id}-${index}`}
            className="flex items-center gap-2 rounded-lg border bg-background px-2 py-1.5 text-sm"
          >
            <GripVertical className="size-3.5 shrink-0 text-muted-foreground" />
            <div className="flex-1 min-w-0">
              <span className="font-medium">{comp.name}</span>
              <span className="ml-1.5 text-xs text-muted-foreground">
                {catMeta.label}
              </span>
            </div>
            <div className="flex items-center gap-0.5">
              <button
                onClick={() => moveComponent(index, index - 1)}
                disabled={index === 0}
                className="rounded p-1 text-muted-foreground hover:text-foreground disabled:opacity-30"
                title="Nach oben"
              >
                ↑
              </button>
              <button
                onClick={() => moveComponent(index, index + 1)}
                disabled={index === selectedIds.length - 1}
                className="rounded p-1 text-muted-foreground hover:text-foreground disabled:opacity-30"
                title="Nach unten"
              >
                ↓
              </button>
              <button
                onClick={() => removeComponent(id)}
                className="rounded p-1 text-destructive/70 hover:text-destructive"
                title="Entfernen"
              >
                <Trash2 className="size-3" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
