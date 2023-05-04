import { create } from "zustand";

const useFlashesStore = create((set) => ({
  items: [],
  addFlash: (payload) => set((state) => ({
    items: [...state.items, payload]
  })),
  addError: (payload) => set((state) => ({
    items: [...state.items, { type: 'error', title: 'Error', ...payload }]
  })),
  clearAndAddHttpError: (payload) => {
    if (!payload) {
      set({ items: [] })
    } else {
      set({
        items: [
          {
            type: 'error',
            title: 'Error',
            key: payload.key,
            message: payload.error.message
          }
        ]
      })
    }
  },
  clearFlashes: (payload) => {
    set({ items: payload ? items.filter(flashes => flashes.key !== payload) : [] })
  }
}))

export { useFlashesStore }
