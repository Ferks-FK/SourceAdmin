<div class="d-flex flex-column flex-shrink-0 p-3 text-bg-dark" style="width: 280px; height: 100vh;">
    <div class="justify-content-center">
        <a href="/" class="fs-3 d-flex justify-content-center align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
            {{__('Sidebar')}}
        </a>
    </div>
  <hr>
  <div class="d-flex flex-column justify-content-between h-100">
    <ul class="nav nav-pills flex-column">
        <li>
            <a href="#" class="fs-6 nav-link text-white {{ request()->routeIs('dashboard') ? 'active' : '' }}">
                <i class="bi bi-speedometer"></i>
                {{__('Dashboard')}}
            </a>
        </li>
        <li class="sidebar-item">
            <a href="#" class="fs-6 nav-link text-white {{ request()->routeIs('servers') ? 'active' : '' }}">
                <i class="bi bi-server"></i>
                {{__('Servers')}}
            </a>
        </li>
        <li class="sidebar-item">
            <a href="#" class="fs-6 nav-link text-white {{ request()->routeIs('bans') ? 'active' : '' }}">
                <i class="bi bi-slash-circle"></i>
                {{__('Bans')}}
            </a>
        </li>
        <li class="sidebar-item">
            <a href="#" class="fs-6 nav-link text-white {{ request()->routeIs('comms') ? 'active' : '' }}">
                <i class="bi bi-mic-mute"></i>
                {{__('Comms')}}
            </a>
        </li>
        <li class="sidebar-item">
            <a href="#" class="fs-6 nav-link text-white {{ request()->routeIs('report') ? 'active' : '' }}">
                <i class="bi bi-exclamation-triangle"></i>
                {{__('Report Player')}}
            </a>
        </li>
        <li class="sidebar-item">
            <a href="#" class="fs-6 nav-link text-white {{ request()->routeIs('appeal') ? 'active' : '' }}">
                <i class="bi bi-lock-fill"></i>
                {{__('Appeal Ban')}}
            </a>
        </li>
        @auth
            <li class="sidebar-item">
                <a href="#" class="fs-6 nav-link text-white {{ request()->routeIs('admin') ? 'active' : '' }}">
                    <i class="bi bi-person-gear"></i>
                    {{__('Admin Panel')}}
                </a>
            </li>
        @endauth
    </ul>
    @auth
        <div>
            <hr>
            <div class="dropdown">
                <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="{{Auth::user()->getAvatar()}}" alt="User Avatar" width="32" height="32" class="rounded-circle me-2">
                    <strong>{{ucfirst(Auth::user()->name)}}</strong>
                </a>
                <ul class="dropdown-menu dropdown-menu-dark text-small shadow">
                    <li><a class="dropdown-item" href="{{route('profile.show')}}">{{__('Profile')}}</a></li>
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
        </div>
    </div>
  @endauth
</div>
