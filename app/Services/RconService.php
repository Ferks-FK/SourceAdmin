<?php

namespace App\Services;
use xPaw\SourceQuery\SourceQuery;
use Exception;

class RconService
{
    private $query;
    private $rcon;

    public function __construct($ip, $port, $rcon = null)
    {
        $this->query = new SourceQuery();
        $this->ip = $ip;
        $this->port = $port;
        $this->rcon = $rcon;

        $this->query->Connect($this->ip, $this->port, 1, SourceQuery::SOURCE);

        if (!is_null($this->rcon)) {
            try {
                $this->query->SetRconPassword($this->rcon);
            }
            catch (Exception) {}
        }
    }

    public function getServerAndPlayerData(): array|string
    {
        //dd($this->addPlayerBan("tete"));
        try {
            return [
                "server_data" => $this->query->GetInfo(),
                "player_data" => $this->query->GetPlayers()
            ];
        }
        catch (Exception) {
            return "Error connecting ($this->ip:$this->port)";
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

        return $players;
    }

    public function addPlayerBan($player_id)
    {
        try {
            $status = $this->query->Rcon('status');

            if (empty($status)) {
                return new Exception("Failed to connect to Rcon, invalid password?");
            }

            $players = $this->parseRconStatus($status);

            foreach ($players as $player) {
                dump($player['id'] == $player_id);

                if ($player['id'] == $player_id) {
                    // return $this->query->Rcon("kickid $player_id");
                    return "Jogador expulso";
                } else {
                    return "Não achei o player";
                }
            }
        }
        catch (Exception $error) {
        }
        finally {
            $this->query->Disconnect();
        }
    }
}
