<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Database\Seeders\ModsSeeder;
use Database\Seeders\ReasonSeeder;
use Database\Seeders\TimeBansSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            ModsSeeder::class,
            ReasonSeeder::class,
            TimeBansSeeder::class
        ]);
    }
}
