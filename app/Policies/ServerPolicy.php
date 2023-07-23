<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ServerPolicy
{
    use HandlesAuthorization;

    private $isRootAdmin;

    const VIEW_SERVERS = 'admin.servers.index';
    const CREATE_SERVER = 'admin.servers.create';
    const EDIT_SERVER = 'admin.servers.edit';
    const DELETE_SERVER = 'admin.servers.destroy';

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
        return $this->isRootAdmin ?? $user->can($this::VIEW_SERVERS);
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function view(User $user)
    {
        return $this->isRootAdmin ?? $user->can($this::VIEW_SERVERS);
    }

    /**
     * Determine whether the user can create models.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function create(User $user)
    {
        return $this->isRootAdmin ?? $user->can($this::CREATE_SERVER);
    }

    /**
     * Determine whether the user can view/edit the model.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function show(User $user)
    {
        return $this->isRootAdmin ?? $user->hasAnyPermission($this::EDIT_SERVER, $this::VIEW_SERVERS);
    }

    /**
     * Determine whether the user can permanently destroy the model.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function destroy(User $user)
    {
        return $this->isRootAdmin ?? $user->can($this::DELETE_SERVER);
    }
}
