import { ReactNode, useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { SideBar } from "@/components/layout/SideBar";
import { UserData, useUserStore } from "@/stores/user";
import { useDeviceType } from "@/hooks/useDeviceType";
import { LayoutType } from "@/App";
import { useSettingsStore } from "@/stores/settings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { faInfoCircle, faXmark } from "@fortawesome/free-solid-svg-icons";

interface Props {
  children: ReactNode
  userAuth: UserData
  layout: LayoutType
  locale: string
  generalSettings: Record<string, any>
}

export const Layout = ({ children, userAuth, layout, locale, generalSettings }: Props) => {
  const [ isLogged, setUserData ] = useUserStore((state) => [state.isLogged, state.setUserData]);
  const [ settings, setSettings ] = useSettingsStore((state) => [state.data, state.setSettings]);
  const [warningVisible, setWarningVisible] = useState<boolean>(true);

  useDeviceType()

  useEffect(() => {
    if (!isLogged && userAuth) {
      setUserData(userAuth)
    }

    if (!settings) {
      setSettings(generalSettings)
    }
  }, [isLogged, settings])

  return (
    <>
      <Header locale={locale}/>
      <div className="flex w-screen relative" style={{height: 'calc(100vh - 3.6rem)'}}>
        <SideBar layout={layout}/>
        <div className={`flex flex-col w-screen h-full bg-dark-neutral p-5 overflow-hidden`}>
          <div className={classNames('flex flex-col rounded flex-1 bg-teal-500 p-4 mb-4', {
            ['hidden']: warningVisible === false
          })}>
            <div className="flex justify-between">
              <div className="flex">
                <FontAwesomeIcon color="white" size="lg" icon={faInfoCircle} />&nbsp;
                <div>
                  <h1>This version is only a demo with dummy data for demonstration purposes.</h1>
                  <p>The database is reset every 1 hour.</p>
                </div>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faXmark} color="white" className="cursor-pointer" onClick={() => setWarningVisible(false)}/>
              </div>
            </div>
          </div>
          {children}
        </div>
      </div>
    </>
  );
};
