<?php

namespace App\Policies;

use App\Models\Role;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class RolePolicy
{
    use HandlesAuthorization;

    private $isRootAdmin;

    const VIEW_ROLES = 'admin.roles.index';
    const CREATE_ROLE = 'admin.roles.create';
    const EDIT_ROLE = 'admin.roles.edit';
    const DELETE_ROLE = 'admin.roles.destroy';

    public function __construct(User $user)
    {
        $this->isRootAdmin = $user->can('*') ? true : null;
    }

    /**
     * Determine whether the user can view any models.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function index(User $user)
    {
        return $this->isRootAdmin ?? $user->can($this::VIEW_ROLES);
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function view(User $user)
    {
        return $this->isRootAdmin ?? $user->can($this::VIEW_ROLES);
    }

    /**
     * Determine whether the user can create models.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function create(User $user)
    {
        return $this->isRootAdmin ?? $user->can($this::CREATE_ROLE);
    }

    /**
     * Determine whether the user can view/edit the model.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function show(User $user)
    {
        return $this->isRootAdmin ?? $user->hasAnyPermission($this::EDIT_ROLE, $this::VIEW_ROLES);
    }

    /**
     * Determine whether the user can permanently destroy the model.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function destroy(User $user)
    {
        return $this->isRootAdmin ?? $user->can($this::DELETE_ROLE);
    }
}
