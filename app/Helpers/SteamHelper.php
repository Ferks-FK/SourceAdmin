<?php

namespace App\Helpers;

class SteamHelper
{
    /**
     * Convert a steamID to Steam64 format.
     *
     * @param string $steamID The steamID to be converted.
     *
     * @return string
     */
    public static function convertSteamIDTo64(string $steamID): string
    {
        // Check that the format is already in 64.
        if (is_numeric($steamID) && strlen($steamID) > 15) {
            return $steamID;
        }

        $parts = explode(':', $steamID);
        $universe = $parts[0] == 'STEAM' ? 1 : 0;
        $accountId = ($parts[2] * 2) + $parts[1] + 0x0110000100000000 + $universe;

        return (string) $accountId;
    }

    /**
     * Convert a steam64 to SteamID format.
     *
     * @param int $steam64 The steam64 to be converted.
     *
     * @return int|string
     */
    public static function convertSteam64ToID(int $steam64): int|string
    {
        // Check if the format is already STEAM_0:...
        if (!is_numeric($steam64) || strlen($steam64) !== 17) {
            return $steam64;
        }

        $steamId64 = (int) $steam64;
        $accountId = ($steamId64 & 1) === 0 ? ($steamId64 - 76561197960265728) / 2 : ($steamId64 - 76561197960265729) / 2;

        $steamID = "STEAM_0:" . (($steamId64 & 1) === 0 ? 0 : 1) . ":" . $accountId;

        return $steamID;
    }

    /**
     * Generates the link to a user's steam profile.
     *
     * @param string $steamID The user's steamID.
     *
     * @return string
     */
    public function generateSteamProfileLink(string $steamID)
    {
        $steamID = $this->convertSteamIDTo64($steamID);

        return 'https://steamcommunity.com/profiles/' . $steamID;
    }
}
