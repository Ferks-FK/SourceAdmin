import { create } from "zustand";

interface SettingsStore {
    data?: Record<SettingsKeys, any>
    setSettings: (payload: AppSettings) => void,
    clearSettings: () => void
}

export type AppSettings = {
    site_name: string,
    time_zone: string | null
}

type SettingsKeys = 'site_name' | 'time_zone'

const useSettingsStore = create<SettingsStore>((set) => ({
    data: undefined,
    setSettings: (payload) => set(() => ({
        data: { ...payload }
    })),
    clearSettings: () => set(() => ({
        data: undefined
    }))
}))

export { useSettingsStore }
