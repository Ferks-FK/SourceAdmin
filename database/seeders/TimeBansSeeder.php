<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class TimeBansSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach($this->time_bans() as $name => $value) {
            DB::table('time_bans')->insert([
                'name' => $name,
                "value" => $value
            ]);
        }
    }

    public function time_bans()
    {
        return [
            'Permanent' => 0,
            '5 minutes' => 5,
            '10 minutes' => 10,
            '30 minutes' => 30,
            '1 Hour' => 60,
            '2 Hours' => 120,
            '3 Hours' => 180,
            '6 Hours' => 360,
            '1 Day' => 1440,
            '2 Days' => 2880,
            '3 Days' => 4320,
            '6 Days' => 8640,
            '1 Week' => 10080,
            '2 Week' => 20160,
            '3 Week' => 30240,
            '1 Month' => 43830,
            '2 Months' => 87660,
            '3 Months' => 131490,
            '1 Year' => 525960
        ];
    }
}

