<?php

namespace App\Services;
use xPaw\SourceQuery\SourceQuery;
use Exception;

class RconService
{
    private $query;

    public function __construct()
    {
        $this->query = new SourceQuery();
    }

    public function setConnection($ip, $port)
    {
        try {
            $this->query->Connect($ip, $port, 1, SourceQuery::SOURCE);
            return ["server_data" => $this->query->GetInfo(), "player_data" => $this->query->GetPlayers()];
        }
        catch (Exception) {
            return "Error connecting ($ip:$port)";
        }
        finally {
            $this->query->Disconnect();
        }
    }
}
