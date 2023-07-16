<?php

namespace App\Policies;

use App\Models\Mute;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class MutePolicy
{
    use HandlesAuthorization;

    private $isRootAdmin;

    const CREATE_MUTE = 'admin.mutes.create';
    const EDIT_MUTE = 'admin.mutes.edit';
    const DELETE_MUTE = 'admin.mutes.destroy';

    public function __construct(User $user)
    {
        $this->isRootAdmin = $user->can('*') ? true : null;
    }

    /**
     * Determine whether the user can create models.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function create(User $user)
    {
        return $this->isRootAdmin ?? $user->can($this::CREATE_MUTE);
    }

    /**
     * Determine whether the user can view/edit the model.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function show(User $user)
    {
        return $this->isRootAdmin ?? $user->can($this::EDIT_MUTE);
    }

    /**
     * Determine whether the user can permanently destroy the model.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function destroy(User $user)
    {
        return $this->isRootAdmin ?? $user->can($this::DELETE_MUTE);
    }
}
