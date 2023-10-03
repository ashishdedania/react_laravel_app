<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\OrderController;
use App\Http\Controllers\API\RegisterController;
use App\Http\Controllers\API\ProductController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('register', [RegisterController::class, 'register']);
Route::post('login', [RegisterController::class, 'login']);
Route::post('addproduct', [ProductController::class, 'addProduct']);
Route::get('list', [ProductController::class, 'list']);
Route::delete('delete/{id}', [ProductController::class, 'delete']);
Route::get('product/{id}', [ProductController::class, 'getProduct']);
Route::post('updateproduct/{id}', [ProductController::class, 'updateProduct']);
Route::get('listcategory', [ProductController::class, 'listCategory']);


Route::middleware('auth:api')->group( function () {
    
});

Route::fallback(function(){
    return response()->json([
        "success" => false,
        'message' => 'API url Not Found. If error persists, contact info@officalsite.com',
        "data"    => []
        ], 404);
});