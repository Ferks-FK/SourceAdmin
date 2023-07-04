import http from "@/api/http";
import { AxiosResponse, AxiosError } from "axios";

type LocaleDataResponse = {
    message: string
}

export type Locale = {
    name: string,
    code: string,
    flag: string
}

export type AvailableLocales = {
    locales: Locale[]
}

function getAvailableLocales(): Promise<AvailableLocales> {
    return new Promise((resolve, reject) => {
        http.get('/locale').then((response: AxiosResponse<AvailableLocales>) => {
            if (response.status == 200) {
                return resolve(response.data)
            }
        })
        .catch((error: AxiosError<any>) => {
            return reject(error)
        })
    })
}

function setLocale(locale: string = 'en'): Promise<LocaleDataResponse> {
    return new Promise((resolve, reject) => {
        http.post('/locale/setLocale', { locale: locale }).then((response: AxiosResponse<LocaleDataResponse>) => {
            if (response.status == 200) {
                return resolve(response.data)
            }
        })
        .catch((error: AxiosError<any>) => {
            return reject(error)
        })
    })
}


export { getAvailableLocales, setLocale }
