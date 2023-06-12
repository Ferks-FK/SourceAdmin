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
        foreach(config('mods') as $mod_key => $mod_value) {
            DB::table('mods')->insert([
                'mod' => $mod_key,
                'name' => $mod_value,
                'enabled' => $mod_key === 'web' ? false : true
            ]);
        }
    }
}
