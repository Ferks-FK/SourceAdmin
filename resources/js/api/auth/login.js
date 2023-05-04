import http from '@/api/http'

export default ({ name, password }) => {
    return new Promise((resolve, reject) => {
        http.post("/api/auth/login", {name, password}).then(response => {
            if (!(response.data instanceof Object)) {
                return reject(new Error('An error occurred while processing the login request.'))
            }

            return resolve({
                message: response.data.message,
                complete: response.data.complete,
                user: response.data.user || undefined,
                errors: response.data.errors || undefined
            })
        })
        .catch(error => {
            return reject({
                message: error.response.data.message
            })
        });
    })
}
