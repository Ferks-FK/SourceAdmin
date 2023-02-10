import CompanyName from "@/api/settings/getCompanyName";

function Header() {
  return (
    <>
      <header className="flex h-[3.6rem] bg-dark border-b border-gray-100 dark:border-gray-700">
        <div className="flex justify-between items-center w-full h-full mx-7">
          <div className="text-center">
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
            <div id="btn-mobile" className="text-4xl">
              {/* <ion-icon id="hamburguer-icon" className="text-white md:hidden" name="menu"></ion-icon> */}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export { Header }
