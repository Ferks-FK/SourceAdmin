<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;

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
        'mod_id',
        'rcon'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'rcon'
    ];

    public function setPasswordAttribute($value)
    {
        $this->attributes['rcon'] = Hash::make($value);
    }

    /**
     * Get the mod associated with the server.
     */
    public function mod()
    {
        return $this->belongsTo(Mod::class);
    }
}
