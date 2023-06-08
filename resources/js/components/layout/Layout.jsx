import { Header } from "@/components/layout/Header";
import { SideBar } from "@/components/layout/SideBar";
import { useUserStore } from "@/stores/user";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
          <div className="flex flex-col rounded flex-1 bg-teal-500 p-4 mb-4">
            <div>
              <FontAwesomeIcon icon={faInfoCircle}/>&nbsp;
              <div>
                <h1>This version is only a demo with dummy data for demonstration purposes.</h1>
                <p>The database is reset every 1 hour.</p>
              </div>
            </div>

          </div>
          { children }
        </div>
      </div>
    </>
  );
};
