<?php

namespace App\Modifiers;

use Statamic\Modifiers\Modifier;
use \Illuminate\Support\Str;

class PipedToSpanWithDataAttributes extends Modifier
{
    /**
     * Modify a value.
     *
     * @param mixed  $value    The value to be modified
     * @param array  $params   Any parameters used in the modifier
     * @param array  $context  Contextual values
     * @return mixed
     */
    public function index($value, $params, $context)
    {
        
        return collect(Str::of($value)->explode('|'))->map( function( $item ){
            return Str::title(Str::of($item)->replace('-', ' '));
        })->flatten();
    }
}
