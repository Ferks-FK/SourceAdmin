import { Link } from '@inertiajs/react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Button({ to, children, className, isLoading, icon, ...props }) {
  return (
    <button {...props} className={`bg-green-500 hover:bg-green-600 transition-all duration-150 text-white rounded disabled:cursor-not-allowed disabled:opacity-75 ${className ?? ''}`}>
      {to ?
        icon ? (
          <div className="flex items-center">
            <FontAwesomeIcon icon={icon} className="w-5"/>
            <Link href={to} className={`block text-xs tracking-wide p-2 no-underline uppercase ${isLoading && 'cursor-not-allowed'}`}>
              {children}
            </Link>
          </div>
        )
        :
        <Link href={to} className={`block text-xs tracking-wide p-2 no-underline uppercase ${isLoading && 'cursor-not-allowed'}`}>
          {children}
        </Link>
      :
        icon ? (
          <div className="flex items-center">
            <FontAwesomeIcon icon={icon} className="w-5"/>
            {children}
          </div>
        )
        :
          children
      }
    </button>
  )
}

export { Button }
