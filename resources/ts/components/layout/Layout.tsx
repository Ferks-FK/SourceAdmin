import { Header } from "@/components/layout/Header";
import { SideBar } from "@/components/layout/SideBar";
import { UserData, useUserStore } from "@/stores/user";
import { useDeviceType } from "@/hooks/useDeviceType";
import { LayoutType } from "@/App";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

interface Props {
  children: React.ReactNode
  userAuth: UserData
  layout: LayoutType
}

export const Layout = ({ children, userAuth, layout }: Props) => {
  const [isLogged, setUserData] = useUserStore((state) => [state.isLogged, state.setUserData])

  useDeviceType()

  if (!isLogged && userAuth) {
    setUserData(userAuth)
  }

  return (
    <>
      <Header />
      <div className="flex w-screen relative" style={{ height: 'calc(100vh - 3.6rem)' }}>
        <SideBar layout={layout} />
        <div className={`flex flex-col w-screen h-full bg-dark-neutral p-5 overflow-hidden`}>
        <div className="flex flex-col rounded flex-1 bg-teal-500 p-4 mb-4">
          <div className="flex">
            <FontAwesomeIcon color="white" size="lg" icon={faInfoCircle} />&nbsp;
            <div>
              <h1>This version is only a demo with dummy data for demonstration purposes.</h1>
              <p>The database is reset every 1 hour.</p>
            </div>
          </div>
        </div>
          {children}
        </div>
      </div>
    </>
  );
};
