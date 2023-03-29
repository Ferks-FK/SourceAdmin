<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use \App\Http\Controllers\Auth\SteamAuthController;

Route::get('/auth/login', [AuthController::class, 'index'])->name('auth.login');
Route::get('/auth/steamLogin', [SteamAuthController::class, 'login'])->name('auth.steamLogin');
