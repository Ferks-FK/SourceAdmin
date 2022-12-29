<?php

namespace App\Helpers;

use App\Services\RconService;
use Illuminate\Support\Facades\Cache;

class QueryServers
{
    private $rcon_service = null;
    private $server_data = null;
    private $player_data = null;
    private $is_online = false;
    private $id = null;

    public function __construct(string $id, string $ip, string $port, string $rcon)
    {
        $this->rcon_service = new RconService($ip, $port, $rcon);
        $this->ip = $ip;
        $this->port = $port;
        $data = $this->getServerDataRcon();

        if (is_array($data)) {
            array_push($data, $this->rcon_service->getPlayerData());
            $data["player_data"] = $data[0]; // Just change the key name.
            unset($data[0]);
            $this->server_data = $data['server_data'];
            $this->player_data = $data['player_data'];
            $this->is_online = true;
            $this->id = $id;
        }
    }

    /**
     * Connect to the servers and cache it.
     *
     * @return array|null
     */
    protected function getServerDataRcon()
    {
        return Cache::remember("server.{$this->id}", 60, function() {
            return ["server_data" => $this->rcon_service->getServerData()];
        });
    }

    /**
     * Get the data from server.
     *
     * @return array
     */
    public function getServerData(): array
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
    public function getplayerData(): array
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
}
