<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Database\Seeders\ModsSeeder;
use Database\Seeders\RegionsSeeder;
use Database\Seeders\ReasonSeeder;
use Database\Seeders\TimeBansSeeder;
use Database\Seeders\UserWeb;
use Database\Seeders\PermissionsSeeder;
use App\Models\User;
use App\Models\Server;
use App\Models\Ban;
use App\Models\Mute;

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
            TimeBansSeeder::class,
            RegionsSeeder::class,
            PermissionsSeeder::class
        ]);

        if (config("app.env") === "development" || config("app.env") === "local") {
            User::factory(150)->create();
            Server::factory(1)->create();
            Ban::factory(150)->create();
            Mute::factory(150)->create();

            $this->editMyUser();
        }
    }

    protected function editMyUser()
    {
        $me = User::find(1);

        $me->name = 'Ferks';
        $me->should_re_login = false;
        $me->steam_id = 'STEAM_0:1:222936006';

        $me->save();
        $me->assignRole(1);
    }
}
