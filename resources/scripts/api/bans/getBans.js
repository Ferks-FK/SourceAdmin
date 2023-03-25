import http from "@/api/http"

function getBansData(limit = 10, query) {
    const search = (data) => {
        const keys = ['player_name', 'admin_name']

        return data.filter((item) =>
            keys.some((key) => item[key].toLowerCase().includes(query))
        )
    }

    return new Promise((resolve, reject) => {
        http.get(`/api/bans?limit=${limit}}`).then(response => {
            return resolve(search(response.data))
        })
        .catch(reject)
    })
}

function getBanLocation(ip) {
    return new Promise((resolve, reject) => {
        http.get(`/api/bans/getLocation?ip=${ip}`).then(response => {
            return resolve(response.data)
        })
        .catch(reject)
    })
}

export { getBansData, getBanLocation }
