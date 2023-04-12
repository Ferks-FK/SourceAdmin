<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;

Route::get('/auth/login', [AuthController::class, 'index'])->middleware('guest')->name('auth.login');
