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
            "end_at" => now(),
            "admin_id" => 1,
            "reason_id" => 1,
            "time_ban_id" => 1,
            "server_id" => 1
        ];
    }
}
