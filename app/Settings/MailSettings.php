<?php

namespace App\Settings;

use Spatie\LaravelSettings\Settings;

class MailSettings extends Settings
{
    public string $smtp_host;
    public int $smtp_port;
    public string $smtp_encryption;
    public string $smtp_username;
    public string $smtp_password;
    public string $smtp_mail_from;
    public string $smtp_mail_from_name;

    public static function group(): string
    {
        return 'mail';
    }

    public static function encrypted(): array
    {
        return [
            'smtp_password'
        ];
    }

    public static function validations(): array
    {
        return [
            'smtp_host' => ['required', 'string'],
            'smtp_port' => ['required', 'numeric'],
            'smtp_encryption' => ['required', 'string'],
            'smtp_username' => ['required', 'string'],
            'smtp_password' => ['required', 'string'],
            'smtp_mail_from' => ['required', 'string', 'email'],
            'smtp_mail_from_name' => ['required', 'string']
        ];
    }
}
