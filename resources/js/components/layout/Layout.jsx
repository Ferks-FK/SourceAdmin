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
      <Header/>
      <div className="flex w-full h-full" style={{height: 'calc(100vh - 3.6rem)'}}>
        <SideBar active={sidebarIsVisible}/>
        {/* This is the way I managed to fix the damn layout. */}
        <div className={`flex flex-col w-screen h-full bg-dark-neutral p-5`} style={{ width: 'calc(100% - var(--sidebar-width))' }}>
          { children }
        </div>
      </div>
    </>
  );
};
