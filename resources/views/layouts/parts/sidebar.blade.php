<div class="flex flex-col shrink-0 p-3 bg-[#212529] h-100 w-[18rem]">
  <div class="flex justify-center">
    <a href="/" class="text-xl text-white text-center no-underline">
      {{__('Company Name')}}
    </a>
  </div>
  <hr>
  <div class="flex flex-col justify-between h-100">
    <ul class="flex flex-col list-none">
      <li class="nav-item {{ request()->routeIs('home') ? 'nav-item-active' : 'nav-link-hover' }}">
        <a href="{{ route('home') }}" class="text-white text-base">
          <i class="bi bi-speedometer"></i>
          {{__('Dashboard')}}
        </a>
      </li>
      <li class="nav-item {{ request()->routeIs('servers') ? 'nav-item-active' : 'nav-link-hover' }}">
        <a href="#" class="text-white text-base">
          <i class="bi bi-server"></i>
          {{__('Servers')}}
        </a>
      </li>
      <li class="nav-item {{ request()->routeIs('bans') ? 'nav-item-active' : 'nav-link-hover' }}">
        <a href="#" class="text-white text-base">
          <i class="bi bi-slash-circle"></i>
          {{__('Bans')}}
        </a>
      </li>
      <li class="nav-item {{ request()->routeIs('comms') ? 'nav-item-active' : 'nav-link-hover' }}">
        <a href="#" class="text-white text-base">
          <i class="bi bi-mic-mute"></i>
          {{__('Comms')}}
        </a>
      </li>
      <li class="nav-item {{ request()->routeIs('report') ? 'nav-item-active' : 'nav-link-hover' }}">
        <a href="#" class="text-white text-base">
          <i class="bi bi-exclamation-triangle"></i>
          {{__('Report Player')}}
        </a>
      </li>
      <li class="nav-item {{ request()->routeIs('appeal') ? 'nav-item-active' : 'nav-link-hover' }}">
        <a href="#" class="text-white text-base">
          <i class="bi bi-lock-fill"></i>
          {{__('Appeal Ban')}}
        </a>
      </li>
      @auth
        <li class="nav-item {{ request()->routeIs('admin') ? 'nav-item-active' : 'nav-link-hover' }}">
          <a href="#" class="text-white text-base">
            <i class="bi bi-person-gear"></i>
            {{__('Admin Panel')}}
          </a>
        </li>
      @endauth
    </ul>
    @if (Auth::check())
      <div class="dropdown">
        <hr>
        <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle w-min" data-bs-toggle="dropdown" aria-expanded="false">
          <img src="{{ Auth::user()->getAvatar() }}" alt="User Avatar" width="32" height="32" class="rounded-circle me-2">
          <strong>{{ucfirst(Auth::user()->name)}}</strong>
        </a>
          <ul class="dropdown-menu dropdown-menu-dark text-small shadow">
            <li><a class="dropdown-item" href="{{route('profile.edit')}}">{{__('Profile')}}</a></li>
            <li><a class="dropdown-item" href="#">{{__('Settings')}}</a></li>
            <li><hr class="dropdown-divider"></li>
            <li>
              <a class="dropdown-item" href="{{route('logout')}}" onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                <form method="POST" id="logout-form" action="{{ route('logout') }}" x-data>
                    @csrf
                </form>
                {{__('Sign out')}}
              </a>
            </li>
          </ul>
      </div>
      @else
        <div class="flex justify-center">
          <button class="btn btn-outline-success">
            <a href="{{ route('login') }}" class="text-white text-decoration-none">
              <strong>{{__('Login')}}</strong>
            </a>
          </button>
        </div>
      @endif
  </div>
</div>
