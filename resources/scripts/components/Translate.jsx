import { Trans, useTranslation } from "react-i18next";

function Translate({ ns, children, ...props }) {
  const { t } = useTranslation(ns);

  return (
    <Trans t={t} {...props}>
      { children }
    </Trans>
  )
}

export { Translate }
