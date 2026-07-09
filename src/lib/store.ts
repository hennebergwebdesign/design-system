"use client";

// Central Zustand store: project management, active design system,
// undo/redo history and localStorage persistence.

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  DesignSystem,
  EditorSection,
  PreviewMode,
  Project,
  SectionKey,
} from "./types";
import { createDefaultSystem } from "./defaults";

const HISTORY_LIMIT = 50;
// Coalesce rapid edits (e.g. color picker drags) into one history entry.
const HISTORY_COALESCE_MS = 400;

let lastHistoryPush = 0;

interface DesignSystemStore {
  projects: Project[];
  activeProjectId: string | null;
  activeSection: EditorSection;
  /** Light/dark mode for the live preview; color panels edit this variant. */
  previewMode: PreviewMode;
  // Undo/redo history for the active project (not persisted).
  past: DesignSystem[];
  future: DesignSystem[];

  createProject: (name: string) => string;
  deleteProject: (id: string) => void;
  renameProject: (id: string, name: string) => void;
  openProject: (id: string) => void;
  setActiveSection: (section: EditorSection) => void;
  setPreviewMode: (mode: PreviewMode) => void;

  /** Applies a partial update to the active project's design system. */
  updateSystem: (update: (system: DesignSystem) => DesignSystem) => void;
  resetSection: (section: SectionKey) => void;
  undo: () => void;
  redo: () => void;
}

function deepClone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

export function getActiveProject(state: DesignSystemStore): Project | null {
  return state.projects.find((p) => p.id === state.activeProjectId) ?? null;
}

export const useDesignSystemStore = create<DesignSystemStore>()(
  persist(
    (set, get) => ({
      projects: [],
      activeProjectId: null,
      activeSection: "colors",
      previewMode: "light",
      past: [],
      future: [],

      createProject: (name) => {
        const id = crypto.randomUUID();
        const now = Date.now();
        const project: Project = {
          id,
          name: name.trim() || "Unbenanntes Projekt",
          createdAt: now,
          updatedAt: now,
          system: createDefaultSystem(),
        };
        set((state) => ({
          projects: [...state.projects, project],
          activeProjectId: id,
          past: [],
          future: [],
        }));
        return id;
      },

      deleteProject: (id) => {
        set((state) => ({
          projects: state.projects.filter((p) => p.id !== id),
          activeProjectId:
            state.activeProjectId === id ? null : state.activeProjectId,
        }));
      },

      renameProject: (id, name) => {
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === id ? { ...p, name: name.trim() || p.name, updatedAt: Date.now() } : p
          ),
        }));
      },

      openProject: (id) => {
        set({ activeProjectId: id, past: [], future: [], activeSection: "colors" });
      },

      setActiveSection: (section) => set({ activeSection: section }),

      setPreviewMode: (mode) => set({ previewMode: mode }),

      updateSystem: (update) => {
        const state = get();
        const project = getActiveProject(state);
        if (!project) return;

        const now = Date.now();
        const coalesce = now - lastHistoryPush < HISTORY_COALESCE_MS;
        lastHistoryPush = now;

        const past = coalesce
          ? state.past
          : [...state.past, deepClone(project.system)].slice(-HISTORY_LIMIT);

        const nextSystem = update(deepClone(project.system));
        set({
          past,
          future: [],
          projects: state.projects.map((p) =>
            p.id === project.id
              ? { ...p, system: nextSystem, updatedAt: now }
              : p
          ),
        });
      },

      resetSection: (section) => {
        const defaults = createDefaultSystem();
        get().updateSystem((system) => ({
          ...system,
          [section]: defaults[section],
        }));
        // A reset is always its own history entry.
        lastHistoryPush = 0;
      },

      undo: () => {
        const state = get();
        const project = getActiveProject(state);
        if (!project || state.past.length === 0) return;
        const previous = state.past[state.past.length - 1];
        set({
          past: state.past.slice(0, -1),
          future: [deepClone(project.system), ...state.future].slice(0, HISTORY_LIMIT),
          projects: state.projects.map((p) =>
            p.id === project.id
              ? { ...p, system: previous, updatedAt: Date.now() }
              : p
          ),
        });
      },

      redo: () => {
        const state = get();
        const project = getActiveProject(state);
        if (!project || state.future.length === 0) return;
        const next = state.future[0];
        set({
          past: [...state.past, deepClone(project.system)].slice(-HISTORY_LIMIT),
          future: state.future.slice(1),
          projects: state.projects.map((p) =>
            p.id === project.id
              ? { ...p, system: next, updatedAt: Date.now() }
              : p
          ),
        });
      },
    }),
    {
      name: "design-system-projects",
      partialize: (state) => ({
        projects: state.projects,
        activeProjectId: state.activeProjectId,
      }),
    }
  )
);

/** Convenience hook for the active project (null before one is opened). */
export function useActiveProject(): Project | null {
  return useDesignSystemStore((state) =>
    state.projects.find((p) => p.id === state.activeProjectId) ?? null
  );
}
