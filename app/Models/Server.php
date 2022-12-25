<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Services\RconService;
use Illuminate\Support\Facades\Cache;

class Server extends Model
{
    use HasFactory;

    private $rcon_service = null;
    private $server_data = null;
    private $player_data = null;
    private $player_id = null;
    private $is_online = false;

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
            $server->rcon_service = new RconService($server->ip, $server->port, $server->rcon);
            $data = $server->getServerData();

            if (is_array($data)) {
                array_push($data, $server->rcon_service->getPlayerData());
                $data["player_data"] = $data[0]; // Just change the key name.
                unset($data[0]);
                $server->server_data = $data['server_data'];
                $server->player_data = $data['player_data'];
                $server->is_online = true;
            }
        });
    }

    /**
     * Connect to the servers and cache it.
     *
     * @return array|null
     */
    protected function getServerData(): array|null
    {
        return Cache::remember("server.{$this->id}", 60, function() {
            $data = ["server_data" => $this->rcon_service->getServerData()];
            return $data;
        });
    }

    /**
     * Get the data from server.
     *
     * @return array
     */

    public function getserverDataAttribute(): array
    {
        if ($this->is_online && !empty($this->server_data)) {
            return $this->server_data;
        }

        return $this->server_data = [
            'HostName' => "Error Connection ($this->ip:$this->port)",
            'Secure' => "N/A",
            'Players' => "N/A",
            'MaxPlayers' => "N/A",
            'Map' => "N/A",
            'Os' => "N/A"
        ];
    }

    /**
     * Get the player data from server.
     *
     * @return array
     */
    public function getplayerDataAttribute(): array
    {
        if ($this->is_online && !empty($this->player_data)) {
            return $this->player_data;
        }

        return $this->player_data = [
            'Name' => "N/A",
            'Frags' => "N/A",
            'TimeF' => "N/A"
        ];
    }

    /**
     * Get the mod associated with the server.
     */
    public function mod()
    {
        return $this->belongsTo(Mod::class);
    }
}
