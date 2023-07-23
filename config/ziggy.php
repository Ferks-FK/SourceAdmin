<?php

return [
    'groups' => [
        'admin' => ['admin.*', 'home.index'],
        'app' => [
            'home.index',
            'auth.*',
            'servers.*',
            'bans.*',
            'mutes.*',
            'report.*',
            'appeal.*',
            'steam.*',
            'locales.*'
        ]
    ],
    'except' => [
        'debugbar.*',
        'ignition.*'
    ]
];
