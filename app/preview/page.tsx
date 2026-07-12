"use client";

// Standalone-Vorschau-Fenster: rendert die Live-Vorschau eines Projekts
// im ganzen Browser-Fenster – gedacht als Popup neben dem Editor, um Layouts
// auf realen Bildschirmgrößen zu prüfen.

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { LivePreview } from "@/components/preview/live-preview";
import { useDesignStore } from "@/lib/store/design-store";
import type { SectionKey } from "@/lib/design-system/types";

function PreviewView() {
  const searchParams = useSearchParams();
  const projectId = searchParams.get("project") ?? "";
  const section = (searchParams.get("section") ?? "mixer") as SectionKey;

  const hydrated = useDesignStore((s) => s.hydrated);
  const project = useDesignStore((s) => (projectId ? s.projects[projectId] ?? null : null));
  const setActiveProject = useDesignStore((s) => s.setActiveProject);

  useEffect(() => {
    if (hydrated && projectId) setActiveProject(projectId);
  }, [hydrated, projectId, setActiveProject]);

  if (!hydrated) {
    return (
      <div className="flex h-dvh items-center justify-center text-muted-foreground">
        Lade Projekt …
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex h-dvh flex-col items-center justify-center gap-3 text-center">
        <p className="text-muted-foreground">Projekt nicht gefunden.</p>
        <Link href="/" className="text-sm underline">
          Zur Übersicht
        </Link>
      </div>
    );
  }

  return (
    <div className="flex h-dvh flex-col">
      <header className="flex h-11 shrink-0 items-center gap-3 border-b px-4">
        <span className="text-sm font-semibold truncate">{project.name}</span>
        <span className="text-xs text-muted-foreground">Vorschau-Fenster</span>
      </header>
      <div className="flex-1 min-h-0">
        <LivePreview
          system={project.system}
          section={section}
          projectId={projectId}
          standalone
        />
      </div>
    </div>
  );
}

export default function PreviewPage() {
  return (
    <Suspense fallback={null}>
      <PreviewView />
    </Suspense>
  );
}
