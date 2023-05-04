import { create } from "zustand";

const useSidebarStore = create((set) => ({
  isVisible: window.screen.width >= 768 ? false : true,
  setIsVisible: () => set((state) => ({
    isVisible: !state.isVisible
  }))
}))

export { useSidebarStore };
