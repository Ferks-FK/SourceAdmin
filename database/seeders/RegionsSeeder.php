<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class RegionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach($this->regions() as $region) {
            DB::table('regions')->insert([
                'region' => $region,
                'enabled' => true
            ]);
        }
    }

    private function regions()
    {
        return [
            'Africa',
            'North America',
            'South America',
            'Asia',
            'Europe',
            'Oceania',
            'Antarctica'
        ];
    }
}
