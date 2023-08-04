import { ReactNode } from "react";

interface SubNavigationProps {
  children: ReactNode
}

export const SubNavigation = (props: SubNavigationProps) => (
  <div className={'flex flex-row items-center overflow-x-auto flex-shrink-0 gap-1 pb-1 border-b border-neutral-700'}>
    {props.children}
  </div>
)
