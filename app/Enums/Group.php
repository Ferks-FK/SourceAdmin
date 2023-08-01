<?php

namespace App\Enums;

enum Group: string
{
    case WEB = 'web';
    case SERVER = 'server';
    case SERVER_ADMIN = 'server_admin';
}
