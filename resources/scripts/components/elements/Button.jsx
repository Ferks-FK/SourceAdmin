import { Link } from "react-router-dom";

function Button({ to, children, className, isLoading, ...props }) {
  return (
    <button {...props} className={`bg-green-500 hover:bg-green-600 transition-all duration-150 text-white rounded disabled:cursor-not-allowed disabled:opacity-75 ${className ?? ''} ${!to && 'p-2'}`}>
      {to ?
        <Link to={to} className="block text-xs tracking-wide p-2 no-underline uppercase">
          {children}
        </Link>
      :
        children
      }
    </button>
  )
}

export { Button }
