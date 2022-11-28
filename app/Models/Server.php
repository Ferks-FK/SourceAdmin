<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Mod;
use App\Services\RconService;
use Illuminate\Support\Facades\Cache;

class Server extends Model
{
    use HasFactory;

    private $server_data = null;
    private $player_data = null;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'ip',
        'port',
        'mod_id'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'rcon'
    ];

    protected static function booted()
    {
        static::retrieved(function (Server $server) {
            $server_data = $server->serverData();

            if (is_array($server_data)) {
                $server->server_data = $server_data['server_data'];
                $server->player_data =  $server_data['player_data'];
            } else {
                $server->server_data = $server_data;
                $server->player_data =  $server_data;
            }
        });
    }

    /**
     * Connect to the servers and cache it.
     *
     * @return array|string|null
     */
    protected function serverData(): array|string|null
    {
        return Cache::remember("servers.{$this->id}", 1, function () {
            $rconService = new RconService();

            return $rconService->setConnection($this->ip, $this->port);
        });
    }

    /**
     * Determines if the server is online.
     *
     * @return boolean
     */
    public function isOnline(): bool
    {
        return ((is_array($this->server_data)) ?: false);
    }

    /**
     * Get the HostName.
     *
     * @return string|null
     */
    public function getHostNameAttribute(): string|null
    {
        return $this->isOnline() ? $this->server_data['HostName'] : $this->server_data;
    }

    /**
     * Get the Max Players.
     *
     * @return integer|string
     */
    public function getMaxPlayersAttribute(): int|string
    {
        return $this->isOnline() ? $this->server_data['MaxPlayers'] : "N/A";
    }

    /**
     * Get the Map.
     *
     * @return string
     */
    public function getMapAttribute(): string
    {
        return $this->isOnline() ? $this->server_data['Map'] : "N/A";
    }

    /**
     * Get the current online players.
     *
     * @return integer|string
     */
    public function getTotalPlayersOnlineAttribute(): int|string
    {
        return $this->isOnline() ? $this->server_data['Players'] : "N/A";
    }

    /**
     * Get the OS.
     *
     * @return string
     */
    public function getOsAttribute(): string
    {
        return $this->isOnline() ? $this->server_data['Os'] : "N/A";
    }

    /**
     * Get the Vac.
     *
     * @return boolean|string
     */
    public function getVacAttribute(): bool|string
    {
        return $this->isOnline() ? $this->server_data['Secure'] : "N/A";
    }

    /**
     * Get players online in server.
     *
     * @return array
     */
    public function getPlayersAttribute(): array
    {
        return $this->isOnline() ? $this->player_data : ['N/A'];
    }

    /**
     * Get the mod associated with the server.
     */
    public function mod()
    {
        return $this->belongsTo(Mod::class);
    }
}
