import { ReactNode } from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { NavLink } from "@/components/elements/NavLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";

interface SubNavigationProps {
  children: ReactNode
}

interface SubNavigationLinkProps {
  name: string
  to: string
  icon: IconDefinition
  className?: string
}

export const SubNavigation = (props: SubNavigationProps) => (
  <div className={'flex flex-row items-center overflow-x-auto flex-shrink-0 gap-1 pb-1 border-b border-neutral-700'}>
    {props.children}
  </div>
)

export const SubNavigationLink = ({ name, to, icon, className }: SubNavigationLinkProps) => (
  <NavLink href={to} className={classNames(className, 'flex items-center gap-1 mb-2 !border-l-0 !w-fit !border-b-2')}>
    <FontAwesomeIcon icon={icon} size="lg" className="text-neutral-100 active:text-red-200"/>
    <p className="text-lg">{name}</p>
  </NavLink>
)
