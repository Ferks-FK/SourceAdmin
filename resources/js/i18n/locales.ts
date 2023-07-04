import { getAvailableLocales, AvailableLocales } from "@/api/locale";

const supportedLanguages: AvailableLocales = await getAvailableLocales();

export { supportedLanguages }
