<?php

namespace App\Settings;

use Spatie\LaravelSettings\Settings;

class GeneralSettings extends Settings
{
    public string $site_name;
    public ?string $time_zone;

    public static function group(): string
    {
        return 'general';
    }

    public static function validations(): array
    {
        return [
            'site_name' => ['required', 'string'],
            'time_zone' => ['nullable', 'timezone:all']
        ];
    }
}
