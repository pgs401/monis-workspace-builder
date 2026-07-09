import { create } from "zustand";
import { catalogue } from "./catalogue";
import type { WorkspaceItem } from "./types";

interface WorkspaceState {
  selectedDesk: WorkspaceItem | null;
  selectedChair: WorkspaceItem | null;
  /** Quantity per accessory item id. */
  selectedAccessories: Record<string, number>;
  selectDesk: (desk: WorkspaceItem) => void;
  selectChair: (chair: WorkspaceItem) => void;
  addAccessory: (itemId: string) => void;
  removeAccessory: (itemId: string) => void;
  totalMonthlyPrice: () => number;
  reset: () => void;
}

const initialState = {
  selectedDesk: null,
  selectedChair: null,
  selectedAccessories: {},
};

export const useWorkspaceStore = create<WorkspaceState>()((set, get) => ({
  ...initialState,

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

  totalMonthlyPrice: () => {
    const { selectedDesk, selectedChair, selectedAccessories } = get();
    let total =
      (selectedDesk?.monthlyPrice ?? 0) + (selectedChair?.monthlyPrice ?? 0);
    for (const [itemId, quantity] of Object.entries(selectedAccessories)) {
      const item = catalogue.find((entry) => entry.id === itemId);
      if (item) {
        total += item.monthlyPrice * quantity;
      }
    }
    return total;
  },

  reset: () => set(initialState),
}));
