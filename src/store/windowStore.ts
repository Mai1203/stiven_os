import { create } from 'zustand';

export interface Window {
  id: string;
  title: string;
  component: string;
  isMinimized: boolean;
  isMaximized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
}

interface WindowStore {
  windows: Window[];
  focusedWindowId: string | null;
  nextZIndex: number;
  openWindow: (window: Omit<Window, 'id' | 'zIndex' | 'isMinimized' | 'isMaximized'> & { isMaximized?: boolean }) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  updateWindowPosition: (id: string, position: { x: number; y: number }) => void;
  updateWindowSize: (id: string, size: { width: number; height: number }) => void;
}

export const useWindowStore = create<WindowStore>((set) => ({
  windows: [],
  focusedWindowId: null,
  nextZIndex: 1000,

  openWindow: (window) =>
    set((state) => {
      const existingWindow = state.windows.find((w) => w.title === window.title);
      if (existingWindow) {
        return {
          focusedWindowId: existingWindow.id,
          windows: state.windows.map((w) =>
            w.id === existingWindow.id
              ? { ...w, isMinimized: false, zIndex: state.nextZIndex }
              : w
          ),
          nextZIndex: state.nextZIndex + 1,
        };
      }

      const newWindow: Window = {
        ...window,
        id: `window-${Date.now()}-${Math.random()}`,
        isMinimized: false,
        isMaximized: window.isMaximized ?? false,
        zIndex: state.nextZIndex,
      };

      return {
        windows: [...state.windows, newWindow],
        focusedWindowId: newWindow.id,
        nextZIndex: state.nextZIndex + 1,
      };
    }),

  closeWindow: (id) =>
    set((state) => ({
      windows: state.windows.filter((w) => w.id !== id),
      focusedWindowId: state.focusedWindowId === id ? null : state.focusedWindowId,
    })),

  minimizeWindow: (id) =>
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, isMinimized: true } : w
      ),
      focusedWindowId: state.focusedWindowId === id ? null : state.focusedWindowId,
    })),

  maximizeWindow: (id) =>
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, isMaximized: !w.isMaximized } : w
      ),
    })),

  focusWindow: (id) =>
    set((state) => ({
      focusedWindowId: id,
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, zIndex: state.nextZIndex, isMinimized: false } : w
      ),
      nextZIndex: state.nextZIndex + 1,
    })),

  updateWindowPosition: (id, position) =>
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, position } : w
      ),
    })),

  updateWindowSize: (id, size) =>
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, size } : w
      ),
    })),
}));
