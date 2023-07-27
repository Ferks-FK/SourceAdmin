<?php

namespace App\Policies;

use App\Models\User;
use App\Permissions\Permission;
use Illuminate\Auth\Access\HandlesAuthorization;

class UserPolicy
{
    use HandlesAuthorization;

    private $isRootAdmin;

    public function __construct(User $user)
    {
        $this->isRootAdmin = $user->can(Permission::ALL_PERMISSIONS) ? true : null;
    }

    /**
     * Determine whether the user can view any models.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function index(User $user)
    {
        return $this->isRootAdmin ?? $user->can(Permission::VIEW_ADMINS);
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function view(User $user)
    {
        return $this->isRootAdmin ?? $user->can(Permission::VIEW_ADMINS);
    }

    /**
     * Determine whether the user can create models.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function create(User $user)
    {
        return $this->isRootAdmin ?? $user->can(Permission::CREATE_ADMIN);
    }

    /**
     * Determine whether the user can view/edit the model.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function show(User $user)
    {
        return $this->isRootAdmin ?? $user->hasAnyPermission(Permission::EDIT_ADMIN, Permission::VIEW_ADMINS);
    }

    /**
     * Determine whether the user can permanently destroy the model.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function destroy(User $user)
    {
        return $this->isRootAdmin ?? $user->can(Permission::DELETE_ADMIN);
    }
}
