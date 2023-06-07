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
