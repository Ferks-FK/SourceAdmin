<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Dashboard\HomeController;
use App\Http\Controllers\Base\IndexController;
use App\Http\Controllers\FlashMessagesController;
use App\Http\Controllers\Auth\SteamAuthController;

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

Route::get('/', [HomeController::class, 'index'])->name('home.index')->fallback();

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::group(['prefix' => 'steam'], function() {
    Route::get('/auth', [SteamAuthController::class, 'getSteamAuthUrlJson'])->name('steam.login');
    Route::get('/callback', [SteamAuthController::class, 'steamCallback'])->name('steam.callback');
});

Route::get('/{react}', [IndexController::class, 'index'])
    ->where('react', '^(?!(\/)?(api|auth|admin)).+');

require __DIR__.'/auth.php';
