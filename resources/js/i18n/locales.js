import { getAvailableLocales } from "@/api/locale";

const getLocales = async () => {
    try {
        return await getAvailableLocales();
    } catch (error) {
        console.error(error)
    }
}

const supportedLanguages = await getLocales();

export { supportedLanguages }
