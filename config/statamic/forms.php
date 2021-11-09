<?php

return [
    
    'service' => 'Hcaptcha', // options: Recaptcha / Hcaptcha

    /*
    |--------------------------------------------------------------------------
    | Forms Path
    |--------------------------------------------------------------------------
    |
    | Where your form YAML files are stored.
    |
    */

    'forms' => resource_path('forms'),

    /*
    |--------------------------------------------------------------------------
    | Submissions Path
    |--------------------------------------------------------------------------
    |
    | Where your form submissions are stored.
    |
    */

    'submissions' => storage_path('forms'),

];
