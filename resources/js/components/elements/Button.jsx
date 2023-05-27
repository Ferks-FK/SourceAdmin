import { Link } from '@inertiajs/react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Button({ to, children, className, isLoading, icon, iconPosition = 'left', ...props }) {
  const buttonStyles = `bg-green-500 hover:bg-green-600 transition-all duration-150 text-white rounded disabled:cursor-not-allowed disabled:opacity-75 ${className ?? ''}`;
  const linkStyles = `block text-sm p-1 tracking-wide no-underline ${isLoading ? 'cursor-not-allowed' : ''}`;

  // if (to !== undefined || to !== null && (to.startsWith('steam'))) {
  //   console.log('ta aqui')
  //   return (
  //     <button className={buttonStyles}>
  //       <a href={to} className={linkStyles} {...props}>
  //         {children}
  //       </a>
  //     </button>
  //   )
  // }

  return (
    <button {...props} className={buttonStyles}>
      {to ?
        icon ? (
          <div className={`flex items-center ${iconPosition === 'right' ? 'flex-row-reverse' : ''}`}>
            <FontAwesomeIcon icon={icon} className="w-5"/>
            <Link href={to} className={linkStyles}>
              {children}
            </Link>
          </div>
        )
        :
        <Link href={to} className={linkStyles}>
          {children}
        </Link>
      :
        icon ? (
          <div className={`flex items-center ${iconPosition === 'right' ? 'flex-row-reverse' : ''}`}>
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
