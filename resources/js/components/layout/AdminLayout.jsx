import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "@/components/elements/NavLink";
import { routes } from "@/routers/routes";
import classNames from "classnames";

function AdminLayout({ className, children, ziggy }) {
  const [activeRoute, setActiveRoute] = useState(ziggy.location);

  return (
    <>
      <div className="flex justify-center">
        <div className="flex overflow-x-auto">
          <div className="flex flex-col gap-2 items-center pointer-events-none select-none">
            <div className="flex justify-center text-center gap-1 bg-dark-primary p-4 rounded">
              {routes.adminRoutes.map(({ title, key, icon, route }) => {
                const router = ziggy.url + route

                return (
                  <NavLink
                    key={key}
                    href={route}
                    className={`w-20 h-20 !border-l-0 !p-0 ${activeRoute == router ? 'active' : ''}`}
                    onClick={() => setActiveRoute(router)}
                  >
                    <div className="flex flex-col pointer-events-auto text-center rounded p-2 h-full cursor-pointer transition-all duration-150">
                      <FontAwesomeIcon icon={icon} color={'white'} size="xl" />
                      <p className="text-sm">{title}</p>
                    </div>
                  </NavLink>
                )
              })}
            </div>
          </div>
        </div>
      </div>
      <div className={classNames('flex flex-col', className)}>
        {children}
      </div>
    </>
  )
}

export { AdminLayout }
