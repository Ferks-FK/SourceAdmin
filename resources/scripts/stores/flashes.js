import { create } from "zustand";

const useFlashesStore = create((set) => ({
    items: [],
    addFlash: () => set((state) => ({
        items: state.items.push(state.items)
    })),
    addError: () => set((state) => ({
        items: state.items.push({ type: 'error', title: 'Error', ...state })
    })),
    clearAndAddHttpError: (payload) => {
        if (!payload) {
            set({ items: [] })
        } else {
            console.error(payload);

            set({ items: [
                {
                    type: 'error',
                    title: 'Error',
                    key: payload.key,
                    message: payload.error.message
                }
            ]})
        }
    },
    clearFlashes: (payload) => {
        set({ items: payload ? items.filter(flashes => flashes.key !== payload) : []})
    }
}))

export { useFlashesStore }
