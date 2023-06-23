import http from "@/api/http";

function getAvailableLocales() {
    return new Promise((resolve, reject) => {
        http.get('/locale').then((response) => {
            if (response.status == 200) {
                return resolve(response.data)
            }
        })
        .catch((error) => {
            return reject(error)
        })
    })
}

function setLocale(locale = 'en') {
    return new Promise((resolve, reject) => {
        http.post('/locale/setLocale', { locale: locale }).then((response) => {
            if (response.status == 200) {
                return resolve(response.data)
            }
        })
        .catch((error) => {
            return reject(error)
        })
    })
}

export { getAvailableLocales, setLocale }
