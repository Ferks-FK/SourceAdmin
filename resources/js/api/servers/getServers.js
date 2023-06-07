import http from "@/api/http";

function getServerData(server_id, getPlayers = true) {
    return new Promise((resolve, reject) => {
        http.get(`/servers/${server_id}`, { params: { getPlayers: getPlayers } }).then(response => {
            return resolve(response.data)
        })
        .catch(error => {
            return reject(error)
        })
    })
}

export { getServerData }
