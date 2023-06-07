import { useUserStore } from "@/stores/user";
import { useSidebarStore } from "@/stores/components/sidebar";
import { Avatar } from "@/components/Avatar";
import { NavLink } from "@/components/elements/NavLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { routes } from "@/routers/routes"
import { useEffect, useState } from "react";
import { Translate } from "@/components/Translate";
import { lowerCase } from "lodash";
import { Button } from "@/components/elements/button";
import { Size } from "@/components/elements/button/types"
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion"

function SideBar() {
  const [ userName, userEmail, isLogged ] = useUserStore((state) => [state.data?.name, state.data?.email, state.isLogged]);
  const [ sidebarIsVisible, setSidebarIsVisible ] = useSidebarStore((state) => [state.isVisible, state.setIsVisible])
  const [ visibleRoutes, setVisibleRoutes ] = useState([]);
  const [ activeRoute, setActiveRoute ] = useState(window.location.pathname); // Set the currently loaded route as 'active'.
  const { t } = useTranslation();

  const ocultSidebar = () => {
    if (sidebarIsVisible && window.screen.width < 768) {
      setSidebarIsVisible(!sidebarIsVisible)
    }
  }

  useEffect(() => {
    setVisibleRoutes(routes.sidebarRoutes.filter(route => {
      if (route?.isProtected && !isLogged) {
        return false
      }
      return true
    }))
  }, [])

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
        className={`flex flex-col max-w-sidebar-width w-full h-full z-10 bg-dark-primary absolute md:relative`}
      >
        <nav className={`flex flex-col h-full gap-1 p-3`}>
          {visibleRoutes.map(({title, key, icon, route}) => (
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
                <FontAwesomeIcon icon={icon} size="1x" className="text-slate-200 w-8"/>
                <p>
                  <Translate ns={"sidebar"}>
                    {lowerCase(title).replace(' ', '_')}
                  </Translate>
                </p>
              </div>
            </NavLink>
          ))}
        </nav>
        {isLogged ?
          <div className="flex justify-center items-center p-2 gap-2 text-ellipsis bg-dark-secondary rounded">
            <strong className={`capitalize`}>{userName}</strong>
            <Avatar email={userEmail} size={100} />
          </div>
        :
          <div className="flex justify-center">
          <Button.InternalLink size={Size.Small} type={'button'} to={'/auth/login'} className="w-full">
            {t('login', {ns: 'buttons'})}
          </Button.InternalLink>
        </div>
        }
      </motion.div>
    </>
  );
};

export { SideBar };
