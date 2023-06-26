import { create } from "zustand";

interface FlashStore {
    items: FlashMessage[],
    addFlash: (payload: FlashMessage) => void,
    addError: (payload: FlashMessage) => void,
    clearAndAddHttpError: (payload?: FlashMessage) => void,
    clearFlashes: (payload?: FlashMessage) => void
}

interface FlashMessage {
    id?: number,
    key?: string,
    type: FlashMessageType,
    title?: string,
    message: string
}

type FlashMessageType = 'success' | 'info' | 'warning' | 'error';

const useFlashesStore = create<FlashStore>((set) => ({
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
            message: payload.message
          }
        ]
      })
    }
  },
  clearFlashes: (payload) => set((state) => ({
    items: payload ? state.items.filter(flashes => flashes.key !== payload.key) : []
  }))
}))

export { useFlashesStore }
