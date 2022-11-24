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

    public function setConnection($ip, $port, $rcon)
    {
        try {
            $this->query->Connect($ip, $port);
        }
        catch (Exception) {
        }
        finally {
            return $this->query;

            $this->query->Disconnect();
        }
    }
}
