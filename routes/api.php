<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Server\ServerController;
use App\Http\Controllers\Ban\BanController;
use App\Http\Controllers\Mute\MuteController;

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

/*
|--------------------------------------------------------------------------
| Auth Routes
|--------------------------------------------------------------------------
|
| Endpoint: /api/auth
|
*/
Route::group(['prefix' => 'auth'], function() {
    Route::post('/login', [AuthController::class, 'login']);

    Route::group(['middleware' => 'auth:sanctum'], function() {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::post('/register', [AuthController::class, 'register']);
    });
});

/*
|--------------------------------------------------------------------------
| Server Routes
|--------------------------------------------------------------------------
|
| Endpoint: /api/servers
|
*/
Route::group(['prefix' => 'servers'], function() {
    Route::get('/', [ServerController::class, 'index']);
    Route::get('/{server:id}', [ServerController::class, 'connectToServer']);
});

/*
|--------------------------------------------------------------------------
| Bans Routes
|--------------------------------------------------------------------------
|
| Endpoint: /api/bans
|
*/
Route::group(['prefix' => 'bans'], function() {
    Route::get('/', [BanController::class, 'index']);
});

/*
|--------------------------------------------------------------------------
| Mutes Routes
|--------------------------------------------------------------------------
|
| Endpoint: /api/mutes
|
*/
Route::group(['prefix' => 'mutes'], function() {
    Route::get('/', [MuteController::class, 'index']);
});

require __DIR__.'/locale.php';
