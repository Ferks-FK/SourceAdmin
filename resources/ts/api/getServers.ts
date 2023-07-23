import http from "@/api/http";
import { ServerDataResponse, PlayerDataResponse } from "@/types"

export type ResponseData = {
    server: ServerDataResponse,
    players?: PlayerDataResponse[]
}

export async function getServerData(server_id: number, getPlayers: boolean = true): Promise<ResponseData> {
    const response = await http.get<ResponseData>(`/servers/${server_id}`, { params: { getPlayers: getPlayers } })

    return response.data
}
