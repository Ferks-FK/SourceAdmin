<?php

namespace App\Permissions;

class Permission
{
    /**
     * Permissions for the web panel.
     */

    const ALL_PERMISSIONS = '*';

    const VIEW_ADMINS = 'admin.admins.index';
    const CREATE_ADMIN = 'admin.admins.create';
    const EDIT_ADMIN = 'admin.admins.edit';
    const DELETE_ADMIN = 'admin.admins.destroy';

    const VIEW_SERVERS = 'admin.servers.index';
    const CREATE_SERVER = 'admin.servers.create';
    const EDIT_SERVER = 'admin.servers.edit';
    const DELETE_SERVER = 'admin.servers.destroy';

    const CREATE_BAN = 'admin.bans.create';
    const EDIT_BAN = 'admin.bans.edit';
    const DELETE_BAN = 'admin.bans.destroy';

    const CREATE_MUTE = 'admin.mutes.create';
    const EDIT_MUTE = 'admin.mutes.edit';
    const DELETE_MUTE = 'admin.mutes.destroy';

    const VIEW_GROUPS = 'admin.groups.index';
    const CREATE_GROUP = 'admin.groups.create';
    const EDIT_GROUP = 'admin.groups.edit';
    const DELETE_GROUP = 'admin.groups.destroy';

    const VIEW_ROLES = 'admin.roles.index';
    const CREATE_ROLE = 'admin.roles.create';
    const EDIT_ROLE = 'admin.roles.edit';
    const DELETE_ROLE = 'admin.roles.destroy';
}
