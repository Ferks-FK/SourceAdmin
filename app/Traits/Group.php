<?php

namespace App\Traits;

use App\Models\User;
use App\Enums\Group as GroupEnum;

trait Group
{
    /**
     * Update individual users permissions when they have their groups updated.
     *
     * @param \App\Models\User  $user
     * @param \App\Enums\Group  $groupType
     *
     * @return void
     */
    public function syncGroupPermissions(User $user, $groupType = GroupEnum::WEB)
    {
        $groups = $user->groups()->where('type', $groupType)->get();
        $permissionsToSync = [];

        foreach($groups as $group) {
            $permissions = $group->permissions()->where('type', $groupType)->get();

            foreach($permissions as $permission) {
                $permissionsToSync[] = $permission->id;
            }
        }

        $user->syncPermissions($permissionsToSync);
    }

    /**
     * Remove all individual user permissions.
     *
     * @param \App\Models\User  $user
     *
     * @return void
     */
    public function removeAllPermissions(User $user)
    {
        $user->syncPermissions([]);
    }
}
