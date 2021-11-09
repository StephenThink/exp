<?php

namespace App\ViewModels;

use Statamic\Facades\Entry;
use Statamic\Facades\Site;
use Statamic\View\ViewModel;

class DownloadCentreData extends ViewModel
{

    public function data(): array {
        
        if( !request()->is(['download-centre'])) 
            return[];
                
        //  we will always have a user cause the content is protected 
        $taxonomies = collect(auth()->user()->parent_categories)->transform( function( $item, $key ) {
            return 'parent_categories::' . $item;
        })->toArray();
        
        // dd($taxonomies);

        $a = Entry::query()->where('collection', 'products')
        ->where('locale', Site::current()->handle());

        $a->whereTaxonomyIn(['parent_category::commercial-vehicle', 'parent_categories::storage'])->get();
        
        dd($a);
        
        $query = Entry::query()->where('collection', 'products')
                ->where('locale', Site::current()->handle())
                ->whereTaxonomy('parent_categories::commercial-vehicle')->get();
            
                $query = Entry::query()->where('collection', 'products')
                ->where('locale', Site::current()->handle());
            // ->whereTaxonomy('parent_category::' . $parent_category)->get()
        
        // foreach( auth()->user()->parent_categories as $category ) {
            $query->whereTaxonomyIn(['parent_category::storage', 'parent_category::commercial-vehicle']);

            dd($query->get());
        

        dd($query);



        dd(
            $this->cascade
        );
        
        return [];
    }

}
