import { useState, useEffect } from "react";
import steam from "@/api/auth/steam";
import { Button } from "@/components/elements/Button";
import { useParseParams } from "@/hooks/useParseParams";
import { useTranslation } from "react-i18next";

function SteamContainer() {
  const [ steamUrl, setSteamUrl ] = useState('');
  const [ isLoading, setIsLoading ] = useState(true);
  const { t } = useTranslation()

  useEffect(() => {
    steam().then(response => {
      if (response.url) {
        setSteamUrl(response.url)
        setIsLoading(false)
      }
    })
    .catch(error => {
      console.error(error)
    })
  }, [steamUrl])

  useParseParams()

  return (
    <Button 
      to={steamUrl} 
      isLoading={isLoading}
      disabled={isLoading}
      className={`!bg-slate-800 hover:!bg-slate-900 disabled:hover:!bg-slate-800 p-1`}
    >
      {t('login_steam', {ns: 'buttons'})}
    </Button>
  )
}

export { SteamContainer }
