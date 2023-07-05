import http from "@/api/http";
import { ServerDataResponse, PlayersDataResponse } from "@/types"

export type ArrayDataResponse = [ServerDataResponse, PlayersDataResponse[]]

export async function getServerData(server_id: number, getPlayers?: boolean): Promise<ArrayDataResponse> {
    const response = await http.get<ArrayDataResponse>(`/servers/${server_id}`, { params: { getPlayers: getPlayers } })

    return response.data
}
