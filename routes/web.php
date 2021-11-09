<?php

use App\Http\Controllers\DownloadCentreController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\LangProductController;
use Illuminate\Support\Facades\Route;
use Statamic\Exceptions\NotFoundHttpException;

use \Statamic\Facades\Taxonomy;
use \Statamic\Facades\Entry;
use Statamic\Facades\Site;

use \Illuminate\Support\Str;
use \Illuminate\Support\Arr;

use \Statamic\Facades\Term;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::post('/download-centre/download-all', [DownloadCentreController::class, 'downloadAll'] );
Route::post('/download-centre/download-selected', [DownloadCentreController::class, 'downloadSelected'] );

//  get the actual product
Route::get('/products/{parent_category}',[ProductController::class, 'parentCategory']);
Route::get('/products/{parent_category}/{sub_category}',[ProductController::class, 'subCategory']);
Route::get('/products/{parent_category}/{sub_category}/{product}',[ProductController::class, 'product']);

// different lang products

Route::get('{lang}/products/{parent_category}', [LangProductController::class, 'parentCategory']);
Route::get('{lang}/products/{parent_category}/{sub_category}', [LangProductController::class, 'subCategory']);
Route::get('{lang}/products/{parent_category}/{sub_category}/{product}', [LangProductController::class, 'product']);

// Route::statamic('/login', 'auth.login');

