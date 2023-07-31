import { ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import { SideBar } from "@/components/layout/SideBar";
import { UserData, useUserStore } from "@/stores/user";
import { useDeviceType } from "@/hooks/useDeviceType";
import { LayoutType, AppSettings } from "@/App";
import { useSettingsStore } from "@/stores/settings";

interface Props {
  children: ReactNode
  userAuth: UserData
  layout: LayoutType
  locale: string
  appSettings: AppSettings
}

export const Layout = ({ children, userAuth, layout, locale, appSettings }: Props) => {
  const [ isLogged, setUserData ] = useUserStore((state) => [state.isLogged, state.setUserData]);
  const [ settings, setSettings ] = useSettingsStore((state) => [state.data, state.setSettings]);

  useDeviceType()

  if (!isLogged && userAuth) {
    setUserData(userAuth)
  }

  if (!settings) {
    setSettings(appSettings)
  }

  return (
    <>
      <Header locale={locale}/>
      <div className="flex w-screen relative" style={{height: 'calc(100vh - 3.6rem)'}}>
        <SideBar layout={layout}/>
        <div className={`flex flex-col w-screen h-full bg-dark-neutral p-5 overflow-hidden`}>
          { children }
        </div>
      </div>
    </>
  );
};
