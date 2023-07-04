export interface BaseProps {
    end_at: string | Date
    time_ban_name: string
    time_ban_value: number
    removed_by?: string
}

export interface FilterDataProps {
    data: any[]
    keys: string[]
    query: string
}

export interface PaginationProps {
    current_page: number,
    last_page: number,
    per_page: number,
    total: number,
    from: number,
    to: number,
    next_page_url: string,
    prev_page_url: string,
    first_page_url: string,
    last_page_url: string
}
