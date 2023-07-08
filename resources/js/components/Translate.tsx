import { HTMLAttributes } from "react";
import { Trans, useTranslation } from "react-i18next";

interface Props extends HTMLAttributes<HTMLDivElement> {
  ns: string
}

function Translate({ ns, children, ...props }: Props) {
  const { t } = useTranslation(ns);

  return (
    <Trans t={t} {...props}>
      { children }
    </Trans>
  )
}

export { Translate }
