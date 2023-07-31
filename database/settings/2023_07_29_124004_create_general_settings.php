<?php

use Spatie\LaravelSettings\Migrations\SettingsMigration;

return new class extends SettingsMigration
{
    public function up(): void
    {
        $this->migrator->add('general.site_name', 'SourceAdmin');
        $this->migrator->add('general.time_zone', 'America/New_York');
    }

    public function down(): void
    {
        $this->migrator->delete('general.site_name');
        $this->migrator->delete('general.time_zone');
    }
};
