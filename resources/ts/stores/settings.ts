import { create } from "zustand";

interface SettingsStore {
    data?: Settings
    setSettings: (payload: Settings) => void,
    clearSettings: () => void
}

export type Settings = Record<string, any>

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
