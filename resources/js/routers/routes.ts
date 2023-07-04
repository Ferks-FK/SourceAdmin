import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { faHouse,
  faServer,
  faBan, faLock,
  faMicrophoneSlash,
  faTriangleExclamation,
  faUser,
  faUsers,
  faBoxesStacked,
  faGear,
  faListUl
} from "@fortawesome/free-solid-svg-icons";

export interface Route {
    title: string
    key: string
    icon: IconDefinition
    route: string
    end?: boolean
}

interface Props {
    sidebarRoutes: Route[]
    adminRoutes: Route[]
}

export const routes: Props = {
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
    }
  ],
  adminRoutes: [
    {
      title: 'Admin Overview',
      key: 'admin_overview',
      icon: faListUl,
      route: '/admin'
    },
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
