import { Input } from "@/components/elements/inputs";
import { useTranslation } from "react-i18next";

function Search({ setQuery }) {
  const { t } = useTranslation()

  return (
    <Input.Search placeholder={t('generic.search')} onChange={setQuery}/>
  )
}

export { Search }
