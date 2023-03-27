<?php

namespace App\Helpers;

use App\Services\RconService;
use App\Models\Server;
use Illuminate\Support\Facades\Cache;

class QueryServer
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
        if (!Cache::has("server." . $this->id)) {
            $data = ["server_data" => $this->rcon_service->getServerData()];

            if (is_array($data['server_data'])) {
                if (Cache::put("server." . $this->id, $data, 60)) {
                    return $data;
                }
            }
        }

        return Cache::get("server." . $this->id, ["server_data" => $this->rcon_service->getServerData()]);
    }

    /**
     * Get the data from server.
     *
     * @return array|string
     */
    public function getServerData(): array|string
    {
        $mod = $this->getMod();
        $this->server_data['Id'] = $this->id;
        $this->server_data['Is_online'] = $this->is_online;
        $this->server_data['Ip'] = $this->ip;
        $this->server_data['Mod'] = $mod;

        if ($this->is_online && !empty($this->server_data)) {
            return $this->server_data;
        }

        return [
            "Id" => $this->id,
            "Mod" => $mod,
            "Os" => "N/A",
            "Map" => "N/A",
            "Secure" => "N/A",
            "HostName" => "Error Connection ($this->ip:$this->port)",
            "Players" => "N/A",
            "MaxPlayers" => "N/A",
            "Is_online" => $this->is_online
        ];
    }

    /**
     * Get the player data from server.
     *
     * @return array
     */
    public function getPlayerData(): array
    {
        if ($this->is_online && !empty($this->player_data)) {
            return $this->player_data;
        }

        return [];
    }

    protected function getMod()
    {
        return Server::where('servers.id', $this->id)->join('mods', 'mods.id', 'servers.mod_id')->select('mods.name')->first()->name;
    }
}
