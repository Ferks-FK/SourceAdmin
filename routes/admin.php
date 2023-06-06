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

Route::get('/', [DashboardController::class, 'index'])->name('admin.index');

Route::name('admin.settings.')->group(function() {
    Route::get('/admin_settings', [AdminController::class, 'index'])->name('index');
    Route::get('/admin_settings/create', [AdminController::class, 'create'])->name('create');
    Route::get('/admin_settings/{admin:id}', [AdminController::class, 'show'])->name('show');
});
