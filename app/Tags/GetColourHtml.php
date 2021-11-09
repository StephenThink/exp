<?php

namespace App\Tags;

use Statamic\Tags\Tags;

use \Illuminate\Support\Str;
use \Illuminate\Support\Arr;

class GetColourHtml extends Tags
{

    protected $colorsWithoutSuffix = ['black', 'orange', 'yellow'];
    /**
     * The {{ get_colour_html }} tag.
     *
     * @return string|array
     */
    public function index()
    {

        $colours = collect( Str::of( $this->params->get('colour') )->trim()->explode(' ') );
        
        if( $colours->count() > 1 ) {
            $from   = Str::lower($colours[0]);
            $to     = Str::lower($colours[1]);

            if( ! in_array($from, $this->colorsWithoutSuffix) )
                $from = $from . '-500';

            if( ! in_array($to, $this->colorsWithoutSuffix) )
                $to = $to . '-500';

            $css    = "colour-options-bg-gradient from-{$from} to-{$to}";


        } else {
            
            $bg = Str::lower($colours[0]);
            
            $css = ( ! in_array($bg, $this->colorsWithoutSuffix) ? "bg-{$bg}-500" : "bg-{$bg}" );
                
        }
        
        return "<div class='rounded-full h-8 w-8 $css border-2 border-transparent transform -rotate-90'></div>";

    }

    /**
     * The {{ get_colour_html:example }} tag.
     *
     * @return string|array
     */
    public function example()
    {
        //
    }
}
