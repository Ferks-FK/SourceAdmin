import { ComponentPropsWithoutRef } from "react";

type Props = ComponentPropsWithoutRef<'label'>

function Label({ htmlFor, children }: Props) {
  return (
    <label htmlFor={htmlFor} className={`block text-xs uppercase text-neutral-200 mb-1 sm:mb-2`}>
      { children }
    </label>
  )
}

export { Label };
