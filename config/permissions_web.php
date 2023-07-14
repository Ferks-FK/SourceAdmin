<?php


return [

    /**
     * index: View all resources.
     * view: View one resource.
     * create: Create one resource.
     * edit: View/Edit one resource.
     * destroy: View/Destroy one resource.
     */

    /**
     * All Permissions.
     */
    'All Permissions' => ['*'],

    /**
     * Permissions of admins page.
     */
    'View Admins' => ['admin.admins.index'],
    'View Admin' => ['admin.admins.show'],
    'Create Admin' => ['admin.admins.create'],
    'Edit Admin' => ['admin.admins.edit'],
    'Delete Admin' => ['admin.admins.destroy'],

    /**
     * Permissions of servers page.
     */
    'View Servers' => ['admin.servers.index'],
    'View Server' => ['admin.servers.show'],
    'Create Server' => ['admin.servers.create'],
    'Edit Server' => ['admin.servers.edit'],
    'Delete Server' => ['admin.servers.destroy'],

    /**
     * Permissions of bans page.
     */
    'View Ban' => ['admin.bans.view'],
    'Create Ban' => ['admin.bans.create'],
    'Edit Ban' => ['admin.bans.edit'],
    'Delete Ban' => ['admin.bans.destroy'],

    /**
     * Permissions of mutes page.
     */
    'View Mute' => ['admin.mutes.view'],
    'Create Mute' => ['admin.mutes.create'],
    'Edit Mute' => ['admin.mutes.edit'],
    'Delete Mute' => ['admin.mutes.destroy'],

    /**
     * Permissions of groups page.
     */
    'View Groups' => ['admin.groups.index'],
    'View Group' => ['admin.groups.view'],
    'Create Group' => ['admin.groups.create'],
    'Edit Group' => ['admin.groups.edit'],
    'Delete Group' => ['admin.groups.destroy'],

    /**
     * Permissions of mods page.
     */
    'View Mods' => ['admin.mods.index'],
    'View Mod' => ['admin.mods.view'],
    'Create Mod' => ['admin.mods.create'],
    'Edit Mod' => ['admin.mods.edit'],
    'Delete Mod' => ['admin.mods.destroy'],
];
