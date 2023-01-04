<?php

use App\Http\Controllers\User\ProfileController;
use App\Http\Controllers\Dashboard\HomeController;
use App\Http\Controllers\Server\ServerController;
use App\Http\Controllers\Ban\BanController;
use Illuminate\Support\Facades\Route;


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

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/servers', [ServerController::class, 'index'])->name('servers.index');
Route::get('/servers/{server:id}', [ServerController::class, 'show'])->name('servers.show');
Route::get('/servers/ajax', [ServerController::class, 'dataTableQueryData']);

Route::get('/bans', [BanController::class, 'index'])->name('bans.index');
Route::get('/bans/listTable', [BanController::class, 'dataTableQueryData'])->name('bans.listTable');
Route::get('/bans/{ban:id}', [BanController::class, 'show'])->name('bans.show');
Route::get('/bans/{player:id}/{server:id}', [BanController::class, 'KickPlayer'])->name('ban.add');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
