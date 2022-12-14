<?php

namespace App\Services;
use xPaw\SourceQuery\SourceQuery;
use \Exception;

class RconService
{
    private $query;
    private $rcon;

    public function __construct($ip, $port, $rcon)
    {
        $this->query = new SourceQuery();
        $this->ip = $ip;
        $this->port = $port;
        $this->rcon = $rcon;

        $this->query->Connect($this->ip, $this->port, 1, $this->query::SOURCE);
    }

    public function getPlayers()
    {
        $public_player_data = null;
        $private_player_data = null;

        try {
            $public_player_data = $this->query->GetPlayers();

            if (!empty($public_player_data)) {
                $this->query->SetRconPassword($this->rcon);
                $status = $this->query->Rcon('status');
                $private_player_data = $this->parseRconStatus($status);

                foreach ($public_player_data as $public_player) {
                    foreach ($private_player_data as $private_player) {
                        $public_player['Id'] = intval($private_player['id']);
                        $public_player_data = [];
                        array_push($public_player_data, $public_player);
                    }
                }
            }
            return $public_player_data;
        }
        catch (Exception) {
            if (is_null($public_player_data || is_null($private_player_data))) {
                return "Error Connection ($this->ip:$this->port)";
            }
        }

    }

    public function getServerData(): array|string
    {
        try {
            return [
                "server_data" => $this->query->GetInfo(),
                "player_data" => $this->getPlayers()
            ];
        }
        catch (Exception) {
            return "Error Connection ($this->ip:$this->port)";
        }
        finally {
            $this->query->Disconnect();
        }
    }

    function parseRconStatus(string $status)
    {
        $regex = '/#\s*(\d+)(?>\s|\d)*"(.*)"\s*(STEAM_[01]:[01]:\d+|\[U:1:\d+\])(?>\s|:|\d)*[a-zA-Z]*\s*\d*\s*([0-9.]+)/';
        $players = [];
        $result = [];

        preg_match_all($regex, $status, $result, PREG_SET_ORDER);

        foreach ($result as $player) {
            $players[] = [
                'id' => $player[1],
                'name' => $player[2],
                'steamid' => $player[3],
                'ip' => $player[4]
            ];
        }

        if (empty($result)) {
            return null;
        }

        return $players;
    }

    public function addPlayerBan($player_id)
    {
        try {
            $this->query->SetRconPassword($this->rcon);
            $status = $this->query->Rcon('status');

            if (empty($status)) {
                throw new Exception(__("Failed to connect to Rcon, incorrect password?"));
            }

            $players = $this->parseRconStatus($status);

            if (empty($players)) {
                throw new Exception(__("Failed to find the player, server is empty?"));
            }

            foreach ($players as $player) {
                if ($player['id'] == $player_id) {
                    $this->query->Rcon("kickid $player_id");
                    return $player['name'];
                }
            }
            throw new Exception(__("Player not found."));
        }
        catch (Exception $error) {
            throw $error;
        }
        finally {
            $this->query->Disconnect();
        }
    }
}
