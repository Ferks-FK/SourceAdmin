import http from "@/api/http";

function getServersList(limit = 10) {
    return new Promise((resolve, reject) => {
        http.get(`/api/servers?limit=${limit}`).then(response => {
            return resolve(response.data)
        })
        .catch(reject)
    })
}

function getServerData(server_id, returnPlayers = false) {
    return new Promise((resolve, reject) => {
        http.get(`/api/servers/${server_id}${returnPlayers && '?include=players'}`).then(response => {
            return resolve(response.data)
        })
        .catch(reject)
    })
}

export { getServerData, getServersList }
