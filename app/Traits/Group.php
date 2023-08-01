<?php

namespace App\Traits;

use App\Models\User;
use App\Enums\Group as GroupEnum;
use App\Models\Group as GroupModel;

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

        $permissionsToSync = $groups->flatMap(function ($group) use ($groupType) {
            return $group->permissions()->where('type', $groupType)->pluck('id')->all();
        });

        $user->syncPermissions($permissionsToSync);
    }

    /**
     * Remove all individual user permissions.
     *
     * @param \App\Models\Group  $group
     *
     * @return void
     */
    public function removeAllPermissions(GroupModel $group)
    {
        $usersIds = $group->users()->pluck('id')->all();
        $users = User::whereIn('id', $usersIds)->get();

        foreach ($users as $user) {
            $user->syncPermissions([]);
        }
    }
}
