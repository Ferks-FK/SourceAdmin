<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Server extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'ip',
        'port',
        'rcon',
        'mod_id',
        'region_id',
        'enabled'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'rcon'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'id' => 'integer',
        'enabled' => 'boolean'
    ];

    public function setRconAttribute($value)
    {
        $this->attributes['rcon'] = Hash::make($value);
    }

    /**
     * Get the mod associated with the server.
     */
    public function mod(): HasOne
    {
        return $this->hasOne(Mod::class);
    }

    /**
     * Get the bans associated with the server.
     */
    public function bans()
    {
        return $this->hasMany(Ban::class);
    }

    /**
     * Get the region associated with the server.
     */
    public function region(): HasOne
    {
        return $this->hasOne(Region::class);
    }
}
