import http from "@/api/http";

export type SettingResponse = Record<GeneralSettingsAtributes | MailSettingsAtributes, any>

export type GeneralSettingsProps = {
    site_name: string
    time_zone: string
    steam_web_api_key: string
}

export type MailSettingsProps = {
    smtp_host: string
    smtp_port: number
    smtp_encryption: string
    smtp_username: string
    smtp_password: string
    smtp_mail_from: string
    smtp_mail_from_name: string
}

type GeneralSettingsAtributes = 'site_name' | 'time_zone' | 'steam_web_api_key'
type MailSettingsAtributes = 'smtp_host' | 'smtp_port' | 'smtp_encryption' | 'smtp_username' | 'smtp_password' | 'smtp_mail_from' | 'smtp_mail_from_name'

export async function getSettings(group: string): Promise<SettingResponse> {
    const response = await http.get<SettingResponse>('/admin/panel_settings/settings', { params: { group: group } })

    return response.data
}

export async function getTimeZones(): Promise<string[]> {
    const response = await http.get<string[]>('/admin/panel_settings/timezones')

    return response.data
}
