// useJobDetailsPanel.ts
"use client";

import { create } from "zustand";
import type { Job, UseJobDetailsPanelReturn } from "./types";

export const useJobDetailsPanel = create<UseJobDetailsPanelReturn>((set) => ({
  job: null,
  isOpen: false,

  openPanel: (selected: Job) => {
    set({ job: selected, isOpen: true });

    // Prevent background scroll
    if (typeof document !== "undefined") {
      document.body.style.overflow = "hidden";
    }
  },

  closePanel: () => {
    // Close immediately
    set((state) => ({ ...state, isOpen: false }));

    // Optional: clear job after animation
    setTimeout(() => {
      set((state) => ({ ...state, job: null }));
      if (typeof document !== "undefined") {
        document.body.style.overflow = "";
      }
    }, 300);
  },
}));
