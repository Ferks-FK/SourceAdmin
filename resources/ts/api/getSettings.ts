import http from "@/api/http";

export type SettingResponse = Record<string, string>

export async function getSettings(group: string): Promise<SettingResponse> {
    const response = await http.get('/admin/panel_settings/settings', { params: { group: group } })

    return response.data
}
