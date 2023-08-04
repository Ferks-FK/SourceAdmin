import http from "@/api/http";

export type SettingResponse = Record<string, any>

export async function getSettings(group: string): Promise<SettingResponse> {
    const response = await http.get<SettingResponse>('/admin/panel_settings/settings', { params: { group: group } })

    return response.data
}

export async function getTimeZones(): Promise<string[]> {
    const response = await http.get<string[]>('/admin/panel_settings/timezones')

    return response.data
}
