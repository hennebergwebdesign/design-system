"use client";

// Editor-Shell: Topbar (Projektname, Undo/Redo, Reset), Sidebar-Navigation,
// Einstellungs-Panel und sticky Live-Preview.

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Redo2, RotateCcw, Undo2 } from "lucide-react";
import type { SectionKey } from "@/lib/design-system/types";
import {
  useDesignStore,
  useActiveProject,
  type ResettableSection,
} from "@/lib/store/design-store";
import { Sidebar } from "./sidebar";
import { LivePreview } from "@/components/preview/live-preview";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const RESETTABLE: Record<string, ResettableSection | undefined> = {
  colors: "colors",
  typography: "typography",
  logo: "logo",
  spacing: "spacing",
  effects: "effects",
};

export function EditorShell({
  projectId,
  renderPanel,
}: {
  projectId: string;
  renderPanel: (section: SectionKey) => React.ReactNode;
}) {
  const [section, setSection] = useState<SectionKey>("colors");
  const hydrated = useDesignStore((s) => s.hydrated);
  const setActiveProject = useDesignStore((s) => s.setActiveProject);
  const undo = useDesignStore((s) => s.undo);
  const redo = useDesignStore((s) => s.redo);
  const canUndo = useDesignStore((s) => s.past.length > 0);
  const canRedo = useDesignStore((s) => s.future.length > 0);
  const resetSection = useDesignStore((s) => s.resetSection);
  const project = useActiveProject();

  useEffect(() => {
    if (hydrated) setActiveProject(projectId);
  }, [hydrated, projectId, setActiveProject]);

  // Tastatur-Shortcuts: Cmd/Ctrl+Z = Undo, Cmd/Ctrl+Shift+Z = Redo
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!(e.metaKey || e.ctrlKey) || e.key.toLowerCase() !== "z") return;
      const target = e.target as HTMLElement;
      if (target.closest("input, textarea, [contenteditable]")) return;
      e.preventDefault();
      if (e.shiftKey) redo();
      else undo();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [undo, redo]);

  if (!hydrated) {
    return (
      <div className="flex flex-1 items-center justify-center text-muted-foreground">
        Lade Projekt …
      </div>
    );
  }

  if (!project || project.id !== projectId) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">Projekt nicht gefunden.</p>
        <Button variant="outline" nativeButton={false} render={<Link href="/" />}>
          <ArrowLeft /> Zur Übersicht
        </Button>
      </div>
    );
  }

  const resettable = RESETTABLE[section];

  return (
    <div className="flex h-dvh flex-col">
      <header className="flex h-13 shrink-0 items-center gap-3 border-b px-4">
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label="Zur Übersicht"
          nativeButton={false} render={<Link href="/" />}
        >
          <ArrowLeft />
        </Button>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">{project.name}</p>
        </div>
        <div className="ml-auto flex items-center gap-1">
          {resettable && (
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => resetSection(resettable)}
                  >
                    <RotateCcw /> Reset
                  </Button>
                }
              />
              <TooltipContent>Abschnitt auf Defaults zurücksetzen</TooltipContent>
            </Tooltip>
          )}
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Rückgängig"
            disabled={!canUndo}
            onClick={undo}
          >
            <Undo2 />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Wiederherstellen"
            disabled={!canRedo}
            onClick={redo}
          >
            <Redo2 />
          </Button>
        </div>
      </header>

      <div className="flex min-h-0 flex-1">
        <Sidebar active={section} onSelect={setSection} />
        <div className="w-[380px] shrink-0 overflow-y-auto border-r p-5">
          {renderPanel(section)}
        </div>
        <div className="min-w-0 flex-1 bg-muted/20">
          <LivePreview system={project.system} section={section} />
        </div>
      </div>
    </div>
  );
}
