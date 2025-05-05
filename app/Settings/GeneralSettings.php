<?php

namespace App\Settings;

use Spatie\LaravelSettings\Settings;

class GeneralSettings extends Settings
{
    public string $site_name;
    public ?string $time_zone;
    public ?string $steam_web_api_key;

    public static function group(): string
    {
        return 'general';
    }

    public static function encrypted(): array
    {
        return [
            'steam_web_api_key'
        ];
    }

    public static function validations(): array
    {
        return [
            'site_name' => ['required', 'string'],
            'time_zone' => ['nullable', 'timezone:all'],
            'steam_web_api_key' => ['nullable', 'string']
        ];
    }
}
