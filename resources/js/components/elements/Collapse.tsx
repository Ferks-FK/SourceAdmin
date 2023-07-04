import classNames from "classnames";
import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  visible: boolean
}

const Collapse = ({ children, visible }: Props) => {
  return (
    <div
      className={classNames('h-0 overflow-hidden transition-all duration-300 ease',
      {
        ['h-60']: visible === true
      })}
    >
      {children}
    </div>
  )
}

export { Collapse }
