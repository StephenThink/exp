<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \Statamic\Facades\Taxonomy;
use \Statamic\Facades\Entry;
use Statamic\Facades\Site;

use \Illuminate\Support\Str;
use \Illuminate\Support\Arr;

use \Statamic\Facades\Term;
use Statamic\Exceptions\NotFoundHttpException;
class LangProductController extends Controller
{
    //

    public function product( $lang, $parent_category, $sub_category, $product ) {

        if ( ! $product = Entry::findBySlug( $product, 'products' ) )
            throw new NotFoundHttpException;
    
             // Gets the slug of the product
        $slug = $product->slug();

        // Uses the current Handle and Slug to find the translated product.
        $transProduct = 
            Entry::query()->where('collection', 'products')
            ->where('locale', Site::current()->handle())
            ->where('slug', $slug)->first();

        if(!$transProduct) {
            $transProduct = Entry::query()->where('collection', 'products')
            ->where('slug', $slug)->first();
        }

        $sortable = $transProduct->data()->get('sortable_category')[0];
        $transSortable = \Statamic\Facades\Term::findBySlug($sortable, 'sortable_category')->in(Site::current()->handle())->values()->get('title');


  
       
            return (new \Statamic\View\View)
            ->template('products.product')
            ->layout('layout')
            ->with(
            [
                $transProduct->toAugmentedArray(),
            'p_cat' => \Statamic\Facades\Term::findBySlug($parent_category, 'parent_category')->in(Site::current()->handle())->values()->get('title'),
            'category_title' => \Statamic\Facades\Term::findBySlug($sub_category, 'sub_categories')->in(Site::current()->handle())->values()->get('title'),
            'sortable_cat' => $transSortable,
            'accent_colour' => \Statamic\Facades\Term::findBySlug($parent_category, 'parent_category')->data()->get('accent_colour')
            ]);
    }



    public function parentCategory( $lang, $parent_category ) {

        //  check if it exists 
        if ( ! $category = \Statamic\Facades\Term::findBySlug($parent_category, 'parent_category') )
        throw new NotFoundHttpException;
    
        $slugs = 
        collect(
            Entry::query()->where('collection', 'products')
            ->where('locale', Site::current()->handle())
            ->whereTaxonomy('parent_category::' . $parent_category)->get()
        )
        ->groupBy( function( $item, $key ) {
            
            $sub_category = $item->data()->get('sub_categories');

            if ( is_array($sub_category) ) {
                return \Illuminate\Support\Arr::first($sub_category);
            }

            if( \Illuminate\Support\Str::of( $sub_category )->trim()->isNotEmpty() )
                return $sub_category;

        })->keys()->implode('|');

        // Heading of the sub / sortable cat pages
        $LangTitle = $category->in(Site::current()->handle())->values()->get('title');

        // dd()

    return (new \Statamic\View\View)
        ->template('products.parent_category')
        ->layout('layout')
        ->with([
            'category_title' => $LangTitle,
            'category_description' => $category->data()->get('content'),
            // 'category_slug' => $category->slug() ,
            'slugs' => $slugs,
            'from' => 'sub_categories',
            'prefix_url' => $parent_category,
            'p_cat' => $parent_category,
            'accent_colour' => $category->get('accent_colour')
        ]);



    }

    public function subCategory( $lang, $parent_category, $sub_category ) {

        if ( ! $category = \Statamic\Facades\Term::findBySlug($sub_category, 'sub_categories') )
            throw new NotFoundHttpException;
    
            $slugs = 
            collect(
                Entry::query()->where('collection', 'products')
                ->where('locale', Site::current()->handle())
                ->whereTaxonomy('sub_categories::' . $sub_category)->get()
            )
            ->groupBy( function( $item, $key ) {
    
                $sortable_category = $item->data()->get('sortable_category');         
        
                if ( is_array($sortable_category) ) {
                    return Arr::first($sortable_category);
                }
        
                if( Str::of( $sortable_category )->trim()->isNotEmpty() )
                    return $sortable_category;
        
            });
    
            $items = [];
    
            
    
            $data = $slugs->keys()->map( function( $item ) use ( $items ) {
                return $items[$item] = [
                    'name' => Str::of($item)->replace( '-', ' ')->title()->__toString(),
                    'slug' => $item,
                    'active' => true,
                ];
            });
    
            
            //  get all the terms in the taxonomy. 
            $a = Term::whereTaxonomy('sortable_category');
            $newSlugs = array_flip($slugs->keys()->toArray());
    
            $localeNames = $a->reject( function( $item ) use ($newSlugs) {
                return ! Arr::has( $newSlugs, $item->slug());
                
            })->map(function ($term) {
                return [
                    'default' => $term->inDefaultLocale()->values()->get('title'),
                    'locale' => $term->in(Site::current()->handle())->values()->get('title')
                ];
            });

            // Experiments for Trans lating
            // $b = Term::whereTaxonomy('parent_category');
            // $c = $b->map(function ($term) {
            //     return [
            //         'default' => $term->inDefaultLocale()->values()->get('title'),
            //         'locale' => $term->in(Site::current()->handle())->values()->get('title')
            //     ];
            // });
            // $d = \Statamic\Facades\Term::findBySlug($parent_category, 'parent_category')->in(Site::current()->handle())->values()->get('title')  ;
            // $PCatLang = $parent_category ;
            //dd($b, $c, $d);
            // dd($localeNames->toArray());
            
            return (new \Statamic\View\View)
                ->template('products.sub_category')
                ->layout('layout')
                ->with([
                    'category_title' => $category->in(Site::current()->handle())->values()->get('title'),
                    'category_description' => $category->data()->get('content'),
                    // 'category_slug' => $category->slug(),
                    // 'parent_category_slug' => $parent_category,
                    'slugs' => $slugs->keys()->implode('|'),
                    'slugs_array' => $data,
                    'slug_name_overrides' => $localeNames->toArray(),
                    'from' => 'sortable_category',
                    'prefix_url' => $parent_category . '/' . $sub_category,
                    'p_cat' => \Statamic\Facades\Term::findBySlug($parent_category, 'parent_category')->in(Site::current()->handle())->values()->get('title'),
                    'accent_colour' => \Statamic\Facades\Term::findBySlug($parent_category, 'parent_category')->data()->get('accent_colour')      
                ]);
    
            
                }

}
