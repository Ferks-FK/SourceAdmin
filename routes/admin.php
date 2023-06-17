<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\{
    AdminSettings\AdminController,
    Ban\BanController,
    Mute\MutesController,
    Mod\ModController,
    Group\GroupController,
    Server\ServerController,
    Settings\SettingsController
};
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
|
| Here is where you can register admin routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "web" middleware group.
|
*/



Route::name('admin.')->group(function() {
    Route::get('/', [DashboardController::class, 'index'])->name('index');

    Route::group(['prefix' => 'admin_settings'], function() {
        Route::get('/', [AdminController::class, 'index'])->name('settings.index');
        Route::get('/create', [AdminController::class, 'create'])->name('settings.create');
        Route::get('/{id}', [AdminController::class, 'show'])->name('settings.show');
        Route::post('/store', [AdminController::class, 'store'])->name('settings.store');
        Route::patch('/update/{id}', [AdminController::class, 'update'])->name('settings.update');
        Route::delete('/{id}', [AdminController::class, 'destroy'])->name('settings.destroy');
    });

    Route::group(['prefix' => 'server_settings'], function() {
        Route::get('/', [ServerController::class, 'index'])->name('servers.index');
        Route::get('/create', [ServerController::class, 'create'])->name('servers.create');
        Route::get('/{id}', [ServerController::class, 'show'])->name('servers.show');
        Route::post('/store', [ServerController::class, 'store'])->name('servers.store');
        Route::patch('/update/{id}', [ServerController::class, 'update'])->name('servers.update');
        Route::delete('/{id}', [ServerController::class, 'destroy'])->name('servers.destroy');
    });

    Route::group(['prefix' => 'bans_settings'], function() {
        Route::get('/', [BanController::class, 'index'])->name('bans.index');
        Route::get('/create', [BanController::class, 'create'])->name('bans.create');
        Route::get('/{id}', [BanController::class, 'show'])->name('bans.show');
        Route::post('/store', [BanController::class, 'store'])->name('bans.store');
        Route::patch('/update/{id}', [BanController::class, 'update'])->name('bans.update');
        Route::delete('/{id}', [BanController::class, 'destroy'])->name('bans.destroy');
    });
});
