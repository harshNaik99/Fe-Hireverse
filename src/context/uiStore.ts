// src/context/uiStore.ts
import { create } from "zustand"

interface UiState {
  isFilterSidebarOpen: boolean
  toggleFilterSidebar: () => void
  setFilterSidebarOpen: (open: boolean) => void
}

export const useUiStore = create<UiState>((set) => ({
  isFilterSidebarOpen: true,
  toggleFilterSidebar: () =>
    set((state) => ({
      isFilterSidebarOpen: !state.isFilterSidebarOpen,
    })),
  setFilterSidebarOpen: (open) => set({ isFilterSidebarOpen: open }),
}))


