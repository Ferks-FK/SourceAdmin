import { Link, InertiaLinkProps } from '@inertiajs/react';
import classNames from 'classnames';

interface Props extends InertiaLinkProps {
  href: string
}

function NavLink({ href, children, className, ...props }: Props) {
  return (
    <Link
      href={href}
      className={classNames('block border-l-4 border-transparent w-full p-2 rounded nav-link-hover', className)}
      {...props}
    >
      {children}
    </Link>
  )
}

export { NavLink }
