<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CartController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [LoginController::class, 'login']);

Route::post('/create_product', [ProductController::class, 'store']);

Route::get('/display_products', [ProductController::class, 'index']);

Route::get('/view_product/{id}', [ProductController::class, 'show']);

Route::put('/update_product/{id}', [ProductController::class, 'update']);

Route::delete('/delete_product/{id}', [ProductController::class, 'destroy']);

// Api routes for Add to Cart feature 
Route::post('/cart/add', [CartController::class, 'addToCart']);
Route::get('/cart/{user_id}', [CartController::class, 'getCart']);
Route::delete('/cart/remove/{user_id}/{id}', [CartController::class, 'removeFromCart']);
Route::delete('/cart/clear/{user_id}', [CartController::class, 'clearCart']);
Route::put('/cart/update/{user_id}/{id}', [CartController::class, 'updateCart']);
Route::get('/cart/count/{user_id}', [CartController::class, 'getCartCount']);