<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Sites
    |--------------------------------------------------------------------------
    |
    | Each site should have root URL that is either relative or absolute. Sites
    | are typically used for localization (eg. English/French) but may also
    | be used for related content (eg. different franchise locations).
    |
    */

    'sites' => [

        'english' => [
            'name' => config('app.name') . ' UK',
            'locale' => 'en',
            'url' => '/',
            'flag_code' => 'gb',
        ],

        'usa' => [
            'name' => config('app.name') . ' USA',
            'locale' => 'en_US',
            'url' => '/us/',
            'flag_code' => 'us',
        ],

        'france' => [
            'name' => config('app.name') . ' France',
            'locale' => 'fr',
            'url' => '/fr/',
            'flag_code' => 'fr',
        ],

        'germany' => [
            'name' => config('app.name') . ' Germany',
            'locale' => 'de',
            'url' => '/de/',
            'flag_code' => 'de',
        ],

        'spain' => [
            'name' => config('app.name') . ' Spain',
            'locale' => 'es',
            'url' => '/es/',
            'flag_code' => 'es',
        ],

    ],
];
