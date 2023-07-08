<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mute extends Model
{
    use HasFactory;

    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'ip',
        'steam_id',
        'player_name',
        'admin_id',
        'reason_id',
        'time_ban_id',
        'removed_by',
        'removed_on',
        'unban_reason'
    ];

}
