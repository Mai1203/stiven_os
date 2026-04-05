import { create } from 'zustand';

interface SystemStore {
  isBooting: boolean;
  bootProgress: number;
  isBooted: boolean;
  isLoggedIn: boolean;
  setBooting: (isBooting: boolean) => void;
  setBootProgress: (progress: number) => void;
  setBooted: (isBooted: boolean) => void;
  setLoggedIn: (isLoggedIn: boolean) => void;
}

export const useSystemStore = create<SystemStore>((set) => ({
  isBooting: true,
  bootProgress: 0,
  isBooted: false,
  isLoggedIn: false,

  setBooting: (isBooting) => set({ isBooting }),
  setBootProgress: (progress) => set({ bootProgress: progress }),
  setBooted: (isBooted) => set({ isBooted }),
  setLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
}));
