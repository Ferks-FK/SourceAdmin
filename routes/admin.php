<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\{
    AdminSettings\AdminController,
    Ban\BansController,
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
        Route::get('/{admin:id}', [AdminController::class, 'show'])->name('settings.show');
        Route::patch('/update/{admin:id}', [AdminController::class, 'update'])->name('settings.update');
        Route::delete('/{admin:id}', [AdminController::class, 'destroy'])->name('settings.destroy');
        Route::post('/store', [AdminController::class, 'store'])->name('settings.store');
    });
});
