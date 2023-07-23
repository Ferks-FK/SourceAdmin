<?php

namespace App\Policies;

use App\Models\Group;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class GroupPolicy
{
    use HandlesAuthorization;

    private $isRootAdmin;

    const VIEW_GROUPS = 'admin.groups.index';
    const CREATE_GROUP = 'admin.groups.create';
    const EDIT_GROUP = 'admin.groups.edit';
    const DELETE_GROUP = 'admin.groups.destroy';

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
        return $this->isRootAdmin ?? $user->can($this::VIEW_GROUPS);
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function view(User $user)
    {
        return $this->isRootAdmin ?? $user->can($this::VIEW_GROUPS);
    }

    /**
     * Determine whether the user can create models.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function create(User $user)
    {
        return $this->isRootAdmin ?? $user->can($this::CREATE_GROUP);
    }

    /**
     * Determine whether the user can view/edit the model.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function show(User $user)
    {
        return $this->isRootAdmin ?? $user->hasAnyPermission($this::EDIT_GROUP, $this::VIEW_GROUPS);
    }

    /**
     * Determine whether the user can permanently destroy the model.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function destroy(User $user)
    {
        return $this->isRootAdmin ?? $user->can($this::DELETE_GROUP);
    }
}
