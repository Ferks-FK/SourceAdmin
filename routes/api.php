<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Dashboard\SettingsController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Server\ServerController;
use App\Http\Controllers\Ban\BanController;

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

Route::get("/settings/company", [SettingsController::class, 'show']);

Route::group(['prefix' => 'auth'], function() {
    Route::post('/login', [AuthController::class, 'login']);

    Route::group(['middleware' => 'auth:sanctum'], function() {
        Route::post('/logout', [AuthController::class, 'logout']);
    });
});

Route::get('/servers', [ServerController::class, 'index']);
Route::get('/servers/{server:id}', [ServerController::class, 'connectToServer']);

Route::get('/bans', [BanController::class, 'index']);
