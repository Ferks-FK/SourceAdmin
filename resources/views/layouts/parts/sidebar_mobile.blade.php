<div class="flex flex-col p-3 md:h-full">
  <div class="text-center">
    <a href="/" class="text-xl text-white text-center no-underline">
      {{__('Company Name')}}
    </a>
  </div>
  <hr/>
  <div class="flex flex-col justify-between md:h-full">
    @if (Auth::check())
      <div class="flex justify-center pb-3 md:order-1">
        <hr/>
        <a href="{{ route('profile.edit') }}" class="flex items-center text-white no-underline">
          <img src="{{ Auth::user()->getAvatar() }}" alt="User Avatar" width="40" height="40" class="rounded-full mr-2">
        </a>
        <div class="flex flex-col text-white">
          <strong>{{ucfirst(Auth::user()->name)}}</strong>
          <a class="text-white no-underline hover:underline" href="{{ route('logout') }}" onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
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
      <li class=" {{ request()->routeIs('home') ? 'nav-item-active' : 'nav-link-hover' }}">
        <a href="{{ route('home') }}" class="nav-item text-white text-base">
          <i class="bi bi-speedometer"></i>
          {{__('Dashboard')}}
        </a>
      </li>
      <li class=" {{ request()->routeIs('servers') ? 'nav-item-active' : 'nav-link-hover' }}">
        <a href="#" class="nav-item text-white text-base">
          <i class="bi bi-server"></i>
          {{__('Servers')}}
        </a>
      </li>
      <li class=" {{ request()->routeIs('bans') ? 'nav-item-active' : 'nav-link-hover' }}">
        <a href="#" class="nav-item text-white text-base">
          <i class="bi bi-slash-circle"></i>
          {{__('Bans')}}
        </a>
      </li>
      <li class="{{ request()->routeIs('comms') ? 'nav-item-active' : 'nav-link-hover' }}">
        <a href="#" class="nav-item text-white text-base">
          <i class="bi bi-mic-mute"></i>
          {{__('Comms')}}
        </a>
      </li>
      <li class="{{ request()->routeIs('report') ? 'nav-item-active' : 'nav-link-hover' }}">
        <a href="#" class="nav-item text-white text-base">
          <i class="bi bi-exclamation-triangle"></i>
          {{__('Report Player')}}
        </a>
      </li>
      <li class="{{ request()->routeIs('appeal') ? 'nav-item-active' : 'nav-link-hover' }}">
        <a href="#" class="nav-item text-white text-base">
          <i class="bi bi-lock-fill"></i>
          {{__('Appeal Ban')}}
        </a>
      </li>
      @auth
        <li class="{{ request()->routeIs('admin') ? 'nav-item-active' : 'nav-link-hover' }}">
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
