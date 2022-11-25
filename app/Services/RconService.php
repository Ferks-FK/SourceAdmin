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

    public function setConnection($ip, $port, $rcon) //Todo: Enhance this code?
    {
        $this->query->Connect($ip, $port, 1, SourceQuery::SOURCE);
        //$this->query->SetRconPassword($rcon);

        try {
            global $info;
            $info = $this->query->GetInfo();
        }
        catch (Exception) {
        }
        finally {
            if (is_null($info) || empty($info)){
                return "Error connecting ($ip:$port)";
            } else {
                return $info;
            }
            $this->query->Disconnect();
        }
    }
}
