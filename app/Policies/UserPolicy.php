<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class UserPolicy
{
    use HandlesAuthorization;

    private $isRootAdmin;

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
        return $this->isRootAdmin ?? $user->can('admin.admins.index');
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function view(User $user)
    {
        return $this->isRootAdmin ?? $user->can('admin.admins.view');
    }

    /**
     * Determine whether the user can create models.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function create(User $user)
    {
        dd($user->hasPermissionTo('admin.admins.create'));
        return $this->isRootAdmin ?? $user->can('admin.admins.create');
    }

    /**
     * Determine whether the user can view/edit the model.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function edit(User $user)
    {
        return $this->isRootAdmin ?? $user->can('admin.admins.edit');
    }

    /**
     * Determine whether the user can permanently destroy the model.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function destroy(User $user)
    {
        return $this->isRootAdmin ?? $user->can('admin.admins.destroy');
    }
}
