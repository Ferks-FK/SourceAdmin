<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Database\Seeders\ModsSeeder;
use Database\Seeders\ReasonSeeder;
use Database\Seeders\TimeBansSeeder;
use Database\Seeders\UserWeb;
use App\Models\User;
use App\Models\Server;
use App\Models\Ban;

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
            UserWeb::class, // The 'Console' user, used for when something non-human does an action on the servers.
            ModsSeeder::class,
            ReasonSeeder::class,
            TimeBansSeeder::class
        ]);

        if (config("app.env") === "development" || config("app.env") === "local") {
            User::factory(1)->create();
            Server::factory(1)->create();
            Ban::factory(1)->create();
        }
    }
}
