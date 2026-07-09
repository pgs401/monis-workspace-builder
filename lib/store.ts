import { create } from "zustand";
import { persist } from "zustand/middleware";
import { catalogue } from "./catalogue";
import type { WorkspaceItem } from "./types";

export interface ItemPosition {
  x: number;
  y: number;
}

export interface SavedSetup {
  id: string;
  name: string;
  createdAt: number;
  deskId: string | null;
  chairId: string | null;
  accessories: Record<string, number>;
  positions: Record<string, ItemPosition>;
}

export interface SharedConfig {
  deskId: string | null;
  chairId: string | null;
  accessories: Record<string, number>;
  positions: Record<string, ItemPosition>;
}

interface WorkspaceState {
  selectedDesk: WorkspaceItem | null;
  selectedChair: WorkspaceItem | null;
  /** Quantity per accessory item id. */
  selectedAccessories: Record<string, number>;
  /** Drag offsets in the preview, keyed by scene instance ("desk", "chair", `${itemId}-${i}`). */
  positions: Record<string, ItemPosition>;
  savedSetups: SavedSetup[];
  selectDesk: (desk: WorkspaceItem) => void;
  selectChair: (chair: WorkspaceItem) => void;
  addAccessory: (itemId: string) => void;
  removeAccessory: (itemId: string) => void;
  setPosition: (key: string, position: ItemPosition) => void;
  resetLayout: () => void;
  saveSetup: (name: string) => void;
  loadSetup: (id: string) => void;
  deleteSetup: (id: string) => void;
  applyShared: (config: SharedConfig) => void;
  totalMonthlyPrice: () => number;
  reset: () => void;
}

const findItem = (id: string | null) =>
  id ? (catalogue.find((entry) => entry.id === id) ?? null) : null;

const initialSelection = {
  selectedDesk: null,
  selectedChair: null,
  selectedAccessories: {},
  positions: {},
};

export function configPrice(config: {
  deskId: string | null;
  chairId: string | null;
  accessories: Record<string, number>;
}): number {
  let total =
    (findItem(config.deskId)?.monthlyPrice ?? 0) +
    (findItem(config.chairId)?.monthlyPrice ?? 0);
  for (const [itemId, quantity] of Object.entries(config.accessories)) {
    total += (findItem(itemId)?.monthlyPrice ?? 0) * quantity;
  }
  return total;
}

export const useWorkspaceStore = create<WorkspaceState>()(
  persist(
    (set, get) => ({
      ...initialSelection,
      savedSetups: [],

      selectDesk: (desk) => set({ selectedDesk: desk }),

      selectChair: (chair) => set({ selectedChair: chair }),

      addAccessory: (itemId) =>
        set((state) => ({
          selectedAccessories: {
            ...state.selectedAccessories,
            [itemId]: (state.selectedAccessories[itemId] ?? 0) + 1,
          },
        })),

      removeAccessory: (itemId) =>
        set((state) => {
          const quantity = state.selectedAccessories[itemId] ?? 0;
          if (quantity <= 1) {
            const { [itemId]: _, ...rest } = state.selectedAccessories;
            return { selectedAccessories: rest };
          }
          return {
            selectedAccessories: {
              ...state.selectedAccessories,
              [itemId]: quantity - 1,
            },
          };
        }),

      setPosition: (key, position) =>
        set((state) => ({
          positions: { ...state.positions, [key]: position },
        })),

      resetLayout: () => set({ positions: {} }),

      saveSetup: (name) =>
        set((state) => ({
          savedSetups: [
            {
              id: `setup-${Date.now().toString(36)}`,
              name,
              createdAt: Date.now(),
              deskId: state.selectedDesk?.id ?? null,
              chairId: state.selectedChair?.id ?? null,
              accessories: { ...state.selectedAccessories },
              positions: { ...state.positions },
            },
            ...state.savedSetups,
          ].slice(0, 12),
        })),

      loadSetup: (id) => {
        const setup = get().savedSetups.find((entry) => entry.id === id);
        if (!setup) return;
        set({
          selectedDesk: findItem(setup.deskId),
          selectedChair: findItem(setup.chairId),
          selectedAccessories: { ...setup.accessories },
          positions: { ...setup.positions },
        });
      },

      deleteSetup: (id) =>
        set((state) => ({
          savedSetups: state.savedSetups.filter((entry) => entry.id !== id),
        })),

      applyShared: (config) =>
        set({
          selectedDesk: findItem(config.deskId),
          selectedChair: findItem(config.chairId),
          selectedAccessories: { ...config.accessories },
          positions: { ...config.positions },
        }),

      totalMonthlyPrice: () => {
        const { selectedDesk, selectedChair, selectedAccessories } = get();
        return configPrice({
          deskId: selectedDesk?.id ?? null,
          chairId: selectedChair?.id ?? null,
          accessories: selectedAccessories,
        });
      },

      reset: () => set({ ...initialSelection }),
    }),
    {
      name: "monis-workspace",
      skipHydration: true,
      partialize: (state) => ({
        selectedDesk: state.selectedDesk,
        selectedChair: state.selectedChair,
        selectedAccessories: state.selectedAccessories,
        positions: state.positions,
        savedSetups: state.savedSetups,
      }),
    }
  )
);
