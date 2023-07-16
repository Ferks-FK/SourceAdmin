import { useUserStore } from "@/stores/user";
import { useSidebarStore } from "@/stores/components/sidebar";
import { Avatar } from "@/components/Avatar";
import { NavLink } from "@/components/elements/NavLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { routes, Route } from "@/routers/routes";
import { useEffect, useState } from "react";
import { Translate } from "@/components/Translate";
import { lowerCase } from "lodash";
import { Button } from "@/components/elements/button";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { faReply, faUserGear } from "@fortawesome/free-solid-svg-icons";
import { LayoutType } from "@/App";
import { can } from "@/helpers";

interface Props {
  layout: LayoutType
}

function SideBar({ layout }: Props) {
  const [userData, isLogged] = useUserStore((state) => [state.data, state.isLogged]);
  const [sidebarIsVisible, setSidebarIsVisible] = useSidebarStore((state) => [state.isVisible, state.setIsVisible])
  const [visibleRoutes, setVisibleRoutes] = useState<Route[]>([]);
  const [activeRoute, setActiveRoute] = useState<string>(window.location.pathname); // Set the currently loaded route as 'active'.
  const { t } = useTranslation();

  const ocultSidebar = () => {
    if (sidebarIsVisible && window.screen.width < 768) {
      setSidebarIsVisible()
    }
  }

  const getFilteredAdminRoutes = routes.adminRoutes.filter((route) => {
    if (route.permission != undefined) {
      return can(route.permission)
    }

    return true
  })

  useEffect(() => {
    if (layout === 'app') {
      setVisibleRoutes(routes.sidebarRoutes)
    }

    if (isLogged && layout === 'admin') {
      setVisibleRoutes(getFilteredAdminRoutes)
    }

  }, [userData, isLogged])

  const sidebarVariants = {
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
      },
    },
    closed: {
      opacity: 0,
      x: '-100%',
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <>
      <motion.div
        animate={sidebarIsVisible ? 'open' : 'closed'}
        variants={sidebarVariants}
        initial={sidebarIsVisible ? 'open' : 'closed'}
        exit={{ display: 'none' }}
        className={`flex flex-col max-w-[280px] w-full h-full z-10 bg-dark-primary absolute md:relative`}
      >
        <nav className={`flex flex-col justify-between h-full p-3 overflow-y-auto`}>
          <div className="flex flex-col gap-1">
            {visibleRoutes.map(({ title, key, icon, route }) => (
              <NavLink
                key={key}
                href={route}
                className={`${activeRoute === route ? 'active' : ''}`}
                onClick={() => {
                  setActiveRoute(route)
                  ocultSidebar()
                }}
              >
                <div className="flex items-center">
                  <FontAwesomeIcon icon={icon} size="1x" className="text-slate-200 w-8" />
                  <p>
                    <Translate ns={"sidebar"}>
                      {lowerCase(title).replace(' ', '_')}
                    </Translate>
                  </p>
                </div>
              </NavLink>
            ))}
            {(layout === 'app' && isLogged) && (
              <a
                href={'/admin'}
                className="block border-l-4 border-transparent w-full p-2 rounded nav-link-hover"
                onClick={ocultSidebar}
              >
                <div className="flex items-center rounded">
                  <FontAwesomeIcon icon={faUserGear} size="1x" className="text-slate-200 w-8" />
                  <p>{t('admin', { ns: 'sidebar' })}</p>
                </div>
              </a>
            )}
          </div>
          {layout === 'admin' && (
            <a
              href={'/'}
              className="block border-l-4 border-transparent w-full p-2 nav-link-hover"
              onClick={ocultSidebar}
            >
              <div className="flex items-center rounded">
                <FontAwesomeIcon icon={faReply} size="1x" className="text-slate-200 w-8" />
                <p>{t('return', {ns: 'sidebar'})}</p>
              </div>
            </a>
          )}
        </nav>
        {isLogged ?
          <div className="flex justify-center items-center p-2 gap-2 text-ellipsis bg-dark-secondary rounded">
            <strong className={`capitalize`}>{userData!.name}</strong>
            <Avatar email={userData!.email} size={100} />
          </div>
          :
          <div className="flex justify-center">
            <Button.InternalLink
              type={'button'}
              to={'/auth/login'}
              className="!w-full"
              onClick={ocultSidebar}
            >
              {t('login', { ns: 'buttons' })}
            </Button.InternalLink>
          </div>
        }
      </motion.div>
    </>
  );
};

export { SideBar };
