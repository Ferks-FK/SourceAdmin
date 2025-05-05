import { create } from "zustand";
import { GeneralSettingsProps, MailSettingsProps } from "@/api/getSettings";

interface SettingsStore {
    data?: Settings
    setSettings: (payload: Settings) => void,
    clearSettings: () => void
}

export type Settings = {
    GeneralSettings?: GeneralSettingsProps
    MailSettings?: MailSettingsProps
}

export type SettingObject = 'GeneralSettings' | 'MailSettings';

const useSettingsStore = create<SettingsStore>((set) => ({
    data: undefined,
    setSettings: (payload) => set((state) => ({
        data: {...state.data, ...payload}
    })),
    clearSettings: () => set(() => ({
        data: undefined
    }))
}))

export { useSettingsStore }
