<?php

namespace App\ViewModels;

use Statamic\View\ViewModel;

class NewsAdditionalData extends ViewModel
{
    public function data(): array
    {

        $content = collect([
                $this->cascade->get("content_after_image")->value(),
                $this->cascade->get("content_image")->value(),
                $this->cascade->get("content_intro")->value(),
                $this->cascade->get("content_outro")->value(),
                $this->cascade->get("content_quote")->value(),
                $this->cascade->get("blue_intro")->value()
        ])->map( function( $item, $key ) {
            return strip_tags($item);
        })->implode(' ');

        $word_count      = str_word_count($content);
        $read_time       = ceil($word_count / 200);

        return [
            'read_time' => $read_time, 
            'suffix' => \Illuminate\Support\Str::plural('minute', $read_time)
        ];
    }
}