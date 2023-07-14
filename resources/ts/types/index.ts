import { UserData } from "@/stores/user";
import { LayoutType } from "@/App";

export interface PageProps {
    auth: {
        user: UserData
    }
    errors: ErrorsProp
    flash: FlashProp
    layout: LayoutType
}

export interface BanObject {
    id: number
    mod_icon: string | null
    flag_url: string
    created_at: string
    player_name: string
    player_ip: string | null
    player_steam_id: string | null
    admin_name: string | null
    end_at: string
    reason: string
    time_ban_name: string
    time_ban_value: number
    removed_by?: string
    server_id?: number
    reason_id: number
    time_ban_id: number
    ban_count: number
    player_is_banned: boolean
}

export interface MuteObject {
    id: number
    mod_icon: string | null
    type: string
    created_at: string
    player_name: string
    player_ip: string | null
    player_steam_id: string | null
    admin_name: string | null
    end_at: string
    reason: string
    time_ban_name: string
    time_ban_value: number
    removed_by?: string
    server_id?: number
    reason_id: number
    time_ban_id: number
    ban_count: number
    player_is_muted: boolean
}

export interface ReasonObject {
    id: number
    reason: string
}

export interface TimeBanObject {
    id: number
    name: string
}

export interface ModObject {
    id: number
    name: string
}

export interface RegionObject {
    id: number
    region: string
}

export interface AdminObject {
    id: number
    name: string
}

export interface RoleObject {
    id: number
    name: string
    users_count: number
    permissions_count: number
    description?: string
    created_at: string
    updated_at: string
}

export interface PermissionObject {
    id: number
    name: string
    readable_name: string
}

export type PunishmentObject = BanObject | MuteObject

export interface ServerDataResponse {
    Id: number
    Mod: string
    Os: string
    Map: string
    Players: number
    MaxPlayers: number
    GamePort: number
    Ip: string
    IsOnline: boolean
    HostName: string
    Secure: boolean
    Ping?: number
}

export interface PlayerDataResponse {
    Id: number
    Name: string
    Frags: number
    Time: number
    TimeF: string
}

export interface FlashProp {
    error: string | null
    info: string | null
    success: string | null
    warning: string | null
}

export interface ErrorsProp {
    errors?: {
        [k: string]: string
    }
}

export interface PaginationProps {
    current_page: number
    last_page: number
    per_page: number
    total: number
    from: number
    to: number
    next_page_url: string
    prev_page_url: string
    first_page_url: string
    last_page_url: string
}
