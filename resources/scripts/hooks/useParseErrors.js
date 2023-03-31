import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useFlashesStore } from "@/stores/flashes";

export function useParseErrors() {
  const [clearAndAddHttpError] = useFlashesStore((state) => [state.clearAndAddHttpError])
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const errorsMessages = {
    steam_user_not_found: t('login.steam_user_not_found'),
    steam_validate_failed: t('login.steam_validate_failed')
  };

  useEffect(() => {
    searchParams.getAll('error').map((error) => {
      const hasKey = errorsMessages.hasOwnProperty(error)

      clearAndAddHttpError({
        key: error,
        error: {
          message: hasKey ? errorsMessages[error] : t('generic.message_not_found')
        }
      })
    })
    navigate(
      { search: new URLSearchParams({}).toString() },
      { replace: true }
    )
  }, [])
}
