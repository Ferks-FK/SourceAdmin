<?php

namespace App\Models;

use App\Helpers\SteamHelper;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'steam_id',
        'password',
        'should_re_login',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'created_at' => "datetime",
        'updated_at' => "datetime"
    ];

    /**
     * Hash the password before to insert/update in DB.
     *
     * @param mixed $value
     */
    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = Hash::make($value);
    }

    /**
     * Convert Steam ID to 64 format before to insert/update in DB.
     *
     * @param mixed $value
     */
    public function setSteamIdAttribute($value)
    {
        $this->attributes['steam_id'] = SteamHelper::convertSteamIDTo64($value);
    }

    /**
     * Convert Steam ID to Steam::xxx.. format after get it from DB.
     *
     * @param mixed $value
     * @return mixed
     */
    public function getSteamIdAttribute($value)
    {
        return $this->attributes['steam_id'] = SteamHelper::convertSteam64ToID($value);
    }

    /**
     * Get the bans associated with the admin.
     */
    public function bans(): HasMany
    {
        return $this->hasMany(Ban::class);
    }

    /**
     * Get the groups associated with the admin.
     */
    public function groups(): BelongsToMany
    {
        return $this->belongsToMany(Group::class, 'user_has_groups');
    }
}
