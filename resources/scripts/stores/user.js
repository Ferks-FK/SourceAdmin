import { create } from "zustand";

const useUserStore = create((set) => ({
  data: undefined,
  isLogged: false,
  setUserData: (data) => set(() => ({
    data: data,
    isLogged: data !== undefined
  }))
}))

export { useUserStore };
