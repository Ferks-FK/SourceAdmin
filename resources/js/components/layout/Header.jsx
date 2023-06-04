import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useSidebarStore } from "@/stores/components/sidebar";

function Header() {
  const [ sidebarIsVisible, setSidebarIsVisible ] = useSidebarStore((state) => [state.isVisible, state.setIsVisible]);
  const handleSidebar = () => setSidebarIsVisible(!sidebarIsVisible)

  return (
    <>
      <header className="flex w-full h-[3.6rem] bg-dark-primary border-b border-gray-100 dark:border-gray-700">
        <div className="flex justify-between items-center w-full h-full mx-7">
          <div className="text-center py-3">
            <a href="/" className="text-xl text-white text-center no-underline">
              Company Name
            </a>
          </div>
          <div className="flex items-center md:hidden">
            <div className="text-4xl">
              <FontAwesomeIcon icon={sidebarIsVisible ? faXmark : faBars} size="sm" className="text-white cursor-pointer transition-all duration-300 ease-in-out" onClick={handleSidebar}/>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export { Header }
