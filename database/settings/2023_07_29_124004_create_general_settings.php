<?php

use Spatie\LaravelSettings\Migrations\SettingsMigration;

return new class extends SettingsMigration
{
    public function up(): void
    {
        $this->migrator->add('general.site_name', config('app.name', 'SourceAdmin'));
        $this->migrator->add('general.time_zone', config('app.timezone', 'America/New_York'));
        $this->migrator->addEncrypted('general.steam_web_api_key', $this->getSteamApiKey());
    }

    public function down(): void
    {
        $this->migrator->delete('general.site_name');
        $this->migrator->delete('general.time_zone');
        $this->migrator->delete('general.steam_web_api_key');
    }

    protected function getSteamApiKey(): string|null
    {
        $apiKey = config('steam-auth.api_keys');

        if (is_array($apiKey) && count($apiKey) > 0) {
            return $apiKey[0];
        }

        return null;
    }
};
