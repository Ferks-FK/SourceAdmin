import { Header } from "@/components/layout/Header";
import { SideBar } from "@/components/layout/SideBar";
import { useUserStore } from "@/stores/user";
import { useDeviceType } from "@/hooks/useDeviceType";

export const Layout = ({ children, userAuth, layout }) => {
  const [ userData, setUserData ] = useUserStore((state) => [state.data, state.setUserData])

  useDeviceType()

  if (!userData && userAuth) {
    setUserData(userAuth)
  }

  return (
    <>
      <Header/>
      <div className="flex w-screen relative" style={{height: 'calc(100vh - 3.6rem)'}}>
        <SideBar layout={layout}/>
        <div className={`flex flex-col w-screen h-full bg-dark-neutral p-5 overflow-hidden`}>
          { children }
        </div>
      </div>
    </>
  );
};
