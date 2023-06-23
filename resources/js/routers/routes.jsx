import { faHouse,
  faServer,
  faBan, faLock,
  faMicrophoneSlash,
  faTriangleExclamation,
  faUserGear,
  faUser,
  faUsers,
  faBoxesStacked,
  faGear
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
      title: 'Mutes',
      key: 'mutes',
      icon: faMicrophoneSlash,
      route: '/mutes'
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
  ],
  adminRoutes: [
    {
      title: 'Admin Settings',
      key: 'admin_settings',
      icon: faUser,
      route: '/admin/admin_settings'
    },
    {
      title: 'Server Settings',
      key: 'server_settings',
      icon: faServer,
      route: '/admin/server_settings'
    },
    {
      title: 'Bans Settings',
      key: 'bans_settings',
      icon: faBan,
      route: '/admin/bans_settings'
    },
    {
      title: 'Mutes Settings',
      key: 'mutes_settings',
      icon: faMicrophoneSlash,
      route: '/admin/mutes_settings'
    },
    {
      title: 'Group Settings',
      key: 'group_settings',
      icon: faUsers,
      route: '/admin/group_settings'
    },
    {
      title: 'Mods Settings',
      key: 'mods_settings',
      icon: faBoxesStacked,
      route: '/admin/mods_settings'
    },
    {
      title: 'Panel Settings',
      key: 'panel_settings',
      icon: faGear,
      route: '/admin/panel_settings'
    }
  ]
};
