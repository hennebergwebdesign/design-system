"use client";

import { useState } from "react";
import {
  Globe,
  GripVertical,
  LayoutGrid,
  LayoutTemplate,
  MonitorSmartphone,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { PanelShell, PanelGroup } from "./panel-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  CATEGORIES,
  CATEGORY_META,
  COMPONENT_VARIANTS,
  type ComponentCategory,
  type ComponentVariant,
} from "@/lib/design-system/components-library";
import { usePagesStore } from "@/lib/store/pages-store";
import { useDesignStore } from "@/lib/store/design-store";
import { cn } from "@/lib/utils";

export function ComponentsPanel() {
  const activeProjectId = useDesignStore((s) => s.activeProjectId);
  const [view, setView] = useState<"library" | "pages">("pages");
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState<ComponentCategory | null>(null);

  if (!activeProjectId) return null;

  return (
    <PanelShell
      title="Components"
      description="Sektionen wählen und Seiten zusammenstellen – wie bei Relume."
    >
      <div className="flex gap-1 rounded-lg bg-muted p-0.5">
        <button
          onClick={() => setView("pages")}
          className={cn(
            "flex flex-1 items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
            view === "pages" ? "bg-background shadow-sm" : "text-muted-foreground hover:text-foreground",
          )}
        >
          <Globe className="size-3.5" /> Seiten
        </button>
        <button
          onClick={() => setView("library")}
          className={cn(
            "flex flex-1 items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
            view === "library" ? "bg-background shadow-sm" : "text-muted-foreground hover:text-foreground",
          )}
        >
          <LayoutGrid className="size-3.5" /> Bibliothek
        </button>
      </div>

      {view === "library" ? (
        <LibraryView
          search={search}
          setSearch={setSearch}
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
          projectId={activeProjectId}
        />
      ) : (
        <PagesView projectId={activeProjectId} onSwitchToLibrary={() => setView("library")} />
      )}
    </PanelShell>
  );
}

