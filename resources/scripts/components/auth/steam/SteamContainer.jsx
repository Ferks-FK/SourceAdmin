import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import steam from "@/api/auth/steam";
import { useParseErrors } from "@/hooks/useParseErrors";

function SteamContainer() {
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

  //
  useParseErrors()

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
