import http from '@/api/http';

type SteamDataResponse = {
    url: string | null
    isActive: boolean
}

export async function steamAuth(): Promise<SteamDataResponse> {
    const response = await http.get<SteamDataResponse>('/steam/auth')

    return response.data
}
