"use client";

// Zentraler Store: verwaltet alle Projekte, das aktive Design System,
// Undo/Redo und die Persistenz in localStorage.

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { DesignSystem, Project } from "@/lib/design-system/types";
import {
  createDefaultSystem,
  defaultColors,
  defaultTypography,
  defaultLogo,
  defaultSpacing,
  defaultBreakpoints,
  defaultGrid,
  defaultEffects,
} from "@/lib/design-system/defaults";

const HISTORY_LIMIT = 50;

export type ResettableSection =
  | "colors" | "typography" | "logo" | "spacing" | "effects";

interface DesignStore {
  projects: Record<string, Project>;
  activeProjectId: string | null;
  /** true sobald der Store aus localStorage geladen wurde */
  hydrated: boolean;

  // Undo/Redo-Verlauf für das aktive Projekt (nicht persistiert)
  past: DesignSystem[];
  future: DesignSystem[];

  createProject: (name: string) => string;
  deleteProject: (id: string) => void;
  renameProject: (id: string, name: string) => void;
  duplicateProject: (id: string) => string | null;
  setActiveProject: (id: string | null) => void;

  setHydrated: () => void;

  /** Ändert das aktive Design System und legt einen Undo-Schritt an. */
  update: (mutate: (draft: DesignSystem) => void) => void;
  resetSection: (section: ResettableSection) => void;
  undo: () => void;
  redo: () => void;
}

function newId(): string {
  return Math.random().toString(36).slice(2, 10);
}

export const useDesignStore = create<DesignStore>()(
  persist(
    (set, get) => ({
      projects: {},
      activeProjectId: null,
      hydrated: false,
      past: [],
      future: [],

      setHydrated: () => set({ hydrated: true }),

      createProject: (name) => {
        const id = newId();
        const project: Project = {
          id,
          name: name.trim() || "Unbenanntes Projekt",
          updatedAt: Date.now(),
          system: createDefaultSystem(),
        };
        set((s) => ({
          projects: { ...s.projects, [id]: project },
          activeProjectId: id,
          past: [],
          future: [],
        }));
        return id;
      },

      deleteProject: (id) => {
        set((s) => {
          const projects = { ...s.projects };
          delete projects[id];
          return {
            projects,
            activeProjectId: s.activeProjectId === id ? null : s.activeProjectId,
          };
        });
      },

      renameProject: (id, name) => {
        set((s) => {
          const project = s.projects[id];
          if (!project) return s;
          return {
            projects: {
              ...s.projects,
              [id]: { ...project, name: name.trim() || project.name, updatedAt: Date.now() },
            },
          };
        });
      },

      duplicateProject: (id) => {
        const source = get().projects[id];
        if (!source) return null;
        const newProjectId = newId();
        const copy: Project = {
          id: newProjectId,
          name: `${source.name} (Kopie)`,
          updatedAt: Date.now(),
          system: structuredClone(source.system),
        };
        set((s) => ({ projects: { ...s.projects, [newProjectId]: copy } }));
        return newProjectId;
      },

      setActiveProject: (id) => {
        set({ activeProjectId: id, past: [], future: [] });
      },

      update: (mutate) => {
        const { activeProjectId, projects, past } = get();
        if (!activeProjectId) return;
        const project = projects[activeProjectId];
        if (!project) return;
        const draft = structuredClone(project.system);
        mutate(draft);
        set({
          projects: {
            ...projects,
            [activeProjectId]: { ...project, system: draft, updatedAt: Date.now() },
          },
          past: [...past.slice(-(HISTORY_LIMIT - 1)), project.system],
          future: [],
        });
      },

      resetSection: (section) => {
        get().update((draft) => {
          switch (section) {
            case "colors":
              draft.colors = structuredClone(defaultColors);
              break;
            case "typography":
              draft.typography = structuredClone(defaultTypography);
              break;
            case "logo":
              draft.logo = structuredClone(defaultLogo);
              break;
            case "spacing":
              draft.spacing = structuredClone(defaultSpacing);
              draft.breakpoints = structuredClone(defaultBreakpoints);
              draft.grid = structuredClone(defaultGrid);
              break;
            case "effects":
              draft.effects = structuredClone(defaultEffects);
              break;
          }
        });
      },

      undo: () => {
        const { activeProjectId, projects, past, future } = get();
        if (!activeProjectId || past.length === 0) return;
        const project = projects[activeProjectId];
        if (!project) return;
        const previous = past[past.length - 1];
        set({
          projects: {
            ...projects,
            [activeProjectId]: { ...project, system: previous, updatedAt: Date.now() },
          },
          past: past.slice(0, -1),
          future: [project.system, ...future],
        });
      },

      redo: () => {
        const { activeProjectId, projects, past, future } = get();
        if (!activeProjectId || future.length === 0) return;
        const project = projects[activeProjectId];
        if (!project) return;
        const next = future[0];
        set({
          projects: {
            ...projects,
            [activeProjectId]: { ...project, system: next, updatedAt: Date.now() },
          },
          past: [...past, project.system],
          future: future.slice(1),
        });
      },
    }),
    {
      name: "design-system-projects",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ projects: s.projects, activeProjectId: s.activeProjectId }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    },
  ),
);

/** Liefert das aktive Projekt (oder null). */
export function useActiveProject(): Project | null {
  return useDesignStore((s) =>
    s.activeProjectId ? s.projects[s.activeProjectId] ?? null : null,
  );
}

/** Liefert das aktive Design System (oder null, wenn kein Projekt aktiv ist). */
export function useDesignSystem(): DesignSystem | null {
  return useActiveProject()?.system ?? null;
}
