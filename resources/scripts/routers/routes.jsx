import { faHouse,
  faServer,
  faBan, faLock,
  faMicrophoneSlash,
  faTriangleExclamation,
  faUserGear
} from "@fortawesome/free-solid-svg-icons";

export const routes = {
  sidebarRoutes: [
    {
      title: 'Dashboard',
      key: 'dashboard',
      icon: faHouse,
      route: '/',
      end: true
    },
    {
      title: 'Servers',
      key: 'servers',
      icon: faServer,
      route: '/servers'
    },
    {
      title: 'Bans',
      key: 'bans',
      icon: faBan,
      route: '/bans'
    },
    {
      title: 'Comms',
      key: 'comms',
      icon: faMicrophoneSlash,
      route: '/comms'
    },
    {
      title: 'Report Player',
      key: 'report',
      icon: faTriangleExclamation,
      route: '/report'
    },
    {
      title: 'Appeal Ban',
      key: 'appeal',
      icon: faLock,
      route: '/appeal'
    },
    {
      title: 'Admin',
      key: 'admin',
      icon: faUserGear,
      route: '/admin',
      isProtected: true
    }
  ]
};
