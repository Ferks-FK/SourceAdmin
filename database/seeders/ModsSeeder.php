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
        foreach(config('mods') as $mod) {
            DB::table('mods')->insert([
                'name' => $mod,
                'icon' => $mod,
                'enabled' => true
            ]);
        }
    }
}
