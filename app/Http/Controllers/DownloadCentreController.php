<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use Statamic\Facades\User;

class DownloadCentreController extends Controller
{

    public $products;
    public $folders;

    public $path = '/assets/download-centre-zips/';
    public $user;
    public $zipsFolder = '';


    public function __construct()
    {
        //  store convert the products
        $this->products = collect(
            json_decode(request()->get('products'))
        );

        //  store and convert the folder names
        $this->folders = collect(
            \Illuminate\Support\Str::of( request()->get('download_centre_items') )->explode(',')
        );
        $this->checkWeHaveProducts();

        $this->zipsFolder = public_path() . $this->path;

        $this->makeDownloadFolder();
        
    }

    public function downloadSelected() {
        $this->setUser();
        $this->makeUserFolder();

        $zip = new \ZipArchive();
        $fileName = $this->path . $this->user->email . '/JONESCO_' . $this->user->email . '--' . (new \DateTime('NOW'))->format('dmY-his') .'.zip';

        if ($zip->open( public_path($fileName), \ZipArchive::CREATE)== TRUE)
        {
            $this->folders->map( function( $folder, $folder_key) use( $zip ) {
                $this->products->map( function( $product, $key) use ( $folder, $folder_key, $zip ) {

                    if( isset($product->$folder) && in_array($folder, $product->download_centre)) {

                        if( is_array($product->$folder) ) {
                            
                            foreach( $product->$folder as $item ) {
                                $zip->addFile( 
                                    $this->filePath($item),
                                    $this->targetPath($product->slug, $folder, $item)
                                );
                            }

                        } else {
                            $zip->addFile( 
                                $this->filePath($product->$folder),
                                $this->targetPath($product->slug, $folder, $product->$folder) 
                            );
                        }
                    }

                });
            });


            $zip->close();
        }

        return response()->download(public_path($fileName));
    }

    public function downloadAll(Request $request) {

        $this->setUser();
        $this->makeUserFolder();
        
        $zip = new \ZipArchive();
        $fileName = $this->path . $this->user->email . '/JONESCO_' . $this->user->email . '--' . (new \DateTime('NOW'))->format('dmY-his') .'.zip';

        if ($zip->open( public_path($fileName), \ZipArchive::CREATE)== TRUE)
        {
            $this->folders->map( function( $folder, $folder_key) use( $zip ) {
                $this->products->map( function( $product, $key) use ( $folder, $folder_key, $zip ) {
                
                    if( isset($product->$folder) ) {

                        if( is_array($product->$folder) ) {
                            
                            foreach( $product->$folder as $item ) {
                                $zip->addFile( 
                                    $this->filePath($item),
                                    $this->targetPath($product->slug, $folder, $item)
                                );
                            }

                        } else {
                            $zip->addFile( 
                                $this->filePath($product->$folder),
                                $this->targetPath($product->slug, $folder, $product->$folder) 
                            );
                        }
                    }

                });
            });


            $zip->close();
        }

        return response()->download(public_path($fileName));
    }

    public function setUser() {
        $this->user = auth()->user();
    }

    private function filePath($item) {
        return public_path('assets/' . $item);
    }

    private function targetPath($slug, $folder, $item) {
        return $slug . '/' . str_replace('download_centre_', '', $folder) . '/' . basename( $item );
    }

    private function checkWeHaveProducts() {
        if($this->products->isEmpty()) abort(500, 'products can\'t be empty');
    }

    private function makeDownloadFolder() {
        if ( ! file_exists( $this->zipsFolder) ) {
            mkdir( $this->zipsFolder , 0777, true);
            
        }
    }

    private function makeUserFolder() {
        if (!file_exists( $this->zipsFolder . $this->user->email ) ) {
            mkdir( $this->zipsFolder . $this->user->email , 0777, true);
        }
    }
}
