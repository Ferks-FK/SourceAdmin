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
     * @return array
     */
    protected function serverData(): array
    {
        // Cache::forget("servers.{$this->id}");
        return Cache::remember("servers.{$this->id}", 1, function () {
            $rconService = new RconService();

            return $rconService->setConnection($this->ip, $this->port, $this->rcon)->GetInfo();
        });
    }

    /**
     * Get the HostName.
     *
     * @return string
     */
    public function getHostNameAttribute(): string
    {
        return $this->serverData()['HostName'];
    }

    /**
     * Get the Max Players.
     *
     * @return integer
     */
    public function getMaxPlayersAttribute(): int
    {
        return $this->serverData()['MaxPlayers'];
    }

    /**
     * Get the Map.
     *
     * @return string
     */
    public function getMapAttribute(): string
    {
        return $this->serverData()['Map'];
    }

    /**
     * Get the current online players.
     *
     * @return integer
     */
    public function getTotalPlayersOnlineAttribute(): int
    {
        return $this->serverData()['Players'];
    }

    /**
     * Get the OS.
     *
     * @return string
     */
    public function getOsAttribute(): string
    {
        return $this->serverData()['Os'];
    }

    /**
     * Get the Vac.
     *
     * @return boolean
     */
    public function getVacAttribute(): bool
    {
        return $this->serverData()['Secure'];
    }

    /**
     * Get the mod associated with the server.
     */
    public function mod()
    {
        return $this->hasOne(Mod::class, 'id');
    }
}
