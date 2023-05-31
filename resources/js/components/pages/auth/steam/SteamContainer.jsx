import { useState, useEffect } from "react";
import steam from "@/api/auth/steam";
import { Button } from "@/components/elements/button";
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
  }, [])

  return (
    <Button.ExternalLink
      to={steamUrl}
      disabled={isLoading}
      className={`!bg-slate-800 hover:!bg-slate-900 disabled:hover:!bg-slate-800`}
    >
      {t('login_steam', {ns: 'buttons'})}
    </Button.ExternalLink>
  )
}

export { SteamContainer }
