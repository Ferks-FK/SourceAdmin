import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useFlashesStore } from "@/stores/flashes";

export function useParseParams(parameter = 'error') {
  const [clearAndAddHttpError] = useFlashesStore((state) => [state.clearAndAddHttpError])
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const messages = {
    steam_user_not_found: t('login.steam_user_not_found'),
    steam_validate_failed: t('login.steam_validate_failed'),
    steam_api_not_found: t('login.steam_api_not_found')
  };

  useEffect(() => {
    searchParams.getAll(parameter).map((param) => {
      const hasKey = messages.hasOwnProperty(param)

      clearAndAddHttpError({
        key: param,
        error: {
          message: hasKey ? messages[param] : t('generic.message_not_found')
        }
      })
    })
    navigate(
      { search: new URLSearchParams({}).toString() },
      { replace: true }
    )
  }, [])
}
