import http from "@/api/http";
import { search } from "@/api/search";

function getBansData(limit = 10, query) {
    return new Promise((resolve, reject) => {
        http.get(`/api/bans?limit=${limit}}`).then(response => {
            const searchKeys = ['player_name', 'admin_name']
            return resolve(search(response.data, query, searchKeys))
        })
        .catch(error => {
            return reject(error)
        })
    })
}

export { getBansData }
