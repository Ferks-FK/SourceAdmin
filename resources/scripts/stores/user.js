import { create } from "zustand";

const useUserStore = create((set) => ({
    data: undefined,
    setUserData: (data) => set(() => ({
        data: data
    }))
}))

export { useUserStore };
