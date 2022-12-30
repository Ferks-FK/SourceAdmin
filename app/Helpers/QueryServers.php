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
    private $ip = null;
    private $port = null;
    private $id = null;

    public function __construct(string $id, string $ip, string $port, string $rcon)
    {
        $this->rcon_service = new RconService($ip, $port, $rcon);
        $this->ip = $ip;
        $this->port = $port;
        $this->id = $id;
        $data = $this->getServerDataRcon();

        if (is_array($data['server_data'])) {
            array_push($data, $this->rcon_service->getPlayerData());
            $data["player_data"] = $data[0]; // Just change the key name.
            unset($data[0]);
            $this->server_data = $data['server_data'];
            $this->player_data = $data['player_data'];
            $this->is_online = true;
        }
    }

    /**
     * Connect to the servers and cache it.
     *
     * @return array|null
     */
    protected function getServerDataRcon()
    {
        // return Cache::remember("server.{$this->id}", 60, function() {
        //     $data = ["server_data" => $this->rcon_service->getServerData()];

        //     return $data;
        // });
        $data = ["server_data" => $this->rcon_service->getServerData()];

        return $data;
    }

    /**
     * Get the data from server.
     *
     * @return array|string
     */
    public function getServerData(): array|string
    {
        $this->server_data['Id'] = $this->id;
        $this->server_data['Is_online'] = $this->is_online;

        if ($this->is_online && !empty($this->server_data)) {
            return $this->server_data;
        }

        return "Error Connection ($this->ip:$this->port)";
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