function PagesView({ projectId, onSwitchToLibrary }: { projectId: string; onSwitchToLibrary: () => void }) {
  const pages = usePagesStore((s) => s.getPages(projectId));
  const activePage = usePagesStore((s) => s.getActivePage(projectId));
  const addPage = usePagesStore((s) => s.addPage);
  const deletePage = usePagesStore((s) => s.deletePage);
  const setActivePage = usePagesStore((s) => s.setActivePage);
  const removeSection = usePagesStore((s) => s.removeSection);
  const moveSection = usePagesStore((s) => s.moveSection);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="flex flex-1 flex-wrap gap-1">
          {pages.map((p) => (
            <button
              key={p.id}
              onClick={() => setActivePage(projectId, p.id)}
              className={cn(
                "rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
                activePage?.id === p.id
                  ? "bg-foreground text-background"
                  : "bg-muted text-muted-foreground hover:text-foreground",
              )}
            >
              {p.name}
            </button>
          ))}
        </div>
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label="Seite hinzufügen"
          onClick={() => addPage(projectId, `Seite ${pages.length + 1}`)}
        >
          <Plus />
        </Button>
      </div>

      {activePage ? (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium">{activePage.name}</h4>
            {pages.length > 1 && (
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label="Seite löschen"
                onClick={() => deletePage(projectId, activePage.id)}
              >
                <Trash2 className="size-3.5" />
              </Button>
            )}
          </div>

          {activePage.sections.length === 0 ? (
            <div className="rounded-lg border border-dashed p-6 text-center">
              <LayoutTemplate className="mx-auto size-8 text-muted-foreground" />
              <p className="mt-2 text-sm text-muted-foreground">
                Noch keine Sektionen. Füge welche aus der Bibliothek hinzu.
              </p>
              <Button variant="outline" size="sm" className="mt-3" onClick={onSwitchToLibrary}>
                <Plus className="size-3.5" /> Sektion hinzufügen
              </Button>
            </div>
          ) : (
            <div className="space-y-1">
              {activePage.sections.map((sec, i) => (
                <div
                  key={sec.instanceId}
                  className="flex items-center gap-2 rounded-md border bg-background px-3 py-2"
                >
                  <GripVertical className="size-3.5 shrink-0 text-muted-foreground" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-medium">{sec.variant.name}</p>
                    <p className="truncate text-[11px] text-muted-foreground">{sec.variant.description}</p>
                  </div>
                  <div className="flex shrink-0 gap-0.5">
                    {i > 0 && (
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label="Nach oben"
                        onClick={() => moveSection(projectId, activePage.id, i, i - 1)}
                      >
                        ↑
                      </Button>
                    )}
                    {i < activePage.sections.length - 1 && (
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label="Nach unten"
                        onClick={() => moveSection(projectId, activePage.id, i, i + 1)}
                      >
                        ↓
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      aria-label="Entfernen"
                      onClick={() => removeSection(projectId, activePage.id, sec.instanceId)}
                    >
                      <X className="size-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
              <Button variant="outline" size="sm" className="mt-2 w-full" onClick={onSwitchToLibrary}>
                <Plus className="size-3.5" /> Weitere Sektion
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center">
          <Button variant="outline" size="sm" onClick={() => addPage(projectId, "Homepage")}>
            <Plus className="size-3.5" /> Erste Seite erstellen
          </Button>
        </div>
      )}
    </div>
  );
}

function LibraryView({
  search,
  setSearch,
  filterCategory,
  setFilterCategory,
  projectId,
}: {
  search: string;
  setSearch: (s: string) => void;
  filterCategory: ComponentCategory | null;
  setFilterCategory: (c: ComponentCategory | null) => void;
  projectId: string;
}) {
  const activePage = usePagesStore((s) => s.getActivePage(projectId));
  const addSection = usePagesStore((s) => s.addSection);
  const addPage = usePagesStore((s) => s.addPage);

  const filteredVariants = COMPONENT_VARIANTS.filter((v) => {
    if (filterCategory && v.category !== filterCategory) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        v.name.toLowerCase().includes(q) ||
        v.description.toLowerCase().includes(q) ||
        v.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  function handleAdd(variant: ComponentVariant) {
    let pageId = activePage?.id;
    if (!pageId) {
      pageId = addPage(projectId, "Homepage");
    }
    addSection(projectId, pageId, variant);
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Sektion suchen…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-8 text-sm"
        />
      </div>

      <div className="flex flex-wrap gap-1">
        <button
          onClick={() => setFilterCategory(null)}
          className={cn(
            "rounded-full px-2.5 py-0.5 text-[11px] font-medium transition-colors",
            !filterCategory ? "bg-foreground text-background" : "bg-muted text-muted-foreground hover:text-foreground",
          )}
        >
          Alle
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat === filterCategory ? null : cat)}
            className={cn(
              "rounded-full px-2.5 py-0.5 text-[11px] font-medium transition-colors",
              cat === filterCategory
                ? "bg-foreground text-background"
                : "bg-muted text-muted-foreground hover:text-foreground",
            )}
          >
            {CATEGORY_META[cat].label}
          </button>
        ))}
      </div>

      <div className="space-y-1.5">
        {filteredVariants.map((v) => (
          <div
            key={v.id}
            className="group flex items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/50"
          >
            <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
              <LayoutTemplate className="size-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium">{v.name}</p>
              <p className="truncate text-[11px] text-muted-foreground">{v.description}</p>
            </div>
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label={`${v.name} hinzufügen`}
              className="opacity-0 transition-opacity group-hover:opacity-100"
              onClick={() => handleAdd(v)}
            >
              <Plus className="size-4" />
            </Button>
          </div>
        ))}
        {filteredVariants.length === 0 && (
          <p className="py-4 text-center text-sm text-muted-foreground">
            Keine Sektionen gefunden.
          </p>
        )}
      </div>
    </div>
  );
}
