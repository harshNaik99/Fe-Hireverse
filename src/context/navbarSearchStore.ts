// src/context/navbarSearchStore.ts
import { create } from "zustand"

interface NavbarSearchState {
  search: string
  setSearch: (value: string) => void
}

export const useNavbarSearchStore = create<NavbarSearchState>((set) => ({
  search: "",
  setSearch: (value) => set({ search: value }),
}))


