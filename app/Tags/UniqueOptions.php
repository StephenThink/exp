<?php

namespace App\Tags;

use Statamic\Tags\Tags;
use Statamic\Facades\Entry;
use Statamic\Facades\Collection;

class UniqueOptions extends Tags
{
    
    public function getOptions()
    {
        $value = $this->params->get("name");

        $entry = Entry::whereCollection('mudguard_search');

        $new = \Illuminate\Support\Arr::collapse(
            $entry->map( function( $item ) use ($value) {
            
                $item = $item->get($value);
                
                return $item; 
                // return $item->get($value);
                
            })
        );
        
        $new = collect($new)->unique()->reject(function ($item) {
            return empty( $item );
        })->map( function( $item ) {
            return (!is_array( $item ) ? trim($item) : $item);
        });
    

        return ['options' => $new->toArray() ];
        
    }

}
