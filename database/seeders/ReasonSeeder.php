<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class ReasonSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach($this->reasons() as $reason) {
            DB::table('reasons')->insert([
                'reason' => $reason
            ]);
        }
    }

    public function reasons()
    {
        return [
            'Aimbot',
            'WallHack',
            'Antirecoil',
            'Spinhack',
            'Multi-Hack',
            'Team Killing',
            'Team Flashing',
            'Spamming Mic/Chat',
            'Inappropriate Spray',
            'Inappropriate Language',
            'Inappropriate Name',
            'Ignoring Admins',
            'Team Stacking'
        ];
    }
}

