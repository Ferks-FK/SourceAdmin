import classNames from "classnames";
import { ComponentPropsWithoutRef } from "react";

type Props = ComponentPropsWithoutRef<'img'>

function Image({ src, alt, children, className, ...props }: Props) {
  return (
    <img src={src} {...props} className={classNames(className)}>
      {children}
    </img>
  )
}

export { Image }
