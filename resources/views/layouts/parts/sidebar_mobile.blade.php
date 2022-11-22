<div class="flex flex-col p-3 h-full">
  <div class="text-center">
    <a href="/" class="text-xl text-white text-center no-underline">
      {{__('Company Name')}}
    </a>
  </div>
  <hr/>
  <div class="flex flex-col md:justify-between h-full max-w-sm">
    @if (Auth::check())
      <div class="flex w-fit md:order-1 mb-5 md:mb-0 text-white items-center">
        <button id="dropdownAvatarNameButton" data-dropdown-toggle="dropdownAvatar" class="flex items-center text-sm font-medium rounded-full hover:text-gray-300 dark:hover:text-gray-300 md:mr-0 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-white" type="button">
          <span class="sr-only">User Menu</span>
          <img class="mr-2 w-8 h-8 rounded-full" src="{{ Auth::user()->getAvatar() }}" alt="user photo">
          <strong>{{ucfirst(Auth::user()->name)}}</strong>
          <ion-icon name="chevron-down-sharp" class="mx-1.5"></ion-icon>
        </button>
      </div>
      <div id="dropdownAvatar" class="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
        <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownAvatarNameButton">
          <a href="{{ route('profile.edit') }}" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
            {{__('Profile')}}
          </a>
          </li>
        </ul>
        <div class="py-1">
          <a class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" href="{{ route('logout') }}" onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
            <form method="POST" id="logout-form" action="{{ route('logout') }}" x-data>
              @csrf
            </form>
            {{__('Sign out')}}
          </a>
        </div>
    </div>
    @else
      <div class="flex justify-center pb-3 md:pb-0 md:order-1">
        <x-secondary-button>
          <a href="{{ route('login') }}" class="text-white text-decoration-none">
            <strong>{{__('Login')}}</strong>
          </a>
        </x-secondary-button>
      </div>
    @endif
  <div class="flex flex-col justify-between h-100">
    <ul class="flex flex-col list-none">
      <li class="nav-link-hover {{ request()->routeIs('home') ? 'nav-item-active' : '' }}">
        <a href="{{ route('home') }}" class="nav-item text-white text-base">
          <i class="bi bi-speedometer"></i>
          {{__('Dashboard')}}
        </a>
      </li>
      <li class="nav-link-hover {{ request()->routeIs('servers') ? 'nav-item-active' : '' }}">
        <a href="#" class="nav-item text-white text-base">
          <i class="bi bi-server"></i>
          {{__('Servers')}}
        </a>
      </li>
      <li class="nav-link-hover {{ request()->routeIs('bans') ? 'nav-item-active' : '' }}">
        <a href="#" class="nav-item text-white text-base">
          <i class="bi bi-slash-circle"></i>
          {{__('Bans')}}
        </a>
      </li>
      <li class="nav-link-hover {{ request()->routeIs('comms') ? 'nav-item-active' : '' }}">
        <a href="#" class="nav-item text-white text-base">
          <i class="bi bi-mic-mute"></i>
          {{__('Comms')}}
        </a>
      </li>
      <li class="nav-link-hover {{ request()->routeIs('report') ? 'nav-item-active' : '' }}">
        <a href="#" class="nav-item text-white text-base">
          <i class="bi bi-exclamation-triangle"></i>
          {{__('Report Player')}}
        </a>
      </li>
      <li class="nav-link-hover {{ request()->routeIs('appeal') ? 'nav-item-active' : '' }}">
        <a href="#" class="nav-item text-white text-base">
          <i class="bi bi-lock-fill"></i>
          {{__('Appeal Ban')}}
        </a>
      </li>
      @auth
        <li class="nav-link-hover {{ request()->routeIs('admin') ? 'nav-item-active' : '' }}">
          <a href="#" class="nav-item text-white text-base">
            <i class="bi bi-person-gear"></i>
            {{__('Admin Panel')}}
          </a>
        </li>
      @endauth
    </ul>
  </div>
</div>
</div>
