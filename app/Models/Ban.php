<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Stevebauman\Location\Facades\Location;

class Ban extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'ip',
        'steam_id',
        'player_name',
        'country_id',
        'reason_id',
        'time_ban_id',
        'removed_by',
        'removed_on',
        'unban_reason'
    ];

    /**
     * Get the ISO code of the ban country.
     *
     * @param string $ip
     * @return string|boolean
     */
    public function getLocation(string $ip): string|bool
    {
        $countryCode = Location::get($ip);

        return $countryCode != false ? strtolower($countryCode->countryCode) : false;
    }
}
