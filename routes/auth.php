<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;

Route::get('/auth/login', [AuthController::class, 'index'])->name('auth.login');
