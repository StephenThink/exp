<?php

namespace App\ViewModels;

use Statamic\Facades\Entry;
use Statamic\Facades\Site;
use Statamic\View\ViewModel;

use Illuminate\Support\Str;
use Symfony\Component\HttpKernel\Exception\HttpException;

class DownloadCentreData extends ViewModel
{

    public function data(): array {
        if(! auth()->user() )
            return [];

        // if( !request()->is(['download-centre'])) 
        if( ! Str::contains( request()->fullUrl(), 'download-centre') ) 
            return[];

        if( ! $user_taxonomies = auth()->user()->parent_categories )
            return [];
                
        //  we will always have a user cause the content is protected 
        // Get the categories the user can see
        $taxonomies = collect($user_taxonomies)->transform( function( $item, $key ) {
            return 'parent_category::' . $item;
        })->toArray();
        

        $entries = Entry::query()->where('collection', 'products')
            ->where('locale', Site::current()->handle())
            ->whereTaxonomyIn($taxonomies)->get();
        
        $sorted = 
            collect($entries)->map(function($item, $key) {
                
                return $item->data();

            })
            ->reject( function( $item, $key) {
                
                if( ! $item->get('parent_category') || ! $item->get('sub_categories'))
                    return true;
                
            })
            ->groupBy(function( $item, $key ) {
                
                $term = \Statamic\Facades\Term::findBySlug($item['parent_category'][0] ?? '' , 'parent_category' );
                
                if( !$term)
                    return;

                return $term->in(
                        Site::current()->handle()
                    )->values()->get('title');
                
                
            })->map( function($item, $key) {
                return $item->groupBy(function( $item, $key) {
                    
                    $term = \Statamic\Facades\Term::findBySlug($item->get('sub_categories')[0] ?? '' , 'sub_categories' );
                    
                    if( ! $term) {
                        return ;
                    }

                    return $term->in(
                            Site::current()->handle()
                        )->values()->get('title');
                        
                })->toArray();
            })->toArray();
            
        
        return [
            'sorted_data' => $sorted
        ];
    }

}
