<header class="flex justify-end w-full h-[3.6rem] bg-dark border-b border-gray-100 dark:border-gray-700">
  <div class="flex items-center">
    <div class="dropdown hidden">
      <a href="#" class="btn btn-dark dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        <i class="bi bi-search"></i>
      </a>
      <ul class="dropdown-menu p-2">
        <div class="input-group">
          <li class="mb-2">
            <form action="/" method="GET">
              <input type="text" name="search" id="search" class="form-control" placeholder="{{__('Search Bans')}}">
            </form>
          </li>
          <li>
            <form action="/" method="GET">
              <input type="text" name="search" id="search" class="form-control" placeholder="{{__('Search Comms')}}">
            </form>
          </li>
        </div>
      </ul>
    </div>
    <div id="btn-mobile" class="text-4xl">
      <ion-icon class="text-white md:hidden" name="menu"></ion-icon>
    </div>
  </div>
</header>