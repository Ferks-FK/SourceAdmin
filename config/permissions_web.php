<?php


return [

    /**
     * index: View all resources.
     * create: Create one resource.
     * edit: View/Edit one resource.
     * destroy: View/Destroy one resource.
     */

    /**
     * All Permissions.
     */
    'All Permissions' => '*',

    /**
     * Permissions of admins page.
     */
    'View Admins' => 'admin.admins.index',
    'Create Admin' => 'admin.admins.create',
    'Edit Admin' => 'admin.admins.edit',
    'Delete Admin' => 'admin.admins.destroy',

    /**
     * Permissions of servers page.
     */
    'View Servers' => 'admin.servers.index',
    'Create Server' => 'admin.servers.create',
    'Edit Server' => 'admin.servers.edit',
    'Delete Server' => 'admin.servers.destroy',

    /**
     * Permissions of bans page.
     */
    'Create Ban' => 'admin.bans.create',
    'Edit Ban' => 'admin.bans.edit',
    'Delete Ban' => 'admin.bans.destroy',

    /**
     * Permissions of mutes page.
     */
    'Create Mute' => 'admin.mutes.create',
    'Edit Mute' => 'admin.mutes.edit',
    'Delete Mute' => 'admin.mutes.destroy',

    /**
     * Permissions of groups page.
     */
    'View Groups' => 'admin.groups.index',
    'Create Group' => 'admin.groups.create',
    'Edit Group' => 'admin.groups.edit',
    'Delete Group' => 'admin.groups.destroy',

    /**
     * Permissions of mods page.
     */
    'View Mods' => 'admin.mods.index',
    'Create Mod' => 'admin.mods.create',
    'Edit Mod' => 'admin.mods.edit',
    'Delete Mod' => 'admin.mods.destroy',

    /**
     * Permissions of roles page.
     */
    'View Roles' => 'admin.roles.index',
    'Create Role' => 'admin.roles.create',
    'Edit Role' => 'admin.roles.edit',
    'Delete Role' => 'admin.roles.destroy',

    /**
     * Permissions of settings page.
     */
    'View Settings' => 'admin.settings.index',
    'Edit Settings' => 'admin.settings.edit'
];
