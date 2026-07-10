"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface ComponentStore {
  selectedIds: string[];
  slotOverrides: Record<string, Record<string, string | number | boolean>>;
  addComponent: (id: string) => void;
  removeComponent: (id: string) => void;
  moveComponent: (from: number, to: number) => void;
  setSlotValue: (
    componentId: string,
    slotKey: string,
    value: string | number | boolean,
  ) => void;
  clearAll: () => void;
  restoreSelection: (
    selectedIds: string[],
    slotOverrides: Record<string, Record<string, string | number | boolean>>,
  ) => void;
}

export const useComponentStore = create<ComponentStore>()(
  persist(
    (set) => ({
      selectedIds: [],
      slotOverrides: {},

      addComponent: (id) =>
        set((s) => ({ selectedIds: [...s.selectedIds, id] })),

      removeComponent: (id) =>
        set((s) => ({
          selectedIds: s.selectedIds.filter((i) => i !== id),
        })),

      moveComponent: (from, to) =>
        set((s) => {
          if (to < 0 || to >= s.selectedIds.length) return s;
          const ids = [...s.selectedIds];
          const [item] = ids.splice(from, 1);
          ids.splice(to, 0, item);
          return { selectedIds: ids };
        }),

      setSlotValue: (componentId, slotKey, value) =>
        set((s) => ({
          slotOverrides: {
            ...s.slotOverrides,
            [componentId]: {
              ...s.slotOverrides[componentId],
              [slotKey]: value,
            },
          },
        })),

      clearAll: () => set({ selectedIds: [], slotOverrides: {} }),

      restoreSelection: (selectedIds, slotOverrides) =>
        set({ selectedIds, slotOverrides }),
    }),
    {
      name: "conversion-components-selection",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
