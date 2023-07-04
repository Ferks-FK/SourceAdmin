import classNames from "classnames";
import { CSSProperties } from "react";

type Props = JSX.IntrinsicElements['select']

function Select({ children, className, onChange, value, name, ...props }: Props) {
  const SelectCustomStyles: CSSProperties = {
    WebkitAppearance: "none",
    MozAppearance: "none",
    backgroundPositionX: "calc(100% - 0.75rem)",
    backgroundPositionY: "center"
  }

  return (
    <select
      value={value}
      name={name}
      onChange={onChange}
      className={classNames('shadow-none bg-no-repeat cursor-pointer block py-3 px-4 rounded border w-full text-sm transition-all duration-150 ease-in-out border-slate-200 hover:border-slate-400 bg-[#1e2327] text-neutral-200', className)}
      style={SelectCustomStyles}
      {...props}
    >
      { children }
    </select>
  )
}

export { Select }
