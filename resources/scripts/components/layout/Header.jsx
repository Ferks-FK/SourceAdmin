import CompanyName from "@/api/settings/getCompanyName";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useSidebarStore } from "@/stores/components/sidebar";

function Header() {
  const [ sidebarIsVisible, setSidebarIsVisible ] = useSidebarStore((state) => [state.isVisible, state.setIsVisible]);
  const handleSidebar = () => setSidebarIsVisible(!sidebarIsVisible)

  return (
    <>
      <header className="flex w-full h-[3.6rem] bg-dark border-b border-gray-100 dark:border-gray-700">
        <div className="flex justify-between items-center w-full h-full mx-7">
          <div className="text-center py-3">
            <a href="/" className="text-xl text-white text-center no-underline">
              Company Name
            </a>
          </div>
          <div className="flex items-center">
            <div className="dropdown hidden">
              <a href="#" className="btn btn-dark dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i className="bi bi-search"></i>
              </a>
              <ul className="dropdown-menu p-2">
                <div className="input-group">
                  <li className="mb-2">
                    <form action="/" method="GET">
                      <input type="text" name="search" id="search" className="form-control" placeholder="{{__('Search Bans')}}"/>
                    </form>
                  </li>
                  <li>
                    <form action="/" method="GET">
                      <input type="text" name="search" id="search" className="form-control" placeholder="{{__('Search Comms')}}"/>
                    </form>
                  </li>
                </div>
              </ul>
            </div>
            <div className="text-4xl md:hidden">
              <FontAwesomeIcon icon={sidebarIsVisible ? faXmark : faBars} size="sm" className="text-white cursor-pointer transition-all duration-300 ease-in-out" onClick={handleSidebar}/>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export { Header }
