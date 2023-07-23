<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'player_ip',
        'player_steam_id',
        'player_name',
        'comments',
        'reporter_name',
        'reporter_email',
        'server_id',
        'upload_demo'
    ];
}
