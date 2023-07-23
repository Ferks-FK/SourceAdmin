import { create } from "zustand";

interface SidebarStore {
    isVisible: boolean,
    setIsVisible: () => void
}

const useSidebarStore = create<SidebarStore>((set) => ({
  isVisible: window.screen.width >= 768 ? true : false,
  setIsVisible: () => set((state) => ({
    isVisible: !state.isVisible
  }))
}))

export { useSidebarStore };
