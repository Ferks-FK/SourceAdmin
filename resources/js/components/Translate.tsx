import { BaseProps } from "@/types";
import { Trans, useTranslation } from "react-i18next";

interface Props extends BaseProps {
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
