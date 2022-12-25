<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class UserWeb extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        if (!DB::table('users')->where('name', "CONSOLE")) {
            DB::table('users')->insert([
                "name" => "CONSOLE",
                "email" => "console@console.com",
                "password" => ""
            ]);
        }
    }
}
