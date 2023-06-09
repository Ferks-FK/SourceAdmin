import { Header } from "@/components/layout/Header";
import { SideBar } from "@/components/layout/SideBar";
import { useUserStore } from "@/stores/user";

export const Layout = ({ children, userAuth }) => {
  const [ userData, setUserData ] = useUserStore((state) => [state.data, state.setUserData])

  if (!userData && userAuth) {
    setUserData(userAuth)
  }

  return (
    <>
      <Header/>
      <div className="flex w-screen" style={{height: 'calc(100vh - 3.6rem)'}}>
        <SideBar/>
        <div className={`flex flex-col w-screen h-full bg-dark-neutral p-5 overflow-hidden`}>
          { children }
        </div>
      </div>
    </>
  );
};
