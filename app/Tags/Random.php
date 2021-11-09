<?php

namespace App\Tags;

use Statamic\Tags\Tags;

class Random extends Tags
{
    /**
     * The {{ random }} tag.
     *
     * @return string|array
     */
    public function index()
    {
        return \Illuminate\Support\Str::of( $this->params->get('data') )->explode('|')->random(1)->first();
    }

   
}
