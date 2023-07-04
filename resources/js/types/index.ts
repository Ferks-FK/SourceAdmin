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
