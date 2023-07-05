import React, { ReactNode } from "react"

type GenericChangeEvent = <T extends HTMLElement>(event?: React.ChangeEvent<T>) => void;
type GenericClickEvent = <T extends HTMLElement>(event?: React.MouseEvent<T>) => void;

export type BaseProps = {
    className?: string,
    children?: ReactNode,
    onChange?: GenericChangeEvent,
    onClick?: GenericClickEvent
}

export interface BanObject {
    id: number,
    mod_icon: string | null,
    flag_url: string,
    created_at: string | Date,
    player_name: string,
    admin_name: string | null
}

export interface MuteObject {
    id: number,
    mod_icon: string | null,
    type: string,
    created_at: string | Date,
    player_name: string,
    admin_name: string | null
}

export interface ServerDataResponse {
    Id: number,
    Mod: string,
    Os: string,
    Map: string,
    Players: number,
    MaxPlayers: number,
    GamePort: number,
    Ip: string,
    IsOnline: boolean
    HostName: string
}

export interface PlayersDataResponse {
    Id: number,
    Name: string,
    Frags: number,
    Time: number,
    TimeF: string
}

export interface FlashProp {
    error: string | null,
    info: string | null,
    success: string | null,
    warning: string | null
}

export interface ErrorsProp {
    errors?: {
        [k: string]: string
    }
}
