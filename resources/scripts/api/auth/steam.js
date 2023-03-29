import http from '@/api/http';

export default () => {
    return new Promise((resolve, reject) => {
        http.get('/auth/steamLogin').then(response => {
            if (response.data.url) {
                return resolve(response.data)
            }
        })
        .catch(error => {
            return reject(error)
        })
    })
}
