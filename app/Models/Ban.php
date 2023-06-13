<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Stevebauman\Location\Facades\Location;

class Ban extends Model
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
        'reason_id',
        'time_ban_id',
        'removed_by',
        'removed_on',
        'unban_reason',
        'flag_url'
    ];

    /**
     * Get the ISO code of the ban country.
     *
     * @param mixed $ip
     * @return string|null
     */
    public static function getLocation(mixed $ip): string|null
    {
        $countryCode = Location::get($ip);

        return $countryCode != false ? strtolower($countryCode->countryCode) : null;
    }

    /**
     * Get the server associated with the ban.
     */
    public function server(): HasOne
    {
        return $this->hasOne(Server::class);
    }

    /**
     * Get the time_ban associated with the ban.
     */
    public function time_ban(): HasOne
    {
        return $this->hasOne(TimeBans::class);
    }

    /**
     * Get the admin associated with the ban.
     */
    public function admin(): HasOne
    {
        return $this->hasOne(User::class);
    }
}
