import http from "@/api/http";

type LocaleDataResponse = {
    message: string
}

export type Locale = {
    name: string,
    code: string,
    flag: string
}

async function getAvailableLocales(): Promise<Locale[]> {
    const response = await http.get<Locale[]>('/locale')

    return response.data
}

async function setLocale(locale: string = 'en'): Promise<LocaleDataResponse> {
    const response = await http.post<LocaleDataResponse>('/locale/setLocale', { locale: locale })

    return response.data
}


export { getAvailableLocales, setLocale }
