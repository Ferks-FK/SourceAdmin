import { useUserStore } from "@/stores/user";
import { Avatar } from "@/components/Avatar";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { routes } from "@/routers/routes"
import { useEffect, useState } from "react";

function SideBar({ active }) {
  const [userName, userEmail, isLogged] = useUserStore((state) => [state.data?.name, state.data?.email, state.isLogged]);
  const [visibleRoutes, setVisibleRoutes] = useState([]);

  useEffect(() => {
    setVisibleRoutes(routes.sidebarRoutes.filter(route => {
      if (route?.isProtected && !isLogged) {
        return false
      }
      return true
    }))
  }, [])

  return (
    <>
      <div className={`flex flex-col h-full w-full mobile:w-5/6 mobile:max-w-[250px] z-10 bg-dark fixed md:static transition-all duration-200 ease-linear ${active ? 'left-0' : '-left-full'}`}>
        <nav className={`flex flex-col p-3 h-full`}>
          {isLogged ?
            <div className="flex justify-center items-center mb-3">
              <strong className="capitalize">{userName}</strong>
              <Avatar email={userEmail} />
            </div>
            :
            <div>

            </div>
          }
          {visibleRoutes.map(({title, key, icon, route, end = false}) => (
            <NavLink
              key={key}
              to={route}
              end={end}
              className="block w-full p-2 rounded nav-link-hover"
            >
              <div className="flex items-center">
                <FontAwesomeIcon icon={icon} size="1x" className="text-slate-200 w-8" />
                <p>{title}</p>
              </div>
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
};

export { SideBar };
