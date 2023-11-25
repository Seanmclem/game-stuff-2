import { create } from "zustand";

interface AppState {
  current_level: number;
  set_current_level: (level: number) => void;
}

export const useLevelStore = create<AppState>()((set) => ({
  current_level: 1,
  set_current_level: (level: number) => set({ current_level: level }),
}));
