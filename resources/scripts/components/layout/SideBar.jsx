import { useUserStore } from "@/stores/user";
import { useSidebarStore } from "@/stores/components/sidebar";
import { Avatar } from "@/components/Avatar";
import { NavLink } from "@/components/elements/NavLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { routes } from "@/routers/routes"
import { useEffect, useState } from "react";
import { Translate } from "@/components/Translate";
import { lowerCase } from "lodash";
import { Button } from "@/components/elements/Button";
import { useTranslation } from "react-i18next";

function SideBar({ active }) {
  const [ userName, userEmail, isLogged ] = useUserStore((state) => [state.data?.name, state.data?.email, state.isLogged]);
  const [ sidebarIsVisible, setSidebarIsVisible ] = useSidebarStore((state) => [state.isVisible, state.setIsVisible])
  const [ visibleRoutes, setVisibleRoutes ] = useState([]);
  const [ activeRoute, setActiveRoute ] = useState('/'); // home route is active by default.
  const { t } = useTranslation();

  const ocultSidebar = () => {
    if (sidebarIsVisible && window.screen.width < 768) {
      setSidebarIsVisible(!sidebarIsVisible)
    }
  }

  const handleMouseEnter = () => {
    if (sidebarIsVisible && window.screen.width >= 768) {
      setSidebarIsVisible(!sidebarIsVisible)
    }
  }

  const handleActiveRoute = (route) => {
    setActiveRoute(route);
  };

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
      <div onMouseEnter={handleMouseEnter} className={`flex flex-col h-full w-full mobile:max-w-[250px] z-10 bg-dark absolute mb:relative md:!transition-[width] transition-all duration-200 ease-in ${active ? 'md:w-20 translate-x-0' : 'md:w-full translate-x-[-100%] md:translate-x-0'}`}>
        <nav className={`flex flex-col h-full gap-1 p-3 ${sidebarIsVisible ? 'md:items-center' : ''}`}>
          {visibleRoutes.map(({title, key, icon, route}) => (
            <NavLink
              key={key}
              href={route}
              className={`${sidebarIsVisible ? 'md:!w-auto' : ''} ${activeRoute === route ? 'active' : ''}`}
              onClick={() => {
                handleActiveRoute(route)
                ocultSidebar()
              }}
            >
              <div className="flex items-center">
                <FontAwesomeIcon icon={icon} size="1x" className="text-slate-200 w-8"/>
                <p className={`${sidebarIsVisible ? 'md:hidden' : ''}`}>
                  <Translate ns={"sidebar"}>
                    {lowerCase(title).replace(' ', '_')}
                  </Translate>
                </p>
              </div>
            </NavLink>
          ))}
        </nav>
        {isLogged ?
          <div className="flex justify-center items-center p-2 gap-2 text-ellipsis bg-lightDark rounded">
            <strong className={`${sidebarIsVisible ? 'md:hidden' : ''} capitalize`}>{userName}</strong>
            <Avatar email={userEmail} size={100} />
          </div>
        :
          <div className="flex justify-center">
          <Button type={'button'} to={'/auth/login'} className="w-full">
            {t('login', {ns: 'buttons'})}
          </Button>
        </div>
        }
      </div>
    </>
  );
};

export { SideBar };
