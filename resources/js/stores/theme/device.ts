import { create } from "zustand";

export interface DeviceStore {
    device?: string | undefined,
    setDevice?: (device: string) => void
}

const useDeviceStore = create<DeviceStore>((set) => ({
  device: undefined,
  setDevice: (device) => set(() => ({
    device: device
  }))
}))

export { useDeviceStore };
