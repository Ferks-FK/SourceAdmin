import { Header } from "@/components/layout/Header";
import { SideBar } from "@/components/layout/SideBar";
import { useSidebarStore } from "@/stores/components/sidebar";

export const Layout = ({ children }) => {
  const sidebarIsVisible = useSidebarStore((state) => state.isVisible)

  return (
    <>
      <div className="mx-auto w-auto">
        <Header/>
        <div className="flex w-screen h-screen" style={{height: 'calc(100vh - 3.6rem)'}}>
          <SideBar active={sidebarIsVisible}/>
          <div className={`flex flex-col justify-between w-full h-full bg-[#1a1e22] p-5 transition-all duration-200 ease-linear`}>
            { children }
          </div>
        </div>
      </div>
    </>
  );
};
