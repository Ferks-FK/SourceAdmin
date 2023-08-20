<?php

use Spatie\LaravelSettings\Migrations\SettingsMigration;

return new class extends SettingsMigration
{
    public function up(): void
    {
        $this->migrator->add('mail.smtp_host', $this->getMailValue('MAIL_HOST'));
        $this->migrator->add('mail.smtp_port', $this->getMailValue('MAIL_PORT'));
        $this->migrator->add('mail.smtp_encryption', $this->getMailValue('MAIL_ENCRYPTION'));
        $this->migrator->add('mail.smtp_username', $this->getMailValue('MAIL_USERNAME'));
        $this->migrator->addEncrypted('mail.smtp_password', $this->getMailValue('MAIL_PASSWORD'));
        $this->migrator->add('mail.smtp_mail_from', $this->getMailValue('MAIL_FROM_ADDRESS'));
        $this->migrator->add('mail.smtp_mail_from_name', $this->getMailValue('MAIL_FROM_NAME'));
    }

    public function down(): void
    {
        $this->migrator->delete('mail.smtp_host');
        $this->migrator->delete('mail.smtp_port');
        $this->migrator->delete('mail.smtp_encryption');
        $this->migrator->delete('mail.smtp_username');
        $this->migrator->delete('mail.smtp_password');
        $this->migrator->delete('mail.smtp_mail_from');
        $this->migrator->delete('mail.smtp_mail_from_name');
    }

    protected function getMailValue(string $key)
    {
        $value = env($key);

        if (is_null($value)) {
            return '';
        }

        return $value;
    }
};
