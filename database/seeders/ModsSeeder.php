<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class ModsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach($this->mods() as $mod_key => $mod_value) {
            DB::table('mods')->insert([
                'mod' => $mod_key,
                'name' => $mod_value,
                'enabled' => $mod_key === 'web' ? false : true
            ]);
        }
    }

    private function mods()
    {
        return [
            // IDK all the names of the games, if you do, tell me later xD

            'web' => config('app.name'),
            'alienswarm' => 'Alien Swarm',
            'csgo' => 'Counter Strike - Global Offensive',
            'csource' => 'Counter Strike - Source',
            'cspromod' => 'Counter Strike - Source Promod',
            'dods' => 'Day of Defeat',
            'dys' => 'DYS',
            'eye' => 'E.Y.E - Divine Cybermancy',
            'gmod' => "Garry's Mod",
            'hidden' => 'Hidden',
            'hl2-fortressforever' => 'Fortress Forever',
            'hl2ctf' => 'Half-Life 2 - Capture the Flag',
            'hl2dm' => 'Half-Life 2 - Deathmatch',
            'ins' => 'INS',
            'l4d' => 'Left 4 Dead',
            'l4d2' => 'Left 4 Dead 2',
            'nucleardawn' => 'Nuclear Dawn',
            'pdark' => 'Dark',
            'pvkii' => 'Pirates, Vikings, and Knights II',
            'ship' => 'The Ship',
            'source-forts' => 'SourceForts Gamemode',
            'synergy' => 'Synergy',
            'tf2' => 'Team Fortress 2',
            'zps' => 'Zombie Panic - Source'
        ];
    }
}
