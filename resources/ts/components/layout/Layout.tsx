import { ReactNode, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { SideBar } from "@/components/layout/SideBar";
import { UserData, useUserStore } from "@/stores/user";
import { useDeviceType } from "@/hooks/useDeviceType";
import { LayoutType } from "@/App";
import { useSettingsStore } from "@/stores/settings";
import { GeneralSettingsProps } from "@/api/getSettings";

interface Props {
  children: ReactNode
  userAuth: UserData
  layout: LayoutType
  locale: string
  generalSettings: GeneralSettingsProps
}

export const Layout = ({ children, userAuth, layout, locale, generalSettings }: Props) => {
  const [ isLogged, setUserData ] = useUserStore((state) => [state.isLogged, state.setUserData]);
  const [ settings, setSettings ] = useSettingsStore((state) => [state.data, state.setSettings]);

  useDeviceType()

  useEffect(() => {
    if (!isLogged && userAuth) {
      setUserData(userAuth)
    }

    if (!settings) {
      setSettings({
        GeneralSettings: generalSettings
      })
    }
  }, [isLogged, settings])

  return (
    <>
      <Header locale={locale}/>
      <div className="relative flex w-screen" style={{height: 'calc(100vh - 3.6rem)'}}>
        <SideBar layout={layout}/>
        <div className={`flex flex-col w-screen h-full bg-dark-neutral p-5 overflow-hidden`}>
          { children }
        </div>
      </div>
    </>
  );
};
