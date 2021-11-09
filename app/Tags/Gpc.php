<?php

namespace App\Tags;

use Statamic\Tags\Tags;
use \Statamic\Facades\Taxonomy;
use \Statamic\Facades\Term;
use \Illuminate\Support\Str;
use \Illuminate\Support\Arr;

class Gpc extends Tags
{
    /**
     * The {{ gpc }} tag.
     *
     * @return string|array
     */
    public function index()
    {
        //
        $a = 'storage';

        // $a = Term::whereTaxonomy('parent_category');
        // $b = Taxonomy::handles()->first();
        // $c = Taxonomy::whereHandle($b);
        
        $b = array_keys($this->context->get('sorted_data'));
        $c = count($b);
        $i = 0;
        while ($i < $c)
        { 
            if($a == $b[$i]) {
                return "Blue-200";
            }
        }


dd(test);
        return $a;
    }

    /**
     * The {{ gpc:example }} tag.
     *
     * @return string|array
     */
    public function example()
    {
        //
    }
}
