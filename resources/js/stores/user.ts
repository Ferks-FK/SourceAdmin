import { create } from "zustand";

interface UserStore {
    data: UserData[],
    isLogged: boolean,
    setUserData: (data: UserData[]) => void,
    clearData: () => void
}

interface UserData {
    id: number,
    name: string,
    email: string,
    should_re_login: boolean,
    steam_id: string | null,
    created_at: string | Date,
    updated_at: string | Date,
    email_verified_at: string | Date
}

const useUserStore = create<UserStore>((set) => ({
  data: [],
  isLogged: false,
  setUserData: (data) => set(() => ({
    data: data,
    isLogged: true
  })),
  clearData: () => set(() => ({
    data: [],
    isLogged: false
  }))
}))

export { useUserStore };
