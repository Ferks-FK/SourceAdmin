import { useState, useEffect } from "react";
import { steamAuth } from "@/api/steam";
import { Button } from "@/components/elements/button";
import { useTranslation } from "react-i18next";
import { faSteam } from "@fortawesome/free-brands-svg-icons";

function SteamContainer() {
  const [ steamUrl, setSteamUrl ] = useState('');
  const [ isLoading, setIsLoading ] = useState(true);
  const { t } = useTranslation()

  useEffect(() => {
    const getSteamAuthUrl = async () => {
      const response = await steamAuth()

      if (response.url) {
        setSteamUrl(response.url)
        setIsLoading(false)
      }
    }

    getSteamAuthUrl()
  }, [])

  return (
    <Button.IconLink
      to={steamUrl}
      disabled={isLoading}
      className={`!bg-slate-900 hover:!bg-slate-800 disabled:hover:!bg-slate-800`}
      icon={faSteam}
      iconSize="2x"
    >
      {t('login_steam', {ns: 'buttons'})}
    </Button.IconLink>
  )
}

export { SteamContainer }
