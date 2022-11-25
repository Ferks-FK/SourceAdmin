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

    /**
     * Connect to the servers and cache it.
     *
     * @return array|string|null
     */
    protected function serverData(): array|string|null
    {
        // Cache::forget("servers.{$this->id}");
        return Cache::remember("servers.{$this->id}", 1, function () {
            $rconService = new RconService();

            return $rconService->setConnection($this->ip, $this->port, $this->rcon);
        });
    }

    /**
     * Determines if the server is online.
     *
     * @return boolean
     */
    public function isOnline(): bool
    {
        $server_data = $this->serverData();

        return ((is_array($server_data)) ?: false);
    }

    /**
     * Get the HostName.
     *
     * @return string|null
     */
    public function getHostNameAttribute(): string|null
    {
        $server_data = $this->serverData();

        return $this->isOnline() ? $server_data['HostName'] : $server_data;
    }

    /**
     * Get the Max Players.
     *
     * @return integer|string
     */
    public function getMaxPlayersAttribute(): int|string
    {
        $server_data = $this->serverData();

        return $this->isOnline() ? $server_data['MaxPlayers'] : "N/A";
    }

    /**
     * Get the Map.
     *
     * @return string
     */
    public function getMapAttribute(): string
    {
        $server_data = $this->serverData();

        return $this->isOnline() ? $server_data['Map'] : "N/A";
    }

    /**
     * Get the current online players.
     *
     * @return integer|string
     */
    public function getTotalPlayersOnlineAttribute(): int|string
    {
        $server_data = $this->serverData();

        return $this->isOnline() ? $server_data['Players'] : "N/A";
    }

    /**
     * Get the OS.
     *
     * @return string
     */
    public function getOsAttribute(): string
    {
        $server_data = $this->serverData();

        return $this->isOnline() ? $server_data['Os'] : "N/A";
    }

    /**
     * Get the Vac.
     *
     * @return boolean|string
     */
    public function getVacAttribute(): bool|string
    {
        $server_data = $this->serverData();

        return $this->isOnline() ? $server_data['Secure'] : "N/A";
    }

    /**
     * Get the mod associated with the server.
     */
    public function mod()
    {
        return $this->hasOne(Mod::class, 'id');
    }
}
