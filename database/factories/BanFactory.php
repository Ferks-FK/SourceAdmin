<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Ban>
 */
class BanFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            "ip" => $this->faker->ipv4(),
            "player_name" => $this->faker->name(),
            "created_at" => now(),
            "end_at" => now()->addDays(15),
            "admin_id" => mt_rand(1, 10),
            "reason_id" => mt_rand(1, 10),
            "time_ban_id" => mt_rand(1, 10),
            "server_id" => 1,
            "flag_url" => "https://flagcdn.com/us.svg"
        ];
    }
}
