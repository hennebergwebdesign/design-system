// Backup & Restore: sichert alle Projekte samt Komponenten-Auswahl in einer
// einzigen JSON-Datei. Da der Zustand sonst nur in localStorage (= Browser-
// Cache) liegt, überlebt ein solches Backup das Leeren des Caches.

import type { Project } from "./types";
import { useDesignStore } from "@/lib/store/design-store";
import { useComponentStore } from "@/lib/store/component-store";

export const BACKUP_VERSION = 1;

export interface DesignSystemBackup {
  /** Kennung zur Format-Erkennung beim Import */
  format: "design-system-studio-backup";
  version: number;
  exportedAt: string;
  activeProjectId: string | null;
  projects: Record<string, Project>;
  components: {
    selectedIds: string[];
    slotOverrides: Record<string, Record<string, string | number | boolean>>;
  };
}

/** Erstellt ein Backup-Objekt aus dem aktuellen Store-Zustand. */
export function buildBackup(): DesignSystemBackup {
  const design = useDesignStore.getState();
  const components = useComponentStore.getState();
  return {
    format: "design-system-studio-backup",
    version: BACKUP_VERSION,
    exportedAt: new Date().toISOString(),
    activeProjectId: design.activeProjectId,
    projects: design.projects,
    components: {
      selectedIds: components.selectedIds,
      slotOverrides: components.slotOverrides,
    },
  };
}

/** Serialisiert das aktuelle Backup als eingerückten JSON-String. */
export function serializeBackup(): string {
  return JSON.stringify(buildBackup(), null, 2);
}

export interface ParsedBackup {
  ok: boolean;
  error?: string;
  data?: DesignSystemBackup;
  projectCount?: number;
}

/** Prüft und parst einen Backup-String, ohne den Store zu verändern. */
export function parseBackup(raw: string): ParsedBackup {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return { ok: false, error: "Die Datei ist kein gültiges JSON." };
  }

  if (typeof parsed !== "object" || parsed === null) {
    return { ok: false, error: "Unerwartetes Dateiformat." };
  }

  const obj = parsed as Partial<DesignSystemBackup>;
  if (obj.format !== "design-system-studio-backup") {
    return {
      ok: false,
      error: "Diese Datei ist kein Design-System-Studio-Backup.",
    };
  }
  if (typeof obj.projects !== "object" || obj.projects === null) {
    return { ok: false, error: "Das Backup enthält keine Projekte." };
  }

  const projectCount = Object.keys(obj.projects).length;

  // Fehlende Komponenten-Auswahl ist unkritisch – wir ergänzen Defaults.
  const data: DesignSystemBackup = {
    format: "design-system-studio-backup",
    version: typeof obj.version === "number" ? obj.version : BACKUP_VERSION,
    exportedAt: obj.exportedAt ?? new Date().toISOString(),
    activeProjectId: obj.activeProjectId ?? null,
    projects: obj.projects as Record<string, Project>,
    components: {
      selectedIds: obj.components?.selectedIds ?? [],
      slotOverrides: obj.components?.slotOverrides ?? {},
    },
  };

  return { ok: true, data, projectCount };
}

/**
 * Schreibt ein geparstes Backup in die Stores. `merge=true` behält bestehende
 * Projekte und fügt die aus dem Backup hinzu; `merge=false` ersetzt alles.
 */
export function applyBackup(data: DesignSystemBackup, merge: boolean): void {
  useDesignStore
    .getState()
    .restoreProjects(data.projects, data.activeProjectId, merge);
  // Die Komponenten-Auswahl wird nur beim vollständigen Ersetzen übernommen,
  // damit ein Merge die aktuelle Arbeit nicht überschreibt.
  if (!merge) {
    useComponentStore
      .getState()
      .restoreSelection(
        data.components.selectedIds,
        data.components.slotOverrides,
      );
  }
}

/** Löst den Datei-Download eines Backups im Browser aus. */
export function downloadBackup(): void {
  const content = serializeBackup();
  const stamp = new Date().toISOString().slice(0, 10);
  const blob = new Blob([content], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `design-system-backup-${stamp}.json`;
  a.click();
  URL.revokeObjectURL(url);
}
