import { getAvailableLocales, Locale } from "@/api/locale";

const supportedLanguages: Locale[] = await getAvailableLocales();

const FormatLocaleDate = (date: string | Date, timeZone: string, locale?: string, meridiem: boolean = true) => {
    const clientLocale = localStorage.getItem('i18nextLng') ?? 'en'

    const newDate = new Date(date).toLocaleString(locale ?? clientLocale, {
        timeZone: timeZone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: meridiem
    })

    return newDate
}

export { supportedLanguages, FormatLocaleDate }
