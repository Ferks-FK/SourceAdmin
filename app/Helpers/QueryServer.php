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

    public function __construct(int $id, string $ip, string $port, string $rcon)
    {
        $this->id = $id;
        $this->ip = $ip;
        $this->port = $port;

        if ($this->serverIsCached()) {
            $data = $this->getServerFromCache();
        } else {
            $this->rcon_service = new RconService($ip, $port, $rcon);
            $data = $this->getServerDataRcon();
            $data["player_data"] = $this->rcon_service->getPlayerData();
        }

        $this->server_data = $data['server_data'];
        $this->player_data = $data['player_data'];
        $this->is_online = is_array($this->server_data);
        if ($this->is_online) {
            $this->putServerInCache($data);
        }
    }

    /**
     * Checks if the server exists in the cache.
     *
     * @return bool
     */
    protected function serverIsCached(): bool
    {
        return Cache::has("server." . $this->id);
    }

    /**
     * Try to get the cache server if it exists.
     *
     * @return mixed
     */
    protected function getServerFromCache(): mixed
    {
        return Cache::get("server." . $this->id);
    }

    /**
     * Try putting server in the cache.
     *
     * @return bool
     */
    protected function putServerInCache($data): bool
    {
        return Cache::put("server." . $this->id, $data, 60);
    }

    /**
     * Connect to the server.
     *
     * @return array|null
     */
    protected function getServerDataRcon(): array|null
    {
        return ["server_data" => $this->rcon_service->getServerData()];
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

    /**
     * Get the server MOD.
     *
     * @return mixed
     */
    protected function getMod(): mixed
    {
        return Server::where('servers.id', $this->id)->join('mods', 'mods.id', 'servers.mod_id')->select('mods.name')->first()->name;
    }
}
