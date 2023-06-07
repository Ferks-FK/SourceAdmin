import { Link } from '@inertiajs/react';

function NavLink({ href, children, className, ...props }) {
  return (
    <Link
      href={href}
      className={`block border-l-4 border-transparent w-full p-2 rounded nav-link-hover ${className ?? ''}`}
      {...props}
    >
      {children}
    </Link>
  )
}

export { NavLink }
