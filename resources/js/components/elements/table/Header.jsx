import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";

const Component = ({ title, icon, iconSize = 'lg', children, className }) => (
  <div className={classNames('flex text-center items-center justify-between p-4 bg-dark-primary border-b border-dark-secondary', className)}>
    {title && (
      <h1>
        {icon && <FontAwesomeIcon icon={icon} size={iconSize}/>}&nbsp;
        {title}
      </h1>
    )}
    {children}
  </div>
)

const Header = Object.assign(Component, {})

export default Header
