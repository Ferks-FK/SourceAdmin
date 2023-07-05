import { getAvailableLocales, Locale } from "@/api/locale";

const supportedLanguages: Locale[] = await getAvailableLocales();

export { supportedLanguages }
