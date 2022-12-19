<?php

namespace App\Services;
use xPaw\SourceQuery\SourceQuery;
use xPaw\SourceQuery\Exception\AuthenticationException;
use xPaw\SourceQuery\Exception\InvalidPacketException;
use \Exception;

class RconService
{
    private SourceQuery $query;
    private string $rcon;
    private array $available_actions = ['kickid', 'banid'];

    public function __construct($ip, $port, $rcon)
    {
        $this->query = new SourceQuery();
        $this->ip = $ip;
        $this->port = $port;
        $this->rcon = $rcon;

        $this->query->Connect($this->ip, $this->port, 1, $this->query::SOURCE);
    }

    /**
     * Get the players from the server.
     *
     * @return array|null
     * @throws Exception Generic Exception.
     */
    public function getPlayers(): array|null
    {
        $public_player_data = null;
        $private_player_data = null;

        // All the code below is needed to get a player ID. In the public method every player has ID 0.
        // TODO: Get the player ID only when necessary, when the user is allowed to kick the player out for example.
        try {
            $public_player_data = $this->query->GetPlayers();

            if (!empty($public_player_data)) {
                $this->query->SetRconPassword($this->rcon);
                $status = $this->query->Rcon('status');
                $private_player_data = $this->parseRconStatus($status);

                foreach ($public_player_data as $public_player) {
                    foreach ($private_player_data as $private_player) {
                        $public_player['Id'] = intval($private_player['id']);
                        $public_player_data = []; // Remove the bots as if they were players.
                        array_push($public_player_data, $public_player);
                    }
                }
            }
        }
        catch (Exception) {
            if (is_null($public_player_data || is_null($private_player_data))) {
                return null;
            }
        }
        return $public_player_data;
    }

    /**
     * Get the server data.
     *
     * @return array|null
     * @throws Exception Generic Exception.
     */
    public function getServerData(): array|null
    {
        try {
            return $this->query->GetInfo();
        }
        catch (Exception) {
            return null;
        }
    }

    /**
     * Get the player data.
     *
     * @return array|null
     * @throws Exception Generic Exception.
     */
    public function getPlayerData(): array|null
    {
        try {
            return $this->getPlayers();
        }
        catch (Exception) {
            return null;
        }
        finally {
            $this->query->Disconnect();
        }
    }

    /**
     * Add an action to a player, such as ban, kick, mute, etc.
     * @param int $player_id The player ID.
     * @param string $action Optional. The action to be applied to the player.
     * @return string
     * @throws AuthenticationException Usually when the RCON password is incorrect.
     * @throws InvalidPacketException Usually when the server bans the Web Panel via IP.
     * @throws Exception Generic Exception.
     */
    public function addActionToPlayer(int $player_id, string $action = 'kickid')
    {
        if (!in_array($action, $this->available_actions)) {
            throw new Exception(__("The action '$action' is not valid."));
        }

        try {
            $this->query->SetRconPassword($this->rcon);
            $status = $this->query->Rcon('status');
            $players = $this->parseRconStatus($status);

            if (empty($players)) {
                throw new Exception(__("Failed to find the player, server is empty?"));
            }

            foreach ($players as $player) {
                if ($player['id'] == $player_id) {
                    $this->query->Rcon("$action $player_id");
                    return $player['name'];
                }
            }
            throw new Exception(__("Player not found."));
        }
        catch (AuthenticationException $error) {
            throw new AuthenticationException(__('The player ID is not valid, please check the RCON password of the server.'));
        }
        catch (InvalidPacketException $error) {
            throw new InvalidPacketException(__('Unable to communicate with the server, check that the server is not banning the Web Panel.'));
        }
        catch (Exception $error) {
            throw $error;
        }
        finally {
            $this->query->Disconnect();
        }
    }

    /**
     * Search for specific informations in a string.
     *
     * @param string $status The return from the 'status' server command.
     * @return null|array
     */
    private function parseRconStatus(string $status): null|array
    {
        // Credits for original function here: https://github.com/sbpp/sourcebans-pp/blob/5331ab9d759308adef97d6bd026ba3d650aa6411/web/includes/system-functions.php#L378

        $regex = '/#\s*(\d+)(?>\s|\d)*"(.*)"\s*(STEAM_[01]:[01]:\d+|\[U:1:\d+\])(?>\s|:|\d)*[a-zA-Z]*\s*\d*\s*([0-9.]+)/';
        $players = [];
        $result = [];

        preg_match_all($regex, $status, $result, PREG_SET_ORDER);

        if (empty($result)) {
            return null;
        }

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
}
