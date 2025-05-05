<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Group extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'description',
        'type'
    ];

    /**
     * Get the users associated with the group.
     */
    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'user_has_groups');
    }

    /**
     * Get the permissions associated with the group.
     */
    public function permissions()
    {
        return $this->belongsToMany(Permission::class, 'group_has_permissions');
    }
}
