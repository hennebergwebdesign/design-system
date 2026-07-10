"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Page, PageSection } from "@/lib/design-system/page-builder";
import { newInstanceId } from "@/lib/design-system/page-builder";
import type { ComponentVariant } from "@/lib/design-system/components-library";

interface PagesStore {
  pages: Record<string, Page[]>;
  activePage: Record<string, string | null>;

  getPages: (projectId: string) => Page[];
  getActivePage: (projectId: string) => Page | null;
  setActivePage: (projectId: string, pageId: string | null) => void;

  addPage: (projectId: string, name: string) => string;
  renamePage: (projectId: string, pageId: string, name: string) => void;
  deletePage: (projectId: string, pageId: string) => void;

  addSection: (projectId: string, pageId: string, variant: ComponentVariant, index?: number) => void;
  removeSection: (projectId: string, pageId: string, instanceId: string) => void;
  moveSection: (projectId: string, pageId: string, from: number, to: number) => void;
}

function newPageId(): string {
  return "page-" + Math.random().toString(36).slice(2, 8);
}

export const usePagesStore = create<PagesStore>()(
  persist(
    (set, get) => ({
      pages: {},
      activePage: {},

      getPages: (projectId) => get().pages[projectId] ?? [],

      getActivePage: (projectId) => {
        const pages = get().pages[projectId] ?? [];
        const activeId = get().activePage[projectId];
        return pages.find((p) => p.id === activeId) ?? pages[0] ?? null;
      },

      setActivePage: (projectId, pageId) => {
        set((s) => ({ activePage: { ...s.activePage, [projectId]: pageId } }));
      },

      addPage: (projectId, name) => {
        const id = newPageId();
        const page: Page = { id, name: name.trim() || "Neue Seite", sections: [] };
        set((s) => ({
          pages: {
            ...s.pages,
            [projectId]: [...(s.pages[projectId] ?? []), page],
          },
          activePage: { ...s.activePage, [projectId]: id },
        }));
        return id;
      },

      renamePage: (projectId, pageId, name) => {
        set((s) => ({
          pages: {
            ...s.pages,
            [projectId]: (s.pages[projectId] ?? []).map((p) =>
              p.id === pageId ? { ...p, name: name.trim() || p.name } : p
            ),
          },
        }));
      },

      deletePage: (projectId, pageId) => {
        set((s) => {
          const pages = (s.pages[projectId] ?? []).filter((p) => p.id !== pageId);
          const active = s.activePage[projectId] === pageId ? (pages[0]?.id ?? null) : s.activePage[projectId];
          return {
            pages: { ...s.pages, [projectId]: pages },
            activePage: { ...s.activePage, [projectId]: active },
          };
        });
      },

      addSection: (projectId, pageId, variant, index) => {
        const section: PageSection = { instanceId: newInstanceId(), variant };
        set((s) => ({
          pages: {
            ...s.pages,
            [projectId]: (s.pages[projectId] ?? []).map((p) => {
              if (p.id !== pageId) return p;
              const sections = [...p.sections];
              if (index !== undefined) {
                sections.splice(index, 0, section);
              } else {
                sections.push(section);
              }
              return { ...p, sections };
            }),
          },
        }));
      },

      removeSection: (projectId, pageId, instanceId) => {
        set((s) => ({
          pages: {
            ...s.pages,
            [projectId]: (s.pages[projectId] ?? []).map((p) => {
              if (p.id !== pageId) return p;
              return { ...p, sections: p.sections.filter((sec) => sec.instanceId !== instanceId) };
            }),
          },
        }));
      },

      moveSection: (projectId, pageId, from, to) => {
        set((s) => ({
          pages: {
            ...s.pages,
            [projectId]: (s.pages[projectId] ?? []).map((p) => {
              if (p.id !== pageId) return p;
              const sections = [...p.sections];
              const [moved] = sections.splice(from, 1);
              sections.splice(to, 0, moved);
              return { ...p, sections };
            }),
          },
        }));
      },
    }),
    {
      name: "design-system-pages",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ pages: s.pages, activePage: s.activePage }),
    },
  ),
);
