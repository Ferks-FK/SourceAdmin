<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\{
    AdminSettings\AdminController,
    Ban\BanController,
    Mute\MuteController,
    Mod\ModController,
    Group\GroupController,
    Server\ServerController,
    Settings\SettingsController,
    Role\RoleController
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
        Route::group(['prefix' => 'actions'], function() {
            Route::put('/reban/{id}', [BanController::class, 'reban'])->name('bans.action.reban');
            Route::put('/unban/{id}', [BanController::class, 'unban'])->name('bans.action.unban');
        });
        Route::get('/', [BanController::class, 'index'])->name('bans.index');
        Route::get('/create', [BanController::class, 'create'])->name('bans.create');
        Route::get('/{id}', [BanController::class, 'show'])->name('bans.show');
        Route::post('/store', [BanController::class, 'store'])->name('bans.store');
        Route::patch('/update/{id}', [BanController::class, 'update'])->name('bans.update');
        Route::delete('/{id}', [BanController::class, 'destroy'])->name('bans.destroy');

    });

    Route::group(['prefix' => 'mutes_settings'], function() {
        Route::group(['prefix' => 'actions'], function() {
            Route::put('/remute/{id}', [MuteController::class, 'remute'])->name('mutes.action.remute');
            Route::put('/unmute/{id}', [MuteController::class, 'unmute'])->name('mutes.action.unmute');
        });
        Route::get('/', [MuteController::class, 'index'])->name('mutes.index');
        Route::get('/create', [MuteController::class, 'create'])->name('mutes.create');
        Route::get('/{id}', [MuteController::class, 'show'])->name('mutes.show');
        Route::post('/store', [MuteController::class, 'store'])->name('mutes.store');
        Route::patch('/update/{id}', [MuteController::class, 'update'])->name('mutes.update');
        Route::delete('/{id}', [MuteController::class, 'destroy'])->name('mutes.destroy');
    });

    Route::group(['prefix' => 'group_settings'], function() {
        Route::get('/', [GroupController::class, 'index'])->name('groups.index');
        Route::get('/create', [GroupController::class, 'create'])->name('groups.create');
        Route::get('/{id}', [GroupController::class, 'show'])->name('groups.show');
        Route::post('/store', [GroupController::class, 'store'])->name('groups.store');
        Route::patch('/update/{id}', [GroupController::class, 'update'])->name('groups.update');
        Route::delete('/{id}', [GroupController::class, 'destroy'])->name('groups.destroy');
    });

    Route::group(['prefix' => 'roles_settings'], function() {
        Route::get('/', [RoleController::class, 'index'])->name('roles.index');
        Route::get('/create', [RoleController::class, 'create'])->name('roles.create');
        Route::get('/{id}', [RoleController::class, 'show'])->name('roles.show');
        Route::post('/store', [RoleController::class, 'store'])->name('roles.store');
        Route::patch('/update/{id}', [RoleController::class, 'update'])->name('roles.update');
        Route::delete('/{id}', [RoleController::class, 'destroy'])->name('roles.destroy');
    });
});
