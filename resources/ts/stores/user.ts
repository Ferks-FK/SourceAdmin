import { create } from "zustand";
import { GroupObject, RoleObject, PermissionObject } from '@/types';

interface UserStore {
    data: UserData | null
    isLogged: boolean
    setUserData: (data: UserData) => void
    clearData: () => void
}

export interface UserData {
    id: number
    name: string
    email: string
    should_re_login: boolean
    steam_id: string
    created_at: string | Date
    updated_at: string | Date
    email_verified_at: string | Date
    roles: RoleObject[]
    permissions?: PermissionObject[]
    groups?: GroupObject[]
}

const useUserStore = create<UserStore>((set) => ({
  data: null,
  isLogged: false,
  setUserData: (data) => set(() => ({
    data: data,
    isLogged: true
  })),
  clearData: () => set(() => ({
    data: null,
    isLogged: false
  }))
}))

export { useUserStore };
