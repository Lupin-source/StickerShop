<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Artisan;

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

Route::get('/', function () {
    return view('welcome');
});

Route::get('/setupDb/{name}', function ($name) {
    try {
        // Create the database
        DB::statement("CREATE DATABASE `$name`");

        // Configure the new database connection
        config(['database.connections.mysql.database' => $name]);

        // Purge the existing connection to use the new one
        DB::purge('mysql');
        
        // Run migrations on the new database
        Artisan::call('migrate', ['--database' => 'mysql']);

        return "Database '{$name}' created and migrations ran successfully.";
    } catch (\Exception $e) {
        return "Error: " . $e->getMessage();
    }
});