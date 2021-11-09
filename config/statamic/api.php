<?php

return [

    /*
    |--------------------------------------------------------------------------
    | API
    |--------------------------------------------------------------------------
    |
    | Whether the API should be enabled, and through what route.
    |
    */

    'enabled' => env('STATAMIC_API_ENABLED', false),

    'route' => env('STATAMIC_API_ROUTE', 'api'),

    'resources' => [
        'collections' => true,
        'navs' => false,
        'taxonomies' => false,
        'assets' => false,
        'globals' => false,
        'forms' => false,
        'users' => false,
    ],

    /*
    |--------------------------------------------------------------------------
    | Middleware & Authentication
    |--------------------------------------------------------------------------
    |
    | Define the middleware / middleware group that will be applied to the
    | API route group. If you want to externally expose this API, here
    | you can configure a middleware based authentication layer.
    |
    */

    'middleware' => env('STATAMIC_API_MIDDLEWARE', 'api'),

    /*
    |--------------------------------------------------------------------------
    | Pagination
    |--------------------------------------------------------------------------
    |
    | The numbers of items to show on each paginated page.
    |
    */

    'pagination_size' => 50,

];
