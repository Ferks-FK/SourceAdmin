import { IconDefinition, faUsersGear } from "@fortawesome/free-solid-svg-icons";
import {
    faHouse,
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
    permission?: string
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
            title: 'Admins',
            key: 'admins',
            icon: faUser,
            route: '/admin/admin_settings',
            permission: 'admin.admins.index'
        },
        {
            title: 'Servers',
            key: 'servers',
            icon: faServer,
            route: '/admin/server_settings',
            permission: 'admin.servers.index'
        },
        {
            title: 'Bans',
            key: 'bans',
            icon: faBan,
            route: '/admin/bans_settings'
        },
        {
            title: 'Mutes',
            key: 'mutes',
            icon: faMicrophoneSlash,
            route: '/admin/mutes_settings'
        },
        {
            title: 'Groups',
            key: 'groups',
            icon: faUsers,
            route: '/admin/group_settings',
            permission: 'admin.groups.index'
        },
        {
            title: 'Mods',
            key: 'mods',
            icon: faBoxesStacked,
            route: '/admin/mods_settings',
            permission: 'admin.mods.index'
        },
        {
            title: 'Roles',
            key: 'roles',
            icon: faUsersGear,
            route: '/admin/roles_settings',
            permission: 'admin.roles.index'
        },
        {
            title: 'Settings',
            key: 'settings',
            icon: faGear,
            route: '/admin/panel_settings',
            permission: 'admin.settings.index'
        }
    ]
};
