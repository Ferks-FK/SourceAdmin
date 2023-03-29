import { useState, useEffect } from "react";
import { useFlashesStore } from "@/stores/flashes";
import { Link } from "react-router-dom";
import steam from "@/api/auth/steam";
import { FlashMessages } from "@/components/elements/Teste";

function SteamContainer() {
  const [ clearAndAddHttpError, clearFlashes ] = useFlashesStore((state) => [ state.clearAndAddHttpError, state.clearFlashes ])
  const [ steamUrl, setSteamUrl ] = useState('');

  useEffect(() => {
    steam().then(response => {
      console.log(response)
      if (response.url) {
        setSteamUrl(response.url)
      }
    })
    .catch(error => {
      console.error(error)
      clearAndAddHttpError({error});
    })
  }, [])

  return (
    <div className="flex flex-col p-5 rounded-md bg-lightDark mt-5 items-center">
      <div className="">
        <FlashMessages></FlashMessages>
        <Link to={steamUrl}>
          Login with steam
        </Link>
      </div>
    </div>
  )
}

export { SteamContainer }
