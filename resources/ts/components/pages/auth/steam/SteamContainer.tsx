import { useState, useEffect } from "react";
import { steamAuth } from "@/api/steam";
import { Button } from "@/components/elements/button";
import { useTranslation } from "react-i18next";
import { faSteam } from "@fortawesome/free-brands-svg-icons";

function SteamContainer() {
  const [steamUrl, setSteamUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isActive, setIsActive] = useState<boolean>(false);
  const { t } = useTranslation()

  useEffect(() => {
    const getSteamAuthUrl = async () => {
      const response = await steamAuth()

      setIsActive(response.isActive)

      if (response.url && response.isActive) {
        setSteamUrl(response.url)
        setIsLoading(false)
      }
    }

    getSteamAuthUrl()
  }, [])

  return (
    isActive ? (
      <div className="flex flex-wrap p-5 rounded-md bg-dark-secondary mt-5 justify-center gap-1">
        <Button.IconLink
          to={steamUrl}
          disabled={isLoading}
          className={`!bg-slate-900 hover:!bg-slate-800 disabled:hover:!bg-slate-900`}
          icon={faSteam}
          iconSize="2x"
        >
          {t('login_steam', { ns: 'buttons' })}
        </Button.IconLink>
      </div>
    ) : null
  )
}

export { SteamContainer }
