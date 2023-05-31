import { Header } from "@/components/layout/Header";
import { SideBar } from "@/components/layout/SideBar";
import { useSidebarStore } from "@/stores/components/sidebar";
import { useUserStore } from "@/stores/user";

export const Layout = ({ children, userAuth }) => {
  const sidebarIsVisible = useSidebarStore((state) => state.isVisible)
  const [ userData, setUserData ] = useUserStore((state) => [state.data, state.setUserData])

  if (!userData && userAuth) {
    setUserData(userAuth)
  }

  return (
    <>
      <div className="mx-auto w-auto">
        <Header/>
        <div className="flex w-screen h-screen relative" style={{height: 'calc(100vh - 3.6rem)'}}>
          <SideBar active={sidebarIsVisible}/>
          <div className={`flex flex-col w-full h-full bg-[#1a1e22] p-5 ${!sidebarIsVisible ? 'absolute md:static' : ''}`}>
            { children }
          </div>
        </div>
      </div>
    </>
  );
};
