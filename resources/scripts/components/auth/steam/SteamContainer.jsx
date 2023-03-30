import { useState, useEffect } from "react";
import { ParseErrors } from "@/components/ParseErrors";
import { Link } from "react-router-dom";
import steam from "@/api/auth/steam";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useFlashesStore } from "@/stores/flashes"

function SteamContainer() {
  const [ clearAndAddHttpError, clearFlashes ] = useFlashesStore((state) => [ state.clearAndAddHttpError, state.clearFlashes ])
  const [ searchParams ] = useSearchParams();
  const navigate = useNavigate();
  const [ steamUrl, setSteamUrl ] = useState('');


  useEffect(() => {
    steam().then(response => {
      if (response.url) {
        setSteamUrl(response.url)
      }
    })
    .catch(error => {
      console.error(error)
    })
  }, [])

  useEffect(() => {
    ParseErrors(clearAndAddHttpError, searchParams)
    navigate(
      { search: new URLSearchParams({}).toString()},
      { replace: true }
    )
  }, [])

  return (
    <div className="flex flex-col p-5 rounded-md bg-lightDark mt-5 items-center">
      <div className="">
        <Link to={steamUrl}>
          Login with steam
        </Link>
      </div>
    </div>
  )
}

export { SteamContainer }
